'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Sparkles, Clock, ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

interface Tour {
  id: string;
  title: string;
  slug: string;
  image_url: string;
  price_adult: number;
  duration: string;
  tag?: string;
}

interface BlogSidebarClientProps {
  tours: Tour[];
}

export default function BlogSidebarClient({ tours }: BlogSidebarClientProps) {
  const t = useTranslations('pages.blog');
  const [selectedTicketOption, setSelectedTicketOption] = useState<'yes' | 'no' | null>(null);

  const handleTicketContinue = () => {
    if (!selectedTicketOption) return;
    
    const whatsappNumber = '51955723329';
    const message = selectedTicketOption === 'yes'
      ? t('ticketWidget.whatsappYes')
      : t('ticketWidget.whatsappNo');

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <aside className="w-full lg:w-1/3 space-y-8 lg:sticky lg:top-24 h-fit">
      
      {/* 1. Ticket Callout Widget */}
      <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm text-center">
        <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-500 flex items-center justify-center mx-auto mb-3">
          <Sparkles className="w-5.5 h-5.5" />
        </div>
        <h3 className="text-xl font-serif text-text-main mb-2">
          {t('ticketWidget.title')}
        </h3>
        <p className="text-text-light text-xs font-light mb-6 leading-relaxed">
          {t('ticketWidget.subtitle')}
        </p>

        <div className="flex flex-col gap-3 mb-6">
          {/* Card A: Yes */}
          <button
            onClick={() => setSelectedTicketOption('yes')}
            className={`p-4 rounded-xl border text-left flex items-start gap-3 transition-all active:scale-[0.99] cursor-pointer ${
              selectedTicketOption === 'yes'
                ? 'border-primary bg-primary/5 ring-1 ring-primary'
                : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
          >
            <span className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
              selectedTicketOption === 'yes' ? 'border-primary bg-primary text-white text-[8px]' : 'border-gray-300'
            }`}>
              {selectedTicketOption === 'yes' && '✓'}
            </span>
            <div>
              <h4 className="font-bold text-xs text-text-main mb-0.5">{t('ticketWidget.optionYes')}</h4>
              <p className="text-[10px] text-text-light font-light leading-normal">{t('ticketWidget.optionYesSub')}</p>
            </div>
          </button>

          {/* Card B: No */}
          <button
            onClick={() => setSelectedTicketOption('no')}
            className={`p-4 rounded-xl border text-left flex items-start gap-3 transition-all active:scale-[0.99] cursor-pointer ${
              selectedTicketOption === 'no'
                ? 'border-primary bg-primary/5 ring-1 ring-primary'
                : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
          >
            <span className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
              selectedTicketOption === 'no' ? 'border-primary bg-primary text-white text-[8px]' : 'border-gray-300'
            }`}>
              {selectedTicketOption === 'no' && '✓'}
            </span>
            <div>
              <h4 className="font-bold text-xs text-text-main mb-0.5">{t('ticketWidget.optionNo')}</h4>
              <p className="text-[10px] text-text-light font-light leading-normal">{t('ticketWidget.optionNoSub')}</p>
            </div>
          </button>
        </div>

        <button
          onClick={handleTicketContinue}
          disabled={!selectedTicketOption}
          className={`w-full py-3 px-6 rounded-full font-bold transition-all shadow-sm text-xs sm:text-sm ${
            selectedTicketOption
              ? 'bg-primary-dark hover:bg-primary text-white cursor-pointer active:scale-95'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          {t('ticketWidget.continue')}
        </button>
      </div>

      {/* 2. Recommended Tours */}
      {tours.length > 0 && (
        <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm">
          <h3 className="text-lg font-serif text-text-main mb-4 pb-2 border-b border-gray-100">
            {t('recommendedTours')}
          </h3>
          <div className="space-y-4">
            {tours.slice(0, 3).map((tour) => (
              <div key={tour.id} className="flex gap-3 items-center group">
                <div className="relative w-18 h-18 rounded-lg overflow-hidden shrink-0 bg-gray-100">
                  <Image
                    src={tour.image_url || '/placeholder-tour.jpg'}
                    alt={tour.title}
                    fill
                    className="object-cover"
                    sizes="72px"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-xs text-text-main line-clamp-2 group-hover:text-primary transition-colors leading-tight mb-1">
                    <Link href={`/tours/${tour.slug}`}>
                      {tour.title}
                    </Link>
                  </h4>
                  <div className="flex items-center gap-1.5 text-[10px] text-text-light mb-1">
                    <Clock className="w-3 h-3 text-primary-light" />
                    <span>{tour.duration}</span>
                  </div>
                  <div className="text-xs font-bold text-primary-dark">
                    USD {tour.price_adult}
                  </div>
                </div>
                <Link
                  href={`/tours/${tour.slug}`}
                  className="w-7 h-7 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-colors"
                  aria-label={t('viewTour')}
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

    </aside>
  );
}
