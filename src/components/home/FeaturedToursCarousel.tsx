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
    const gap = 24; // gap-6 = 1.5rem = 24px
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
    const gap = 24; // gap-6 = 1.5rem = 24px
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

  return (
    <div className="relative">
      {/* Navigation Arrows - Desktop only */}
      {canScrollLeft && (
        <button
          onClick={() => scroll('left')}
          className="hidden md:flex absolute -left-4 lg:-left-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white shadow-lg items-center justify-center text-primary hover:bg-primary hover:text-white transition-all duration-200 cursor-pointer"
          aria-label={tc('previous')}
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}
      {canScrollRight && (
        <button
          onClick={() => scroll('right')}
          className="hidden md:flex absolute -right-4 lg:-right-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white shadow-lg items-center justify-center text-primary hover:bg-primary hover:text-white transition-all duration-200 cursor-pointer"
          aria-label={tc('next')}
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}

      {/* Scrollable Container */}
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 -mx-4 px-4"
      >
        {tours.map((tour) => (
          <Link
            href={`/tours/${tour.slug}`}
            key={tour.id}
            data-card
            className="group cursor-pointer snap-start shrink-0 w-[85%] sm:w-[45%] lg:w-[30%] xl:w-[23%]"
          >
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-300 transform group-hover:-translate-y-1 h-full flex flex-col">
              <div className="relative aspect-[3/4] w-full overflow-hidden">
                {/* Tag/Badge */}
                {tour.tag && (
                  <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-primary tracking-wider">
                    {tour.tag}
                  </div>
                )}

                <Image
                  src={tour.image_url}
                  alt={tour.title}
                  fill
                  sizes="(max-width: 640px) 85vw, (max-width: 1024px) 45vw, (max-width: 1280px) 30vw, 23vw"
                  className="object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>

                {/* Content overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-white font-serif text-2xl leading-tight mb-2">
                    {tour.title}
                  </h3>
                  <div className="flex justify-between items-end mt-4">
                    <div className="text-white/80">
                      <span className="text-xs uppercase tracking-wider block mb-1">{t('from')}</span>
                      <div className="font-bold text-xl text-accent">{tc('currency')} {tour.price_adult}</div>
                    </div>
                    <span className="text-white flex items-center hover:underline text-sm font-medium">
                      {tc('explore')} <ArrowRight className="w-4 h-4 ml-1" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
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
