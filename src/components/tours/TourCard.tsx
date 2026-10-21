'use client';

import { Link } from '@/i18n/navigation';
import { ArrowRight, Clock, MapPin } from 'lucide-react';
import StarRating from '@/components/ui/StarRating';
import { ProtectedImage } from '@/components/ui/ProtectedImage';
import { useTranslations } from 'next-intl';
import { TEST_PEN_TOUR_SLUG } from '@/store/useCartStore';

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
  const currencySymbol = tour.slug === TEST_PEN_TOUR_SLUG ? 'S/' : tc('currency');
  const formattedPrice = hasPrice
    ? `${currencySymbol} ${Number(tour.price).toFixed(2)}`
    : 'Consultar precio';

  return (
    <div className="bg-white rounded-[28px] p-3 shadow-[0_10px_30px_rgba(33,62,76,0.06)] hover:shadow-[0_20px_45px_rgba(139,102,232,0.18)] border border-primary/10 flex flex-col h-full transition-all duration-300 transform hover:-translate-y-1.5 group">
      {/* Framed Image Header */}
      <div className="relative aspect-[4/3] w-full rounded-[20px] overflow-hidden">
        {/* Destination badge */}
        {tour.destination && (
          <div className="absolute top-3.5 left-3.5 z-10 bg-secondary/90 backdrop-blur-md text-white px-3.5 py-1.5 rounded-full text-[11px] font-extrabold shadow-md tracking-wider uppercase">
            {tour.destination}
          </div>
        )}
        {/* Category tag fallback */}
        {!tour.destination && tour.tag && (
          <div className="absolute top-3.5 left-3.5 z-10 bg-primary text-white px-3.5 py-1.5 rounded-full text-[11px] font-extrabold shadow-md tracking-wider uppercase">
            {tour.tag}
          </div>
        )}
        {/* Discount badge */}
        {tour.discount && tour.discount > 0 && (
          <span className="absolute top-3.5 right-3.5 z-10 bg-secondary text-white px-3 py-1 rounded-full text-xs font-extrabold shadow-md">
            {t('off', { percent: tour.discount })}
          </span>
        )}

        {/* Floating Price Pill on Image Bottom-Right */}
        <div className="absolute bottom-3.5 right-3.5 z-20 bg-white/95 backdrop-blur-md px-4 py-2 rounded-2xl shadow-lg border border-primary/15 text-right">
          {hasPrice && (
            <span className="text-[10px] uppercase text-primary font-extrabold tracking-wider block leading-none mb-0.5">
              {t('from')}
            </span>
          )}
          <div className={`font-extrabold leading-none ${hasPrice ? 'text-lg sm:text-xl text-secondary' : 'text-xs text-text-light italic'}`}>
            {formattedPrice}
          </div>
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-secondary/60 via-transparent to-transparent z-10" />
        <ProtectedImage
          src={tour.image || '/placeholder-tour.jpg'}
          alt={tour.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700"
          showCopyright={false}
          unoptimized
        />
      </div>

      {/* Body */}
      <div className="px-3 pt-4 pb-2 flex flex-col flex-grow">
        {/* Duration + Rating row */}
        <div className="flex items-center justify-between mb-2.5 text-xs font-bold">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center bg-cream text-primary-dark px-3 py-1 rounded-full">
              <Clock className="w-3.5 h-3.5 mr-1.5 text-primary" />
              {tour.duration}
            </span>
            {tour.location && (
              <span className="inline-flex items-center text-text-light text-xs">
                <MapPin className="w-3.5 h-3.5 mr-0.5 text-primary" />
                {tour.location}
              </span>
            )}
          </div>
          {tour.rating != null && (
            <div className="flex items-center gap-1">
              <StarRating rating={tour.rating} size="sm" />
              {tour.reviews != null && (
                <span className="text-text-light font-semibold text-xs ml-0.5">({tour.reviews})</span>
              )}
            </div>
          )}
        </div>

        <h3 className="text-lg sm:text-xl font-serif font-extrabold text-secondary mb-4 line-clamp-2 group-hover:text-primary transition-colors leading-snug">
          <Link href={`/tours/${tour.slug}`}>
            {tour.title}
          </Link>
        </h3>

        <div className="mt-auto pt-3 flex items-center justify-between border-t border-gray-100">
          <span className="text-xs font-bold text-text-light">
            Explorar experiencia
          </span>

          <Link
            href={`/tours/${tour.slug}`}
            className="px-4 py-2 rounded-full bg-secondary text-white text-xs font-extrabold flex items-center gap-1.5 hover:bg-primary transition-all shadow-sm"
            aria-label={`Ver detalles de ${tour.title}`}
          >
            <span>Ver tour</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}
