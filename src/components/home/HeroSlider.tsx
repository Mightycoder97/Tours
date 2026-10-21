'use client';

import { useState, useCallback, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { ChevronLeft, ChevronRight, Sparkles, Star, Compass, ShieldCheck } from 'lucide-react';
import { useTranslations } from 'next-intl';

const slideImages = [
  '/imagenes/hero-machupicchu-1.png?v=2',
  '/imagenes/hero-camino-inca.png?v=2',
  'https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=2600&auto=format&fit=crop',
];

const floatingThumbs = [
  '/imagenes/passenger_rainbow.png',
  '/imagenes/passenger_machupicchu.png',
  '/imagenes/salkantay-trek.png',
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
          const thumbImage = floatingThumbs[index % floatingThumbs.length];

          return (
            <div key={index} className="relative flex-[0_0_100%] min-w-0 h-full overflow-hidden">
              <Image
                src={image}
                alt={`${title} ${titleAccent}`}
                fill
                className="object-cover scale-105"
                style={{ objectPosition: 'center center' }}
                priority={index === 0}
                sizes="100vw"
                quality={85}
              />
              {/* Modern duotone gradient overlay with #213E4C and #8B66E8 */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#213E4C]/90 via-[#213E4C]/65 to-[#8B66E8]/30" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#213E4C]/80 via-transparent to-black/30" />
              
              {/* Split Modern Content */}
              <div className="absolute inset-0 container mx-auto px-4 lg:px-12 flex items-center justify-between">
                {/* Left Column: Youthful Bold Typography */}
                <div className="max-w-2xl text-left z-10 pt-8 sm:pt-4">
                  <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-4 sm:mb-6 tracking-tight leading-[1.08]">
                    {title}{' '}
                    <span className="inline-block bg-primary text-white px-4 py-0.5 rounded-2xl shadow-lg shadow-primary/30 transform -rotate-1">
                      {titleAccent}
                    </span>
                    {titleSuffix && <> {titleSuffix}</>}
                  </h2>

                  <p className="text-base sm:text-lg md:text-xl text-white/90 font-normal max-w-xl mb-8 leading-relaxed">
                    {subtitle}
                  </p>

                  <div className="flex flex-wrap items-center gap-4">
                    <Link
                      href={slideCtaLinks[index]}
                      className="bg-primary hover:bg-primary-dark text-white px-8 py-3.5 sm:py-4 rounded-2xl font-bold text-base sm:text-lg transition-all shadow-xl shadow-primary/40 hover:-translate-y-0.5 inline-flex items-center gap-2.5"
                    >
                      <Compass className="w-5 h-5" />
                      {cta}
                    </Link>
                  </div>
                </div>

                {/* Right Column: Floating Visual Collage Card (Desktop) */}
                <div className="hidden lg:flex flex-col items-end gap-4 z-10 pr-6">
                  <div className="relative w-72 h-80 rounded-3xl overflow-hidden border-4 border-white/90 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
                    <Image
                      src={thumbImage}
                      alt="Viajeros Sonqo Perú Travel"
                      fill
                      className="object-cover"
                      sizes="288px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-secondary/60 via-transparent to-transparent" />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation arrows positioned on bottom-right on desktop */}
      <div className="absolute right-6 sm:right-12 bottom-8 sm:bottom-28 flex items-center gap-2 z-20">
        <button
          onClick={scrollPrev}
          className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-secondary/80 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-primary transition-all cursor-pointer"
          aria-label={t('ariaLabels.previousSlide')}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={scrollNext}
          className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-secondary/80 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-primary transition-all cursor-pointer"
          aria-label={t('ariaLabels.nextSlide')}
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

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
    <div className="absolute bottom-6 sm:bottom-28 left-6 sm:left-12 flex gap-2 z-10">
      {Array.from({ length: count }).map((_, i) => (
        <button
          key={i}
          onClick={() => emblaApi.scrollTo(i)}
          className={`h-2.5 rounded-full transition-all duration-300 !min-w-0 !min-h-0 ${
            i === selectedIndex ? 'w-10 bg-primary' : 'w-2.5 bg-white/50 hover:bg-white/80'
          }`}
          aria-label={t('ariaLabels.goToSlide', { number: i + 1 })}
        />
      ))}
    </div>
  );
}
