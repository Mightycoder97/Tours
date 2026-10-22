'use client';

import { useState, useCallback, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

const slideImages = [
  'https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=2600&auto=format&fit=crop',
  '/imagenes/hero-machupicchu-1.png?v=2',
  '/imagenes/hero-camino-inca.png?v=2',
];

const slideCtaLinks = ['/tours', '/tours', '/tours'];

export default function HeroSlider() {
  const t = useTranslations('home.hero');
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, duration: 30 },
    [Autoplay({ delay: 6000, stopOnInteraction: false, stopOnMouseEnter: true })]
  );

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <div className="relative w-full h-full select-none touch-pan-y" ref={emblaRef}>
      <div className="flex h-full">
        {slideImages.map((image, index) => {
          const title = t(`slides.${index}.title`);
          const titleAccent = t(`slides.${index}.titleAccent`);
          const titleSuffix = t(`slides.${index}.titleSuffix`);
          const subtitle = t(`slides.${index}.subtitle`);
          const cta = t(`slides.${index}.cta`);

          return (
            <div key={index} className="relative flex-[0_0_100%] min-w-0 h-full">
              <Image
                src={image}
                alt={`${title} ${titleAccent}`}
                fill
                className="object-cover"
                style={{ objectPosition: 'center calc(50% + 50px)' }}
                priority={index === 0}
                sizes="100vw"
                quality={85}
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/40" />
              
              {/* Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-serif text-white mb-4 sm:mb-6 tracking-wide drop-shadow-lg leading-tight">
                  {title} <br />
                  <span className="italic font-normal text-accent-light">{titleAccent}</span>
                  {titleSuffix && <> {titleSuffix}</>}
                </h2>
                <p className="text-base sm:text-lg md:text-2xl text-white/90 font-light max-w-2xl drop-shadow-md px-4 mb-8">
                  {subtitle}
                </p>
                <Link
                  href={slideCtaLinks[index]}
                  className="bg-primary hover:bg-primary-dark text-white px-8 py-3 sm:py-4 rounded-full font-bold text-base sm:text-lg transition-all hover:shadow-xl hover:scale-105 inline-flex items-center gap-2"
                >
                  {cta}
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation arrows */}
      <button
        onClick={scrollPrev}
        className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-all z-10"
        aria-label={t('ariaLabels.previousSlide')}
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>
      <button
        onClick={scrollNext}
        className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-all z-10"
        aria-label={t('ariaLabels.nextSlide')}
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* Dot indicators */}
      <DotIndicators emblaApi={emblaApi} t={t} />
    </div>
  );
}

function DotIndicators({ emblaApi, t }: { emblaApi: ReturnType<typeof useEmblaCarousel>[1]; t: ReturnType<typeof useTranslations> }) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on('select', onSelect);
    onSelect();
    return () => { emblaApi.off('select', onSelect); };
  }, [emblaApi]);

  if (!emblaApi) return null;
  const count = emblaApi.scrollSnapList().length;

  return (
    <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
      {Array.from({ length: count }).map((_, i) => (
        <button
          key={i}
          onClick={() => emblaApi.scrollTo(i)}
          className={`h-2 rounded-full transition-all duration-300 !min-w-0 !min-h-0 ${
            i === selectedIndex ? 'w-8 bg-white' : 'w-2 bg-white/50 hover:bg-white/70'
          }`}
          aria-label={t('ariaLabels.goToSlide', { number: i + 1 })}
        />
      ))}
    </div>
  );
}
