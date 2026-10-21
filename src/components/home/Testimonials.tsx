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
    <section className="bg-secondary py-20 lg:py-28 relative overflow-hidden">
      {/* Vibrant Violet & Petrol Mesh Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 -left-20 w-[420px] h-[420px] rounded-full bg-primary/35 blur-[110px]" />
        <div className="absolute -bottom-24 right-0 w-[500px] h-[500px] rounded-full bg-primary/25 blur-[130px]" />
      </div>
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
          <div className="max-w-2xl mb-6 md:mb-0">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-extrabold text-white mb-4 tracking-tight">
              {t('title')}
            </h2>
            <p className="text-white/75 text-base sm:text-lg">
              {t('subtitle')}
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => scroll('left')}
              className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-primary hover:border-primary transition-all cursor-pointer"
              aria-label={t('ariaLabels.previous')}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-12 h-12 rounded-2xl bg-primary border border-primary flex items-center justify-center text-white hover:bg-white hover:text-secondary transition-all cursor-pointer shadow-lg shadow-primary/30"
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
              className="snap-start shrink-0 w-[85%] sm:w-[45%] lg:w-[31%] bg-white rounded-[28px] p-7 border border-white/20 shadow-[0_14px_35px_rgba(0,0,0,0.2)] flex flex-col justify-between hover:-translate-y-1 transition-transform duration-300"
            >
              <div>
                {/* Review header */}
                <div className="flex justify-between items-center mb-5">
                  <div className="flex gap-1.5 bg-cream px-3 py-1.5 rounded-full">
                    {Array.from({ length: testimonialRatings[index] }).map((_, i) => (
                      <span key={i} className="w-3 h-3 rounded-full bg-primary inline-block" />
                    ))}
                  </div>
                  <TripAdvisorLogo className="w-5 h-5 text-secondary/40" />
                </div>
                
                <h4 className="font-serif text-lg sm:text-xl text-secondary mb-3 font-extrabold leading-snug">
                  &ldquo;{t(`items.${index}.title`)}&rdquo;
                </h4>
                <p className="text-text-light text-sm leading-relaxed mb-6">
                  {t(`items.${index}.text`)}
                </p>
              </div>
              
              <div className="border-t border-gray-100 pt-4 flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-2xl bg-primary text-white flex items-center justify-center font-extrabold text-sm shadow-md shadow-primary/25">
                  {t(`items.${index}.name`).charAt(0)}
                </div>
                <div>
                  <p className="font-extrabold text-secondary text-sm">{t(`items.${index}.name`)}</p>
                  <p className="text-primary text-[11px] font-bold uppercase tracking-wider">{t(`items.${index}.country`)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
