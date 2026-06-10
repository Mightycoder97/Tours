'use client';

import { useState } from 'react';
import FeaturedToursCarousel from './FeaturedToursCarousel';

interface Tour {
  id: string;
  slug: string;
  title: string;
  description?: string;
  image_url: string;
  price_adult: number;
  tag?: string;
}

interface FeaturedToursTabsProps {
  tours: Tour[];
}

export default function FeaturedToursTabs({ tours }: FeaturedToursTabsProps) {
  const [activeTab, setActiveTab] = useState<'recommended' | 'individual' | 'promotions'>('recommended');
  
  // Filter tours based on active tab
  const getFilteredTours = () => {
    switch (activeTab) {
      case 'recommended':
        // Filter by tag containing rec/pop/destacado
        const rec = tours.filter(t => 
          t.tag?.toLowerCase().includes('rec') || 
          t.tag?.toLowerCase().includes('pop') || 
          t.tag?.toLowerCase().includes('destacado') ||
          !t.tag // Fallback for items with no tag
        );
        return rec.length > 0 ? rec : tours;
      case 'individual':
        // Filter by tag 'individual' or if category is not group (mocked logic or fallback)
        const ind = tours.filter(t => 
          t.tag?.toLowerCase().includes('ind') || 
          t.tag?.toLowerCase().includes('aventura') ||
          !t.tag?.toLowerCase().includes('grup')
        );
        return ind.length > 0 ? ind : tours;
      case 'promotions':
        // Filter by tag 'promoción', 'promo', 'off'
        const promo = tours.filter(t => 
          t.tag?.toLowerCase().includes('prom') || 
          t.tag?.toLowerCase().includes('off') || 
          t.tag?.toLowerCase().includes('descuento') ||
          t.tag?.toLowerCase().includes('oferta')
        );
        return promo.length > 0 ? promo : tours;
      default:
        return tours;
    }
  };

  const filtered = getFilteredTours();

  return (
    <div>
      {/* Tabs Header */}
      <div className="flex justify-center border-b border-gray-100 mb-8 overflow-x-auto whitespace-nowrap scrollbar-hide -mx-4 px-4 gap-2 sm:gap-6">
        <button
          onClick={() => setActiveTab('recommended')}
          className={`py-3 px-4 font-serif text-base sm:text-lg border-b-2 transition-all cursor-pointer font-medium tracking-wide uppercase ${
            activeTab === 'recommended' 
              ? 'border-primary text-primary font-bold' 
              : 'border-transparent text-text-light hover:text-text-main'
          }`}
        >
          PAQUETES RECOMENDADOS
        </button>
        <button
          onClick={() => setActiveTab('individual')}
          className={`py-3 px-4 font-serif text-base sm:text-lg border-b-2 transition-all cursor-pointer font-medium tracking-wide uppercase ${
            activeTab === 'individual' 
              ? 'border-primary text-primary font-bold' 
              : 'border-transparent text-text-light hover:text-text-main'
          }`}
        >
          PAQUETES INDIVIDUALES
        </button>
        <button
          onClick={() => setActiveTab('promotions')}
          className={`py-3 px-4 font-serif text-base sm:text-lg border-b-2 transition-all cursor-pointer font-medium tracking-wide uppercase ${
            activeTab === 'promotions' 
              ? 'border-primary text-primary font-bold' 
              : 'border-transparent text-text-light hover:text-text-main'
          }`}
        >
          PROMOCIONES
        </button>
      </div>

      <FeaturedToursCarousel tours={filtered} />
    </div>
  );
}
