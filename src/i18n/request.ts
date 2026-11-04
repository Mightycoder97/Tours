import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';
import { applyBrandToMessages, getBrandConfig } from '@/lib/brand';

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  // Validate that the incoming locale is supported
  if (!locale || !routing.locales.includes(locale as 'es' | 'en')) {
    locale = routing.defaultLocale;
  }

  const rawMessages = (await import(`../../messages/${locale}.json`)).default;
  const brand = getBrandConfig();

  return {
    locale,
    messages: applyBrandToMessages(rawMessages, brand),
  };
});

