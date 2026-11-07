import { TOURS_CONTENT, TourDayItinerary } from '@/data/tours-content';
import { localizeCategoryName } from '@/data/categories-i18n';
import { localizeDestinationName } from '@/data/destinations-i18n';

export interface BaseTour {
  id: string;
  slug: string;
  title: string;
  description?: string | null;
  tag?: string | null;
  location?: string | null;
  inclusions?: string[] | null;
  itinerary?: TourDayItinerary[] | null;
  price_adult?: number | null;
  price?: number | null;
  price_child?: number | null;
  priceChild?: number | null;
  duration?: string | null;
  image_url?: string;
  image?: string;
  images?: string[] | null;
  category_id?: string | null;
  destination_id?: string | null;
  categoryName?: string | null;
  destinationName?: string | null;
  destination?: string | null;
  categories?: { name?: string; slug?: string } | null;
  destinations?: { name?: string; slug?: string } | null;
  is_active?: boolean;
  rating?: number | null;
  reviews_count?: number | null;
  reviews?: number | null;
  discount?: number | null;
  [key: string]: any;
}

/**
 * Localizes a tour object based on the requested locale ('es' | 'en').
 * Merges Supabase dynamic fields with rich localized content, inclusions, itineraries, and taxonomies.
 */
export function localizeTour<T extends Partial<BaseTour>>(tour: T, locale: string = 'es'): T {
  if (!tour || !tour.slug) return tour;

  const content = TOURS_CONTENT[tour.slug];
  const isEn = locale === 'en';

  const localized: Record<string, any> = { ...tour };

  if (content) {
    localized.title = isEn ? (content.title.en || tour.title) : (content.title.es || tour.title);
    localized.description = isEn ? (content.description.en || tour.description) : (content.description.es || tour.description);
    localized.tag = isEn ? (content.tag.en || tour.tag) : (content.tag.es || tour.tag);
    localized.location = isEn ? (content.location.en || tour.location) : (content.location.es || tour.location);

    if (isEn) {
      localized.inclusions = (content.inclusions.en && content.inclusions.en.length > 0)
        ? content.inclusions.en
        : (tour.inclusions || content.inclusions.es || []);
      localized.itinerary = (content.itinerary.en && content.itinerary.en.length > 0)
        ? content.itinerary.en
        : (tour.itinerary || content.itinerary.es || []);
    } else {
      localized.inclusions = (tour.inclusions && tour.inclusions.length > 0)
        ? tour.inclusions
        : (content.inclusions.es || []);
      localized.itinerary = (tour.itinerary && tour.itinerary.length > 0)
        ? tour.itinerary
        : (content.itinerary.es || []);
    }
  }

  // Localize category labels
  if (localized.categoryName) {
    localized.categoryName = localizeCategoryName(localized.categoryName, locale);
  }
  if (localized.categories && typeof localized.categories === 'object' && localized.categories.name) {
    localized.categories = {
      ...localized.categories,
      name: localizeCategoryName(localized.categories.name, locale),
    };
  }

  // Localize destination labels
  if (localized.destinationName) {
    localized.destinationName = localizeDestinationName(localized.destinationName, locale);
  }
  if (localized.destination) {
    localized.destination = localizeDestinationName(localized.destination, locale);
  }
  if (localized.destinations && typeof localized.destinations === 'object' && localized.destinations.name) {
    localized.destinations = {
      ...localized.destinations,
      name: localizeDestinationName(localized.destinations.name, locale),
    };
  }

  return localized as T;
}

/**
 * Localizes an array of tours.
 */
export function localizeTourList<T extends Partial<BaseTour>>(tours: T[], locale: string = 'es'): T[] {
  if (!Array.isArray(tours)) return [];
  return tours.map((tour) => localizeTour(tour, locale));
}
