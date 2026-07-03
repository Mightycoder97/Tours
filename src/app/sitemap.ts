import { MetadataRoute } from 'next';
import { createClient } from '@/lib/supabase/server';

const BASE_URL = 'https://machupicchutravel.com';
const LOCALES = ['es', 'en'] as const;

function buildAlternates(path: string) {
  return Object.fromEntries(
    LOCALES.map(locale => [locale, `${BASE_URL}/${locale}${path}`])
  );
}

function buildLocalizedUrls(
  path: string,
  options: {
    lastModified?: Date;
    changeFrequency?: MetadataRoute.Sitemap[number]['changeFrequency'];
    priority?: number;
  } = {}
): MetadataRoute.Sitemap {
  return LOCALES.map(locale => ({
    url: `${BASE_URL}/${locale}${path}`,
    lastModified: options.lastModified ?? new Date(),
    changeFrequency: options.changeFrequency ?? 'monthly',
    priority: options.priority ?? 0.5,
    alternates: { languages: buildAlternates(path) },
  }));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = await createClient();
  
  // Fetch all active tours
  const { data: tours } = await supabase
    .from('tours')
    .select('slug, updated_at')
    .eq('is_active', true);

  const tourUrls: MetadataRoute.Sitemap = (tours || []).flatMap((tour) =>
    LOCALES.map(locale => ({
      url: `${BASE_URL}/${locale}/tours/${tour.slug}`,
      lastModified: new Date(tour.updated_at || Date.now()),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
      alternates: {
        languages: Object.fromEntries(
          LOCALES.map(l => [l, `${BASE_URL}/${l}/tours/${tour.slug}`])
        ),
      },
    }))
  );

  return [
    ...buildLocalizedUrls('', { changeFrequency: 'daily', priority: 1 }),
    ...buildLocalizedUrls('/tours', { changeFrequency: 'daily', priority: 0.9 }),
    ...buildLocalizedUrls('/nosotros', { changeFrequency: 'monthly', priority: 0.6 }),
    ...buildLocalizedUrls('/blog', { changeFrequency: 'weekly', priority: 0.7 }),
    ...buildLocalizedUrls('/contacto', { changeFrequency: 'monthly', priority: 0.6 }),
    ...buildLocalizedUrls('/experiencias', { changeFrequency: 'monthly', priority: 0.6 }),
    ...buildLocalizedUrls('/rutas', { changeFrequency: 'monthly', priority: 0.5 }),
    ...buildLocalizedUrls('/faq', { changeFrequency: 'monthly', priority: 0.4 }),
    ...buildLocalizedUrls('/condiciones', { changeFrequency: 'yearly', priority: 0.3 }),
    ...buildLocalizedUrls('/politicas', { changeFrequency: 'yearly', priority: 0.3 }),
    ...tourUrls,
  ];
}
