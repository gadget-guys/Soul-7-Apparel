
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ShoppingCart, Menu, X, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

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
          isScrolled || !transparent 
            ? "bg-white/90 backdrop-blur-md shadow-sm" 
            : "bg-transparent"
        )}
      >
        <div className="container mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Back Button (only shows on product pages) */}
          <div className="flex items-center">
            <Link 
              to="/" 
              className="mr-4 text-gray-700 hover:text-black transition-colors"
              aria-label="Go back"
            >
              <ChevronLeft size={20} />
            </Link>
            
            {/* Logo */}
            <Link to="/" className="text-xl font-medium tracking-tight">
              AUDIOPHILE
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-sm font-medium text-gray-700 hover:text-black transition-colors">
              Home
            </Link>
            <Link to="/products" className="text-sm font-medium text-gray-700 hover:text-black transition-colors">
              Products
            </Link>
            <Link to="/collections" className="text-sm font-medium text-gray-700 hover:text-black transition-colors">
              Collections
            </Link>
            <Link to="/about" className="text-sm font-medium text-gray-700 hover:text-black transition-colors">
              About
            </Link>
          </nav>
          
          {/* Right Section */}
          <div className="flex items-center space-x-4">
            <button 
              className="text-gray-700 hover:text-black transition-colors"
              aria-label="Search"
            >
              <Search size={20} />
            </button>
            
            <button 
              className="text-gray-700 hover:text-black transition-colors relative"
              aria-label="Cart"
            >
              <ShoppingCart size={20} />
              <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                0
              </span>
            </button>
            
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-gray-700 hover:text-black transition-colors"
              onClick={toggleMobileMenu}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>
      
      {/* Mobile Menu */}
      <div 
        className={cn(
          "fixed inset-0 z-40 bg-white transform transition-transform duration-300 ease-in-out",
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
        style={{ paddingTop: "4rem" }}
      >
        <div className="container h-full flex flex-col space-y-6 p-6">
          <nav className="flex flex-col space-y-4">
            <Link 
              to="/" 
              className="py-2 text-lg font-medium border-b border-gray-100"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/products" 
              className="py-2 text-lg font-medium border-b border-gray-100"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Products
            </Link>
            <Link 
              to="/collections" 
              className="py-2 text-lg font-medium border-b border-gray-100"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Collections
            </Link>
            <Link 
              to="/about" 
              className="py-2 text-lg font-medium border-b border-gray-100"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Navbar;
