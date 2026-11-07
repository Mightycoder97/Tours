import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { Link } from '@/i18n/navigation';
import { createClient } from '@/lib/supabase/server';
import { buildPageAlternates } from '@/lib/seo';
import { getBrandConfig } from '@/lib/brand';
import { getDestinationBySlug, DESTINATIONS_I18N } from '@/data/destinations-i18n';
import { localizeTourList } from '@/lib/tours-i18n';
import TourCard from '@/components/tours/TourCard';
import { TEST_PEN_TOUR_SLUG } from '@/store/useCartStore';
import {
  MapPin,
  ChevronRight,
  Mountain,
  Sun,
  CheckCircle2,
  Compass,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  PhoneCall,
} from 'lucide-react';

interface DestinationPageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

export const revalidate = 60;

export async function generateStaticParams() {
  const locales = ['es', 'en'];
  const destinationSlugs = Object.keys(DESTINATIONS_I18N);

  const params: { locale: string; slug: string }[] = [];
  for (const locale of locales) {
    for (const slug of destinationSlugs) {
      params.push({ locale, slug });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: DestinationPageProps): Promise<Metadata> {
  const { slug, locale = 'es' } = await params;
  const isEn = locale === 'en';
  const dest = getDestinationBySlug(slug);

  if (!dest) {
    return {
      title: isEn ? 'Destination Not Found' : 'Destino no encontrado',
    };
  }

  const brand = getBrandConfig();
  const title = isEn ? dest.seoTitle.en : dest.seoTitle.es;
  const description = isEn ? dest.seoDescription.en : dest.seoDescription.es;
  const alternates = buildPageAlternates(locale, `/destinos/${slug}`);
  const ogImageUrl = `${brand.domain}${dest.heroImage}`;

  return {
    title,
    description,
    alternates,
    openGraph: {
      title,
      description,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: dest.name[isEn ? 'en' : 'es'],
        },
      ],
    },
  };
}

export default async function DestinationPage({ params }: DestinationPageProps) {
  const { slug, locale = 'es' } = await params;
  const isEn = locale === 'en';
  const dest = getDestinationBySlug(slug);

  if (!dest) {
    return notFound();
  }

  const brand = getBrandConfig();
  const supabase = await createClient();

  // Find destination row in Supabase
  const { data: dbDest } = await supabase
    .from('destinations')
    .select('id, name, slug')
    .eq('slug', slug)
    .single();

  // Fetch active tours for this destination
  let toursQuery = supabase
    .from('tours')
    .select('*, categories(name), destinations(name)')
    .eq('is_active', true)
    .neq('slug', TEST_PEN_TOUR_SLUG)
    .order('rating', { ascending: false });

  if (dbDest?.id) {
    toursQuery = toursQuery.eq('destination_id', dbDest.id);
  }

  const { data: rawTours } = await toursQuery;
  const tours = localizeTourList(rawTours || [], locale);

  const destName = isEn ? dest.name.en : dest.name.es;
  const h1Title = isEn
    ? `Tours in ${destName}: Top Guided Packages & Excursions`
    : `Tours en ${destName}: Paquetes y Excursiones Turísticas`;

  const overviewParagraphs = isEn ? dest.overview.en : dest.overview.es;
  const highlightsList = isEn ? dest.highlights.en : dest.highlights.es;
  const whyVisitList = isEn ? dest.whyVisit.en : dest.whyVisit.es;

  const whatsappNumber = brand.contact?.cleanPhone || brand.contact?.phone?.replace(/[^0-9]/g, '') || '51955723329';
  const whatsappMsg = encodeURIComponent(
    isEn
      ? `Hello ${brand.name}! I would like to inquire about tours and personalized travel packages in ${destName}.`
      : `¡Hola ${brand.name}! Me gustaría consultar sobre tours y paquetes personalizados en ${destName}.`
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMsg}`;

  return (
    <div className="bg-background min-h-screen pt-20 sm:pt-24 pb-20">
      {/* 1. Breadcrumbs */}
      <div className="container mx-auto px-4 lg:px-8 py-3">
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center flex-wrap gap-1.5 sm:gap-2 text-xs sm:text-sm text-text-light">
            <li className="flex items-center">
              <Link href="/" className="hover:text-primary transition-colors font-medium">
                {isEn ? 'Home' : 'Inicio'}
              </Link>
              <ChevronRight className="w-3.5 h-3.5 mx-1.5 text-gray-400" />
            </li>
            <li className="flex items-center">
              <Link href="/tours" className="hover:text-primary transition-colors font-medium">
                {isEn ? 'Destinations' : 'Destinos'}
              </Link>
              <ChevronRight className="w-3.5 h-3.5 mx-1.5 text-gray-400" />
            </li>
            <li className="text-text-main font-semibold" aria-current="page">
              {destName}
            </li>
          </ol>
        </nav>
      </div>

      {/* 2. Hero Destination Header */}
      <section className="relative overflow-hidden bg-primary-dark text-white py-16 sm:py-24 mb-12">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25 scale-105 transition-transform duration-1000"
          style={{ backgroundImage: `url(${dest.heroImage})` }}
          role="img"
          aria-label={destName}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/95 via-primary-dark/85 to-primary-dark/70" />

        <div className="container mx-auto px-4 lg:px-8 relative z-10 max-w-4xl text-center">
          <div className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 border border-white/20">
            <MapPin className="w-3.5 h-3.5 text-primary-light" />
            <span>{dest.region}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif mb-4 sm:mb-6 leading-tight">
            {h1Title}
          </h1>

          <p className="text-base sm:text-xl text-white/90 font-light max-w-3xl mx-auto leading-relaxed">
            {isEn ? dest.tagline.en : dest.tagline.es}
          </p>
        </div>
      </section>

      {/* 3. SEO Introductory Copy & Destination Facts Grid */}
      <section className="container mx-auto px-4 lg:px-8 mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-12 items-start">
          
          {/* Rich Editorial SEO Content */}
          <div className="lg:col-span-2 space-y-5 text-text-light text-base sm:text-lg leading-relaxed">
            <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wider mb-2">
              <Compass className="w-4 h-4" />
              <span>{isEn ? `About ${destName}` : `Acerca de ${destName}`}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-primary-dark font-normal">
              {isEn
                ? `Discover the Magic of Traveling in ${destName}`
                : `Descubre la Magia de Viajar en ${destName}`}
            </h2>

            {overviewParagraphs.map((para, idx) => (
              <p key={idx} className="leading-relaxed">
                {para}
              </p>
            ))}

            {/* Why travel with us highlight pills */}
            <div className="pt-4 border-t border-gray-100">
              <h3 className="text-base font-bold text-text-main mb-3 uppercase tracking-wide">
                {isEn ? 'Why Visit This Destination?' : '¿Por Qué Elegir Este Destino?'}
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {whyVisitList.map((reason, idx) => (
                  <li key={idx} className="flex items-start text-sm text-text-main">
                    <CheckCircle2 className="w-4 h-4 text-primary mr-2 mt-0.5 flex-shrink-0" />
                    <span>{reason}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Quick Facts Sidebar Card */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100 space-y-6">
            <h3 className="font-serif text-2xl text-primary-dark border-b border-gray-100 pb-4">
              {isEn ? 'Destination Quick Facts' : 'Información Práctica'}
            </h3>

            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <Mountain className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-text-main block">
                    {isEn ? 'Average Elevation' : 'Altitud Media'}
                  </span>
                  <span className="text-text-light">{dest.altitude}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Sun className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-text-main block">
                    {isEn ? 'Best Travel Season' : 'Mejor Época para Viajar'}
                  </span>
                  <span className="text-text-light">
                    {isEn ? dest.bestSeason.en : dest.bestSeason.es}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-text-main block">
                    {isEn ? 'Guaranteed Departures' : 'Salidas Garantizadas'}
                  </span>
                  <span className="text-text-light">
                    {isEn
                      ? 'Daily small groups with certified local guides'
                      : 'Grupos reducidos diarios con guías locales'}
                  </span>
                </div>
              </div>
            </div>

            {/* Highlights bullet box */}
            <div className="pt-4 border-t border-gray-100">
              <span className="font-bold text-text-main text-xs uppercase tracking-wider block mb-3">
                {isEn ? 'Must-See Attractions' : 'Atractivos Principales'}
              </span>
              <ul className="space-y-2">
                {highlightsList.map((highlight, idx) => (
                  <li key={idx} className="text-xs text-text-light flex items-start">
                    <Sparkles className="w-3.5 h-3.5 text-primary mr-1.5 flex-shrink-0 mt-0.5" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Direct Contact Button */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white font-bold py-3 px-4 rounded-xl transition-colors shadow-sm text-sm"
            >
              <PhoneCall className="w-4 h-4" />
              <span>{isEn ? 'Ask a Travel Specialist' : 'Consultar con un Asesor'}</span>
            </a>
          </div>

        </div>
      </section>

      {/* 4. Filtered Tour Grid */}
      <section className="container mx-auto px-4 lg:px-8 mb-16">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-gray-200 gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-serif text-primary-dark">
              {isEn
                ? `Available Tours & Packages in ${destName}`
                : `Tours y Paquetes Disponibles en ${destName}`}
            </h2>
            <p className="text-text-light text-sm mt-1">
              {isEn
                ? `Showing ${tours.length} verified experiences in ${destName}.`
                : `Mostrando ${tours.length} experiencias verificadas en ${destName}.`}
            </p>
          </div>

          <Link
            href="/tours"
            className="inline-flex items-center text-sm font-bold text-primary hover:text-primary-dark transition-colors group self-start sm:self-auto"
          >
            <span>{isEn ? 'View all Peru tours' : 'Ver todos los tours del Perú'}</span>
            <ArrowRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {tours.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-100">
            <Compass className="w-12 h-12 text-primary mx-auto mb-3" />
            <h3 className="text-xl font-bold text-text-main mb-2">
              {isEn ? 'No tours found in this destination' : 'No se encontraron tours en este destino'}
            </h3>
            <p className="text-text-light mb-6">
              {isEn
                ? 'We are currently updating packages for this area. Explore our full catalog.'
                : 'Estamos actualizando nuestro catálogo para esta zona. Explora todos los tours.'}
            </p>
            <Link
              href="/tours"
              className="bg-primary hover:bg-primary-dark text-white font-bold px-6 py-2.5 rounded-full transition-colors text-sm"
            >
              {isEn ? 'Explore All Tours' : 'Explorar Todos los Tours'}
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {tours.map((tour) => (
              <TourCard
                key={tour.id}
                tour={{
                  id: tour.id,
                  title: tour.title,
                  slug: tour.slug,
                  image: tour.image_url || tour.image || '',
                  price: tour.price_adult ?? tour.price ?? null,
                  duration: tour.duration || '',
                  tag: tour.tag || undefined,
                  location: tour.location || undefined,
                  destination: tour.destinations?.name || destName,
                  rating: tour.rating ?? undefined,
                  reviews: tour.reviews_count ?? tour.reviews ?? undefined,
                }}
              />
            ))}
          </div>
        )}
      </section>

      {/* 5. Custom Trip Planning CTA Banner */}
      <section className="container mx-auto px-4 lg:px-8">
        <div className="bg-gradient-to-r from-primary-dark to-primary text-white rounded-3xl p-8 sm:p-12 shadow-lg relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl text-center md:text-left">
            <span className="text-xs font-bold uppercase tracking-widest text-primary-light block mb-2">
              {isEn ? 'Tailor-Made Experience' : 'Experiencia a Medida'}
            </span>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif mb-3">
              {isEn
                ? `Looking for a Custom Itinerary in ${destName}?`
                : `¿Buscas un Itinerario Personalizado en ${destName}?`}
            </h3>
            <p className="text-white/85 text-sm sm:text-base font-light">
              {isEn
                ? `Our local experts will craft a private or group travel package tailored to your schedule, budget, and travel style.`
                : `Nuestros especialistas locales diseñarán un paquete privado o grupal adaptado a tus fechas, presupuesto e intereses.`}
            </p>
          </div>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-primary-dark hover:bg-cream font-bold py-3.5 px-8 rounded-full transition-all shadow-md hover:shadow-xl text-sm whitespace-nowrap"
          >
            {isEn ? 'Plan My Trip on WhatsApp' : 'Planificar por WhatsApp'}
          </a>
        </div>
      </section>
    </div>
  );
}
