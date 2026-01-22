import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';
import en from '@repo/i18n/locales/en.json';
import es from '@repo/i18n/locales/es.json';

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: locale === 'en' ? en : es,
    timeZone: 'UTC'
  };
});
