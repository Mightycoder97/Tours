import { Link } from '@/i18n/navigation';
import { ArrowRight } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { getTranslations } from 'next-intl/server';
import FeaturedToursTabs from './FeaturedToursTabs';

export default async function FeaturedTours() {
  const t = await getTranslations('home.featured');
  
  // Fetch all active tours to categorize them in client-side tabs
  const { data: tours } = await supabase
    .from('tours')
    .select('id, slug, title, description, image_url, price_adult, tag')
    .eq('is_active', true);
    
  const displayTours = tours || [];

  const heroTitle = t('defaultTitle');
  const heroSubtitle = t('defaultSubtitle');

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-serif text-primary-dark mb-4">
              {heroTitle}
            </h2>
            <p className="text-text-light text-lg font-light">
              {heroSubtitle}
            </p>
          </div>
          <Link 
            href="/tours" 
            className="mt-6 md:mt-0 group flex items-center text-primary-dark font-semibold hover:text-primary transition-colors"
          >
            {t('viewAllTours')}
            <span className="ml-2 w-8 h-8 rounded-full border border-primary-dark flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
              <ArrowRight className="w-4 h-4" />
            </span>
          </Link>
        </div>

        <FeaturedToursTabs tours={displayTours} />
      </div>
    </section>
  );
}
