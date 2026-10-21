'use client';

import { useState } from 'react';
import FeaturedToursGrid from './FeaturedToursGrid';

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
      {/* Modern Pill Switcher Tabs Header */}
      <div className="flex justify-center mb-10 overflow-x-auto whitespace-nowrap scrollbar-hide -mx-4 px-4">
        <div className="inline-flex bg-cream p-1.5 rounded-2xl border border-primary/15 gap-1.5">
          <button
            onClick={() => setActiveTab('recommended')}
            className={`py-2.5 px-5 text-xs sm:text-sm rounded-xl transition-all cursor-pointer font-bold tracking-wide ${
              activeTab === 'recommended' 
                ? 'bg-primary text-white shadow-md shadow-primary/30' 
                : 'text-secondary hover:text-primary'
            }`}
          >
            Recomendados
          </button>
          <button
            onClick={() => setActiveTab('individual')}
            className={`py-2.5 px-5 text-xs sm:text-sm rounded-xl transition-all cursor-pointer font-bold tracking-wide ${
              activeTab === 'individual' 
                ? 'bg-primary text-white shadow-md shadow-primary/30' 
                : 'text-secondary hover:text-primary'
            }`}
          >
            Individuales
          </button>
          <button
            onClick={() => setActiveTab('promotions')}
            className={`py-2.5 px-5 text-xs sm:text-sm rounded-xl transition-all cursor-pointer font-bold tracking-wide ${
              activeTab === 'promotions' 
                ? 'bg-primary text-white shadow-md shadow-primary/30' 
                : 'text-secondary hover:text-primary'
            }`}
          >
            Promociones
          </button>
        </div>
      </div>

      <FeaturedToursGrid tours={filtered} />
    </div>
  );
}
