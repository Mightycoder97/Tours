'use client';

import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import { ArrowRight, Clock } from 'lucide-react';
import StarRating from '@/components/ui/StarRating';
import { useTranslations } from 'next-intl';

interface TourProps {
  id: string;
  title: string;
  slug: string;
  image: string;
  price: number;
  duration: string;
  tag?: string;
  rating?: number;
  reviews?: number;
  discount?: number;
}

export default function TourCard({ tour }: { tour: TourProps }) {
  const t = useTranslations('tours.card');
  const tc = useTranslations('common');

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-50 flex flex-col h-full transition-all duration-300 transform hover:-translate-y-1">
      {/* Img Header */}
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        {tour.tag && (
          <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-primary shadow-sm tracking-wider">
            {tour.tag}
          </div>
        )}
        {tour.discount && tour.discount > 0 && (
          <span className="absolute top-4 right-4 z-10 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold">
            {t('off', { percent: tour.discount })}
          </span>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 z-10 transition-opacity duration-300"></div>
        <Image 
          src={tour.image} 
          alt={tour.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover w-full h-full"
        />
      </div>

      {/* Body */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center justify-between mb-3 text-sm text-text-light font-medium">
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1 text-primary" />
            {tour.duration}
          </div>
          {tour.rating && (
            <div className="flex items-center gap-1">
              <StarRating rating={tour.rating} size="sm" />
              <span className="text-text-light font-normal text-xs ml-1">({tour.reviews})</span>
            </div>
          )}
        </div>

        <h3 className="text-xl font-serif text-text-main mb-2 line-clamp-2 hover:text-primary transition-colors">
          <Link href={`/tours/${tour.slug}`}>
            {tour.title}
          </Link>
        </h3>
        
        <div className="mt-auto pt-6 flex items-center justify-between border-t border-gray-100">
          <div>
            <span className="text-xs uppercase text-gray-400 font-bold tracking-wider block mb-1">{t('from')}</span>
            <div className="text-2xl font-bold text-primary-dark">
              <span className="text-sm font-medium text-text-light mr-1">{tc('currency')}</span>
              {tour.price}
            </div>
          </div>
          
          <Link 
            href={`/tours/${tour.slug}`}
            className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all group"
          >
            <ArrowRight className="w-5 h-5 group-hover:block" />
          </Link>
        </div>
      </div>
    </div>
  );
}

