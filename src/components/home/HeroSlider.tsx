'use client';

import { useState, useCallback, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    image: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=2600&auto=format&fit=crop',
    title: 'Vive un viaje',
    titleAccent: 'legendario',
    titleSuffix: 'en tren',
    subtitle: 'Hacia las maravillas de Cusco y la mítica ciudadela de Machu Picchu.',
    cta: 'Explorar Tours',
    ctaLink: '/tours',
  },
  {
    image: 'https://images.unsplash.com/photo-1580619305218-8423a7ef79b4?q=80&w=2600&auto=format&fit=crop',
    title: 'Descubre el',
    titleAccent: 'Valle Sagrado',
    titleSuffix: '',
    subtitle: 'Un recorrido único por los paisajes y ruinas más impresionantes de los Andes.',
    cta: 'Ver Paquetes',
    ctaLink: '/tours',
  },
  {
    image: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?q=80&w=2600&auto=format&fit=crop',
    title: 'Aventura en la',
    titleAccent: 'Montaña de Colores',
    titleSuffix: '',
    subtitle: 'Camina sobre los colores de la naturaleza a más de 5,000 metros de altura.',
    cta: 'Reservar Ahora',
    ctaLink: '/tours',
  },
];

export default function HeroSlider() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, duration: 30 },
    [Autoplay({ delay: 6000, stopOnInteraction: false, stopOnMouseEnter: true })]
  );

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <div className="relative w-full h-full" ref={emblaRef}>
      <div className="flex h-full">
        {slides.map((slide, index) => (
          <div key={index} className="relative flex-[0_0_100%] min-w-0 h-full">
            <Image
              src={slide.image}
              alt={slide.title + ' ' + slide.titleAccent}
              fill
              className="object-cover"
              priority={index === 0}
              sizes="100vw"
              quality={85}
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/40" />
            
            {/* Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-serif text-white font-bold mb-4 sm:mb-6 tracking-wide drop-shadow-lg leading-tight">
                {slide.title} <br />
                <span className="italic font-normal text-accent">{slide.titleAccent}</span>
                {slide.titleSuffix && <> {slide.titleSuffix}</>}
              </h2>
              <p className="text-base sm:text-lg md:text-2xl text-white/90 font-light max-w-2xl drop-shadow-md px-4 mb-8">
                {slide.subtitle}
              </p>
              <Link
                href={slide.ctaLink}
                className="bg-primary hover:bg-primary-light text-white px-8 py-3 sm:py-4 rounded-full font-bold text-base sm:text-lg transition-all hover:shadow-xl hover:scale-105 inline-flex items-center gap-2"
              >
                {slide.cta}
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation arrows */}
      <button
        onClick={scrollPrev}
        className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-all z-10"
        aria-label="Slide anterior"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>
      <button
        onClick={scrollNext}
        className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-all z-10"
        aria-label="Siguiente slide"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* Dot indicators */}
      <DotIndicators emblaApi={emblaApi} />
    </div>
  );
}

function DotIndicators({ emblaApi }: { emblaApi: ReturnType<typeof useEmblaCarousel>[1] }) {
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
          className={`h-2 rounded-full transition-all duration-300 ${
            i === selectedIndex ? 'w-8 bg-white' : 'w-2 bg-white/50 hover:bg-white/70'
          }`}
          aria-label={`Ir al slide ${i + 1}`}
        />
      ))}
    </div>
  );
}
