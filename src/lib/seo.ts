import type { Metadata } from 'next';
import { getBrandConfig } from '@/lib/brand';

/**
 * Builds canonical URL and reciprocal hreflang alternates.
 * Respects next-intl localePrefix: 'as-needed' routing:
 * - Spanish default ('es'): no prefix -> ${domain}${path}
 * - English ('en'): /en prefix -> ${domain}/en${path}
 * - x-default: points to default Spanish URL
 */
export function buildPageAlternates(
  locale: string,
  path: string = '',
  localizedPaths?: { es?: string; en?: string }
): NonNullable<Metadata['alternates']> {
  const brand = getBrandConfig();
  const domain = brand.domain.replace(/\/+$/, '');

  const normalize = (p: string) => {
    let clean = p.trim();
    if (clean && !clean.startsWith('/')) clean = `/${clean}`;
    if (clean === '/') return '';
    if (clean.endsWith('/')) return clean.slice(0, -1);
    return clean;
  };

  const esPath = localizedPaths?.es !== undefined ? normalize(localizedPaths.es) : normalize(path);
  const enPath = localizedPaths?.en !== undefined ? normalize(localizedPaths.en) : normalize(path);

  const esUrl = esPath ? `${domain}${esPath}` : domain;
  const enUrl = `${domain}/en${enPath}`;

  const canonical = locale === 'en' ? enUrl : esUrl;

  return {
    canonical,
    languages: {
      es: esUrl,
      en: enUrl,
      'x-default': esUrl,
    },
  };
}
