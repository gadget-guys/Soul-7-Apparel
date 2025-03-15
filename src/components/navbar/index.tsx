
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ShoppingCart, Menu, X, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import MobileMenu from './MobileMenu';
import NavigationItems from './NavigationItems';

interface NavbarProps {
  transparent?: boolean;
}

const Navbar = ({ transparent = false }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <header 
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out",
          isScrolled ? "bg-black text-white shadow-sm" : "bg-black text-white"
        )}
      >
        <div className="container mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Back Button (only shows on product pages) */}
          <div className="flex items-center">
            <Link 
              to="/" 
              className="mr-4 text-white hover:text-gray-300 transition-colors"
              aria-label="Go back"
            >
              <ChevronLeft size={20} />
            </Link>
            
            {/* Logo */}
            <Link to="/" className="text-xl font-medium tracking-tight text-white">
              AUDIOPHILE
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <NavigationItems className="hidden md:flex" />
          
          {/* Right Section */}
          <div className="flex items-center space-x-4">
            <button 
              className="text-white hover:text-gray-300 transition-colors"
              aria-label="Search"
            >
              <Search size={20} />
            </button>
            
            <button 
              className="text-white hover:text-gray-300 transition-colors relative"
              aria-label="Cart"
            >
              <ShoppingCart size={20} />
              <span className="absolute -top-1 -right-1 bg-orange text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                0
              </span>
            </button>
            
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-white hover:text-gray-300 transition-colors"
              onClick={toggleMobileMenu}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>
      
      {/* Mobile Menu */}
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </>
  );
};

export default Navbar;
