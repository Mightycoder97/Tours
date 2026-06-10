'use client';

import { useState } from 'react';
import { useRouter, Link } from '@/i18n/navigation';
import { Calendar as CalendarIcon, Users, MapPin, Search, MessageCircle, Compass, Tag } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function BookingWidget() {
  const t = useTranslations('home.booking');
  const router = useRouter();
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const [passengers, setPassengers] = useState('2');
  const [tripType, setTripType] = useState('');
  const [coupon, setCoupon] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (destination) params.append('q', destination);
    if (date) params.append('date', date);
    if (passengers) params.append('passengers', passengers);
    if (tripType) params.append('tripType', tripType);
    if (coupon) params.append('coupon', coupon);
    
    router.push(`/tours?${params.toString()}`);
  };

  const handleWhatsApp = (e: React.MouseEvent) => {
    e.preventDefault();
    const cleanPhone = '51955723329';
    const selectedTripType = tripType ? t(`tripTypes.${tripType}`) : 'Cualquiera';
    
    const textMessage = `¡Hola Machupicchu Travel Adventure! Me interesa planificar un viaje.\n\n` +
      `📍 Destino/Tour: ${destination || 'Por definir'}\n` +
      `📅 Fecha: ${date || 'Por definir'}\n` +
      `👥 Pasajeros: ${passengers}\n` +
      `🏔️ Tipo de viaje: ${selectedTripType}\n` +
      (coupon ? `🎫 Cupón: ${coupon}\n` : '') +
      `\n¿Tienen disponibilidad y tarifas para estas fechas?`;
      
    const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(textMessage)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="bg-white rounded-2xl sm:rounded-[1.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.12)] p-4 sm:p-5 mx-auto max-w-5xl xl:max-w-7xl relative z-20 mt-[-50px] border border-gray-100">
      {/* Upper bar with quick link to all packages */}
      <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-4">
        <Link 
          href="/tours" 
          className="text-xs sm:text-sm font-bold text-primary hover:text-primary-dark transition-colors flex items-center gap-1.5 uppercase tracking-wider"
        >
          <Compass className="w-4.5 h-4.5" />
          {t('availabilityHeader')}
        </Link>
      </div>

      <form onSubmit={handleSearch} className="flex flex-col xl:flex-row items-stretch xl:items-center divide-y xl:divide-y-0 xl:divide-x divide-gray-100 gap-2 xl:gap-0">
        
        {/* Destino / Actividad */}
        <div className="flex-1 px-4 sm:px-5 xl:px-4 py-2 sm:py-3 w-full flex items-center hover:bg-gray-50 transition-colors cursor-pointer group rounded-lg xl:rounded-none xl:rounded-l-[1rem]">
          <MapPin className="text-primary w-5 h-5 mr-3 flex-shrink-0 group-hover:scale-110 transition-transform" />
          <div className="flex flex-col w-full">
            <label htmlFor="destination" className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1 cursor-pointer">{t('destinationLabel')}</label>
            <input 
              id="destination"
              type="text" 
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder={t('destinationPlaceholder')} 
              className="w-full bg-transparent border-none outline-none text-text-main font-semibold placeholder:text-text-light placeholder:font-normal focus:ring-0 p-0 leading-tight text-sm sm:text-base xl:text-sm"
            />
          </div>
        </div>

        {/* Tipo de Viaje */}
        <div className="flex-1 px-4 sm:px-5 xl:px-4 py-2 sm:py-3 w-full flex items-center hover:bg-gray-50 transition-colors cursor-pointer group">
          <Compass className="text-primary w-5 h-5 mr-3 flex-shrink-0 group-hover:scale-110 transition-transform" />
          <div className="flex flex-col w-full">
            <label htmlFor="tripType" className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1 cursor-pointer">{t('tripTypeLabel')}</label>
            <select 
              id="tripType"
              value={tripType}
              onChange={(e) => setTripType(e.target.value)}
              className="w-full bg-transparent border-none outline-none text-text-main font-semibold focus:ring-0 p-0 leading-tight cursor-pointer appearance-none group-hover:text-primary transition-colors text-sm sm:text-base xl:text-sm"
            >
              <option value="" className="text-text-light font-normal">{t('tripTypePlaceholder')}</option>
              {['adventure', 'cultural', 'family', 'archaeological', 'private'].map(type => (
                <option key={type} value={type} className="text-text-main font-semibold">{t(`tripTypes.${type}`)}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Fechas */}
        <div className="flex-1 px-4 sm:px-5 xl:px-4 py-2 sm:py-3 w-full flex items-center hover:bg-gray-50 transition-colors cursor-pointer group">
          <CalendarIcon className="text-primary w-5 h-5 mr-3 flex-shrink-0 group-hover:scale-110 transition-transform" />
          <div className="flex flex-col w-full relative">
            <label htmlFor="date" className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1 cursor-pointer">{t('dateLabel')}</label>
            <div className="relative w-full">
              <input 
                id="date"
                type="date" 
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className={`w-full bg-transparent border-none outline-none font-semibold focus:ring-0 p-0 leading-tight appearance-none [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:cursor-pointer z-10 text-sm sm:text-base xl:text-sm ${date ? 'text-text-main' : 'text-transparent'}`}
              />
              {!date && (
                <span className="absolute inset-0 pointer-events-none text-text-main font-semibold group-hover:text-primary transition-colors flex items-center flex-1 text-sm sm:text-base xl:text-sm">
                  {t('datePlaceholder')}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Pasajeros */}
        <div className="flex-1 px-4 sm:px-5 xl:px-4 py-2 sm:py-3 w-full flex items-center hover:bg-gray-50 transition-colors cursor-pointer group">
          <Users className="text-primary w-5 h-5 mr-3 flex-shrink-0 group-hover:scale-110 transition-transform" />
          <div className="flex flex-col w-full">
            <label htmlFor="passengers" className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1 cursor-pointer">{t('passengersLabel')}</label>
            <select 
              id="passengers"
              value={passengers}
              onChange={(e) => setPassengers(e.target.value)}
              className="w-full bg-transparent border-none outline-none text-text-main font-semibold focus:ring-0 p-0 leading-tight cursor-pointer appearance-none group-hover:text-primary transition-colors text-sm sm:text-base xl:text-sm"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                <option key={num} value={num} className="text-text-main">{t('passengerOption', { count: num })}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Cupón */}
        <div className="flex-1 px-4 sm:px-5 xl:px-4 py-2 sm:py-3 w-full flex items-center hover:bg-gray-50 transition-colors cursor-pointer group rounded-lg xl:rounded-none">
          <Tag className="text-primary w-5 h-5 mr-3 flex-shrink-0 group-hover:scale-110 transition-transform" />
          <div className="flex flex-col w-full">
            <label htmlFor="coupon" className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1 cursor-pointer">{t('couponLabel')}</label>
            <input 
              id="coupon"
              type="text" 
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              placeholder={t('couponPlaceholder')} 
              className="w-full bg-transparent border-none outline-none text-text-main font-semibold placeholder:text-text-light placeholder:font-normal focus:ring-0 p-0 leading-tight text-sm sm:text-base xl:text-sm"
            />
          </div>
        </div>

        {/* Botones de Acción */}
        <div className="px-4 py-3 xl:pl-5 w-full xl:w-auto shrink-0 flex flex-col sm:flex-row xl:flex-col gap-2.5 items-stretch justify-center">
          <button 
            type="submit" 
            className="bg-primary hover:bg-primary-dark text-white rounded-full py-2 px-5 flex items-center justify-center transition-colors shadow-md gap-2 text-sm font-bold cursor-pointer min-h-[42px]"
            aria-label={t('searchAriaLabel')}
          >
            <Search className="w-4 h-4" />
            <span>{t('searchButton')}</span>
          </button>
          
          <button 
            type="button"
            onClick={handleWhatsApp}
            className="bg-green-500 hover:bg-green-600 text-white rounded-full py-2 px-5 flex items-center justify-center transition-colors shadow-md gap-2 text-sm font-bold whitespace-nowrap cursor-pointer min-h-[42px]"
          >
            <MessageCircle className="w-4 h-4" />
            <span>{t('whatsappButton')}</span>
          </button>
        </div>

      </form>
    </div>
  );
}
