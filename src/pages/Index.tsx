
import { useState, useEffect } from 'react';
import Navbar from '@/components/navbar';
import ProductImage from '@/components/product/ProductImage';
import ProductInfo from '@/components/ProductInfo';
import ReviewSection from '@/components/review/ReviewSection';
import RelatedProducts from '@/components/product/RelatedProducts';
import { FadeIn } from '@/components/ui/transitions';
import { featuredProduct, relatedProducts } from '@/lib/product-data';
import Footer from '@/components/layout/Footer';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading state
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-gray-800 border-t-primary rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-300 font-playfair">Loading product...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar transparent={true} />
      
      <main className="pt-20">
        {/* Product Section */}
        <section className="py-10">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="grid lg:grid-cols-2 gap-10 xl:gap-20">
              <ProductImage 
                images={featuredProduct.images} 
                productName={featuredProduct.name} 
              />
              
              <ProductInfo product={featuredProduct} />
            </div>
          </div>
        </section>
        
        {/* Divider */}
        <FadeIn>
          <div className="container mx-auto px-4 sm:px-6 py-4">
            <div className="h-px bg-gray-800"></div>
          </div>
        </FadeIn>
        
        {/* Reviews Section */}
        <div className="container mx-auto px-4 sm:px-6">
          <ReviewSection 
            reviews={featuredProduct.reviews}
            totalRating={featuredProduct.rating}
            reviewCount={featuredProduct.reviewCount}
          />
        </div>
        
        {/* Divider */}
        <FadeIn>
          <div className="container mx-auto px-4 sm:px-6 py-4">
            <div className="h-px bg-gray-800"></div>
          </div>
        </FadeIn>
        
        {/* Related Products */}
        <RelatedProducts products={relatedProducts} />
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
