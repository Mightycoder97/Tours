'use client';

import { useState } from 'react';
import { ChevronDown, HelpCircle, MessageCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { ProtectedImage } from '@/components/ui/ProtectedImage';
import { Link } from '@/i18n/navigation';

const faqCount = 7;

export default function FAQ() {
  const t = useTranslations('home.faq');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-20 lg:py-28 bg-cream/60">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left Column: Visual Photo Card + Direct Help CTA */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-extrabold text-secondary mb-4 tracking-tight leading-tight">
              {t('title')}
            </h2>
            <p className="text-text-light text-base sm:text-lg mb-8">
              {t('subtitle')}
            </p>

            {/* Featured Photo Card */}
            <div className="relative rounded-[28px] overflow-hidden shadow-xl border-4 border-white aspect-[4/3]">
              <ProtectedImage
                src="/tours/cusco/valle-sagrado-tradicional/01.jpg"
                alt="Valle Sagrado Cusco"
                fill
                className="object-cover"
                showCopyright={false}
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-secondary/95 via-secondary/40 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <p className="font-serif font-bold text-lg sm:text-xl leading-snug mb-3">
                  ¿Necesitas armar un itinerario a medida con tus amigos o pareja?
                </p>
                <Link
                  href="/contacto"
                  className="inline-flex items-center gap-2 bg-white text-secondary hover:bg-primary hover:text-white px-5 py-2.5 rounded-full text-xs sm:text-sm font-extrabold transition-colors shadow-md"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Hablar con un asesor</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column: Modern Pill Accordions */}
          <div className="lg:col-span-7 space-y-3.5">
            {Array.from({ length: faqCount }).map((_, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={index}
                  className={`rounded-[22px] overflow-hidden transition-all duration-300 border ${
                    isOpen
                      ? 'bg-white border-primary shadow-[0_12px_30px_rgba(139,102,232,0.14)]'
                      : 'bg-white/80 border-gray-200/80 hover:border-primary/40'
                  }`}
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="w-full flex items-center justify-between p-5 sm:p-6 text-left transition-colors cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <span className={`font-extrabold text-base sm:text-lg pr-4 transition-colors ${isOpen ? 'text-primary' : 'text-secondary'}`}>
                      {t(`items.${index}.question`)}
                    </span>
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                        isOpen ? 'bg-primary text-white rotate-180' : 'bg-cream text-secondary'
                      }`}
                    >
                      <ChevronDown className="w-5 h-5" />
                    </div>
                  </button>
                  <div
                    className={`grid transition-all duration-300 ease-in-out ${
                      isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-5 sm:px-6 pb-6 text-text-light text-sm sm:text-base leading-relaxed">
                        {t(`items.${index}.answer`)}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}

