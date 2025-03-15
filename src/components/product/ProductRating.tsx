
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProductRatingProps {
  rating: number;
  reviewCount: number;
  size?: number;
}

const ProductRating = ({ rating, reviewCount, size = 14 }: ProductRatingProps) => {
  return (
    <div className="flex text-yellow-400">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star 
          key={i} 
          size={size} 
          className={cn(
            i >= Math.round(rating) && "text-gray-600"
          )} 
          fill="currentColor" 
        />
      ))}
      <span className="ml-1 text-xs text-gray-400">
        ({reviewCount})
      </span>
    </div>
  );
};

export default ProductRating;
