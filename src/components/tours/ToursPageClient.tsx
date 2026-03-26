'use client';

import { useState } from 'react';
import TourFilters from '@/components/tours/TourFilters';
import TourCard from '@/components/tours/TourCard';
import { Filter } from 'lucide-react';

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
}

export default function ToursPageClient({ tours }: { tours: Tour[] }) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  return (
    <div className="container mx-auto px-4 lg:px-8">
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        
        {/* Mobile Filter Toggle */}
        <div className="lg:hidden w-full flex items-center justify-between">
          <button 
            onClick={() => setIsFilterOpen(true)}
            className="flex items-center gap-2 bg-white border border-gray-200 rounded-full px-5 py-3 text-sm font-semibold text-primary shadow-sm active:scale-95 transition-transform"
          >
            <Filter className="w-4 h-4" /> Filtros
          </button>
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-text-light">Ordenar:</span>
            <select className="bg-white border text-sm font-medium border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-primary cursor-pointer text-text-main">
              <option>Recomendados</option>
              <option>Menor Precio</option>
              <option>Mayor Precio</option>
              <option>Mejor Valorados</option>
            </select>
          </div>
        </div>

        {/* Sidebar — hidden on mobile, shown as drawer when triggered */}
        <aside className="hidden lg:block w-full lg:w-1/4 lg:sticky lg:top-24">
          <TourFilters />
        </aside>

        {/* Mobile Filter Drawer */}
        <div className="lg:hidden">
          <TourFilters isOpen={isFilterOpen} onClose={() => setIsFilterOpen(false)} />
        </div>

        {/* Main Content (Grid) */}
        <main className="w-full lg:w-3/4">
          
          {/* Desktop sort bar */}
          <div className="hidden lg:flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-text-main">
              Mostrando <span className="text-primary">{tours.length}</span> resultados
            </h2>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-text-light">Ordenar por:</span>
              <select className="bg-white border text-sm font-medium border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:border-primary cursor-pointer text-text-main">
                <option>Recomendados</option>
                <option>Menor Precio</option>
                <option>Mayor Precio</option>
                <option>Mejor Valorados</option>
              </select>
            </div>
          </div>

          {/* Mobile result count */}
          <p className="lg:hidden text-sm text-text-light mb-4">
            <span className="font-bold text-primary">{tours.length}</span> resultados encontrados
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
            {tours.map((tour) => (
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

          {/* Pagination */}
          <div className="mt-12 flex justify-center">
            <div className="flex space-x-2">
              <button className="w-10 h-10 flex items-center justify-center rounded-full bg-primary text-white font-bold">1</button>
              <button className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 hover:border-primary text-text-main transition-colors">2</button>
              <button className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 hover:border-primary text-text-main transition-colors">3</button>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}
