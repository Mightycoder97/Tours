import { createClient } from '@/lib/supabase/server';
import { localizeTourList } from '@/lib/tours-i18n';
import TourCard from '@/components/tours/TourCard';
import { Link } from '@/i18n/navigation';
import { ArrowRight, Compass } from 'lucide-react';
import { TEST_PEN_TOUR_SLUG } from '@/store/useCartStore';

interface RelatedToursProps {
  currentTourId: string;
  destinationId?: string | null;
  destinationSlug?: string | null;
  destinationName?: string | null;
  locale?: string;
}

export default async function RelatedTours({
  currentTourId,
  destinationId,
  destinationSlug,
  destinationName,
  locale = 'es',
}: RelatedToursProps) {
  const supabase = await createClient();

  // 1. Fetch complementary tours in the same destination (excluding current tour & test tour)
  let query = supabase
    .from('tours')
    .select('*, categories(name), destinations(name)')
    .eq('is_active', true)
    .neq('id', currentTourId)
    .neq('slug', TEST_PEN_TOUR_SLUG)
    .order('rating', { ascending: false });

  if (destinationId) {
    query = query.eq('destination_id', destinationId);
  }

  const { data: destTours } = await query.limit(4);

  let finalTours = destTours || [];

  // Fallback: if fewer than 3 tours in this destination, pull other top-rated tours
  if (finalTours.length < 3) {
    const existingIds = [currentTourId, ...finalTours.map((t) => t.id)];
    const { data: fallbackTours } = await supabase
      .from('tours')
      .select('*, categories(name), destinations(name)')
      .eq('is_active', true)
      .not('id', 'in', `(${existingIds.join(',')})`)
      .neq('slug', TEST_PEN_TOUR_SLUG)
      .order('rating', { ascending: false })
      .limit(4 - finalTours.length);

    if (fallbackTours) {
      finalTours = [...finalTours, ...fallbackTours];
    }
  }

  if (finalTours.length === 0) return null;

  const localizedTours = localizeTourList(finalTours, locale);
  const isEn = locale === 'en';

  const headingText = destinationName
    ? isEn
      ? `Related Tours in ${destinationName}`
      : `Tours Relacionados en ${destinationName}`
    : isEn
    ? 'You Might Also Like'
    : 'Tours Recomendados para Ti';

  const viewAllText = destinationName && destinationSlug
    ? isEn
      ? `View all tours in ${destinationName}`
      : `Ver todos los tours en ${destinationName}`
    : isEn
    ? 'View all tours'
    : 'Ver todos los tours';

  const viewAllHref = destinationSlug ? `/destinos/${destinationSlug}` : '/tours';

  return (
    <section className="mt-16 sm:mt-24 pt-12 border-t border-gray-200">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wider mb-2">
            <Compass className="w-4 h-4" />
            <span>{isEn ? 'Explore More' : 'Explora Más'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-primary-dark">
            {headingText}
          </h2>
          <p className="text-text-light text-sm sm:text-base mt-1">
            {isEn
              ? 'Complement your itinerary with these top-rated experiences.'
              : 'Complementa tu viaje con estas experiencias destacadas.'}
          </p>
        </div>

        <Link
          href={viewAllHref}
          className="inline-flex items-center text-sm font-bold text-primary hover:text-primary-dark transition-colors group self-start sm:self-auto"
        >
          <span>{viewAllText}</span>
          <ArrowRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {localizedTours.map((t) => (
          <TourCard
            key={t.id}
            tour={{
              id: t.id,
              title: t.title,
              slug: t.slug,
              image: t.image_url || t.image || '',
              price: t.price_adult ?? t.price ?? null,
              duration: t.duration || '',
              tag: t.tag || undefined,
              location: t.location || undefined,
              destination: t.destinations?.name || t.destinationName || undefined,
              rating: t.rating ?? undefined,
              reviews: t.reviews_count ?? t.reviews ?? undefined,
            }}
          />
        ))}
      </div>
    </section>
  );
}
