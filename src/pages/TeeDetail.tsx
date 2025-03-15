
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '@/components/navbar';
import ProductImage from '@/components/product/ProductImage';
import ProductInfo from '@/components/ProductInfo';
import ReviewSection from '@/components/review/ReviewSection';
import RelatedProducts from '@/components/product/RelatedProducts';
import { FadeIn } from '@/components/ui/transitions';
import { teesProducts } from '@/lib/tees-data';
import { relatedProducts } from '@/lib/product-data';
import Footer from '@/components/layout/Footer';
import { useToast } from '@/components/ui/use-toast';

const TeeDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  
  const product = teesProducts.find(p => p.id === id);
  
  useEffect(() => {
    // Simulate loading state
    const timer = setTimeout(() => {
      setIsLoading(false);
      
      if (!product) {
        toast({
          title: "Product not found",
          description: "The requested product could not be found.",
          variant: "destructive"
        });
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [id, product, toast]);

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
  
  if (!product) {
    return (
      <div className="min-h-screen">
        <Navbar transparent={true} />
        <main className="pt-20">
          <div className="container mx-auto px-4 sm:px-6 py-16 text-center">
            <h1 className="text-3xl font-playfair mb-4">Product Not Found</h1>
            <p className="text-gray-400 mb-8">The product you're looking for doesn't exist or has been removed.</p>
          </div>
        </main>
        <Footer />
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
                images={product.images} 
                productName={product.name} 
              />
              
              <ProductInfo product={product} />
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
            reviews={product.reviews}
            totalRating={product.rating}
            reviewCount={product.reviewCount}
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

export default TeeDetail;
