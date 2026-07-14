'use client';

import { useState, useMemo } from 'react';
import TourFilters from '@/components/tours/TourFilters';
import TourCard from '@/components/tours/TourCard';
import { Filter, MessageCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

interface Tour {
  id: string;
  title: string;
  slug: string;
  image_url: string;
  price_adult: number;
  duration: string;
  tag?: string;
  rating?: number;
  reviews_count?: number;
  category_id?: string;
  destination_id?: string;
  categories?: { name: string };
  destinations?: { name: string };
}

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

const TOURS_PER_PAGE = 12;

export default function ToursPageClient({ 
  tours, 
  categories = [], 
  destinations = [],
  initialSearch = '',
  initialDestino,
}: { 
  tours: Tour[]; 
  categories?: Category[]; 
  destinations?: Destination[];
  initialSearch?: string;
  initialDestino?: string;
}) {
  const t = useTranslations('tours.listing');
  const tf = useTranslations('tours.filters');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    search: initialSearch,
    categories: [],
    durations: [],
    // Pre-select destination from URL param (e.g. ?destino=lima from navbar)
    // The filter comparison is case-insensitive so 'lima' matches 'Lima'
    destinations: initialDestino ? [initialDestino] : [],
  });
  const [sortBy, setSortBy] = useState('recommended');
  const [currentPage, setCurrentPage] = useState(1);

  // Apply filters
  const filteredTours = useMemo(() => {
    let result = [...tours];

    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(t => 
        t.title.toLowerCase().includes(searchLower) ||
        (t.tag && t.tag.toLowerCase().includes(searchLower))
      );
    }

    // Category filter
    if (filters.categories.length > 0) {
      result = result.filter(t => {
        const tourCategory = t.categories?.name || t.tag || '';
        return filters.categories.some(c => tourCategory.toLowerCase().includes(c.toLowerCase()));
      });
    }

    // Duration filter
    if (filters.durations.length > 0) {
      result = result.filter(t => {
        const dur = t.duration?.toLowerCase() || '';
        return filters.durations.some(d => {
          if (d === 'half') return dur.includes('medio') || dur.includes('half') || (parseInt(dur) >= 4 && parseInt(dur) <= 6);
          if (d === 'full') return dur.includes('full') || dur.includes('completo') || (parseInt(dur) >= 10 && parseInt(dur) <= 14);
          if (d === 'multi') return dur.includes('multi') || dur.includes('día') || parseInt(dur) > 14;
          return false;
        });
      });
    }

    // Destination filter  
    if (filters.destinations.length > 0) {
      result = result.filter(t => {
        const tourDest = t.destinations?.name || '';
        return filters.destinations.some(d => tourDest.toLowerCase().includes(d.toLowerCase()));
      });
    }

    // Sort
    switch (sortBy) {
      case 'price_asc':
        result.sort((a, b) => a.price_adult - b.price_adult);
        break;
      case 'price_desc':
        result.sort((a, b) => b.price_adult - a.price_adult);
        break;
      case 'rating':
        result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
    }

    return result;
  }, [tours, filters, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredTours.length / TOURS_PER_PAGE);
  const paginatedTours = filteredTours.slice(
    (currentPage - 1) * TOURS_PER_PAGE,
    currentPage * TOURS_PER_PAGE
  );

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset to page 1 on filter change
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
    setCurrentPage(1);
  };

  const whatsappNumber = '51955723329';
  const whatsappMsg = encodeURIComponent('¡Hola Machupicchu Travel Adventure! Estoy viendo la lista de tours y me gustaría solicitar información.');
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMsg}`;

  return (
    <div className="container mx-auto px-4 lg:px-8">
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        
        {/* Mobile Filter Toggle */}
        <div className="lg:hidden w-full flex items-center justify-between">
          <button 
            onClick={() => setIsFilterOpen(true)}
            className="flex items-center gap-2 bg-white border border-gray-200 rounded-full px-5 py-3 text-sm font-semibold text-primary shadow-sm active:scale-95 transition-transform"
          >
            <Filter className="w-4 h-4" /> {tf('title')}
            {(filters.categories.length > 0 || filters.destinations.length > 0 || filters.durations.length > 0) && (
              <span className="bg-primary text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {filters.categories.length + filters.destinations.length + filters.durations.length}
              </span>
            )}
          </button>
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-text-light">{t('sortLabelShort')}</span>
            <select 
              value={sortBy}
              onChange={(e) => handleSortChange(e.target.value)}
              className="bg-white border text-sm font-medium border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-primary cursor-pointer text-text-main"
            >
              <option value="recommended">{t('sortOptions.recommended')}</option>
              <option value="price_asc">{t('sortOptions.priceLow')}</option>
              <option value="price_desc">{t('sortOptions.priceHigh')}</option>
              <option value="rating">{t('sortOptions.topRated')}</option>
            </select>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="hidden lg:block w-full lg:w-1/4 lg:sticky lg:top-24">
          <TourFilters 
            categories={categories}
            destinations={destinations}
            filters={filters}
            onFilterChange={handleFilterChange}
          />
        </aside>

        {/* Mobile Filter Drawer */}
        <div className="lg:hidden">
          <TourFilters 
            isOpen={isFilterOpen} 
            onClose={() => setIsFilterOpen(false)} 
            categories={categories}
            destinations={destinations}
            filters={filters}
            onFilterChange={handleFilterChange}
          />
        </div>

        {/* Main Content */}
        <main className="w-full lg:w-3/4">
          
          {/* Desktop sort bar */}
          <div className="hidden lg:flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-text-main">
              {t('showingResults', { count: filteredTours.length })}
            </h2>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-text-light">{t('sortLabel')}</span>
              <select 
                value={sortBy}
                onChange={(e) => handleSortChange(e.target.value)}
                className="bg-white border text-sm font-medium border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:border-primary cursor-pointer text-text-main"
              >
                <option value="recommended">{t('sortOptions.recommended')}</option>
                <option value="price_asc">{t('sortOptions.priceLow')}</option>
                <option value="price_desc">{t('sortOptions.priceHigh')}</option>
                <option value="rating">{t('sortOptions.topRated')}</option>
              </select>
            </div>
          </div>

          {/* Mobile result count */}
          <p className="lg:hidden text-sm text-text-light mb-4">
            {t('resultsFound', { count: filteredTours.length })}
          </p>

          {filteredTours.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-text-main mb-2">{t('noToursFound')}</h3>
              <p className="text-text-light mb-4">{t('noToursHint')}</p>
              <button 
                onClick={() => handleFilterChange({ search: '', categories: [], durations: [], destinations: [] })}
                className="text-primary font-semibold hover:underline"
              >
                {t('clearFilters')}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
              {paginatedTours.map((tour) => (
                <TourCard key={tour.id} tour={{
                  id: tour.id,
                  title: tour.title,
                  slug: tour.slug,
                  image: tour.image_url,
                  price: tour.price_adult,
                  duration: tour.duration,
                  tag: tour.tag,
                  // @ts-ignore - location may not be in type yet
                  location: (tour as { location?: string }).location,
                  destination: tour.destinations?.name,
                  rating: tour.rating,
                  reviews: tour.reviews_count
                }} />
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-12 flex justify-center">
              <div className="flex space-x-2">
                {currentPage > 1 && (
                  <button 
                    onClick={() => { setCurrentPage(currentPage - 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className="px-4 h-10 flex items-center justify-center rounded-full border border-gray-200 hover:border-primary-dark text-text-main transition-colors text-sm font-medium"
                  >
                    {t('pagination.previous')}
                  </button>
                )}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button 
                    key={page}
                    onClick={() => { setCurrentPage(page); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className={`w-10 h-10 flex items-center justify-center rounded-full font-bold transition-colors ${
                      page === currentPage 
                        ? 'bg-primary-dark text-white' 
                        : 'border border-gray-200 hover:border-primary-dark text-text-main'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                {currentPage < totalPages && (
                  <button 
                    onClick={() => { setCurrentPage(currentPage + 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className="px-4 h-10 flex items-center justify-center rounded-full border border-gray-200 hover:border-primary-dark text-text-main transition-colors text-sm font-medium"
                  >
                    {t('pagination.next')}
                  </button>
                )}
              </div>
            </div>
          )}

        </main>
      </div>

      {/* TripAdvisor Review Section */}
      <section className="mt-16 md:mt-24 max-w-4xl mx-auto bg-white rounded-2xl border border-gray-150 p-6 md:p-10 shadow-sm flex flex-col md:flex-row gap-6 md:gap-10 items-center md:items-start">
        {/* Left Side: Badge */}
        <div className="flex flex-col items-center shrink-0 border-b md:border-b-0 md:border-r border-gray-100 pb-6 md:pb-0 md:pr-10 w-full md:w-auto">
          <div className="flex items-center gap-1.5 mb-2">
            <span className="font-sans font-bold text-xl tracking-tight text-text-main">Tripadvisor</span>
          </div>
          <div className="flex gap-1 mb-2">
            {[1, 2, 3, 4, 5].map((s) => (
              <span key={s} className="w-5 h-5 rounded-full bg-green-500 inline-block"></span>
            ))}
          </div>
          <span className="text-xs text-text-light font-medium uppercase tracking-wider">Excelente</span>
        </div>
        
        {/* Right Side: Quote Content */}
        <div className="flex-1 text-center md:text-left">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-3 gap-1">
            <h4 className="font-serif text-lg font-bold text-text-main">“Una experiencia cómoda e ilustrativa”</h4>
            <span className="text-xs text-text-light">Leonardo Q. • Colombia</span>
          </div>
          <p className="text-text-light text-sm sm:text-base leading-relaxed font-light">
            Esta experiencia está muy bien organizada, muy cómoda y puntual. Jazmine fue muy amable con nosotros, teniendo en cuenta que viajábamos con una adulta mayor. Su calidez y cercanía nos facilitó el tránsito en el servicio bimodal.
          </p>
        </div>
      </section>

      {/* Train WhatsApp CTA Section */}
      <section className="relative max-w-4xl mx-auto w-full aspect-[4/3] sm:aspect-[16/10] md:aspect-[16/9] rounded-3xl overflow-hidden mt-16 md:mt-24 group flex items-center justify-center shadow-md">
        {/* Background Image */}
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="/imagenes/tren-machupicchu.png?v=2"
            alt="Tren a Machu Picchu"
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 1024px) 100vw, 896px"
          />
        </div>
        {/* Dark overlay - show by default on mobile, only on hover on desktop */}
        <div className="absolute inset-0 bg-black/60 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Content - show by default on mobile, only on hover on desktop */}
        <div className="relative z-10 max-w-2xl px-6 py-8 text-center opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-serif text-white mb-4 drop-shadow-md leading-tight">
            Descubre el Perú con nosotros
          </h2>
          <p className="text-white/95 text-xs sm:text-sm md:text-base font-light mb-6 md:mb-8 drop-shadow-sm max-w-xl mx-auto leading-relaxed">
            Tu próxima aventura comienza aquí. Explora nuestros paquetes turísticos y elige la experiencia ideal para descubrir la riqueza natural, cultural e histórica del Perú.
          </p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 bg-[#25D366] hover:bg-[#20BA59] text-white py-3 sm:py-3.5 px-6 sm:px-8 rounded-full font-bold text-xs sm:text-base shadow-lg transition-all active:scale-95 cursor-pointer border-none"
          >
            <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>Contáctanos al WhatsApp</span>
          </a>
        </div>
      </section>

    </div>
  );
}
