
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '@/components/navbar';
import ProductImage from '@/components/product/ProductImage';
import ProductInfo from '@/components/ProductInfo';
import ReviewSection from '@/components/review/ReviewSection';
import RelatedProducts from '@/components/product/RelatedProducts';
import { FadeIn } from '@/components/ui/transitions';
import { hatsProducts } from '@/lib/hats-data';
import Footer from '@/components/layout/Footer';
import { useToast } from '@/components/ui/use-toast';

const HatDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  
  // Find the product - first look in the URL parameter, then default to the first product if not found
  const product = hatsProducts.find(p => p.id === id) || hatsProducts[0];
  
  // Image gallery - combine all variant images
  const allImages = [
    ...product.images,
    // Add more images for different angles if needed
    "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
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
                      <th className="py-3 px-4 text-left text-sm font-medium">Head Circumference (cm)</th>
                      <th className="py-3 px-4 text-left text-sm font-medium">Height (cm)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-800">
                      <td className="py-3 px-4 text-sm">S/M</td>
                      <td className="py-3 px-4 text-sm">54-57</td>
                      <td className="py-3 px-4 text-sm">10</td>
                    </tr>
                    <tr className="border-b border-gray-800">
                      <td className="py-3 px-4 text-sm">L/XL</td>
                      <td className="py-3 px-4 text-sm">58-61</td>
                      <td className="py-3 px-4 text-sm">12</td>
                    </tr>
                    <tr className="border-b border-gray-800">
                      <td className="py-3 px-4 text-sm">One Size</td>
                      <td className="py-3 px-4 text-sm">55-59</td>
                      <td className="py-3 px-4 text-sm">11</td>
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
                    <li>Hand wash in cold water</li>
                    <li>Use mild detergent</li>
                    <li>Do not bleach</li>
                    <li>Air dry flat</li>
                  </ul>
                </div>
                <div className="border border-gray-800 rounded-lg p-5">
                  <h3 className="text-lg font-medium mb-3">Storage</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>Store in a cool, dry place</li>
                    <li>Use a hat rack or stand to maintain shape</li>
                    <li>Avoid direct sunlight</li>
                    <li>Do not fold or crush</li>
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
        <RelatedProducts products={hatsProducts.filter(p => p.id !== product.id).slice(0, 4)} />
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HatDetail;
