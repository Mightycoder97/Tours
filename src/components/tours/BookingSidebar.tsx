'use client';

import { useState, useEffect, useRef } from 'react';
import { useCartStore } from '@/store/useCartStore';
import { useRouter } from '@/i18n/navigation';
import { Calendar as CalendarIcon, Users, Check, AlertCircle, ShoppingCart, Loader2, X } from 'lucide-react';
import { format, addDays } from 'date-fns';
import { es } from 'date-fns/locale';
import { enUS } from 'date-fns/locale/en-US';
import { useTranslations, useLocale } from 'next-intl';

interface BookingSidebarProps {
  tourId: string;
  tourName: string;
  tourSlug: string;
  priceAdult: number;
  priceChild?: number;
  imageUrl: string;
  autoOpen?: boolean;
}

export default function BookingSidebar({ tourId, tourName, tourSlug, priceAdult, priceChild: priceChildProp, imageUrl, autoOpen }: BookingSidebarProps) {
  const router = useRouter();
  const addItem = useCartStore((state) => state.addItem);
  const t = useTranslations('tours.booking');
  const tc = useTranslations('common');
  const locale = useLocale();
  const dateFnsLocale = locale === 'es' ? es : enUS;
  const sidebarRef = useRef<HTMLDivElement>(null);
  
  // States
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [isAdded, setIsAdded] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Availability states
  const [availableDates, setAvailableDates] = useState<Date[]>([]);
  const [isLoadingDates, setIsLoadingDates] = useState(true);

  // Auto-scroll on desktop or auto-open drawer on mobile when autoOpen=true
  useEffect(() => {
    if (autoOpen) {
      if (window.innerWidth < 1024) {
        setIsDrawerOpen(true);
      } else if (sidebarRef.current) {
        setTimeout(() => {
          sidebarRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 500);
      }
    }
  }, [autoOpen]);

  // Robust Body Scroll Lock for iOS Safari when mobile drawer is open
  useEffect(() => {
    if (isDrawerOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY, 10) * -1);
      }
    }
    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
    };
  }, [isDrawerOpen]);

  // Fetch availability from API
  useEffect(() => {
    async function fetchAvailability() {
      setIsLoadingDates(true);
      try {
        const res = await fetch(`/api/availability?tour_id=${tourId}`);
        const data = await res.json();
        if (data.dates && Array.isArray(data.dates)) {
          const dates = data.dates
            .filter((s: { spots_left: number }) => s.spots_left > 0)
            .map((s: { date: string }) => new Date(s.date));
          setAvailableDates(dates.length > 0 ? dates : fallbackDates());
        } else {
          setAvailableDates(fallbackDates());
        }
      } catch {
        setAvailableDates(fallbackDates());
      } finally {
        setIsLoadingDates(false);
      }
    }
    fetchAvailability();
  }, [tourId]);

  function fallbackDates() {
    return Array.from({ length: 14 }, (_, i) => addDays(new Date(), i + 1)).filter(d => d.getDay() !== 0);
  }

  const childPrice = priceChildProp ?? Math.round(priceAdult * 0.7);
  const totalPrice = (adults * priceAdult) + (children * childPrice);

  const handleBook = () => {
    if (!selectedDate) {
      setErrorMsg(t('selectDateError'));
      setIsDrawerOpen(true);
      return;
    }
    
    setErrorMsg('');
    setIsAdded(false);
    
    addItem({
      tourId,
      tourName,
      tourSlug,
      date: selectedDate.toISOString(),
      adults,
      children,
      pricePerAdult: priceAdult,
      pricePerChild: childPrice,
      totalPrice,
      imageUrl
    });

    setIsAdded(true);
    setTimeout(() => {
      setIsDrawerOpen(false);
      router.push('/cart');
    }, 1000);
  };

  // Reusable Calendar Content
  const renderCalendar = () => (
    <div className="mb-6">
      <label className="font-bold text-sm uppercase tracking-wider text-gray-500 mb-3 flex items-center">
        <CalendarIcon className="w-4 h-4 mr-2" /> {t('departureDate')}
      </label>
      
      {isLoadingDates ? (
        <div className="flex items-center justify-center py-8 text-gray-400">
          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
          <span className="text-sm">{t('loadingAvailability')}</span>
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-2">
          {availableDates.slice(0, 12).map((dt, idx) => {
            const isSelected = selectedDate?.toDateString() === dt.toDateString();
            
            return (
              <button
                key={idx}
                onClick={() => setSelectedDate(dt)}
                className={`p-2 flex flex-col items-center justify-center rounded-lg border text-xs transition-all ${
                  isSelected 
                    ? 'border-primary-dark bg-primary-dark text-white font-bold shadow-md' 
                    : 'border-gray-200 text-text-main hover:border-primary-dark hover:text-primary-dark cursor-pointer'
                }`}
              >
                <span className="mb-1 leading-none">{format(dt, 'EEEEEE', { locale: dateFnsLocale }).toUpperCase()}</span>
                <span className="text-lg leading-none">{format(dt, 'd')}</span>
                <span className="leading-none">{format(dt, 'MMM', { locale: dateFnsLocale }).toUpperCase()}</span>
              </button>
            )
          })}
        </div>
      )}
      {!selectedDate && <p className="text-xs text-text-light mt-3 italic">{t('selectDateHint')}</p>}
    </div>
  );

  // Reusable Passenger Selector Content
  const renderPassengers = () => (
    <div className="mb-8">
      <label className="font-bold text-sm uppercase tracking-wider text-gray-500 mb-4 flex items-center">
        <Users className="w-4 h-4 mr-2" /> {t('passengersAndClasses')}
      </label>

      <div className="space-y-4">
        {/* Adults */}
        <div className="flex justify-between items-center border border-gray-200 rounded-lg p-3">
           <div>
             <p className="text-sm font-bold text-text-main">{t('adults')}</p>
             <p className="text-xs text-text-light">{t('pricePerUnit', { price: priceAdult })}</p>
           </div>
           <div className="flex items-center space-x-3 bg-gray-50 rounded-lg p-1 border border-gray-100">
             <button 
               onClick={() => setAdults(Math.max(1, adults - 1))}
               className="w-9 h-9 flex items-center justify-center font-bold text-lg text-primary bg-white rounded shadow-sm hover:bg-gray-100 active:scale-95 transition-transform"
             >-</button>
             <span className="font-bold text-text-main w-4 text-center">{adults}</span>
             <button 
               onClick={() => setAdults(adults + 1)}
               className="w-9 h-9 flex items-center justify-center font-bold text-lg text-primary bg-white rounded shadow-sm hover:bg-gray-100 active:scale-95 transition-transform"
             >+</button>
           </div>
        </div>

        {/* Children */}
        <div className="flex justify-between items-center border border-gray-200 rounded-lg p-3">
           <div>
             <p className="text-sm font-bold text-text-main">{t('children')}</p>
             <p className="text-xs text-text-light">{t('pricePerUnit', { price: childPrice })}</p>
           </div>
           <div className="flex items-center space-x-3 bg-gray-50 rounded-lg p-1 border border-gray-100">
             <button 
               onClick={() => setChildren(Math.max(0, children - 1))}
               className="w-9 h-9 flex items-center justify-center font-bold text-lg text-primary bg-white rounded shadow-sm hover:bg-gray-100 active:scale-95 transition-transform"
             >-</button>
             <span className="font-bold text-text-main w-4 text-center">{children}</span>
             <button 
               onClick={() => setChildren(children + 1)}
               className="w-9 h-9 flex items-center justify-center font-bold text-lg text-primary bg-white rounded shadow-sm hover:bg-gray-100 active:scale-95 transition-transform"
             >+</button>
           </div>
        </div>
      </div>
    </div>
  );

  // Reusable Summary Card
  const renderSummary = () => (
    <div className="border-t border-gray-100 pt-6 mb-6">
      <div className="flex justify-between items-center bg-gray-50 p-4 rounded-xl" aria-live="polite" aria-atomic="true">
         <span className="font-bold text-text-main">{t('totalToPay')}</span>
         <span className="font-serif text-xl sm:text-2xl font-bold text-primary-dark">{tc('currency')} {totalPrice}</span>
      </div>
    </div>
  );

  return (
    <>
      {/* ── Desktop Sidebar View ─────────────────────────────────────────── */}
      <div ref={sidebarRef} className="hidden lg:block bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] p-5 sm:p-6 lg:sticky lg:top-24 border border-gray-100">
        <div className="flex justify-between items-end border-b border-gray-100 pb-4 mb-6">
          <div>
            <span className="text-xs uppercase text-gray-400 font-bold tracking-wider block mb-1">{t('pricePerAdultFrom')}</span>
            <div className="text-2xl sm:text-3xl font-bold text-primary-dark">
              <span className="text-base sm:text-lg font-medium text-text-light mr-1">{tc('currency')}</span>
              {priceAdult}
            </div>
          </div>
        </div>

        {renderCalendar()}
        {renderPassengers()}
        {renderSummary()}

        {errorMsg && (
          <div className="flex items-center text-red-500 text-sm mb-4 bg-red-50 p-3 rounded-lg border border-red-100">
            <AlertCircle className="w-4 h-4 mr-2 flex-shrink-0" />
            {errorMsg}
          </div>
        )}

        <button 
          onClick={handleBook}
          className={`w-full py-4 rounded-full font-bold text-lg transition-all items-center justify-center shadow-lg hover:shadow-xl disabled:opacity-60 disabled:cursor-not-allowed ${
            isAdded ? 'bg-green-500 text-white' : 'bg-primary-dark hover:bg-primary text-white'
          }`}
        >
          {isAdded ? (
            <><Check className="w-5 h-5 mr-2" /> {t('addedToCart')}</>
          ) : (
            t('bookNow')
          )}
        </button>

        <div className="mt-4 text-center">
          <p className="text-xs text-gray-400">{t('confirmationNote')}</p>
        </div>
      </div>

      {/* ── Mobile Slide-up Bottom Sheet Drawer ─────────────────────────── */}
      {isDrawerOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/60 z-50 transition-opacity duration-300"
          onClick={() => setIsDrawerOpen(false)}
        />
      )}

      <div 
        className={`lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-3xl shadow-[0_-8px_30px_rgb(0,0,0,0.15)] transition-transform duration-300 ease-in-out max-h-[80vh] overflow-y-auto ${
          isDrawerOpen ? 'translate-y-0' : 'translate-y-full'
        }`}
        style={{ paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 88px)' }}
      >
        {/* Mobile Drawer Header */}
        <div className="flex items-center justify-between border-b border-gray-100 p-5 sticky top-0 bg-white z-10">
          <div>
            <h3 className="font-serif text-lg font-bold text-primary-dark line-clamp-1">{tourName}</h3>
            <p className="text-xs text-text-light">{t('departureDate')}</p>
          </div>
          <button 
            onClick={() => setIsDrawerOpen(false)}
            className="p-2 hover:bg-gray-50 rounded-full transition-colors w-12 h-12 flex items-center justify-center shrink-0 active:scale-95"
            aria-label={tc('close') || 'Cerrar'}
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        {/* Mobile Drawer Body */}
        <div className="p-5">
          {renderCalendar()}
          {renderPassengers()}
          {renderSummary()}

          {errorMsg && (
            <div className="flex items-center text-red-500 text-sm mb-4 bg-red-50 p-3 rounded-lg border border-red-100">
              <AlertCircle className="w-4 h-4 mr-2 flex-shrink-0" />
              {errorMsg}
            </div>
          )}

          <div className="text-center text-xs text-gray-400 mb-2">
            {t('confirmationNote')}
          </div>
        </div>
      </div>

      {/* ── Mobile Sticky Bottom CTA Bar ───────────────────────────────── */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-250 shadow-[0_-4px_20px_rgb(0,0,0,0.08)] px-4 py-3 pb-[calc(env(safe-area-inset-bottom,0px)+12px)]">
        <div className="flex items-center gap-3 max-w-lg mx-auto">
          <div className="flex-1">
            <p className="text-xs text-gray-500 leading-none mb-1">{t('from')}</p>
            <p className="text-xl font-bold text-primary-dark leading-none">
              <span className="text-xs font-medium text-text-light mr-1">{tc('currency')}</span>
              {totalPrice}
            </p>
          </div>
          <button 
            onClick={isDrawerOpen ? handleBook : () => setIsDrawerOpen(true)}
            className={`flex-1 py-3.5 rounded-full font-bold text-base transition-all flex items-center justify-center active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed ${
              isAdded ? 'bg-green-500 text-white' : 'bg-primary-dark text-white active:bg-primary-dark shadow-md'
            }`}
          >
            {isAdded ? (
              <><Check className="w-5 h-5 mr-2" /> {t('addedToCartShort')}</>
            ) : isDrawerOpen ? (
              t('bookNow')
            ) : (
              <><ShoppingCart className="w-5 h-5 mr-2" /> {t('bookNowShort')}</>
            )}
          </button>
        </div>
      </div>
    </>
  );
}
