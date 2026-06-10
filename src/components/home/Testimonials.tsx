'use client';

import { useRef } from 'react';
import { ChevronLeft, ChevronRight, MessageSquare } from 'lucide-react';
import { useTranslations } from 'next-intl';

const testimonialRatings = [5, 5, 5, 5, 5];
const testimonialCount = 5;

// Official TripAdvisor Owl Logo in SVG
function TripAdvisorLogo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 3.167c-1.897 0-3.57 1.1-4.373 2.736a5.163 5.163 0 0 1 8.746 0c-.803-1.637-2.476-2.736-4.373-2.736zM3.46 11.233a3.543 3.543 0 0 1 3.54-3.543c1.954 0 3.54 1.587 3.54 3.543 0 1.954-1.586 3.54-3.54 3.54a3.543 3.543 0 0 1-3.54-3.54zm3.54 1.706a1.706 1.706 0 1 0 0-3.412 1.706 1.706 0 0 0 0 3.412zm6.98-1.706c0-1.956 1.586-3.543 3.54-3.543a3.543 3.543 0 0 1 3.54 3.543c0 1.954-1.586 3.54-3.54 3.54-1.954 0-3.54-1.586-3.54-3.54zm3.54 1.706a1.706 1.706 0 1 0 0-3.412 1.706 1.706 0 0 0 0 3.412zM12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm7.153 18.067c-.23.23-.46.368-.69.46a7.354 7.354 0 0 1-2.906.574c-1.334 0-2.436-.345-3.328-1.012-.892.667-1.994 1.012-3.328 1.012a7.354 7.354 0 0 1-2.906-.574c-.23-.092-.46-.23-.69-.46-.368-.368-.368-.782 0-1.15a13.344 13.344 0 0 1 2.392-1.932 5.23 5.23 0 0 1-.368-1.886c0-2.898 2.346-5.244 5.244-5.244s5.244 2.346 5.244 5.244c0 .667-.115 1.31-.368 1.886a13.344 13.344 0 0 1 2.392 1.932c.368.368.368.782 0 1.15z" />
    </svg>
  );
}

export default function Testimonials() {
  const t = useTranslations('home.testimonials');
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
        
        {/* TripAdvisor Score Badge */}
        <div className="flex items-center gap-3 mb-6 bg-white/5 py-2 px-4 rounded-full w-fit border border-white/10">
          <TripAdvisorLogo className="w-6 h-6 text-[#00aa6c]" />
          <div className="flex items-center gap-2">
            <span className="text-white text-xs font-bold uppercase tracking-wider">Excelente 5.0</span>
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} className="w-2.5 h-2.5 rounded-full bg-[#00aa6c] inline-block border border-white/10" />
              ))}
            </div>
            <span className="text-white/60 text-xs font-medium">523 opiniones en TripAdvisor</span>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
          <div className="max-w-2xl mb-6 md:mb-0">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-white mb-4">
              {t('title')}
            </h2>
            <p className="text-white/70 text-lg font-light">
              {t('subtitle')}
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => scroll('left')}
              className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-primary-dark transition-all cursor-pointer"
              aria-label={t('ariaLabels.previous')}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-primary-dark transition-all cursor-pointer"
              aria-label={t('ariaLabels.next')}
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
          {Array.from({ length: testimonialCount }).map((_, index) => (
            <div
              key={index}
              className="snap-start shrink-0 w-[85%] sm:w-[45%] lg:w-[30%] bg-white/5 backdrop-blur-sm rounded-2xl p-7 border border-white/10 flex flex-col justify-between"
            >
              <div>
                {/* TripAdvisor Review header */}
                <div className="flex justify-between items-center mb-4">
                  {/* Green TripAdvisor bubbles */}
                  <div className="flex gap-1">
                    {Array.from({ length: testimonialRatings[index] }).map((_, i) => (
                      <span key={i} className="w-3.5 h-3.5 rounded-full bg-[#00aa6c] inline-block border border-white/20" />
                    ))}
                  </div>
                  <TripAdvisorLogo className="w-5 h-5 text-white/40" />
                </div>
                
                <h4 className="font-serif text-lg text-white mb-3 font-semibold leading-snug">
                  "{t(`items.${index}.title`)}"
                </h4>
                <p className="text-white/80 text-sm leading-relaxed mb-6 font-light">
                  {t(`items.${index}.text`)}
                </p>
              </div>
              
              <div className="border-t border-white/10 pt-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white font-bold text-sm">
                  {t(`items.${index}.name`).charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-white text-xs">{t(`items.${index}.name`)}</p>
                  <p className="text-white/50 text-[10px] uppercase tracking-wider">{t(`items.${index}.country`)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
