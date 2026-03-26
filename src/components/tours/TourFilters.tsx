'use client';

import { Search, Filter, Clock, MapPin, X } from 'lucide-react';

interface TourFiltersProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function TourFilters({ isOpen = true, onClose }: TourFiltersProps) {
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && onClose && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/40 z-40 transition-opacity"
          onClick={onClose}
        />
      )}

      <div className={`
        lg:relative lg:bg-white lg:rounded-xl lg:shadow-sm lg:border lg:border-gray-100 lg:p-6 lg:sticky lg:top-24 lg:block
        ${onClose ? `
          fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-2xl shadow-[0_-8px_30px_rgb(0,0,0,0.12)] 
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-y-0' : 'translate-y-full'}
          max-h-[85vh] overflow-y-auto p-6 pb-8
          lg:translate-y-0 lg:max-h-none lg:rounded-xl lg:shadow-sm lg:fixed-auto
        ` : 'bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-24'}
      `}>
        {/* Mobile Header */}
        <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-6">
          <h3 className="font-serif text-xl font-bold text-primary flex items-center">
            <Filter className="w-5 h-5 mr-2" /> Filtros
          </h3>
          <div className="flex items-center gap-3">
            <button className="text-sm text-text-light hover:text-primary transition-colors">
              Limpiar
            </button>
            {onClose && (
              <button 
                onClick={onClose} 
                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="Cerrar filtros"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            )}
          </div>
        </div>

        {/* Buscar */}
        <div className="mb-8">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Buscar tour por nombre..."
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all font-medium"
            />
          </div>
        </div>

        {/* Categorías */}
        <div className="mb-8">
          <h4 className="font-bold text-sm uppercase tracking-wider text-gray-400 mb-4">Categoría</h4>
          <div className="space-y-3">
            {['Aventura', 'Cultural', 'Gastronómico', 'Montaña', 'Ciudad', 'Premium'].map((cat) => (
              <label key={cat} className="flex items-center space-x-3 cursor-pointer group py-1">
                <input 
                  type="checkbox" 
                  className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <span className="text-sm font-medium text-text-main group-hover:text-primary transition-colors">{cat}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Duración */}
        <div className="mb-8">
          <h4 className="font-bold text-sm uppercase tracking-wider text-gray-400 mb-4 flex items-center">
            <Clock className="w-4 h-4 mr-2" /> Duración
          </h4>
          <div className="space-y-3">
            {['Medio día (4-6 hrs)', 'Full Day (10-14 hrs)', 'Multi-day (2+ días)'].map((dur) => (
              <label key={dur} className="flex items-center space-x-3 cursor-pointer group py-1">
                <input 
                  type="checkbox" 
                  className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <span className="text-sm font-medium text-text-main group-hover:text-primary transition-colors">{dur}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Destino */}
        <div>
          <h4 className="font-bold text-sm uppercase tracking-wider text-gray-400 mb-4 flex items-center">
            <MapPin className="w-4 h-4 mr-2" /> Destino
          </h4>
          <div className="space-y-3">
            {['Cusco Centro', 'Valle Sagrado', 'Machu Picchu', 'Ruta Sur'].map((dest) => (
              <label key={dest} className="flex items-center space-x-3 cursor-pointer group py-1">
                <input 
                  type="checkbox" 
                  className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <span className="text-sm font-medium text-text-main group-hover:text-primary transition-colors">{dest}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Mobile Apply Button */}
        {onClose && (
          <div className="lg:hidden mt-6 pt-4 border-t border-gray-100">
            <button 
              onClick={onClose}
              className="w-full bg-primary text-white py-4 rounded-full font-bold text-base active:scale-95 transition-transform"
            >
              Aplicar Filtros
            </button>
          </div>
        )}
      </div>
    </>
  );
}
