import { MetadataRoute } from 'next';
import { createClient } from '@/lib/supabase/server';
import { getBrandConfig } from '@/lib/brand';

const LOCALES = ['es', 'en'] as const;

function getLocalizedUrl(domain: string, locale: 'es' | 'en', path: string): string {
  const cleanPath = path === '' || path === '/' ? '' : (path.startsWith('/') ? path : `/${path}`);
  if (locale === 'es') {
    return cleanPath ? `${domain}${cleanPath}` : domain;
  }
  return `${domain}/en${cleanPath}`;
}

function buildSitemapAlternates(domain: string, path: string) {
  return {
    es: getLocalizedUrl(domain, 'es', path),
    en: getLocalizedUrl(domain, 'en', path),
    'x-default': getLocalizedUrl(domain, 'es', path),
  };
}

function buildLocalizedUrls(
  domain: string,
  path: string,
  options: {
    lastModified?: Date;
    changeFrequency?: MetadataRoute.Sitemap[number]['changeFrequency'];
    priority?: number;
  } = {}
): MetadataRoute.Sitemap {
  return LOCALES.map(locale => ({
    url: getLocalizedUrl(domain, locale, path),
    lastModified: options.lastModified ?? new Date(),
    changeFrequency: options.changeFrequency ?? 'monthly',
    priority: options.priority ?? 0.5,
    alternates: { languages: buildSitemapAlternates(domain, path) },
  }));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const brand = getBrandConfig();
  const domain = brand.domain.replace(/\/+$/, '');
  const supabase = await createClient();

  // Fetch all active tours, explicitly excluding test tours
  const { data: tours } = await supabase
    .from('tours')
    .select('slug, updated_at')
    .eq('is_active', true)
    .neq('slug', 'paquete-de-prueba-culqi');

  const tourUrls: MetadataRoute.Sitemap = (tours || [])
    .filter(t => t.slug && t.slug !== 'paquete-de-prueba-culqi')
    .flatMap((tour) => {
      const tourPath = `/tours/${tour.slug}`;
      return LOCALES.map(locale => ({
        url: getLocalizedUrl(domain, locale, tourPath),
        lastModified: new Date(tour.updated_at || Date.now()),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
        alternates: {
          languages: buildSitemapAlternates(domain, tourPath),
        },
      }));
    });

  const destinationUrls: MetadataRoute.Sitemap = ['cusco', 'lima', 'arequipa', 'puno'].flatMap((destSlug) => {
    return buildLocalizedUrls(domain, `/destinos/${destSlug}`, { changeFrequency: 'weekly', priority: 0.85 });
  });

  return [
    ...buildLocalizedUrls(domain, '', { changeFrequency: 'daily', priority: 1 }),
    ...buildLocalizedUrls(domain, '/tours', { changeFrequency: 'daily', priority: 0.9 }),
    ...destinationUrls,
    ...buildLocalizedUrls(domain, '/nosotros', { changeFrequency: 'monthly', priority: 0.6 }),
    ...buildLocalizedUrls(domain, '/blog', { changeFrequency: 'weekly', priority: 0.7 }),
    ...buildLocalizedUrls(domain, '/contacto', { changeFrequency: 'monthly', priority: 0.6 }),
    ...buildLocalizedUrls(domain, '/experiencias', { changeFrequency: 'monthly', priority: 0.6 }),
    ...buildLocalizedUrls(domain, '/rutas', { changeFrequency: 'monthly', priority: 0.5 }),
    // /faq removed as it is not a standalone route
    ...buildLocalizedUrls(domain, '/condiciones', { changeFrequency: 'yearly', priority: 0.3 }),
    ...buildLocalizedUrls(domain, '/cambios-y-devoluciones', { changeFrequency: 'yearly', priority: 0.3 }),
    ...buildLocalizedUrls(domain, '/libro-de-reclamaciones', { changeFrequency: 'yearly', priority: 0.3 }),
    ...buildLocalizedUrls(domain, '/politicas', { changeFrequency: 'yearly', priority: 0.3 }),
    ...buildLocalizedUrls(domain, '/protegeme', { changeFrequency: 'yearly', priority: 0.3 }),
    ...tourUrls,
  ];
}
