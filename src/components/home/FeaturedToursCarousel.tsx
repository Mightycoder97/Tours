'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
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

interface FeaturedToursCarouselProps {
  tours: Tour[];
}

export default function FeaturedToursCarousel({ tours }: FeaturedToursCarouselProps) {
  const t = useTranslations('tours.card');
  const tc = useTranslations('common');
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  const updateActiveIndex = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>('[data-card]');
    if (!card) return;
    const cardWidth = card.offsetWidth;
    const gap = 24; // gap-6 = 24px
    const index = Math.round(el.scrollLeft / (cardWidth + gap));
    setActiveIndex(Math.min(index, tours.length - 1));
  }, [tours.length]);

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 2);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 2);
    updateActiveIndex();
  }, [updateActiveIndex]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener('scroll', checkScroll, { passive: true });
    window.addEventListener('resize', checkScroll);
    return () => {
      el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, [checkScroll]);

  const scroll = (direction: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.querySelector<HTMLElement>('[data-card]')?.offsetWidth ?? 300;
    const gap = 24;
    const scrollAmount = cardWidth + gap;
    el.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  const scrollToIndex = (index: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>('[data-card]');
    if (!card) return;
    const cardWidth = card.offsetWidth;
    const gap = 24;
    el.scrollTo({
      left: index * (cardWidth + gap),
      behavior: 'smooth',
    });
  };

  // Helper to remove HTML tags from description if present
  const stripHtml = (html?: string) => {
    if (!html) return '';
    return html.replace(/<[^>]*>/g, '');
  };

  return (
    <div className="relative">
      {/* Navigation Arrows - Desktop only */}
      {canScrollLeft && (
        <button
          onClick={() => scroll('left')}
          className="hidden md:flex absolute -left-4 lg:-left-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white shadow-lg items-center justify-center text-primary hover:bg-primary hover:text-white transition-all duration-200 cursor-pointer border border-gray-100"
          aria-label={tc('previous')}
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}
      {canScrollRight && (
        <button
          onClick={() => scroll('right')}
          className="hidden md:flex absolute -right-4 lg:-right-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white shadow-lg items-center justify-center text-primary hover:bg-primary hover:text-white transition-all duration-200 cursor-pointer border border-gray-100"
          aria-label={tc('next')}
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}

      {/* Scrollable Container */}
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-6 -mx-4 px-4"
      >
        {tours.map((tour) => (
          <div
            key={tour.id}
            data-card
            className="snap-start shrink-0 w-[85%] sm:w-[45%] lg:w-[31%] xl:w-[23.5%] flex flex-col"
          >
            <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-full">
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
                    sizes="(max-width: 640px) 85vw, (max-width: 1024px) 45vw, (max-width: 1280px) 31vw, 23.5vw"
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
                    <span className="text-xs uppercase tracking-wider text-text-light">{t('from')}</span>
                    <div className="text-right">
                      <span className="font-bold text-xl text-primary font-sans">{tc('currency')} {tour.price_adult}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Link
                      href={`/tours/${tour.slug}`}
                      className="flex-1 text-center py-2 px-3 border border-primary text-primary hover:bg-primary hover:text-white transition-colors text-xs font-bold rounded-lg cursor-pointer flex items-center justify-center gap-1"
                    >
                      <span>Leer más</span>
                    </Link>
                    <Link
                      href={`/tours/${tour.slug}?book=true`}
                      className="flex-1 text-center py-2 px-3 bg-[#ff7a00] hover:bg-[#e06b00] text-white transition-colors text-xs font-bold rounded-lg cursor-pointer flex items-center justify-center gap-1 shadow-sm"
                    >
                      <span>Reservar ahora</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Scroll Progress Dots - Mobile */}
      <div className="flex justify-center gap-2 mt-4 md:hidden">
        {tours.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollToIndex(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === activeIndex
                ? 'w-8 bg-primary-dark'
                : 'w-2 bg-primary/30 hover:bg-primary/50'
            }`}
            aria-label={`${tc('viewAll')} ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
