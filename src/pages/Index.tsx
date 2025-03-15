
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import ProductImage from '@/components/ProductImage';
import ProductInfo from '@/components/ProductInfo';
import ReviewSection from '@/components/ReviewSection';
import RelatedProducts from '@/components/RelatedProducts';
import { FadeIn } from '@/components/ui/transitions';
import { featuredProduct, relatedProducts } from '@/lib/product-data';

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
      <footer className="bg-gray-900 py-12">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-medium mb-4 text-white font-playfair">AUDIOPHILE</h3>
              <p className="text-sm text-gray-400 mb-4">
                Premium audio products for the discerning listener. Experience sound as it was meant to be heard.
              </p>
              <div className="text-sm text-gray-500">
                &copy; {new Date().getFullYear()} Audiophile. All rights reserved.
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-4 text-sm text-white font-playfair">Shop</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-400 hover:text-gray-300">Headphones</a></li>
                <li><a href="#" className="text-gray-400 hover:text-gray-300">Speakers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-gray-300">Earbuds</a></li>
                <li><a href="#" className="text-gray-400 hover:text-gray-300">Accessories</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-4 text-sm text-white font-playfair">Support</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-400 hover:text-gray-300">Contact Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-gray-300">FAQ</a></li>
                <li><a href="#" className="text-gray-400 hover:text-gray-300">Shipping</a></li>
                <li><a href="#" className="text-gray-400 hover:text-gray-300">Returns</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-4 text-sm text-white font-playfair">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-400 hover:text-gray-300">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-gray-300">Sustainability</a></li>
                <li><a href="#" className="text-gray-400 hover:text-gray-300">Press</a></li>
                <li><a href="#" className="text-gray-400 hover:text-gray-300">Careers</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
