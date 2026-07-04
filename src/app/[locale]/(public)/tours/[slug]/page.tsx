import { Link } from '@/i18n/navigation';
import { notFound } from 'next/navigation';
import { ArrowLeft, Clock, MapPin, Check, Info } from 'lucide-react';
import BookingSidebar from '@/components/tours/BookingSidebar';
import TourItinerary from '@/components/tours/TourItinerary';
import JsonLd from '@/components/seo/JsonLd';
import PhotoGallery from '@/components/ui/PhotoGallery';
import HeroCarousel from '@/components/ui/HeroCarousel';

import { createClient } from '@/lib/supabase/server';
import { getTranslations } from 'next-intl/server';

const fetchTour = async (slug: string) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('tours')
    .select('*, categories(name), destinations(name)')
    .eq('slug', slug)
    .single();
  
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
    location: (data as { location?: string }).location || null,
    itinerary: (data as { itinerary?: { day: number; title: string; description: string }[] }).itinerary || [],
    categoryName: data.categories?.name || null,
    destinationName: data.destinations?.name || null,
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
    description: tour.description?.substring(0, 160) || tour.title,
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
  const currentYear = new Date().getFullYear();

  // All gallery images: includes main hero image + extras
  const allImages = tour.image
    ? [tour.image, ...tour.images.filter((img: string) => img !== tour.image)]
    : tour.images;

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
          <div className="flex items-center flex-wrap gap-x-4 gap-y-2 mb-4 text-sm font-bold text-text-light uppercase tracking-wider">
            {tour.location && (
              <span className="flex items-center">
                <MapPin className="w-4 h-4 mr-1 text-primary" /> {tour.location}
              </span>
            )}
            <span className="flex items-center">
              <Clock className="w-4 h-4 mr-1 text-primary-light" /> {tour.duration}
            </span>
            {tour.categoryName && (
              <span className="bg-primary/10 text-primary px-3 py-0.5 rounded-full text-xs normal-case font-semibold">
                {tour.categoryName}
              </span>
            )}
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-primary-dark mb-4 sm:mb-6 leading-tight">
            {tour.title}
          </h1>
        </div>

        {/* Dynamic Layout Grid */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 relative">
          
          {/* Main Content Column */}
          <div className="w-full lg:w-2/3">
            
            {/* Hero Carousel — auto-advances through all tour images */}
            {allImages.length > 0 && (
              <HeroCarousel images={allImages} altText={tour.title} />
            )}

            {/* Photo Gallery — thumbnail grid with lightbox (shown when >1 image) */}
            {allImages.length > 1 && (
              <PhotoGallery images={allImages} altText={tour.title} />
            )}

            {/* Description & Inclusions */}
            <div className="bg-white rounded-2xl p-5 sm:p-6 md:p-10 shadow-sm border border-gray-100 mb-6">
              <h2 className="font-serif text-3xl text-primary-dark mb-6">{t('tourDescription')}</h2>
              <p className="text-lg text-text-light leading-relaxed mb-10">
                {tour.description}
              </p>

              {tour.inclusions.length > 0 && (
                <>
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
                </>
              )}
            </div>

            {/* Price section */}
            <div className="bg-cream rounded-2xl p-6 md:p-8 mb-6 border border-gray-100">
              <h3 className="font-serif text-2xl text-primary-dark mb-4">Precio del Tour</h3>
              <div className="flex items-end gap-2">
                <div>
                  <span className="text-xs uppercase text-text-muted font-bold tracking-wider block mb-1">
                    Desde (por persona adulta)
                  </span>
                  {tour.price != null ? (
                    <span className="text-3xl font-bold text-primary-dark">
                      US$ {Number(tour.price).toFixed(2)}
                    </span>
                  ) : (
                    <span className="text-lg text-text-light italic">Consultar precio</span>
                  )}
                </div>
              </div>
            </div>

            {/* Itinerary */}
            <TourItinerary items={tour.itinerary} />
            
            {/* Additional Info */}
            <div className="mt-8 bg-surface rounded-2xl p-6 md:p-10 text-text-light">
              <h3 className="font-bold text-text-main uppercase tracking-wider mb-4 flex items-center">
                <Info className="w-5 h-5 mr-2 text-primary" /> {t('importantInfo')}
              </h3>
              <p className="text-sm">
                {t('importantInfoText')}
              </p>
            </div>

            {/* Copyright footer */}
            <div className="mt-8 text-center text-xs text-text-muted font-sans py-4 border-t border-gray-100">
              © {currentYear} Machu Picchu Travel Adventures. Fotografías protegidas por derechos de autor.
              Prohibida su reproducción sin autorización expresa.
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
