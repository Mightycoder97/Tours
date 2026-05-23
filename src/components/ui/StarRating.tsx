import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: 'sm' | 'md';
  showValue?: boolean;
}

export default function StarRating({ rating, maxRating = 5, size = 'sm', showValue = false }: StarRatingProps) {
  const sizeClass = size === 'sm' ? 'w-3.5 h-3.5' : 'w-5 h-5';
  
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: maxRating }).map((_, i) => (
        <Star
          key={i}
          className={`${sizeClass} ${
            i < Math.floor(rating)
              ? 'fill-yellow-400 text-yellow-400'
              : i < rating
              ? 'fill-yellow-400/50 text-yellow-400'
              : 'fill-gray-200 text-gray-200'
          }`}
        />
      ))}
      {showValue && (
        <span className="text-xs font-bold text-text-main ml-1">{rating.toFixed(1)}</span>
      )}
    </div>
  );
}
