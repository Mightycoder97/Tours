'use client';

import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

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

  // Limit to 6 tours for the grid view on the homepage
  const displayTours = tours.slice(0, 6);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
      {displayTours.map((tour) => (
        <div
          key={tour.id}
          className="bg-white rounded-2xl overflow-hidden border border-gray-150 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-full group"
        >
          {/* Tour Image */}
          <div className="relative aspect-video w-full overflow-hidden bg-gray-100">
            {/* Tag/Badge */}
            {tour.tag && (
              <div className="absolute top-4 left-4 z-10 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold text-primary tracking-wider shadow-sm uppercase">
                {tour.tag}
              </div>
            )}
            
            <Link href={`/tours/${tour.slug}`} className="block relative w-full h-full">
              <Image
                src={tour.image_url}
                alt={tour.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover hover:scale-105 transition-transform duration-500"
              />
            </Link>
          </div>

          {/* Card Body */}
          <div className="p-5 flex-1 flex flex-col justify-between">
            <div>
              <Link href={`/tours/${tour.slug}`} className="hover:text-primary transition-colors block">
                <h3 className="font-serif text-lg sm:text-xl text-text-main font-bold mb-2 line-clamp-1 leading-snug">
                  {tour.title}
                </h3>
              </Link>
              <p className="text-text-light text-xs sm:text-sm line-clamp-2 mb-4 font-light">
                {stripHtml(tour.description) || 'Explora la magia y la belleza de este destino increíble con nuestro tour guiado.'}
              </p>
            </div>

            <div>
              {/* Price */}
              <div className="flex justify-between items-baseline mb-4 border-t border-gray-50 pt-3">
                <span className="text-xs uppercase tracking-wider text-text-light">{t('from') || 'Desde'}</span>
                <div className="text-right">
                  <span className="font-bold text-xl text-primary font-sans">{tc('currency') || 'USD'} {tour.price_adult}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Link
                  href={`/tours/${tour.slug}`}
                  className="flex-1 text-center py-2.5 px-3 border border-primary text-primary hover:bg-primary hover:text-white transition-colors text-xs font-bold rounded-lg cursor-pointer flex items-center justify-center gap-1"
                >
                  <span>Leer más</span>
                </Link>
                <Link
                  href={`/tours/${tour.slug}?book=true`}
                  className="flex-1 text-center py-2.5 px-3 bg-[#ff7a00] hover:bg-[#e06b00] text-white transition-colors text-xs font-bold rounded-lg cursor-pointer flex items-center justify-center gap-1 shadow-sm"
                >
                  <span>Reservar ahora</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
