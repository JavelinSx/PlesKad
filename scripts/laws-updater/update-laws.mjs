// Weekly job (see .github/workflows/update-laws.yml):
// 1. Pull the ConsultantPlus "hot documents" RSS feed
// 2. Keep only items relevant to cadastral/land/real-estate work
// 3. Skip anything already stored in the Google Sheet (dedup by link/title)
// 4. Ask Claude to rewrite the top 3 new items in plain language
// 5. Append the new rows to the Sheet (source of truth / manual review point)
// 6. Regenerate ../../data/laws.ts from the sheet so the site picks it up on next deploy

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import Anthropic from '@anthropic-ai/sdk';
import { google } from 'googleapis';
import Parser from 'rss-parser';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const RSS_URL = 'https://www.consultant.ru/rss/hotdocs.xml';
const SHEET_RANGE = 'laws!A:F'; // date | title | summary | details (JSON array) | source | link
const MAX_NEW_PER_RUN = 3;
const MAX_ITEMS_IN_SITE = 12;
const OUTPUT_TS_PATH = path.resolve(__dirname, '../../data/laws.ts');
const MODEL = 'claude-sonnet-5';

const KEYWORDS = [
  /кадастр/i,
  /межеван/i,
  /егрн/i,
  /земельн/i,
  /недвижим/i,
  /землеустро/i,
  /техническ\w*\s+план/i,
  /росреестр/i,
  /многоквартирн/i,
  /капитальн\w*\s+строительств/i,
];

function isRelevant(item) {
  const text = `${item.title || ''} ${item.contentSnippet || item.content || ''}`;
  return KEYWORDS.some((re) => re.test(text));
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
  return res.data.values || [];
}

async function humanize(anthropic, item) {
  const prompt = `Ты помогаешь кадастровой компании «ПлесКад» объяснять клиентам изменения в законодательстве простым языком, без юридического жаргона.

Официальное описание изменения:
Заголовок: ${item.title}
Текст: ${item.description}

Ответь СТРОГО валидным JSON, без markdown-обёртки и пояснений вокруг, в формате:
{"summary": "...", "details": ["..."]}

Требования:
- "summary" — одна короткая фраза, до 100 символов, тизер для короткой ленты на сайте.
- "details" — разбор для клиентов на 5-6 предложений по смыслу.
  - Если изменение описывает последовательность действий / пошаговый порядок — раздели на отдельные пункты массива, каждый пункт — один шаг, коротко и по делу.
  - Если это просто описание изменения без чёткой последовательности — верни ОДИН элемент массива: связный абзац на 5-6 предложений.
- Пиши так, как будто объясняешь клиенту по телефону, а не цитируешь закон. Никакой воды и канцелярита.`;

  const response = await anthropic.messages.create({
    model: MODEL,
    max_tokens: 1024,
    messages: [{ role: 'user', content: prompt }],
  });

  const text = response.content
    .filter((block) => block.type === 'text')
    .map((block) => block.text)
    .join('')
    .trim();

  const jsonText = text.replace(/^```json\s*/i, '').replace(/```\s*$/, '');
  const parsed = JSON.parse(jsonText);

  if (!parsed.summary || !Array.isArray(parsed.details) || parsed.details.length === 0) {
    throw new Error(`Unexpected Claude response shape: ${text}`);
  }

  return parsed;
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
 * Автоматически обновляется еженедельно через
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

async function main() {
  const parser = new Parser();
  const feed = await parser.parseURL(RSS_URL);

  const sheets = await getSheetsClient();
  const existingRows = await readRows(sheets);
  const existingLinks = new Set(existingRows.map((r) => r[5]).filter(Boolean));
  const existingTitles = new Set(existingRows.map((r) => r[1]).filter(Boolean));

  const candidates = feed.items.filter(
    (item) => isRelevant(item) && !existingLinks.has(item.link) && !existingTitles.has(item.title)
  );

  const toProcess = candidates.slice(0, MAX_NEW_PER_RUN);
  console.log(`Feed items: ${feed.items.length}. Relevant & new: ${candidates.length}. Processing: ${toProcess.length}.`);

  if (toProcess.length > 0) {
    const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
    const newRows = [];

    for (const item of toProcess) {
      const date = new Date(item.pubDate || item.isoDate || Date.now()).toLocaleDateString('ru-RU');
      const { summary, details } = await humanize(anthropic, {
        title: item.title,
        description: item.contentSnippet || item.content || item.title,
      });
      newRows.push([date, item.title, summary, JSON.stringify(details), 'КонсультантПлюс', item.link || '']);
    }

    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: SHEET_RANGE,
      valueInputOption: 'RAW',
      insertDataOption: 'INSERT_ROWS',
      requestBody: { values: newRows },
    });

    console.log(`Appended ${newRows.length} new row(s) to the sheet.`);
  } else {
    console.log('No new relevant law updates this run.');
  }

  const finalRows = await readRows(sheets);
  const parsedRows = finalRows
    .map((r) => ({
      date: r[0],
      t: r[1],
      summary: r[2],
      details: safeParseJSON(r[3]) || [r[3] || ''],
      src: r[4],
      link: r[5],
    }))
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
