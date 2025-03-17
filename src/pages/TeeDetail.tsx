
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '@/components/navbar';
import ProductImage from '@/components/product/ProductImage';
import ProductInfo from '@/components/ProductInfo';
import ReviewSection from '@/components/review/ReviewSection';
import RelatedProducts from '@/components/product/RelatedProducts';
import UserGeneratedContent from '@/components/social/UserGeneratedContent';
import { FadeIn } from '@/components/ui/transitions';
import { teesProducts } from '@/lib/tees-data';
import { relatedProducts } from '@/lib/product-data';
import Footer from '@/components/layout/Footer';
import { useToast } from '@/components/ui/use-toast';
import { ScrollArea } from '@/components/ui/scroll-area';

const TeeDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  
  // Find the product - first look in the URL parameter, then default to the first product if not found
  const product = teesProducts.find(p => p.id === id) || teesProducts[0];
  
  // Image gallery - combine all variant images
  const allImages = [
    ...product.images,
    // Add more images for the black variant showing different angles
    "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
  ];
  
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
                images={allImages} 
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
        
        {/* Size Guide Section */}
        <section className="py-6">
          <div className="container mx-auto px-4 sm:px-6">
            <FadeIn>
              <h2 className="text-xl font-medium mb-4 font-playfair">Size Guide</h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-gray-800">
                      <th className="py-3 px-4 text-left text-sm font-medium">Size</th>
                      <th className="py-3 px-4 text-left text-sm font-medium">Chest (cm)</th>
                      <th className="py-3 px-4 text-left text-sm font-medium">Length (cm)</th>
                      <th className="py-3 px-4 text-left text-sm font-medium">Sleeve (cm)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-800">
                      <td className="py-3 px-4 text-sm">S</td>
                      <td className="py-3 px-4 text-sm">96</td>
                      <td className="py-3 px-4 text-sm">70</td>
                      <td className="py-3 px-4 text-sm">20</td>
                    </tr>
                    <tr className="border-b border-gray-800">
                      <td className="py-3 px-4 text-sm">M</td>
                      <td className="py-3 px-4 text-sm">100</td>
                      <td className="py-3 px-4 text-sm">72</td>
                      <td className="py-3 px-4 text-sm">21</td>
                    </tr>
                    <tr className="border-b border-gray-800">
                      <td className="py-3 px-4 text-sm">L</td>
                      <td className="py-3 px-4 text-sm">104</td>
                      <td className="py-3 px-4 text-sm">74</td>
                      <td className="py-3 px-4 text-sm">22</td>
                    </tr>
                    <tr className="border-b border-gray-800">
                      <td className="py-3 px-4 text-sm">XL</td>
                      <td className="py-3 px-4 text-sm">108</td>
                      <td className="py-3 px-4 text-sm">76</td>
                      <td className="py-3 px-4 text-sm">23</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </FadeIn>
          </div>
        </section>
        
        {/* Divider */}
        <FadeIn>
          <div className="container mx-auto px-4 sm:px-6 py-4">
            <div className="h-px bg-gray-800"></div>
          </div>
        </FadeIn>
        
        {/* Care Instructions */}
        <section className="py-6">
          <div className="container mx-auto px-4 sm:px-6">
            <FadeIn>
              <h2 className="text-xl font-medium mb-4 font-playfair">Care Instructions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-gray-800 rounded-lg p-5">
                  <h3 className="text-lg font-medium mb-3">Washing</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>Machine wash cold with similar colors</li>
                    <li>Use mild detergent</li>
                    <li>Do not bleach</li>
                    <li>Turn inside out before washing</li>
                  </ul>
                </div>
                <div className="border border-gray-800 rounded-lg p-5">
                  <h3 className="text-lg font-medium mb-3">Drying & Ironing</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>Tumble dry low</li>
                    <li>Iron on low heat if needed</li>
                    <li>Do not dry clean</li>
                    <li>Reshape when damp</li>
                  </ul>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>
        
        {/* Divider */}
        <FadeIn>
          <div className="container mx-auto px-4 sm:px-6 py-4">
            <div className="h-px bg-gray-800"></div>
          </div>
        </FadeIn>
        
        {/* User Generated Content */}
        <section>
          <div className="container mx-auto px-4 sm:px-6">
            <UserGeneratedContent productName={product.name} productId={product.id} />
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
        <RelatedProducts products={teesProducts.filter(p => p.id !== product.id).slice(0, 4)} />
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default TeeDetail;
