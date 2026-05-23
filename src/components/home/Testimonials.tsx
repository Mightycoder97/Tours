'use client';

import { useRef } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'María García',
    country: '🇪🇸 España',
    rating: 5,
    title: 'Una experiencia mágica',
    text: 'El tour a Machu Picchu superó todas mis expectativas. El guía fue increíble, la organización perfecta y los paisajes simplemente impresionantes. ¡Lo recomiendo al 100%!',
  },
  {
    name: 'Carlos Mendoza',
    country: '🇲🇽 México',
    rating: 5,
    title: 'Profesionalismo de primera',
    text: 'Desde la reserva hasta el final del tour, todo fue impecable. El equipo se preocupa genuinamente por brindarte la mejor experiencia. Volveremos seguro.',
  },
  {
    name: 'Ana Rodríguez',
    country: '🇨🇴 Colombia',
    rating: 5,
    title: 'El mejor tour de mi vida',
    text: 'Viajé sola y me sentí completamente segura y acompañada. Los paisajes del Valle Sagrado son de otro mundo. La comida incluida fue deliciosa.',
  },
  {
    name: 'John Smith',
    country: '🇺🇸 United States',
    rating: 5,
    title: 'Exceeded all expectations',
    text: 'I\'ve traveled extensively in South America, but this tour company truly stands out. The attention to detail and local knowledge made our Machu Picchu visit unforgettable.',
  },
  {
    name: 'Luciana Torres',
    country: '🇵🇪 Perú',
    rating: 5,
    title: 'Orgullosa de recomendar',
    text: 'Como peruana, valoro mucho la calidad del servicio. Este equipo conoce cada rincón de Cusco y te hace vivir la historia de los Incas como nadie más.',
  },
];

export default function Testimonials() {
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.offsetWidth * 0.85;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="bg-primary-dark py-20 lg:py-28 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-white/20 blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-white/10 blur-3xl" />
      </div>
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
          <div className="max-w-2xl mb-6 md:mb-0">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white mb-4">
              Lo que dicen nuestros viajeros
            </h2>
            <p className="text-white/70 text-lg font-light">
              Más de 500 aventureros ya vivieron la experiencia. Estas son sus historias.
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => scroll('left')}
              className="w-12 h-12 rounded-full border-2 border-white/30 flex items-center justify-center text-white hover:bg-white hover:text-primary-dark transition-all"
              aria-label="Anterior"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-12 h-12 rounded-full border-2 border-white/30 flex items-center justify-center text-white hover:bg-white hover:text-primary-dark transition-all"
              aria-label="Siguiente"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scroll container */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 -mx-4 px-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="snap-start shrink-0 w-[85%] sm:w-[45%] lg:w-[30%] bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
            >
              <Quote className="w-8 h-8 text-primary-light mb-4 opacity-60" />
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <h4 className="font-serif text-lg font-bold text-white mb-3">{testimonial.title}</h4>
              <p className="text-white/80 text-sm leading-relaxed mb-6">{testimonial.text}</p>
              <div className="border-t border-white/10 pt-4">
                <p className="font-bold text-white text-sm">{testimonial.name}</p>
                <p className="text-white/50 text-xs">{testimonial.country}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
