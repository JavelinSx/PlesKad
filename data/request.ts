export interface ObjectTypeOption {
  text: string;
  value: string;
}

export const objectTypes: ObjectTypeOption[] = [
  { text: 'Земельный участок', value: 'land' },
  { text: 'Жилой дом', value: 'house' },
  { text: 'Квартира', value: 'apartment' },
  { text: 'Гараж', value: 'garage' },
  { text: 'Коммерческая недвижимость', value: 'commercial' },
  { text: 'Другое', value: 'other' },
];

export const cityList: string[] = ['Плесецк', 'Савинский', 'Североонежск', 'Конёво', 'Обозерский', 'Другое'];

export const contactMethods: ObjectTypeOption[] = [
  { text: 'Телефон', value: 'phone' },
  { text: 'Email', value: 'email' },
  { text: 'Telegram', value: 'telegram' },
];

export const callTimeOptions: ObjectTypeOption[] = [
  { text: 'В любое рабочее время', value: 'any' },
  { text: 'Утром 9:00–12:00', value: 'morning' },
  { text: 'Днём 12:00–15:00', value: 'noon' },
  { text: 'Вечером 15:00–17:00', value: 'evening' },
];

/** POST-эндпоинт рабочей связки Yandex Cloud Function → Telegram-бот. Не менять URL/форму payload. */
export const REQUEST_ENDPOINT = 'https://functions.yandexcloud.net/d4eqnehoehoieueo9ih9';

export interface RequestPayload {
  service: string;
  serviceType: string;
  objectType: string;
  address: string;
  city: string;
  additionalInfo: string;
  fullName: string;
  phone: string;
  email: string;
  contactMethod: string;
}

export const submitRequest = async (body: RequestPayload): Promise<Response> => {
  return await fetch(REQUEST_ENDPOINT, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
};
