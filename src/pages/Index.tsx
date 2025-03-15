
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { FadeIn, SlideIn } from '@/components/ui/transitions';
import { ArrowRight } from 'lucide-react';

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
        {/* Hero Section - New Styles */}
        <section className="relative h-screen">
          <div className="absolute inset-0 overflow-hidden">
            <img 
              src="/lovable-uploads/fee74c2b-ea75-44d8-a746-d5555aee8f6a.png" 
              alt="New Styles" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent"></div>
          </div>
          
          <div className="relative h-full container mx-auto px-4 sm:px-6 flex flex-col justify-end pb-24">
            <FadeIn delay={300}>
              <h2 className="text-4xl md:text-6xl font-playfair text-white mb-4">New Styles</h2>
              <p className="text-gray-300 mb-6 max-w-md">The latest in street fashion with modern cuts and premium materials.</p>
              <div className="flex space-x-4">
                <Button asChild variant="outline" className="border-white text-white hover:bg-white hover:text-black rounded-none">
                  <Link to="/mens/tees">Shop Now</Link>
                </Button>
              </div>
            </FadeIn>
          </div>
        </section>
        
        {/* The Underpass Section */}
        <section className="relative h-screen">
          <div className="absolute inset-0 overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1611516491426-03025e6043c8?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" 
              alt="The Underpass Collection" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent"></div>
          </div>
          
          <div className="relative h-full container mx-auto px-4 sm:px-6 flex flex-col justify-end pb-24">
            <SlideIn delay={300}>
              <h2 className="text-4xl md:text-6xl font-playfair text-white mb-4">The Underpass</h2>
              <p className="text-gray-300 mb-6 max-w-md">Urban-inspired designs that bring street culture to high fashion.</p>
              <div className="flex space-x-4">
                <Button asChild variant="outline" className="border-white text-white hover:bg-white hover:text-black rounded-none">
                  <Link to="/mens/tees">Shop Men</Link>
                </Button>
                <Button asChild variant="outline" className="border-white text-white hover:bg-white hover:text-black rounded-none">
                  <Link to="/womens/tees">Shop Women</Link>
                </Button>
              </div>
            </SlideIn>
          </div>
        </section>
        
        {/* New Styles Blue Section */}
        <section className="relative h-screen">
          <div className="absolute inset-0 overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1628626125373-3065b2512272?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" 
              alt="New Blue Styles" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70"></div>
          </div>
          
          <div className="relative h-full container mx-auto px-4 sm:px-6 flex flex-col justify-end pb-24">
            <FadeIn delay={300}>
              <h2 className="text-4xl md:text-6xl font-playfair text-white mb-4">New Styles</h2>
              <p className="text-gray-300 mb-6 max-w-md">Bold colors and innovative fabrics define our latest collection.</p>
              <div className="flex space-x-4">
                <Button asChild variant="outline" className="border-white text-white hover:bg-white hover:text-black rounded-none">
                  <Link to="/mens/tees">Shop Now</Link>
                </Button>
              </div>
            </FadeIn>
          </div>
        </section>
        
        {/* Cross Country Collection */}
        <section className="relative h-screen">
          <div className="absolute inset-0 overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1621072156002-e2fccdc0b176?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" 
              alt="Cross Country Collection" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent"></div>
          </div>
          
          <div className="relative h-full container mx-auto px-4 sm:px-6 flex flex-col justify-end pb-24">
            <SlideIn delay={300}>
              <h2 className="text-4xl md:text-6xl font-playfair text-white mb-4">Cross Country Collection</h2>
              <p className="text-gray-300 mb-6 max-w-md">Versatile pieces designed for movement, comfort, and style.</p>
              <div className="flex space-x-4">
                <Button asChild variant="outline" className="border-white text-white hover:bg-white hover:text-black rounded-none">
                  <Link to="/mens/tees">See More</Link>
                </Button>
              </div>
            </SlideIn>
          </div>
        </section>
        
        {/* T-Shirt Collection */}
        <section className="relative h-screen">
          <div className="absolute inset-0 overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1588117305388-c2631a279f82?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" 
              alt="T-Shirt Collection" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
          </div>
          
          <div className="relative h-full container mx-auto px-4 sm:px-6 flex flex-col justify-end pb-24">
            <FadeIn delay={300}>
              <h2 className="text-4xl md:text-6xl font-playfair text-white mb-4">T-Shirt Collection</h2>
              <p className="text-gray-300 mb-6 max-w-md">Premium quality essentials designed for everyday style.</p>
              <div className="flex space-x-4">
                <Button asChild variant="outline" className="border-white text-white hover:bg-white hover:text-black rounded-none">
                  <Link to="/mens/tees">Shop Men</Link>
                </Button>
                <Button asChild variant="outline" className="border-white text-white hover:bg-white hover:text-black rounded-none">
                  <Link to="/womens/tees">Shop Women</Link>
                </Button>
              </div>
            </FadeIn>
          </div>
        </section>
        
        {/* Lookbook Section */}
        <section className="relative h-screen">
          <div className="absolute inset-0 overflow-hidden">
            <div className="w-full h-full bg-gray-900 flex items-center justify-center">
              <div className="text-center">
                <h2 className="text-primary text-7xl md:text-9xl font-playfair mb-4">MADE</h2>
                <p className="text-white text-xl md:text-3xl tracking-widest mb-6">SPRING/SUMMER 22</p>
                <p className="text-white text-xl md:text-3xl tracking-widest">LOOKBOOK</p>
              </div>
            </div>
          </div>
          
          <div className="relative h-full flex items-end justify-center pb-16">
            <FadeIn delay={300}>
              <Button asChild variant="outline" className="border-white text-white hover:bg-white hover:text-black rounded-none">
                <Link to="/lookbook">View Lookbook</Link>
              </Button>
            </FadeIn>
          </div>
        </section>
        
        {/* Exclusive Colors */}
        <section className="relative h-screen">
          <div className="absolute inset-0 overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1627225924765-552d49cf47ad?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" 
              alt="Exclusive Colors" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50"></div>
          </div>
          
          <div className="relative h-full container mx-auto px-4 sm:px-6 flex flex-col justify-end pb-24">
            <SlideIn delay={300}>
              <h2 className="text-4xl md:text-6xl font-playfair text-white mb-4">Exclusive Colors</h2>
              <p className="text-gray-300 mb-6 max-w-md">Limited edition colors that set you apart from the crowd.</p>
              <div className="flex space-x-4">
                <Button asChild variant="outline" className="border-white text-white hover:bg-white hover:text-black rounded-none">
                  <Link to="/exclusives">See All <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
              </div>
            </SlideIn>
          </div>
        </section>
        
        {/* Category Sections Grid */}
        <section className="py-16 bg-black">
          <div className="container mx-auto px-4 sm:px-6">
            <h2 className="text-3xl font-playfair text-white mb-12 text-center">Shop By Category</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Men's Section */}
              <CategoryCard 
                title="Men" 
                image="https://images.unsplash.com/photo-1527204208392-747c70e5bb7a?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" 
                link="/mens/tees" 
                delay={100}
              />
              
              {/* Women's Section */}
              <CategoryCard 
                title="Women" 
                image="https://images.unsplash.com/photo-1597586124394-fbd6ef244026?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" 
                link="/womens/tees" 
                delay={200}
              />
              
              {/* Kids' Section */}
              <CategoryCard 
                title="Kids" 
                image="https://images.unsplash.com/photo-1622782262245-bfb660a7b1a3?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" 
                link="/kids/tees" 
                delay={300}
              />
              
              {/* Drops Section */}
              <CategoryCard 
                title="Drops" 
                image="https://images.unsplash.com/photo-1583744946564-b52d01e7f922?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" 
                link="/drops/new-arrivals" 
                delay={400}
              />
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

interface CategoryCardProps {
  title: string;
  image: string;
  link: string;
  delay?: number;
}

const CategoryCard = ({ title, image, link, delay = 0 }: CategoryCardProps) => {
  return (
    <FadeIn delay={delay}>
      <Link 
        to={link}
        className="group block relative h-80 overflow-hidden rounded-lg"
      >
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
          style={{ backgroundImage: `url(${image})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-6">
          <h3 className="text-2xl font-playfair text-white mb-2">{title}</h3>
          <span className="inline-flex items-center text-primary group-hover:underline">
            Shop Now <ArrowRight className="ml-2 h-4 w-4" />
          </span>
        </div>
      </Link>
    </FadeIn>
  );
};

export default Index;
