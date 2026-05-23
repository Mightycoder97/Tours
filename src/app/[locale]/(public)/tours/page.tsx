import ToursPageClient from '@/components/tours/ToursPageClient';
import { supabase } from '@/lib/supabase';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata() {
  const t = await getTranslations('meta.toursPage');
  return {
    title: t('title'),
    description: t('description'),
  };
}

export const revalidate = 60;

interface ToursPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ToursPage({ searchParams }: ToursPageProps) {
  const params = await searchParams;
  const { data: tours } = await supabase.from('tours').select('*, categories(name), destinations(name)').eq('is_active', true).order('created_at', { ascending: true });
  const { data: categories } = await supabase.from('categories').select('*').order('name');
  const { data: destinations } = await supabase.from('destinations').select('*').order('name');
  
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
        tours={tours || []} 
        categories={categories || []}
        destinations={destinations || []}
        initialSearch={typeof params.q === 'string' ? params.q : ''}
      />
    </div>
  );
}
