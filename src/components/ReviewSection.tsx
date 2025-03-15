
import { useState } from 'react';
import { Star, ThumbsUp, Filter, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FadeIn, StaggeredChildren } from '@/components/ui/transitions';
import { cn } from '@/lib/utils';
import { Review } from '@/lib/product-data';

interface ReviewSectionProps {
  reviews: Review[];
  totalRating: number;
  reviewCount: number;
}

const ReviewSection = ({ reviews, totalRating, reviewCount }: ReviewSectionProps) => {
  const [activeFilter, setActiveFilter] = useState<number | null>(null);
  
  const handleFilterByRating = (rating: number | null) => {
    setActiveFilter(rating);
  };
  
  const filteredReviews = activeFilter 
    ? reviews.filter(review => review.rating === activeFilter) 
    : reviews;
  
  const ratingDistribution = Array.from({ length: 5 }, (_, i) => {
    const ratingValue = 5 - i;
    const count = reviews.filter(review => review.rating === ratingValue).length;
    const percentage = (count / reviews.length) * 100;
    
    return { rating: ratingValue, count, percentage };
  });

  return (
    <section className="py-12">
      <FadeIn>
        <h2 className="text-2xl font-medium mb-8">Customer Reviews</h2>
      </FadeIn>
      
      <div className="grid md:grid-cols-[300px_1fr] gap-10">
        {/* Review Summary */}
        <FadeIn delay={100}>
          <div className="space-y-6">
            <div className="text-center">
              <div className="text-5xl font-medium mb-2">{totalRating.toFixed(1)}</div>
              <div className="flex justify-center mb-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star 
                    key={i} 
                    size={18} 
                    className={cn(
                      "text-yellow-400",
                      i >= Math.round(totalRating) && "text-gray-200"
                    )} 
                    fill={i < Math.round(totalRating) ? "currentColor" : "none"}
                  />
                ))}
              </div>
              <div className="text-sm text-gray-500">{reviewCount} reviews</div>
            </div>
            
            <div className="space-y-2">
              {ratingDistribution.map((item) => (
                <button
                  key={item.rating}
                  onClick={() => handleFilterByRating(activeFilter === item.rating ? null : item.rating)}
                  className={cn(
                    "w-full flex items-center text-sm hover:bg-secondary/50 px-2 py-1 rounded transition-colors",
                    activeFilter === item.rating && "bg-secondary"
                  )}
                >
                  <div className="flex items-center w-10">
                    <span>{item.rating}</span>
                    <Star size={12} className="ml-0.5 text-yellow-400" fill="currentColor" />
                  </div>
                  <div className="flex-1 mx-2 h-2 rounded-full bg-gray-100 overflow-hidden">
                    <div 
                      className="h-full bg-yellow-400 rounded-full"
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                  <div className="w-8 text-right text-gray-500">{item.count}</div>
                </button>
              ))}
            </div>
            
            <Button className="w-full">
              <MessageCircle size={16} className="mr-2" />
              Write a Review
            </Button>
          </div>
        </FadeIn>
        
        {/* Reviews List */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <FadeIn>
              <div className="text-sm text-gray-500">
                {activeFilter 
                  ? `Showing ${filteredReviews.length} reviews with ${activeFilter} stars` 
                  : `Showing all ${reviews.length} reviews`}
              </div>
            </FadeIn>
            
            <FadeIn delay={100}>
              <Button variant="outline" size="sm" className="text-xs" onClick={() => handleFilterByRating(null)}>
                <Filter size={14} className="mr-1" />
                {activeFilter ? "Clear Filter" : "Filter"}
              </Button>
            </FadeIn>
          </div>
          
          {filteredReviews.length === 0 ? (
            <FadeIn>
              <div className="text-center py-10">
                <div className="text-lg font-medium mb-2">No reviews with this rating</div>
                <p className="text-gray-500">Try selecting a different rating or view all reviews.</p>
              </div>
            </FadeIn>
          ) : (
            <StaggeredChildren staggerDelay={100} initialDelay={200} className="space-y-6">
              {filteredReviews.map((review) => (
                <div key={review.id} className="border-b border-gray-100 pb-6">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <div className="font-medium">{review.author}</div>
                      <div className="text-sm text-gray-500 flex items-center">
                        {review.date}
                        {review.verified && (
                          <span className="ml-2 bg-green-50 text-green-600 text-xs px-1.5 py-0.5 rounded flex items-center">
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
                            i >= review.rating && "text-gray-200"
                          )} 
                          fill={i < review.rating ? "currentColor" : "none"}
                        />
                      ))}
                    </div>
                  </div>
                  
                  <h3 className="font-medium mb-2">{review.title}</h3>
                  <p className="text-gray-600 mb-3">{review.content}</p>
                  
                  <button className="flex items-center text-sm text-gray-500 hover:text-gray-700">
                    <ThumbsUp size={14} className="mr-1" />
                    Helpful
                  </button>
                </div>
              ))}
            </StaggeredChildren>
          )}
          
          {reviews.length > filteredReviews.length && (
            <FadeIn delay={300 + filteredReviews.length * 100}>
              <div className="mt-8 text-center">
                <Button variant="outline" onClick={() => handleFilterByRating(null)}>
                  Show All Reviews
                </Button>
              </div>
            </FadeIn>
          )}
        </div>
      </div>
    </section>
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

export default ReviewSection;
