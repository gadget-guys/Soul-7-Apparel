
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/navbar';
import { FadeIn } from '@/components/ui/transitions';
import TeeCard from '@/components/product/TeeCard';
import { teesProducts } from '@/lib/tees-data';
import Footer from '@/components/layout/Footer';

const Tees = () => {
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
          <p className="mt-4 text-gray-300 font-playfair">Loading tees...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar transparent={true} />
      
      <main className="pt-20">
        <div className="container mx-auto px-4 sm:px-6">
          {/* Hero Section */}
          <section className="relative h-80 md:h-96 overflow-hidden mb-12">
            <div className="absolute inset-0 z-0">
              <img 
                src="public/lovable-uploads/e50416c5-cb3d-4d08-a15a-f8283eedbd6b.png" 
                alt="T-shirts Collection" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30"></div>
            </div>
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center">
              <FadeIn>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold text-white mb-4">
                  T-Shirts
                </h1>
                <p className="text-lg md:text-xl text-gray-100 max-w-2xl">
                  Premium quality essentials, designed for everyday comfort
                </p>
              </FadeIn>
            </div>
          </section>
          
          {/* Product Grid */}
          <section className="py-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {teesProducts.map((product, index) => (
                <TeeCard key={product.id} product={product} index={index} />
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

export default Tees;
