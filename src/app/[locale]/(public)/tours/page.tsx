import ToursPageClient from '@/components/tours/ToursPageClient';
import { createClient } from '@/lib/supabase/server';
import { getTranslations } from 'next-intl/server';
import { buildPageAlternates } from '@/lib/seo';
import { localizeTourList } from '@/lib/tours-i18n';
import { localizeCategoryName } from '@/data/categories-i18n';
import { localizeDestinationName } from '@/data/destinations-i18n';

export async function generateMetadata({
  params,
}: {
  params?: Promise<{ locale?: string }>;
}) {
  const resolvedParams = params ? await params : undefined;
  const locale = resolvedParams?.locale || 'es';
  const t = await getTranslations({ locale, namespace: 'meta.toursPage' });
  return {
    title: t('title'),
    description: t('description'),
    alternates: buildPageAlternates(locale, '/tours'),
  };
}

export const revalidate = 60;

interface ToursPageProps {
  params?: Promise<{ locale?: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ToursPage({ params, searchParams }: ToursPageProps) {
  const resolvedParams = params ? await params : undefined;
  const locale = resolvedParams?.locale || 'es';
  const resolvedSearchParams = await searchParams;

  const supabase = await createClient();
  const { data: rawTours } = await supabase
    .from('tours')
    .select('*, categories(name), destinations(name)')
    .eq('is_active', true)
    .order('created_at', { ascending: true });
  const { data: rawCategories } = await supabase.from('categories').select('*').order('name');
  const { data: rawDestinations } = await supabase.from('destinations').select('*').order('name');
  
  const localizedTours = localizeTourList(rawTours || [], locale);
  const localizedCategories = (rawCategories || []).map((cat) => ({
    ...cat,
    name: localizeCategoryName(cat.slug || cat.name, locale),
  }));
  const localizedDestinations = (rawDestinations || []).map((dest) => ({
    ...dest,
    name: localizeDestinationName(dest.slug || dest.name, locale),
  }));

  const t = await getTranslations('tours.listing');

  return (
    <div className="bg-gray-50 min-h-screen pb-20 pt-24 sm:pt-28">
      
      {/* Page Header */}
      <div className="bg-primary-dark text-white py-10 sm:py-16 mb-8 sm:mb-12">
        <div className="container mx-auto px-4 lg:px-8 text-center max-w-4xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif mb-3 sm:mb-4">{t('pageTitle')}</h1>
          <p className="text-sm sm:text-lg text-white/80 font-light px-4">
            {t('pageSubtitle')}
          </p>
        </div>
      </div>

      <ToursPageClient 
        tours={localizedTours} 
        categories={localizedCategories}
        destinations={localizedDestinations}
        initialSearch={typeof resolvedSearchParams.q === 'string' ? resolvedSearchParams.q : ''}
        initialDestino={typeof resolvedSearchParams.destino === 'string' ? resolvedSearchParams.destino : undefined}
      />
    </div>
  );
}
