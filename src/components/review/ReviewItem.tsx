
import { Star, ThumbsUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Review } from '@/lib/product-data';

interface ReviewItemProps {
  review: Review;
}

const ReviewItem = ({ review }: ReviewItemProps) => {
  return (
    <div className="border-b border-gray-800 pb-6">
      <div className="flex justify-between items-start mb-3">
        <div>
          <div className="font-medium">{review.author}</div>
          <div className="text-sm text-gray-400 flex items-center">
            {review.date}
            {review.verified && (
              <span className="ml-2 bg-green-900 text-green-400 text-xs px-1.5 py-0.5 rounded flex items-center">
                <Check size={10} className="mr-0.5" />
                Verified
              </span>
            )}
          </div>
        </div>
        <div className="flex">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star 
              key={i} 
              size={14} 
              className={cn(
                "text-yellow-400",
                i >= review.rating && "text-gray-600"
              )} 
              fill={i < review.rating ? "currentColor" : "none"}
            />
          ))}
        </div>
      </div>
      
      <h3 className="font-medium font-playfair mb-2">{review.title}</h3>
      <p className="text-gray-300 mb-3">{review.content}</p>
      
      <button className="flex items-center text-sm text-gray-400 hover:text-gray-300">
        <ThumbsUp size={14} className="mr-1" />
        Helpful
      </button>
    </div>
  );
};

const Check = ({ size, className }: { size: number; className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export default ReviewItem;
