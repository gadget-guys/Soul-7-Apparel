
import { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { FadeIn } from '@/components/ui/transitions';
import { Product } from '@/lib/product-data';
import ProductCard from './ProductCard';

interface RelatedProductsProps {
  products: Product[];
}

const RelatedProducts = ({ products }: RelatedProductsProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setScrollPosition(scrollLeft);
      setMaxScroll(scrollWidth - clientWidth);
    }
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.clientWidth * 0.8;
      scrollContainerRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.clientWidth * 0.8;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-12">
      <div className="container">
        <div className="flex justify-between items-center mb-6">
          <FadeIn>
            <h2 className="text-2xl font-medium font-playfair text-primary">You May Also Like</h2>
          </FadeIn>
          
          <FadeIn delay={100}>
            <NavigationControls 
              onScrollLeft={scrollLeft}
              onScrollRight={scrollRight}
              canScrollLeft={scrollPosition > 0}
              canScrollRight={scrollPosition < maxScroll}
            />
          </FadeIn>
        </div>
        
        <div
          ref={scrollContainerRef}
          className="flex space-x-6 overflow-x-auto pb-4 snap-x scrollbar-hide"
          onScroll={handleScroll}
        >
          {products.map((product, index) => (
            <div 
              key={product.id} 
              className="min-w-[250px] w-[250px] snap-start"
            >
              <ProductCard product={product} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

interface NavigationControlsProps {
  onScrollLeft: () => void;
  onScrollRight: () => void;
  canScrollLeft: boolean;
  canScrollRight: boolean;
}

const NavigationControls = ({ 
  onScrollLeft, 
  onScrollRight, 
  canScrollLeft, 
  canScrollRight 
}: NavigationControlsProps) => (
  <div className="flex space-x-2">
    <button
      onClick={onScrollLeft}
      disabled={!canScrollLeft}
      className="p-2 rounded-full border border-gray-700 hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      aria-label="Scroll left"
    >
      <ChevronLeft size={20} className="text-gray-300" />
    </button>
    <button
      onClick={onScrollRight}
      disabled={!canScrollRight}
      className="p-2 rounded-full border border-gray-700 hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      aria-label="Scroll right"
    >
      <ChevronRight size={20} className="text-gray-300" />
    </button>
  </div>
);

export default RelatedProducts;
