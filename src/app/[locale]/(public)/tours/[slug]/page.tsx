import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ArrowLeft, Clock, MapPin, Check, Info } from 'lucide-react';
import BookingSidebar from '@/components/tours/BookingSidebar';
import GallerySection from '@/components/tours/GallerySection';
import TourItinerary from '@/components/tours/TourItinerary';
import JsonLd from '@/components/seo/JsonLd';

import { createClient } from '@/lib/supabase/server';
import { getTranslations } from 'next-intl/server';

const fetchTour = async (slug: string) => {
  const supabase = await createClient();
  const { data, error } = await supabase.from('tours').select('*').eq('slug', slug).single();
  
  if (error || !data) return null;

  return {
    id: data.id,
    title: data.title,
    slug: data.slug,
    description: data.description,
    inclusions: data.inclusions || [],
    image: data.image_url,
    images: data.images || [],
    price: data.price_adult,
    priceChild: data.price_child ?? undefined,
    duration: data.duration,
    itinerary: data.itinerary || [],
  };
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const tour = await fetchTour(resolvedParams.slug);
  if (!tour) {
    const t = await getTranslations('tours.detail');
    return { title: t('notFound') };
  }
  
  return {
    title: `${tour.title} | Machu Picchu Travel`,
    description: tour.description.substring(0, 160),
    openGraph: {
      images: [tour.image],
    },
    alternates: {
      canonical: `https://machupicchutravel.com/tours/${tour.slug}`,
      languages: {
        'es': `https://machupicchutravel.com/es/tours/${tour.slug}`,
        'en': `https://machupicchutravel.com/en/tours/${tour.slug}`,
        'x-default': `https://machupicchutravel.com/es/tours/${tour.slug}`,
      },
    },
  };
}

export default async function TourDetail({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ book?: string }>;
}) {
  const resolvedParams = await params;
  const resolvedSearch = await searchParams;
  const tour = await fetchTour(resolvedParams.slug);
  
  if (!tour) return notFound();

  const t = await getTranslations('tours.detail');

  return (
    <div className="bg-background min-h-screen pt-20 sm:pt-24 pb-28 lg:pb-20">
      {/* Schema.org Product JSON-LD */}
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: tour.title,
        description: tour.description?.substring(0, 300) || tour.title,
        image: [tour.image, ...tour.images],
        brand: {
          '@type': 'Brand',
          name: 'Machu Picchu Travel Adventures',
        },
        offers: {
          '@type': 'Offer',
          price: tour.price,
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
          url: `https://machupicchutravel.com/tours/${tour.slug}`,
          seller: {
            '@type': 'Organization',
            name: 'Machu Picchu Travel Adventures',
          },
        },
      }} />

      {/* Breadcrumb & Navigation */}
      <div className="container mx-auto px-4 lg:px-8 py-4">
        <Link href="/tours" className="inline-flex items-center text-sm font-bold text-primary hover:text-primary-light transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> {t('backToTours')}
        </Link>
      </div>

      {/* Main Container */}
      <div className="container mx-auto px-4 lg:px-8">
        
        {/* Header Content */}
        <div className="max-w-3xl mb-8">
          <div className="flex items-center space-x-4 mb-4 text-sm font-bold text-text-light uppercase tracking-wider">
            <span className="flex items-center"><MapPin className="w-4 h-4 mr-1" /> {t('location')}</span>
            <span className="flex items-center"><Clock className="w-4 h-4 mr-1 text-primary-light" /> {tour.duration}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-primary-dark mb-4 sm:mb-6 leading-tight">
            {tour.title}
          </h1>
        </div>

        {/* Dynamic Layout Grid */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 relative">
          
          {/* Main Content Column */}
          <div className="w-full lg:w-2/3">
            
            {/* Main Picture */}
            <div className="rounded-3xl overflow-hidden shadow-sm aspect-video w-full mb-8 relative">
              <Image src={tour.image} fill sizes="(max-width: 768px) 100vw, 66vw" className="object-cover" alt={tour.title} priority />
            </div>

            {/* Gallery Section (thumbnails + modal) */}
            <GallerySection images={tour.images} mainImage={tour.image} altText={tour.title} />

            {/* Content Tabs mock (Descripción, Itinerario) */}
            <div className="bg-white rounded-2xl p-5 sm:p-6 md:p-10 shadow-sm border border-gray-100">
              <h2 className="font-serif text-3xl text-primary-dark mb-6">{t('tourDescription')}</h2>
              <p className="text-lg text-text-light leading-relaxed mb-10">
                {tour.description}
              </p>

              <h3 className="font-serif text-2xl text-primary-dark mb-6 flex items-center">
                 {t('whatIsIncluded')}
              </h3>
              
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 {tour.inclusions.map((item: string, idx: number) => (
                    <li key={idx} className="flex items-start text-text-main">
                      <div className="w-6 h-6 rounded-full bg-green-100 text-success flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                        <Check className="w-4 h-4" />
                      </div>
                      <span className="font-medium text-lg leading-snug">{item}</span>
                    </li>
                 ))}
              </ul>
            </div>

            {/* Itinerary */}
            <TourItinerary items={tour.itinerary} />
            
            {/* Additional Info / Policies */}
            <div className="mt-8 bg-surface rounded-2xl p-6 md:p-10 text-text-light">
               <h3 className="font-bold text-text-main uppercase tracking-wider mb-4 flex items-center">
                  <Info className="w-5 h-5 mr-2 text-primary" /> {t('importantInfo')}
               </h3>
               <p className="text-sm">
                 {t('importantInfoText')}
               </p>
            </div>

          </div>

          {/* Sticky Booking Sidebar */}
          <div className="w-full lg:w-1/3">
             <BookingSidebar 
               tourId={tour.id}
               tourName={tour.title}
               tourSlug={tour.slug}
               priceAdult={tour.price}
               priceChild={tour.priceChild}
               imageUrl={tour.image}
               autoOpen={resolvedSearch.book === 'true'}
             />
          </div>

        </div>
      </div>
    </div>
  );
}
