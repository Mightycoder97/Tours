'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export default function PromotionsSlider() {
  const t = useTranslations('home.promotions');
  const tc = useTranslations('common');
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 5);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 5);
  }, []);

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
    const cardWidth = el.querySelector<HTMLElement>('[data-promo-card]')?.offsetWidth ?? 380;
    const gap = 24; // gap-6
    const scrollAmount = cardWidth + gap;
    el.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  const promoCards = [
    {
      bgImage: '/imagenes/salkantay-trek.png?v=2',
      tagKey: 'cards.2.tag',
      titleKey: 'cards.2.title',
      descKey: 'cards.2.description',
      ctaKey: 'cards.2.cta',
      link: '/tours?q=salkantay',
    },
    {
      bgImage: '/imagenes/tren-machupicchu.png?v=2',
      tagKey: 'cards.1.tag',
      titleKey: 'cards.1.title',
      descKey: 'cards.1.description',
      ctaKey: 'cards.1.cta',
      link: '/tours',
    },
    {
      bgImage: '/imagenes/manu-ecology.png?v=2',
      tagKey: 'cards.0.tag',
      titleKey: 'cards.0.title',
      descKey: 'cards.0.description',
      ctaKey: 'cards.0.cta',
      link: '/tours?coupon=MAGIA10',
    },
  ];

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-cream overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-secondary leading-tight mb-3">
              {t('title')}
            </h2>
            <p className="text-text-light text-sm sm:text-base font-normal">
              {t('subtitle')}
            </p>
          </div>
        </div>

        {/* Slider Wrapper */}
        <div className="relative">
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-4 -mx-4 px-4 sm:mx-0 sm:px-0"
            style={{ scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch' }}
          >
            {promoCards.map((card, idx) => (
              <div
                key={idx}
                data-promo-card
                className="relative w-[300px] sm:w-[380px] md:w-[460px] aspect-[1.65/1] shrink-0 rounded-3xl overflow-hidden shadow-xl shadow-primary/10 snap-start border-2 border-white group"
              >
                <div className="absolute inset-0 overflow-hidden">
                  <Image
                    src={card.bgImage}
                    alt={t(card.titleKey)}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 640px) 300px, (max-width: 1024px) 380px, 460px"
                  />
                </div>
                
                {/* Duotone Secondary/Primary Overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-secondary/95 via-secondary/50 to-primary/30 opacity-100 transition-opacity duration-300" />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-8 opacity-100 transition-opacity duration-300">
                  {/* Top tag badge */}
                  <div>
                    <span className="inline-block bg-primary text-white font-extrabold text-[10px] sm:text-xs px-3.5 py-1.5 rounded-full uppercase tracking-wider shadow-md">
                      {t(card.tagKey)}
                    </span>
                  </div>

                  {/* Text details and CTA */}
                  <div>
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight leading-tight mb-2">
                      {t(card.titleKey)}
                    </h3>
                    <p className="text-xs sm:text-sm text-white/85 font-normal mb-4 sm:mb-5 line-clamp-2 max-w-sm">
                      {t(card.descKey)}
                    </p>
                    <Link
                      href={card.link}
                      className="inline-block bg-white hover:bg-primary hover:text-white text-secondary px-6 py-2.5 rounded-xl font-extrabold text-xs sm:text-sm transition-all duration-300 shadow-lg active:scale-95 text-center"
                    >
                      {t(card.ctaKey)}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Controls - Desktop & Mobile overlay */}
          <div className="flex items-center justify-end gap-3 mt-8">
            <button
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full border flex items-center justify-center transition-all ${
                canScrollLeft
                  ? 'border-primary text-primary hover:bg-primary hover:text-white cursor-pointer bg-white shadow-sm'
                  : 'border-gray-200 text-gray-300 bg-white/50 cursor-not-allowed'
              }`}
              aria-label={tc('previous')}
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
            <button
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full border flex items-center justify-center transition-all ${
                canScrollRight
                  ? 'border-primary text-primary hover:bg-primary hover:text-white cursor-pointer bg-white shadow-sm'
                  : 'border-gray-200 text-gray-300 bg-white/50 cursor-not-allowed'
              }`}
              aria-label={tc('next')}
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
