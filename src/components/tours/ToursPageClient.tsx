'use client';

import { useState, useMemo } from 'react';
import TourFilters from '@/components/tours/TourFilters';
import TourCard from '@/components/tours/TourCard';
import { Filter } from 'lucide-react';
import { useTranslations } from 'next-intl';

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
  initialSearch = '' 
}: { 
  tours: Tour[]; 
  categories?: Category[]; 
  destinations?: Destination[];
  initialSearch?: string;
}) {
  const t = useTranslations('tours.listing');
  const tf = useTranslations('tours.filters');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    search: initialSearch,
    categories: [],
    durations: [],
    destinations: [],
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
    </div>
  );
}
