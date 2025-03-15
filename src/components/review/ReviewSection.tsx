
import { useState } from 'react';
import { Filter, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FadeIn, StaggeredChildren } from '@/components/ui/transitions';
import { cn } from '@/lib/utils';
import { Review } from '@/lib/product-data';
import ReviewSummary from './ReviewSummary';
import ReviewItem from './ReviewItem';

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
        <h2 className="text-2xl font-medium mb-8 font-playfair text-yellow-400">Customer Reviews</h2>
      </FadeIn>
      
      <div className="grid md:grid-cols-[300px_1fr] gap-10">
        {/* Review Summary */}
        <FadeIn delay={100}>
          <div className="space-y-6">
            <ReviewSummary 
              totalRating={totalRating} 
              reviewCount={reviewCount} 
              ratingDistribution={ratingDistribution}
              activeFilter={activeFilter}
              onFilterChange={handleFilterByRating}
            />
            
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
              <div className="text-sm text-gray-400">
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
                <div className="text-lg font-medium font-playfair mb-2">No reviews with this rating</div>
                <p className="text-gray-400">Try selecting a different rating or view all reviews.</p>
              </div>
            </FadeIn>
          ) : (
            <StaggeredChildren staggerDelay={100} initialDelay={200} className="space-y-6">
              {filteredReviews.map((review) => (
                <ReviewItem key={review.id} review={review} />
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

export default ReviewSection;
