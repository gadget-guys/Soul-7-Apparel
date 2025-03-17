
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '@/components/navbar';
import { FadeIn } from '@/components/ui/transitions';
import HoodieCard from '@/components/product/HoodieCard';
import { hoodiesProducts } from '@/lib/hoodies-data';
import Footer from '@/components/layout/Footer';
import { isSupabaseConfigured } from '@/lib/supabase';

const Hoodies = () => {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    // Simulate loading state
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    console.log('Hoodies component mounted, path:', location.pathname);
    console.log('Hoodies data available:', hoodiesProducts.length);

    return () => clearTimeout(timer);
  }, [location]);

  // Check if Supabase is configured
  const supabaseReady = isSupabaseConfigured();

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-gray-800 border-t-primary rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-300 font-playfair">Loading hoodies...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar transparent={true} />
      
      {!supabaseReady && (
        <div className="bg-amber-600 text-white px-4 py-2 text-center">
          <p>Supabase is not configured. Some features may not work properly.</p>
        </div>
      )}
      
      <main className="pt-20">
        <div className="container mx-auto px-4 sm:px-6">
          {/* Hero Section */}
          <section className="relative h-80 md:h-96 overflow-hidden mb-12">
            <div className="absolute inset-0 z-0">
              <img 
                src="https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" 
                alt="Hoodies Collection" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30"></div>
            </div>
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center">
              <FadeIn>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold text-white mb-4">
                  Hoodies
                </h1>
                <p className="text-lg md:text-xl text-gray-100 max-w-2xl">
                  Premium comfort hoodies, designed for style and warmth
                </p>
              </FadeIn>
            </div>
          </section>
          
          {/* Product Grid */}
          <section className="py-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {hoodiesProducts.map((product, index) => (
                <HoodieCard key={product.id} product={product} index={index} />
              ))}
            </div>
            
            {/* Pagination */}
            <div className="flex justify-center mt-12">
              <div className="flex space-x-2">
                <button className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-800 text-gray-300 hover:border-primary hover:text-primary transition-colors">
                  1
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-800 text-gray-300 hover:border-primary hover:text-primary transition-colors">
                  2
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-800 text-gray-300 hover:border-primary hover:text-primary transition-colors">
                  3
                </button>
              </div>
            </div>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Hoodies;
