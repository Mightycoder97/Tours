import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Clock, Star } from 'lucide-react';

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
}

export default function TourCard({ tour }: { tour: TourProps }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-50 flex flex-col h-full transition-all duration-300 transform hover:-translate-y-1">
      {/* Img Header */}
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        {tour.tag && (
          <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-primary shadow-sm tracking-wider">
            {tour.tag}
          </div>
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
            <Clock className="w-4 h-4 mr-1 text-accent" />
            {tour.duration}
          </div>
          {tour.rating && (
            <div className="flex items-center font-bold text-primary">
              <Star className="w-4 h-4 text-accent fill-accent mr-1" />
              {tour.rating} <span className="text-text-light font-normal ml-1">({tour.reviews})</span>
            </div>
          )}
        </div>

        <h3 className="text-xl font-serif font-bold text-primary mb-2 line-clamp-2 hover:text-accent transition-colors">
          <Link href={`/tours/${tour.slug}`}>
            {tour.title}
          </Link>
        </h3>
        
        <div className="mt-auto pt-6 flex items-center justify-between border-t border-gray-100">
          <div>
            <span className="text-xs uppercase text-gray-400 font-bold tracking-wider block mb-1">Desde</span>
            <div className="text-2xl font-bold text-primary">
              <span className="text-sm font-medium text-text-light mr-1">USD</span>
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
