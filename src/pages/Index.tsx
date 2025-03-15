
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { FadeIn, SlideIn } from '@/components/ui/transitions';
import { ArrowRight, User, ShoppingBag, Baby, Package, Star } from 'lucide-react';

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
          <p className="mt-4 text-gray-300 font-playfair">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar transparent={true} />
      
      <main className="pt-16">
        {/* Men's Section */}
        <section className="relative h-screen">
          <div className="absolute inset-0 overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" 
              alt="Men's Collection" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent"></div>
          </div>
          
          <div className="relative h-full container mx-auto px-4 sm:px-6 flex flex-col justify-end pb-24">
            <FadeIn delay={300}>
              <div className="flex items-center gap-2 text-primary mb-2">
                <User className="h-5 w-5" />
                <span className="uppercase tracking-wider text-sm font-semibold">Men</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-playfair text-white mb-4">Men's Collection</h2>
              <p className="text-gray-300 mb-6 max-w-md">Premium quality essentials designed for the modern man.</p>
              <div className="flex space-x-4">
                <Button asChild variant="outline" className="border-white text-white hover:bg-white hover:text-black rounded-none">
                  <Link to="/mens/tees">Shop Now <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
              </div>
            </FadeIn>
          </div>
        </section>
        
        {/* Women's Section */}
        <section className="relative h-screen">
          <div className="absolute inset-0 overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1618244972963-dbee1a7edc95?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" 
              alt="Women's Collection" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/70"></div>
          </div>
          
          <div className="relative h-full container mx-auto px-4 sm:px-6 flex flex-col justify-end items-end pb-24">
            <SlideIn delay={300}>
              <div className="flex items-center gap-2 text-primary mb-2 justify-end">
                <span className="uppercase tracking-wider text-sm font-semibold">Women</span>
                <User className="h-5 w-5" />
              </div>
              <h2 className="text-4xl md:text-6xl font-playfair text-white mb-4 text-right">Women's Collection</h2>
              <p className="text-gray-300 mb-6 max-w-md text-right">Elegant and versatile pieces designed for style and comfort.</p>
              <div className="flex space-x-4">
                <Button asChild variant="outline" className="border-white text-white hover:bg-white hover:text-black rounded-none">
                  <Link to="/womens/tees">Shop Now <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
              </div>
            </SlideIn>
          </div>
        </section>
        
        {/* Kids' Section */}
        <section className="relative h-screen">
          <div className="absolute inset-0 overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1622782262245-bfb660a7b1a3?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" 
              alt="Kids Collection" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70"></div>
          </div>
          
          <div className="relative h-full container mx-auto px-4 sm:px-6 flex flex-col justify-end pb-24">
            <FadeIn delay={300}>
              <div className="flex items-center gap-2 text-primary mb-2">
                <Baby className="h-5 w-5" />
                <span className="uppercase tracking-wider text-sm font-semibold">Kids</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-playfair text-white mb-4">Kids Collection</h2>
              <p className="text-gray-300 mb-6 max-w-md">Playful and durable clothing for the little ones.</p>
              <div className="flex space-x-4">
                <Button asChild variant="outline" className="border-white text-white hover:bg-white hover:text-black rounded-none">
                  <Link to="/kids/tees">Shop Now <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
              </div>
            </FadeIn>
          </div>
        </section>
        
        {/* Drops Section */}
        <section className="relative h-screen">
          <div className="absolute inset-0 overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1583744946564-b52d01e7f922?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" 
              alt="New Drops" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
          </div>
          
          <div className="relative h-full container mx-auto px-4 sm:px-6 flex flex-col justify-end pb-24">
            <SlideIn delay={300}>
              <div className="flex items-center gap-2 text-primary mb-2">
                <Package className="h-5 w-5" />
                <span className="uppercase tracking-wider text-sm font-semibold">Drops</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-playfair text-white mb-4">Latest Drops</h2>
              <p className="text-gray-300 mb-6 max-w-md">Limited edition releases that set the trends.</p>
              <div className="flex space-x-4">
                <Button asChild variant="outline" className="border-white text-white hover:bg-white hover:text-black rounded-none">
                  <Link to="/drops/new-arrivals">Shop Now <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
              </div>
            </SlideIn>
          </div>
        </section>
        
        {/* VIPs Section */}
        <section className="relative h-screen">
          <div className="absolute inset-0 overflow-hidden">
            <div className="w-full h-full bg-black">
              <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1604176424472-9d0d52de2d13?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" 
                  alt="VIP Access" 
                  className="w-full h-full object-cover opacity-60"
                />
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/80"></div>
          </div>
          
          <div className="relative h-full container mx-auto px-4 sm:px-6 flex flex-col justify-center items-center">
            <FadeIn delay={300}>
              <div className="text-center">
                <div className="flex items-center gap-2 text-primary mb-2 justify-center">
                  <Star className="h-6 w-6 fill-primary" />
                  <span className="uppercase tracking-wider text-sm font-semibold">Exclusive</span>
                  <Star className="h-6 w-6 fill-primary" />
                </div>
                <h2 className="text-4xl md:text-7xl font-playfair text-white mb-4">VIP ACCESS</h2>
                <p className="text-gray-300 mb-8 max-w-lg mx-auto">Join our VIP program for early access to drops, exclusive collections, and special events.</p>
                <Button 
                  asChild 
                  variant="default" 
                  className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg rounded-none"
                >
                  <Link to="/account/register">
                    Become a VIP <Star className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </FadeIn>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
