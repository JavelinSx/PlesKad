// Monthly job (see .github/workflows/update-laws.yml):
// 1. Run several targeted searches (Serper.dev — Google results as JSON,
//    restricted in the query itself to a curated list of official/legal
//    sites) covering the past year, looking for cadastral/land law changes
// 2. Keep only items relevant to cadastral/land/real-estate work
// 3. Skip anything already stored in the Google Sheet (dedup by link/title)
// 4. Ask DeepSeek to pick the 6 most important/popular/socially relevant new
//    items out of the whole relevant pool, and rewrite them in plain language
// 5. Append the new rows to the Sheet (source of truth / manual review point)
// 6. Regenerate ../../data/laws.ts from the sheet so the site picks it up on next deploy

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { google } from 'googleapis';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const SERPER_SEARCH_URL = 'https://google.serper.dev/search';
// Restrict which sites count as "official" here in code as a second line of
// defense — the `site:` operators baked into each query below should already
// keep results scoped to these domains, but this filters out any stragglers.
const ALLOWED_DOMAINS = ['pravo.gov.ru', 'rosreestr.gov.ru', 'consultant.ru', 'garant.ru'];
const SITE_FILTER = ALLOWED_DOMAINS.map((d) => `site:${d}`).join(' OR ');

// Каждый запрос — отдельная тема, чтобы покрыть разные интересные клиентам
// направления, а не полагаться на одну общую формулировку. site: ограничивает
// выдачу только официальными источниками прямо в самом запросе.
const SEARCH_QUERIES = [
  `изменения в законодательстве кадастровый учет земельных участков (${SITE_FILTER})`,
  `дачная амнистия изменения закон (${SITE_FILTER})`,
  `межевание земельного участка новый закон (${SITE_FILTER})`,
  `технический план недвижимости изменения в законе (${SITE_FILTER})`,
  `регистрация прав на недвижимость новые правила (${SITE_FILTER})`,
  `кадастровая стоимость земельного участка новый порядок (${SITE_FILTER})`,
];

// date | title | summary (DeepSeek) | details (DeepSeek, JSON array) | source | link
// | ручное краткое описание (override) | ручная расшифровка (override, одна строка = один пункт)
// Столбцы G и H заполняются человеком вручную прямо в таблице — если заполнены,
// они полностью заменяют собой C/D при сборке сайта (см. main()).
const SHEET_RANGE = 'laws!A:H';
const MAX_NEW_PER_RUN = 6;
const CANDIDATE_POOL_SIZE = 25; // how many relevant+new search results we show the model to choose from
const MAX_ITEMS_IN_SITE = 12;
const OUTPUT_TS_PATH = path.resolve(__dirname, '../../data/laws.ts');
const DEEPSEEK_API_URL = 'https://api.deepseek.com/chat/completions';
const MODEL = 'deepseek-chat';

// Специально без "многоквартирн"/"капитальн строительств" — слишком широкие,
// тянут общие темы ЖКХ/управления домом, не относящиеся к кадастровым работам.
const KEYWORDS = [
  /кадастр/i,
  /межеван/i,
  /егрн/i,
  /земельн/i,
  /недвижим/i,
  /землеустро/i,
  /дачн/i,
  /садов\w*\s+участ/i,
  /техническ\w*\s+план/i,
  /росреестр/i,
];

function isRelevant(item) {
  const text = `${item.title || ''} ${item.contentSnippet || item.content || ''}`;
  return KEYWORDS.some((re) => re.test(text));
}

function isAllowedDomain(link) {
  try {
    const host = new URL(link).hostname.replace(/^www\./, '');
    return ALLOWED_DOMAINS.some((domain) => host === domain || host.endsWith(`.${domain}`));
  } catch {
    return false;
  }
}

async function searchSerper(query) {
  const apiKey = process.env.SERPER_API_KEY;
  if (!apiKey) throw new Error('SERPER_API_KEY is not set');

  const response = await fetch(SERPER_SEARCH_URL, {
    method: 'POST',
    headers: {
      'X-API-KEY': apiKey,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      q: query,
      gl: 'ru',
      hl: 'ru',
      num: 5,
      tbs: 'qdr:y', // не старше года
    }),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Serper API error ${response.status} for query "${query}": ${errText}`);
  }

  const data = await response.json();
  return (data.organic || []).map((item) => ({
    title: item.title,
    contentSnippet: item.snippet,
    link: item.link,
  }));
}

/** Runs every SEARCH_QUERIES entry and returns a deduplicated (by link) pool. */
async function fetchAllCandidates() {
  const seenLinks = new Set();
  const seenTitles = new Set();
  const all = [];

  for (const query of SEARCH_QUERIES) {
    const results = await searchSerper(query);
    for (const item of results) {
      if (!item.link || seenLinks.has(item.link) || seenTitles.has(item.title)) continue;
      if (!isAllowedDomain(item.link)) continue;
      seenLinks.add(item.link);
      seenTitles.add(item.title);
      all.push(item);
    }
  }

  return all;
}

function safeParseJSON(value) {
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

async function getSheetsClient() {
  const raw = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  if (!raw) throw new Error('GOOGLE_SERVICE_ACCOUNT_JSON is not set');
  const credentials = JSON.parse(raw);

  const auth = new google.auth.JWT(
    credentials.client_email,
    undefined,
    credentials.private_key,
    ['https://www.googleapis.com/auth/spreadsheets']
  );
  await auth.authorize();
  return google.sheets({ version: 'v4', auth });
}

async function readRows(sheets) {
  const spreadsheetId = process.env.GOOGLE_SHEET_ID;
  const res = await sheets.spreadsheets.values.get({ spreadsheetId, range: SHEET_RANGE });
  const rows = res.data.values || [];

  // Если первая строка — заголовки (например "date | title | ..."), а не
  // реальная запись, пропускаем её, чтобы она не попала на сайт как закон.
  if (rows.length > 0 && (rows[0][0] || '').trim().toLowerCase() === 'date') {
    return rows.slice(1);
  }

  return rows;
}

async function callDeepSeek(prompt) {
  const apiKey = process.env.DEEPSEEK_API_KEY;
  if (!apiKey) throw new Error('DEEPSEEK_API_KEY is not set');

  const response = await fetch(DEEPSEEK_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [{ role: 'user', content: prompt }],
      response_format: { type: 'json_object' },
      temperature: 0.3,
    }),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`DeepSeek API error ${response.status}: ${errText}`);
  }

  const data = await response.json();
  const text = data.choices?.[0]?.message?.content?.trim();

  if (!text) {
    throw new Error(`Empty response from DeepSeek: ${JSON.stringify(data)}`);
  }

  return JSON.parse(text);
}

/**
 * Sends the whole pool of relevant/new candidates to DeepSeek in one call and
 * asks it to both pick the best up to MAX_NEW_PER_RUN and rewrite them in
 * plain language — selection and humanization happen together so the model
 * judges importance/popularity/social relevance with full context of what
 * else is available this run, not one item in isolation.
 */
async function selectAndHumanize(candidates) {
  const listing = candidates
    .map((item, i) => {
      const desc = (item.contentSnippet || item.content || '').slice(0, 300);
      return `${i}. Заголовок: ${item.title}\n   Описание: ${desc}`;
    })
    .join('\n\n');

  const prompt = `Ты помогаешь кадастровой компании «ПлесКад» вести раздел «Изменения в законодательстве» на сайте для обычных людей (собственники земли, домов, квартир в небольшом районе), а не для юристов. Компания занимается ИМЕННО кадастровыми работами: межевание и уточнение границ земельных участков, технические планы домов/зданий/помещений, геодезические изыскания, регистрация прав в ЕГРН, консультации по оформлению недвижимости.

Ниже — пронумерованный список ${candidates.length} официальных новостей об изменениях в законодательстве. Выбери из них НЕ БОЛЕЕ ${MAX_NEW_PER_RUN} самых достойных публикации на сайте именно этой компании, по трём критериям:
а) ВАЖНОСТЬ — реально меняет права, обязанности или порядок действий многих людей (а не узкая техническая/ведомственная правка);
б) ПОПУЛЯРНОСТЬ — тема, с которой обычные люди действительно сталкиваются при оформлении земли, домов, квартир, границ участков, регистрации прав, кадастровой стоимости, наследства недвижимости. Особо приоритетные, часто искомые темы: дачная амнистия, упрощённая регистрация домов/построек, уточнение границ участка, споры с соседями по границе, наследование земли/дома, налоги на землю/дом;
в) СОЦИАЛЬНЫЙ СПРОС — по теме есть широкий общественный интерес, а не только интерес узких специалистов.

ВАЖНО — тема должна быть напрямую связана с землёй, недвижимостью, кадастром или регистрацией прав. НЕ выбирай пункты про общедомовое имущество, коммунальные платежи, содержание МКД управляющими компаниями, капитальный ремонт, ЖКХ и подобные темы — это не относится к профилю компании, даже если формально касается недвижимости.

Если подходящих меньше ${MAX_NEW_PER_RUN} — выбери меньше, не натягивай слабые или нерелевантные пункты. Если совсем ничего не подходит — верни пустой список.

Список:
${listing}

Ответь СТРОГО валидным JSON, без markdown-обёртки и пояснений вокруг, в формате:
{"selected": [{"index": 0, "summary": "...", "details": ["..."]}, ...]}

Для каждого выбранного пункта:
- "index" — номер из списка выше.
- "summary" — одна короткая фраза, до 100 символов, тизер для короткой ленты на сайте.
- "details" — разбор для клиентов на 5-6 предложений по смыслу.
  - Если изменение описывает последовательность действий / пошаговый порядок — раздели на отдельные пункты массива, каждый пункт — один шаг, коротко и по делу.
  - Если это просто описание изменения без чёткой последовательности — верни ОДИН элемент массива: связный абзац на 5-6 предложений.
- Пиши так, как будто объясняешь клиенту по телефону, а не цитируешь закон. Никакой воды и канцелярита.
Список "selected" упорядочи от самого важного/популярного к менее важному.`;

  const parsed = await callDeepSeek(prompt);

  if (!Array.isArray(parsed.selected)) {
    throw new Error(`Unexpected DeepSeek response shape: ${JSON.stringify(parsed)}`);
  }

  return parsed.selected
    .filter((s) => Number.isInteger(s.index) && candidates[s.index] && s.summary && Array.isArray(s.details) && s.details.length > 0)
    .slice(0, MAX_NEW_PER_RUN)
    .map((s) => ({ item: candidates[s.index], summary: s.summary, details: s.details }));
}

function buildTsFile(rows) {
  const entries = rows
    .map(
      (r) => `  {
    date: ${JSON.stringify(r.date)},
    t: ${JSON.stringify(r.t)},
    summary: ${JSON.stringify(r.summary)},
    details: ${JSON.stringify(r.details)},
    src: ${JSON.stringify(r.src)},
    link: ${JSON.stringify(r.link)},
  }`
    )
    .join(',\n');

  return `import type { LawUpdate } from './types';

/**
 * Автоматически обновляется раз в месяц через
 * scripts/laws-updater/update-laws.mjs (.github/workflows/update-laws.yml).
 * Источник истины — Google Sheet, сверка дублей происходит там.
 * Ручные правки этого файла будут перезаписаны следующим запуском —
 * правки вносите в саму таблицу.
 */
export const lawUpdates: LawUpdate[] = [
${entries}
];
`;
}

const DRY_RUN = process.env.DRY_RUN === 'true';

async function main() {
  const rawCandidates = await fetchAllCandidates();
  console.log(`Search returned ${rawCandidates.length} unique, allowed-domain result(s) across ${SEARCH_QUERIES.length} quer${SEARCH_QUERIES.length === 1 ? 'y' : 'ies'}.`);

  const sheets = await getSheetsClient();
  const existingRows = await readRows(sheets);
  console.log(`Connected to Google Sheet OK: ${existingRows.length} existing row(s).`);

  const existingLinks = new Set(existingRows.map((r) => r[5]).filter(Boolean));
  const existingTitles = new Set(existingRows.map((r) => r[1]).filter(Boolean));

  const candidates = rawCandidates
    .filter((item) => isRelevant(item) && !existingLinks.has(item.link) && !existingTitles.has(item.title))
    .slice(0, CANDIDATE_POOL_SIZE);

  console.log(`Relevant & new: ${candidates.length} (pool capped at ${CANDIDATE_POOL_SIZE}). Asking DeepSeek to pick up to ${MAX_NEW_PER_RUN}.`);

  if (DRY_RUN) {
    console.log('\nDRY RUN — stopping here. No DeepSeek calls, no writes to the Sheet, no changes to data/laws.ts.');
    console.log('Candidate pool that would be sent to DeepSeek for selection:');
    for (const item of candidates) {
      console.log(`  - ${item.title}\n    ${item.link}`);
    }
    if (candidates.length === 0) {
      console.log('  (none — either nothing relevant this run, or everything is already in the sheet)');
    }
    return;
  }

  if (candidates.length > 0) {
    const selected = await selectAndHumanize(candidates);

    console.log(`DeepSeek selected ${selected.length} item(s) out of ${candidates.length} candidates.`);

    const today = new Date().toLocaleDateString('ru-RU');
    const newRows = selected.map(({ item: pick, summary, details }) => {
      const src = (() => {
        try {
          return new URL(pick.link).hostname.replace(/^www\./, '');
        } catch {
          return 'Источник';
        }
      })();
      return [today, pick.title, summary, JSON.stringify(details), src, pick.link || ''];
    });

    if (newRows.length > 0) {
      await sheets.spreadsheets.values.append({
        spreadsheetId: process.env.GOOGLE_SHEET_ID,
        range: SHEET_RANGE,
        valueInputOption: 'RAW',
        insertDataOption: 'INSERT_ROWS',
        requestBody: { values: newRows },
      });
    }

    console.log(`Appended ${newRows.length} new row(s) to the sheet.`);
  } else {
    console.log('No new relevant law updates this run.');
  }

  const finalRows = await readRows(sheets);
  const parsedRows = finalRows
    .map((r) => {
      const manualSummary = (r[6] || '').trim();
      const manualDetails = (r[7] || '')
        .trim()
        .split('\n')
        .map((line) => line.trim())
        .filter(Boolean);

      return {
        date: r[0],
        t: r[1],
        // Ручные столбцы G/H (если заполнены) приоритетнее версии от DeepSeek.
        summary: manualSummary || r[2],
        details: manualDetails.length > 0 ? manualDetails : safeParseJSON(r[3]) || [r[3] || ''],
        src: r[4],
        link: r[5],
      };
    })
    .filter((r) => r.date && r.t)
    .slice(-MAX_ITEMS_IN_SITE)
    .reverse();

  await fs.writeFile(OUTPUT_TS_PATH, buildTsFile(parsedRows), 'utf-8');
  console.log(`Wrote ${parsedRows.length} entries to ${path.relative(process.cwd(), OUTPUT_TS_PATH)}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
