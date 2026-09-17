// Yandex Cloud Function — приём заявок с сайта ПлесКад, отправка в Telegram.
// Паттерн скопирован с проверенной рабочей функции (https.request + обычные
// переменные окружения, без Lockbox, Node.js 22).

const https = require('https');

function escapeHtml(text) {
  if (!text) return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function getObjectTypeText(objectTypeValue) {
  const objectTypes = {
    land: 'Земельный участок',
    house: 'Жилой дом',
    apartment: 'Квартира',
    commercial: 'Коммерческая недвижимость',
    garage: 'Гараж',
    other: 'Другое'
  };
  return objectTypes[objectTypeValue] || objectTypeValue;
}

function formatTelegramMessage(data) {
  let message = `🔔 <b>НОВАЯ ЗАЯВКА С САЙТА ПЛЕСКАД</b>\n\n`;

  message += `<b>Услуга:</b> ${escapeHtml(data.service)}\n`;
  if (data.serviceType) {
    message += `<b>Вид работ:</b> ${escapeHtml(data.serviceType)}\n`;
  }
  message += `<b>Тип объекта:</b> ${escapeHtml(getObjectTypeText(data.objectType))}\n`;
  message += `<b>Населённый пункт:</b> ${escapeHtml(data.city)}\n`;
  if (data.address) {
    message += `<b>Адрес/кад. номер:</b> ${escapeHtml(data.address)}\n`;
  }
  if (data.additionalInfo) {
    message += `\n<b>Дополнительно:</b> ${escapeHtml(data.additionalInfo)}\n`;
  }

  message += `\n👤 <b>Контакты:</b>\n`;
  message += `   ФИО: ${escapeHtml(data.fullName)}\n`;
  message += `   📱 Телефон: ${escapeHtml(data.phone)}\n`;
  if (data.email) {
    message += `   ✉️ Email: ${escapeHtml(data.email)}\n`;
  }

  message += `\n<i>Дата заявки: ${new Date().toLocaleString('ru-RU')}</i>`;

  return message;
}

function sendToTelegram(botToken, chatId, message) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({
      chat_id: Number(chatId),
      text: message,
      parse_mode: 'HTML'
    });

    // Для UTF-8 нужно считать байты, а не символы
    const dataBuffer = Buffer.from(data, 'utf8');

    const options = {
      hostname: 'api.telegram.org',
      port: 443,
      path: `/bot${botToken}/sendMessage`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Content-Length': dataBuffer.length
      }
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => (body += chunk));
      res.on('end', () => {
        if (res.statusCode === 200) {
          resolve(JSON.parse(body));
        } else {
          reject(new Error(`Telegram API error: ${res.statusCode} ${body}`));
        }
      });
    });

    req.on('error', reject);
    req.write(dataBuffer);
    req.end();
  });
}

module.exports.handler = async function (event, context) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With, Accept',
    'Access-Control-Max-Age': '86400',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  try {
    const body = JSON.parse(event.body);

    // Обычные переменные окружения — Редактировать → Переменные окружения.
    // НЕ через Yandex Lockbox.
    const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ success: false, error: 'Telegram configuration missing' })
      };
    }

    const message = formatTelegramMessage(body);
    await sendToTelegram(TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID, message);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true, message: 'Заявка успешно отправлена' })
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ success: false, error: error.message })
    };
  }
};
