import { getRequestConfig } from 'next-intl/server';

import { isInArray } from '@repo/core';
import en from '@repo/i18n/locales/en.json';
import es from '@repo/i18n/locales/es.json';

import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !isInArray(locale, routing.locales)) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: locale === 'en' ? en : es,
    timeZone: 'UTC'
  };
});
