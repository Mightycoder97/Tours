'use client';

import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useCallback } from 'react';

const IMAGES = [
  { src: '/imagenes/passenger_machupicchu.png', alt: 'Nuestros pasajeros compartiendo sonrisas en Machu Picchu' },
  { src: '/imagenes/passenger_rainbow.png', alt: 'Aventura en la cima de la Montaña de 7 Colores (Vinicunca)' },
];

export default function PassengerGallery() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 5000, stopOnInteraction: false })
  ]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div className="relative group max-w-4xl mx-auto rounded-3xl overflow-hidden shadow-lg border border-gray-100 bg-gray-50">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {IMAGES.map((img, idx) => (
            <div key={idx} className="relative flex-[0_0_100%] aspect-[4/3] sm:aspect-[16/9] w-full">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 896px"
                className="object-cover"
                priority={idx === 0}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white text-shadow-sm">
                <span className="bg-primary/95 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full inline-block mb-1.5 border border-white/10">
                  Viajes Auténticos
                </span>
                <h3 className="font-serif text-lg sm:text-2xl font-bold leading-snug">{img.alt}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation arrows */}
      <button
        onClick={scrollPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/95 hover:bg-white text-text-main flex items-center justify-center shadow-md transition-all opacity-100 lg:opacity-0 lg:group-hover:opacity-100 cursor-pointer"
        aria-label="Anterior"
      >
        <ChevronLeft className="w-5 h-5 text-text-main" />
      </button>
      <button
        onClick={scrollNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/95 hover:bg-white text-text-main flex items-center justify-center shadow-md transition-all opacity-100 lg:opacity-0 lg:group-hover:opacity-100 cursor-pointer"
        aria-label="Siguiente"
      >
        <ChevronRight className="w-5 h-5 text-text-main" />
      </button>
    </div>
  );
}
