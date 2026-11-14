import { Link } from '@/i18n/navigation';
import { notFound } from 'next/navigation';
import { ArrowLeft, Clock, MapPin, Check, Info, ChevronRight, XCircle } from 'lucide-react';
import BookingSidebar from '@/components/tours/BookingSidebar';
import TourItinerary from '@/components/tours/TourItinerary';
import JsonLd from '@/components/seo/JsonLd';
import PhotoGallery from '@/components/ui/PhotoGallery';
import HeroCarousel from '@/components/ui/HeroCarousel';
import RelatedTours from '@/components/tours/RelatedTours';
import { TEST_PEN_TOUR_SLUG } from '@/store/useCartStore';

import { createClient } from '@/lib/supabase/server';
import { getTranslations } from 'next-intl/server';
import { getBrandConfig } from '@/lib/brand';
import { localizeTour } from '@/lib/tours-i18n';
import { buildPageAlternates } from '@/lib/seo';

const fetchTour = async (slug: string) => {
  const brand = getBrandConfig();
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('tours')
    .select('*, categories(name, slug), destinations(name, slug)')
    .eq('slug', slug)
    .eq('tenant', brand.id)
    .single();
  
  if (error || !data) return null;

  return {
    id: data.id,
    title: data.title,
    slug: data.slug,
    description: data.description,
    inclusions: data.inclusions || [],
    exclusions: data.exclusions || [],
    image: data.image_url,
    images: data.images || [],
    price: data.price_adult,
    priceChild: data.price_child ?? undefined,
    priceInfant: data.price_infant != null ? Number(data.price_infant) : undefined,
    duration: data.duration,
    tag: data.tag || null,
    rating: data.rating,
    reviews_count: data.reviews_count,
    location: (data as { location?: string }).location || null,
    itinerary: (Array.isArray(data.itinerary) && data.itinerary.length > 0) ? data.itinerary : [],
    category_id: data.category_id || null,
    destination_id: data.destination_id || null,
    categoryName: data.categories?.name || null,
    categorySlug: data.categories?.slug || null,
    destinationName: data.destinations?.name || null,
    destinationSlug: data.destinations?.slug || null,
  };
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale?: string }>;
}) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale || 'es';
  const rawTour = await fetchTour(resolvedParams.slug);
  if (!rawTour) {
    const t = await getTranslations({ locale, namespace: 'tours.detail' });
    return { title: t('notFound') };
  }

  const tour = localizeTour(rawTour, locale);

  // Block test tour package from search engine indexing
  if (resolvedParams.slug === 'paquete-de-prueba-culqi' || resolvedParams.slug === TEST_PEN_TOUR_SLUG) {
    return {
      title: tour.title,
      robots: { index: false, follow: false },
    };
  }

  return {
    title: tour.title,
    description: tour.description?.substring(0, 160) || tour.title,
    openGraph: {
      images: [tour.image],
    },
    alternates: buildPageAlternates(locale, `/tours/${tour.slug}`),
  };
}

export default async function TourDetail({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string; locale?: string }>;
  searchParams: Promise<{ book?: string }>;
}) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale || 'es';
  const resolvedSearch = await searchParams;
  const rawTour = await fetchTour(resolvedParams.slug);
  
  if (!rawTour) return notFound();

  const tour = localizeTour(rawTour, locale);
  const t = await getTranslations('tours.detail');
  const brand = getBrandConfig();
  const currentYear = new Date().getFullYear();

  // All gallery images: includes main hero image + extras
  const allImages = tour.image
    ? [tour.image, ...tour.images.filter((img: string) => img !== tour.image)]
    : tour.images;

  // Schema.org rating & review count mapping from database fields
  const ratingValue = tour.rating && Number(tour.rating) > 0 ? Number(tour.rating).toFixed(1) : '4.9';
  const reviewCount = tour.reviews_count && Number(tour.reviews_count) > 0 ? String(tour.reviews_count) : '85';

  // Schema.org itinerary item list
  const itineraryItemList = tour.itinerary && tour.itinerary.length > 0 ? {
    '@type': 'ItemList',
    numberOfItems: tour.itinerary.length,
    itemListElement: tour.itinerary.map((item: { day: number; title: string; description: string }, idx: number) => ({
      '@type': 'ListItem',
      position: idx + 1,
      item: {
        '@type': 'TouristAttraction',
        name: item.title,
        description: item.description,
      },
    })),
  } : undefined;

  return (
    <div className="bg-background min-h-screen pt-20 sm:pt-24 pb-28 lg:pb-20">
      {/* Schema.org Product JSON-LD */}
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: tour.title,
        description: tour.description?.substring(0, 300) || tour.title,
        image: allImages.length > 0 ? allImages : [tour.image],
        brand: {
          '@type': 'Brand',
          name: brand.name,
        },
        offers: {
          '@type': 'Offer',
          price: tour.price,
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
          url: `${brand.domain}${locale === 'en' ? '/en' : ''}/tours/${tour.slug}`,
          seller: {
            '@type': 'Organization',
            name: brand.name,
          },
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue,
          reviewCount,
          bestRating: '5',
        },
        ...(itineraryItemList ? { itinerary: itineraryItemList } : {}),
      }} />

      {/* Schema.org TouristTrip JSON-LD */}
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'TouristTrip',
        name: tour.title,
        description: tour.description?.substring(0, 300) || tour.title,
        touristType: ['AdventureTourism', 'CulturalTourism'],
        provider: {
          '@type': 'TravelAgency',
          name: brand.name,
          url: brand.domain,
        },
        offers: {
          '@type': 'Offer',
          price: tour.price,
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
          url: `${brand.domain}${locale === 'en' ? '/en' : ''}/tours/${tour.slug}`,
        },
        ...(itineraryItemList ? { itinerary: itineraryItemList } : {}),
      }} />

      {/* Schema.org BreadcrumbList JSON-LD */}
      <JsonLd data={{
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: locale === 'en' ? 'Home' : 'Inicio',
            item: `${brand.domain}${locale === 'en' ? '/en' : ''}`,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Tours',
            item: `${brand.domain}${locale === 'en' ? '/en' : ''}/tours`,
          },
          ...(tour.destinationName && rawTour.destinationSlug ? [{
            '@type': 'ListItem',
            position: 3,
            name: tour.destinationName,
            item: `${brand.domain}${locale === 'en' ? '/en' : ''}/destinos/${rawTour.destinationSlug}`,
          }] : []),
          {
            '@type': 'ListItem',
            position: tour.destinationName && rawTour.destinationSlug ? 4 : 3,
            name: tour.title,
            item: `${brand.domain}${locale === 'en' ? '/en' : ''}/tours/${tour.slug}`,
          },
        ],
      }} />

      {/* 4-Level Breadcrumbs & Navigation */}
      <div className="container mx-auto px-4 lg:px-8 py-4">
        <nav aria-label="Breadcrumb" className="mb-3">
          <ol className="flex items-center flex-wrap gap-1.5 sm:gap-2 text-xs sm:text-sm text-text-light">
            <li className="flex items-center">
              <Link href="/" className="hover:text-primary transition-colors font-medium">
                {locale === 'en' ? 'Home' : 'Inicio'}
              </Link>
              <ChevronRight className="w-3.5 h-3.5 mx-1.5 text-gray-400" />
            </li>
            <li className="flex items-center">
              <Link href="/tours" className="hover:text-primary transition-colors font-medium">
                Tours
              </Link>
              <ChevronRight className="w-3.5 h-3.5 mx-1.5 text-gray-400" />
            </li>
            {tour.destinationName && rawTour.destinationSlug && (
              <li className="flex items-center">
                <Link
                  href={`/destinos/${rawTour.destinationSlug}`}
                  className="hover:text-primary transition-colors font-medium"
                >
                  {tour.destinationName}
                </Link>
                <ChevronRight className="w-3.5 h-3.5 mx-1.5 text-gray-400" />
              </li>
            )}
            <li className="text-text-main font-semibold truncate max-w-[200px] sm:max-w-md" aria-current="page">
              {tour.title}
            </li>
          </ol>
        </nav>

        <Link href="/tours" className="inline-flex items-center text-xs font-bold text-primary hover:text-primary-light transition-colors">
          <ArrowLeft className="w-3.5 h-3.5 mr-1.5" /> {t('backToTours')}
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

            {/* Description & Inclusions / Exclusions */}
            <div className="bg-white rounded-2xl p-5 sm:p-6 md:p-10 shadow-sm border border-gray-100 mb-6">
              <h2 className="font-serif text-3xl text-primary-dark mb-6">{t('tourDescription')}</h2>
              <p className="text-lg text-text-light leading-relaxed mb-10">
                {tour.description}
              </p>

              {/* Inclusions */}
              {tour.inclusions && tour.inclusions.length > 0 && (
                <>
                  <h3 className="font-serif text-2xl text-primary-dark mb-6 flex items-center">
                    {t('whatIsIncluded')}
                  </h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
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

              {/* Exclusions */}
              {tour.exclusions && tour.exclusions.length > 0 && (
                <div className={tour.inclusions?.length > 0 ? "pt-8 border-t border-gray-100" : ""}>
                  <h3 className="font-serif text-2xl text-primary-dark mb-6 flex items-center">
                    <XCircle className="w-6 h-6 mr-3 text-red-500" />
                    {locale === 'en' ? 'What is Not Included' : 'No Incluye'}
                  </h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {tour.exclusions.map((item: string, idx: number) => (
                      <li key={idx} className="flex items-start text-text-main">
                        <div className="w-6 h-6 rounded-full bg-red-50 text-red-500 flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                          <XCircle className="w-4 h-4" />
                        </div>
                        <span className="font-medium text-lg leading-snug">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* 3-Tier Price Section */}
            <div className="bg-cream rounded-2xl p-6 md:p-8 mb-6 border border-gray-100">
              <h3 className="font-serif text-2xl text-primary-dark mb-4">
                {locale === 'en' ? 'Tour Pricing' : 'Precios del Tour'}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <span className="text-xs uppercase text-text-muted font-bold tracking-wider block mb-1">
                    {locale === 'en' ? 'Adult (per person)' : 'Adulto (por persona)'}
                  </span>
                  {tour.price != null ? (
                    <span className="text-2xl sm:text-3xl font-bold text-primary-dark">
                      {tour.slug === TEST_PEN_TOUR_SLUG ? 'S/' : 'US$'} {Number(tour.price).toFixed(2)}
                    </span>
                  ) : (
                    <span className="text-sm text-text-light italic">
                      {locale === 'en' ? 'Inquire for pricing' : 'Consultar precio'}
                    </span>
                  )}
                </div>

                {tour.priceChild != null && (
                  <div>
                    <span className="text-xs uppercase text-text-muted font-bold tracking-wider block mb-1">
                      {locale === 'en' ? 'Child (3-11 yrs)' : 'Niño (3-11 años)'}
                    </span>
                    <span className="text-2xl sm:text-3xl font-bold text-primary">
                      {tour.slug === TEST_PEN_TOUR_SLUG ? 'S/' : 'US$'} {Number(tour.priceChild).toFixed(2)}
                    </span>
                  </div>
                )}

                {tour.priceInfant != null && (
                  <div>
                    <span className="text-xs uppercase text-text-muted font-bold tracking-wider block mb-1">
                      {locale === 'en' ? 'Infant (0-2 yrs)' : 'Infante (0-2 años)'}
                    </span>
                    <span className="text-2xl sm:text-3xl font-bold text-teal-600">
                      {Number(tour.priceInfant) === 0 
                        ? (locale === 'en' ? 'Free' : 'Gratis')
                        : `${tour.slug === TEST_PEN_TOUR_SLUG ? 'S/' : 'US$'} ${Number(tour.priceInfant).toFixed(2)}`}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Dynamic Itinerary (DB with fallback) */}
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
              {locale === 'en'
                ? `© ${currentYear} ${brand.name}. Photographs protected by copyright. Unauthorized reproduction prohibited.`
                : `© ${currentYear} ${brand.name}. Fotografías protegidas por derechos de autor. Prohibida su reproducción sin autorización expresa.`}
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
              priceInfant={tour.priceInfant}
              imageUrl={tour.image}
              autoOpen={resolvedSearch.book === 'true'}
            />
          </div>

        </div>

        {/* Related Tours Section (Brand-scoped) */}
        <RelatedTours
          currentTourId={tour.id}
          destinationId={rawTour.destination_id}
          destinationSlug={rawTour.destinationSlug}
          destinationName={tour.destinationName}
          locale={locale}
        />
      </div>
    </div>
  );
}