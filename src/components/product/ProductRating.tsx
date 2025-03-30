
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProductRatingProps {
  rating: number;
  reviewCount: number;
  size?: number;
}

const ProductRating = ({ rating, reviewCount, size = 14 }: ProductRatingProps) => {
  return (
    <div className="flex items-center">
      <div className="flex text-yellow-400">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star 
            key={i} 
            size={size} 
            className={cn(
              i < Math.floor(rating) ? "text-yellow-400" : "text-gray-600",
              "fill-current"
            )}
          />
        ))}
      </div>
      <span className="ml-2 text-sm text-gray-400">
        {rating} ({reviewCount} reviews)
      </span>
    </div>
  );
};

export default ProductRating;
