'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Calendar as CalendarIcon, Users, MapPin, Search } from 'lucide-react';

export default function BookingWidget() {
  const router = useRouter();
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const [passengers, setPassengers] = useState('2');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (destination) params.append('q', destination);
    if (date) params.append('date', date);
    if (passengers) params.append('passengers', passengers);
    
    router.push(`/tours?${params.toString()}`);
  };

  return (
    <div className="bg-white rounded-2xl sm:rounded-[1.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.12)] p-3 sm:p-2 mx-auto max-w-4xl relative z-20 mt-[-50px]">
      <form onSubmit={handleSearch} className="flex flex-col md:flex-row items-stretch md:items-center divide-y md:divide-y-0 md:divide-x divide-gray-100">
        
        {/* Destino / Actividad */}
        <div className="flex-1 px-4 sm:px-6 py-3 sm:py-4 w-full flex items-center hover:bg-gray-50 md:rounded-l-[1rem] rounded-t-xl md:rounded-tr-none transition-colors cursor-pointer group">
          <MapPin className="text-primary w-5 h-5 sm:w-6 sm:h-6 mr-3 flex-shrink-0" />
          <div className="flex flex-col w-full">
            <label htmlFor="destination" className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1 cursor-pointer">Destino o Tour</label>
            <input 
              id="destination"
              type="text" 
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="¿A dónde quieres ir?" 
              className="w-full bg-transparent border-none outline-none text-text-main font-semibold placeholder:text-text-light placeholder:font-normal focus:ring-0 p-0 leading-tight text-sm sm:text-base"
            />
          </div>
        </div>

        {/* Fechas */}
        <div className="flex-1 px-4 sm:px-6 py-3 sm:py-4 w-full flex items-center hover:bg-gray-50 transition-colors cursor-pointer group">
          <CalendarIcon className="text-primary w-5 h-5 sm:w-6 sm:h-6 mr-3 flex-shrink-0" />
          <div className="flex flex-col w-full relative">
            <label htmlFor="date" className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1 cursor-pointer">Fechas</label>
            <div className="relative w-full">
              <input 
                id="date"
                type="date" 
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className={`w-full bg-transparent border-none outline-none font-semibold focus:ring-0 p-0 leading-tight appearance-none [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:cursor-pointer z-10 text-sm sm:text-base ${date ? 'text-text-main' : 'text-transparent'}`}
              />
              {!date && (
                <span className="absolute inset-0 pointer-events-none text-text-main font-semibold group-hover:text-primary transition-colors flex items-center flex-1 text-sm sm:text-base">
                  Agrega tu fecha
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Pasajeros */}
        <div className="flex-1 px-4 sm:px-6 py-3 sm:py-4 w-full flex items-center hover:bg-gray-50 transition-colors cursor-pointer group">
          <Users className="text-primary w-5 h-5 sm:w-6 sm:h-6 mr-3 flex-shrink-0" />
          <div className="flex flex-col w-full">
            <label htmlFor="passengers" className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1 cursor-pointer">Pasajeros</label>
            <select 
              id="passengers"
              value={passengers}
              onChange={(e) => setPassengers(e.target.value)}
              className="w-full bg-transparent border-none outline-none text-text-main font-semibold focus:ring-0 p-0 leading-tight cursor-pointer appearance-none group-hover:text-primary transition-colors text-sm sm:text-base"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                <option key={num} value={num} className="text-text-main">{num} Viajero{num !== 1 ? 's' : ''}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Botón Buscar */}
        <div className="px-3 sm:px-2 w-full md:w-auto pt-2 pb-1 md:pt-0 md:pb-0 shrink-0">
          <button 
            type="submit" 
            className="w-full md:w-auto bg-primary hover:bg-primary-light text-white rounded-full p-3 sm:p-4 flex items-center justify-center transition-colors shadow-lg gap-2 md:gap-0"
            aria-label="Buscar tours"
          >
            <Search className="w-5 h-5 sm:w-6 sm:h-6" />
            <span className="md:hidden font-semibold text-sm">Buscar</span>
          </button>
        </div>

      </form>
    </div>
  );
}
