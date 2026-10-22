'use client';

import { Link } from '@/i18n/navigation';
import { ArrowRight, Clock, MapPin } from 'lucide-react';
import StarRating from '@/components/ui/StarRating';
import { ProtectedImage } from '@/components/ui/ProtectedImage';
import { useTranslations } from 'next-intl';

interface TourProps {
  id: string;
  title: string;
  slug: string;
  image: string;
  price: number | null;
  duration: string;
  tag?: string;
  location?: string;
  destination?: string;
  rating?: number;
  reviews?: number;
  discount?: number;
}

// Destination color coding
const DEST_BADGE_COLORS: Record<string, string> = {
  lima:     'bg-emerald-100 text-emerald-700',
  cusco:    'bg-teal-100 text-teal-700',
  arequipa: 'bg-orange-100 text-orange-700',
  puno:     'bg-blue-100 text-blue-700',
};

function getDestBadge(destination?: string) {
  if (!destination) return 'bg-gray-100 text-gray-600';
  return DEST_BADGE_COLORS[destination.toLowerCase()] || 'bg-gray-100 text-gray-600';
}

export default function TourCard({ tour }: { tour: TourProps }) {
  const t = useTranslations('tours.card');
  const tc = useTranslations('common');

  const hasPrice = tour.price != null && Number(tour.price) > 0;
  const formattedPrice = hasPrice
    ? `${tc('currency')} ${Number(tour.price).toFixed(2)}`
    : 'Consultar precio';

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-50 flex flex-col h-full transition-all duration-300 transform hover:-translate-y-1">
      {/* Image Header */}
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        {/* Destination badge */}
        {tour.destination && (
          <div className={`absolute top-4 left-4 z-10 px-3 py-1 rounded-full text-xs font-bold shadow-sm tracking-wider ${getDestBadge(tour.destination)}`}>
            {tour.destination}
          </div>
        )}
        {/* Category tag fallback */}
        {!tour.destination && tour.tag && (
          <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-primary shadow-sm tracking-wider">
            {tour.tag}
          </div>
        )}
        {/* Discount badge */}
        {tour.discount && tour.discount > 0 && (
          <span className="absolute top-4 right-4 z-10 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold">
            {t('off', { percent: tour.discount })}
          </span>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 z-10 transition-opacity duration-300 group-hover:opacity-100" />
        <ProtectedImage
          src={tour.image || '/placeholder-tour.jpg'}
          alt={tour.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover w-full h-full"
          showCopyright={false}
          unoptimized
        />
      </div>

      {/* Body */}
      <div className="p-5 sm:p-6 flex flex-col flex-grow">
        {/* Duration + Rating row */}
        <div className="flex items-center justify-between mb-3 text-sm text-text-light font-medium">
          <div className="flex items-center gap-3">
            <span className="flex items-center">
              <Clock className="w-4 h-4 mr-1 text-primary" />
              {tour.duration}
            </span>
            {tour.location && (
              <span className="flex items-center text-xs">
                <MapPin className="w-3 h-3 mr-0.5 text-text-muted" />
                {tour.location}
              </span>
            )}
          </div>
          {tour.rating != null && (
            <div className="flex items-center gap-1">
              <StarRating rating={tour.rating} size="sm" />
              {tour.reviews != null && (
                <span className="text-text-light font-normal text-xs ml-1">({tour.reviews})</span>
              )}
            </div>
          )}
        </div>

        <h3 className="text-lg sm:text-xl font-serif text-text-main mb-2 line-clamp-2 hover:text-primary transition-colors">
          <Link href={`/tours/${tour.slug}`}>
            {tour.title}
          </Link>
        </h3>

        <div className="mt-auto pt-5 flex items-center justify-between border-t border-gray-100">
          <div>
            <span className="text-xs uppercase text-gray-400 font-bold tracking-wider block mb-1">
              {hasPrice ? t('from') : ''}
            </span>
            <div className={`font-bold ${hasPrice ? 'text-2xl text-primary-dark' : 'text-sm text-text-light italic'}`}>
              {formattedPrice}
            </div>
          </div>

          <Link
            href={`/tours/${tour.slug}`}
            className="w-11 h-11 rounded-full border border-gray-200 flex items-center justify-center text-primary hover:bg-primary hover:text-white hover:border-primary transition-all group"
            aria-label={`Ver detalles de ${tour.title}`}
          >
            <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}
