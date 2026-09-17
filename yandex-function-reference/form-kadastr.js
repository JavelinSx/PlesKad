// Yandex Cloud Function — приём заявок с сайта ПлесКад, отправка в VK
// (вместо Telegram — ПДн не покидают Россию, и нет проблем с блокировкой сети).
// Паттерн https.request + обычные переменные окружения (без Lockbox), Node.js 18/22.

const https = require('https');

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

function formatMessage(data) {
  let message = `🔔 НОВАЯ ЗАЯВКА С САЙТА ПЛЕСКАД\n\n`;

  message += `Услуга: ${data.service}\n`;
  if (data.serviceType) {
    message += `Вид работ: ${data.serviceType}\n`;
  }
  message += `Тип объекта: ${getObjectTypeText(data.objectType)}\n`;
  message += `Населённый пункт: ${data.city}\n`;
  if (data.address) {
    message += `Адрес/кад. номер: ${data.address}\n`;
  }
  if (data.additionalInfo) {
    message += `\nДополнительно: ${data.additionalInfo}\n`;
  }

  message += `\nКонтакты:\n`;
  message += `ФИО: ${data.fullName}\n`;
  message += `Телефон: ${data.phone}\n`;
  if (data.email) {
    message += `Email: ${data.email}\n`;
  }

  message += `\nДата заявки: ${new Date().toLocaleString('ru-RU')}`;

  return message;
}

function sendToVk(communityToken, userId, message) {
  return new Promise((resolve, reject) => {
    const params = new URLSearchParams({
      user_id: String(userId),
      message,
      random_id: String(Date.now()),
      access_token: communityToken,
      v: '5.199'
    });

    const payload = params.toString();

    const options = {
      hostname: 'api.vk.ru',
      port: 443,
      path: '/method/messages.send',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(payload)
      },
      timeout: 8000
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => (body += chunk));
      res.on('end', () => {
        try {
          const data = JSON.parse(body);
          if (data.error) {
            reject(new Error(`VK API error: ${JSON.stringify(data.error)}`));
          } else {
            resolve(data);
          }
        } catch (e) {
          reject(new Error(`Bad response from VK: ${body}`));
        }
      });
    });

    req.on('timeout', () => {
      req.destroy();
      reject(new Error('VK request timed out'));
    });
    req.on('error', reject);

    req.write(payload);
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

    const VK_COMMUNITY_TOKEN = process.env.VK_COMMUNITY_TOKEN;
    const VK_USER_ID = process.env.VK_USER_ID;

    if (!VK_COMMUNITY_TOKEN || !VK_USER_ID) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ success: false, error: 'VK configuration missing' })
      };
    }

    const message = formatMessage(body);
    await sendToVk(VK_COMMUNITY_TOKEN, VK_USER_ID, message);

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
