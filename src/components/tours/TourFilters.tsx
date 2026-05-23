'use client';

import { Search, Filter, Clock, MapPin, X } from 'lucide-react';

interface Category {
  id: string;
  name: string;
}

interface Destination {
  id: string;
  name: string;
}

interface FilterState {
  search: string;
  categories: string[];
  durations: string[];
  destinations: string[];
}

interface TourFiltersProps {
  isOpen?: boolean;
  onClose?: () => void;
  categories: Category[];
  destinations: Destination[];
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
}

const DURATION_OPTIONS = [
  { label: 'Medio día (4-6 hrs)', value: 'half' },
  { label: 'Full Day (10-14 hrs)', value: 'full' },
  { label: 'Multi-day (2+ días)', value: 'multi' },
];

export default function TourFilters({ isOpen = true, onClose, categories, destinations, filters, onFilterChange }: TourFiltersProps) {
  
  const handleSearchChange = (value: string) => {
    onFilterChange({ ...filters, search: value });
  };

  const handleCategoryToggle = (categoryName: string) => {
    const newCategories = filters.categories.includes(categoryName)
      ? filters.categories.filter(c => c !== categoryName)
      : [...filters.categories, categoryName];
    onFilterChange({ ...filters, categories: newCategories });
  };

  const handleDurationToggle = (duration: string) => {
    const newDurations = filters.durations.includes(duration)
      ? filters.durations.filter(d => d !== duration)
      : [...filters.durations, duration];
    onFilterChange({ ...filters, durations: newDurations });
  };

  const handleDestinationToggle = (destName: string) => {
    const newDestinations = filters.destinations.includes(destName)
      ? filters.destinations.filter(d => d !== destName)
      : [...filters.destinations, destName];
    onFilterChange({ ...filters, destinations: newDestinations });
  };

  const handleClear = () => {
    onFilterChange({ search: '', categories: [], durations: [], destinations: [] });
  };

  const hasActiveFilters = filters.search || filters.categories.length > 0 || filters.durations.length > 0 || filters.destinations.length > 0;

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
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-6">
          <h3 className="font-serif text-xl font-bold text-primary flex items-center">
            <Filter className="w-5 h-5 mr-2" /> Filtros
          </h3>
          <div className="flex items-center gap-3">
            {hasActiveFilters && (
              <button 
                onClick={handleClear}
                className="text-sm text-text-light hover:text-primary transition-colors"
              >
                Limpiar
              </button>
            )}
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

        {/* Search */}
        <div className="mb-8">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Buscar tour por nombre..."
              value={filters.search}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary/50 transition-all font-medium"
            />
          </div>
        </div>

        {/* Categories */}
        {categories.length > 0 && (
          <div className="mb-8">
            <h4 className="font-bold text-sm uppercase tracking-wider text-gray-400 mb-4">Categoría</h4>
            <div className="space-y-3">
              {categories.map((cat) => (
                <label key={cat.id} className="flex items-center space-x-3 cursor-pointer group py-1">
                  <input 
                    type="checkbox"
                    checked={filters.categories.includes(cat.name)}
                    onChange={() => handleCategoryToggle(cat.name)}
                    className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <span className="text-sm font-medium text-text-main group-hover:text-primary transition-colors">{cat.name}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Duration */}
        <div className="mb-8">
          <h4 className="font-bold text-sm uppercase tracking-wider text-gray-400 mb-4 flex items-center">
            <Clock className="w-4 h-4 mr-2" /> Duración
          </h4>
          <div className="space-y-3">
            {DURATION_OPTIONS.map((dur) => (
              <label key={dur.value} className="flex items-center space-x-3 cursor-pointer group py-1">
                <input 
                  type="checkbox"
                  checked={filters.durations.includes(dur.value)}
                  onChange={() => handleDurationToggle(dur.value)}
                  className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <span className="text-sm font-medium text-text-main group-hover:text-primary transition-colors">{dur.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Destinations */}
        {destinations.length > 0 && (
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider text-gray-400 mb-4 flex items-center">
              <MapPin className="w-4 h-4 mr-2" /> Destino
            </h4>
            <div className="space-y-3">
              {destinations.map((dest) => (
                <label key={dest.id} className="flex items-center space-x-3 cursor-pointer group py-1">
                  <input 
                    type="checkbox"
                    checked={filters.destinations.includes(dest.name)}
                    onChange={() => handleDestinationToggle(dest.name)}
                    className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <span className="text-sm font-medium text-text-main group-hover:text-primary transition-colors">{dest.name}</span>
                </label>
              ))}
            </div>
          </div>
        )}

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
