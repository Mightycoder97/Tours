'use client';

import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { TEST_PEN_TOUR_SLUG } from '@/store/useCartStore';

interface Tour {
  id: string;
  slug: string;
  title: string;
  description?: string;
  image_url: string;
  price_adult: number;
  tag?: string;
}

interface FeaturedToursGridProps {
  tours: Tour[];
}

export default function FeaturedToursGrid({ tours }: FeaturedToursGridProps) {
  const t = useTranslations('tours.card');
  const tc = useTranslations('common');

  // Strip HTML tags from description
  const stripHtml = (html?: string) => {
    if (!html) return '';
    return html.replace(/<[^>]*>/g, '');
  };

  // Limit to 6 tours and rotate order so image positions differ from the previous brand
  const displayTours = [...tours.slice(0, 6)];
  if (displayTours.length >= 3) {
    const first = displayTours.shift()!;
    displayTours.push(first);
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
      {displayTours.map((tour, idx) => (
        <div
          key={tour.id}
          className="bg-white rounded-[28px] p-3 border border-primary/15 shadow-[0_10px_30px_-10px_rgba(139,102,232,0.12)] hover:shadow-[0_20px_40px_-10px_rgba(139,102,232,0.28)] transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col h-full group"
        >
          {/* Framed Rounded Tour Image */}
          <div className="relative aspect-[4/3] w-full rounded-[20px] overflow-hidden bg-cream">
            {/* Tag/Badge */}
            <div className="absolute top-3 left-3 z-10 inline-flex items-center gap-1.5 bg-secondary/90 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-bold text-white tracking-wide shadow-md">
              <Sparkles className="w-3 h-3 text-primary-light" />
              <span>{tour.tag || (idx % 2 === 0 ? 'Imperdible' : 'Aventura')}</span>
            </div>

            {/* Floating Price Pill on Image Bottom-Right */}
            <div className="absolute bottom-3 right-3 z-10 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-2xl shadow-lg border border-primary/20 text-right">
              <span className="block text-[9px] uppercase tracking-wider font-bold text-text-light leading-none mb-0.5">
                {t('from') || 'Desde'}
              </span>
              <span className="font-extrabold text-lg text-secondary leading-none">
                {tour.slug === TEST_PEN_TOUR_SLUG ? 'S/' : (tc('currency') || 'USD')} <span className="text-primary">{tour.price_adult}</span>
              </span>
            </div>
            
            <Link href={`/tours/${tour.slug}`} className="block relative w-full h-full">
              <Image
                src={tour.image_url}
                alt={tour.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-secondary/60 via-transparent to-transparent" />
            </Link>
          </div>

          {/* Card Body */}
          <div className="px-3 pt-4 pb-2 flex-1 flex flex-col justify-between">
            <div>
              <Link href={`/tours/${tour.slug}`} className="group-hover:text-primary transition-colors block">
                <h3 className="text-lg sm:text-xl text-secondary font-extrabold mb-2 line-clamp-1 leading-snug">
                  {tour.title}
                </h3>
              </Link>
              <p className="text-text-light text-xs sm:text-sm line-clamp-2 mb-4 font-normal leading-relaxed">
                {stripHtml(tour.description) || 'Explora la magia y la belleza de este destino increíble con nuestro tour guiado.'}
              </p>
            </div>

            {/* Modern Capsule Actions */}
            <div className="flex items-center gap-2.5 pt-3 border-t border-gray-100">
              <Link
                href={`/tours/${tour.slug}`}
                className="py-2.5 px-4 bg-cream hover:bg-secondary hover:text-white text-secondary transition-all text-xs font-bold rounded-xl cursor-pointer flex items-center justify-center"
              >
                <span>Leer más</span>
              </Link>
              <Link
                href={`/tours/${tour.slug}?book=true`}
                className="flex-1 text-center py-2.5 px-4 bg-primary hover:bg-primary-dark text-white transition-all text-xs font-bold rounded-xl cursor-pointer flex items-center justify-center gap-1.5 shadow-md shadow-primary/25"
              >
                <span>Reservar ahora</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
