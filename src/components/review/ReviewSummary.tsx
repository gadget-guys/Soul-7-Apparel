
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RatingDistribution {
  rating: number;
  count: number;
  percentage: number;
}

interface ReviewSummaryProps {
  totalRating: number;
  reviewCount: number;
  ratingDistribution: RatingDistribution[];
  activeFilter: number | null;
  onFilterChange: (rating: number | null) => void;
}

const ReviewSummary = ({ 
  totalRating, 
  reviewCount, 
  ratingDistribution,
  activeFilter,
  onFilterChange
}: ReviewSummaryProps) => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="text-5xl font-medium mb-2 font-playfair">{totalRating.toFixed(1)}</div>
        <div className="flex justify-center mb-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star 
              key={i} 
              size={18} 
              className={cn(
                "text-yellow-400",
                i >= Math.round(totalRating) && "text-gray-600"
              )} 
              fill={i < Math.round(totalRating) ? "currentColor" : "none"}
            />
          ))}
        </div>
        <div className="text-sm text-gray-400">{reviewCount} reviews</div>
      </div>
      
      <div className="space-y-2">
        {ratingDistribution.map((item) => (
          <button
            key={item.rating}
            onClick={() => onFilterChange(activeFilter === item.rating ? null : item.rating)}
            className={cn(
              "w-full flex items-center text-sm hover:bg-secondary/50 px-2 py-1 rounded transition-colors",
              activeFilter === item.rating && "bg-secondary"
            )}
          >
            <div className="flex items-center w-10">
              <span>{item.rating}</span>
              <Star size={12} className="ml-0.5 text-yellow-400" fill="currentColor" />
            </div>
            <div className="flex-1 mx-2 h-2 rounded-full bg-gray-800 overflow-hidden">
              <div 
                className="h-full bg-yellow-400 rounded-full"
                style={{ width: `${item.percentage}%` }}
              ></div>
            </div>
            <div className="w-8 text-right text-gray-400">{item.count}</div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ReviewSummary;
