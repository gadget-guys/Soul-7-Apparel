import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ShoppingCart, Menu, X, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

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
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link to="/" className="flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 hover:text-black transition-colors">
                  Home
                </Link>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-sm font-medium text-gray-700 hover:text-black font-playfair">Mens</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <Link
                          to="/mens"
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                        >
                          <div className="mb-2 mt-4 text-lg font-medium font-playfair">
                            Mens Collection
                          </div>
                          <p className="text-sm leading-tight text-muted-foreground">
                            Explore our full range of men's apparel and accessories.
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <Link to="/mens/tees" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                        <div className="text-sm font-medium leading-none">Tees</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Classic and graphic tees for everyday wear.
                        </p>
                      </Link>
                    </li>
                    <li>
                      <Link to="/mens/hoodies" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                        <div className="text-sm font-medium leading-none">Hoodies</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Comfortable hoodies for all seasons.
                        </p>
                      </Link>
                    </li>
                    <li>
                      <Link to="/mens/hats" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                        <div className="text-sm font-medium leading-none">Hats</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Stylish caps and beanies to complement your look.
                        </p>
                      </Link>
                    </li>
                    <li>
                      <Link to="/mens/jackets" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                        <div className="text-sm font-medium leading-none">Jackets</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Premium jackets for style and protection.
                        </p>
                      </Link>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-sm font-medium text-gray-700 hover:text-black font-playfair">Womens</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <Link
                          to="/womens"
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                        >
                          <div className="mb-2 mt-4 text-lg font-medium font-playfair">
                            Womens Collection
                          </div>
                          <p className="text-sm leading-tight text-muted-foreground">
                            Discover our latest women's fashion and accessories.
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <Link to="/womens/tees" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                        <div className="text-sm font-medium leading-none">Tees</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Stylish tees designed for comfort and fashion.
                        </p>
                      </Link>
                    </li>
                    <li>
                      <Link to="/womens/hoodies" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                        <div className="text-sm font-medium leading-none">Hoodies</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Cozy hoodies perfect for any occasion.
                        </p>
                      </Link>
                    </li>
                    <li>
                      <Link to="/womens/hats" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                        <div className="text-sm font-medium leading-none">Hats</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Fashionable hats to elevate your style.
                        </p>
                      </Link>
                    </li>
                    <li>
                      <Link to="/womens/jackets" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                        <div className="text-sm font-medium leading-none">Jackets</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Trendy jackets for all weather conditions.
                        </p>
                      </Link>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-sm font-medium text-gray-700 hover:text-black font-playfair">Kids</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <Link
                          to="/kids"
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                        >
                          <div className="mb-2 mt-4 text-lg font-medium font-playfair">
                            Kids Collection
                          </div>
                          <p className="text-sm leading-tight text-muted-foreground">
                            Fun and comfortable clothing for all ages.
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <Link to="/kids/tees" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                        <div className="text-sm font-medium leading-none">Tees</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Colorful and durable tees for active kids.
                        </p>
                      </Link>
                    </li>
                    <li>
                      <Link to="/kids/hoodies" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                        <div className="text-sm font-medium leading-none">Hoodies</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Warm and playful hoodies for everyday wear.
                        </p>
                      </Link>
                    </li>
                    <li>
                      <Link to="/kids/hats" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                        <div className="text-sm font-medium leading-none">Hats</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Cute and practical hats for year-round use.
                        </p>
                      </Link>
                    </li>
                    <li>
                      <Link to="/kids/jackets" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                        <div className="text-sm font-medium leading-none">Jackets</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Durable jackets for growing kids.
                        </p>
                      </Link>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-sm font-medium text-gray-700 hover:text-black font-playfair">Drops</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <Link
                          to="/drops"
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                        >
                          <div className="mb-2 mt-4 text-lg font-medium font-playfair">
                            Latest Drops
                          </div>
                          <p className="text-sm leading-tight text-muted-foreground">
                            Check out our newest and most exclusive releases.
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <Link to="/drops/new-arrivals" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                        <div className="text-sm font-medium leading-none">New Arrivals</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Just landed in our store.
                        </p>
                      </Link>
                    </li>
                    <li>
                      <Link to="/drops/limited-edition" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                        <div className="text-sm font-medium leading-none">Limited Edition</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Exclusive pieces available for a limited time.
                        </p>
                      </Link>
                    </li>
                    <li>
                      <Link to="/drops/collaborations" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                        <div className="text-sm font-medium leading-none">Collaborations</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Special collections created with guest designers.
                        </p>
                      </Link>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <Link to="/vips" className="flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 hover:text-black transition-colors font-playfair">
                  VIPs
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          
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
        <div className="container h-full flex flex-col space-y-6 p-6 overflow-y-auto">
          <nav className="flex flex-col space-y-4">
            <Link 
              to="/" 
              className="py-2 text-lg font-medium border-b border-gray-100"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            
            {/* Mens Mobile Navigation */}
            <div className="py-2 border-b border-gray-100 space-y-2">
              <Link 
                to="/mens" 
                className="block text-lg font-medium font-playfair"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Mens
              </Link>
              <div className="pl-4 space-y-2 text-sm">
                <Link 
                  to="/mens/tees"
                  className="block py-1 text-gray-600 hover:text-black"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Tees
                </Link>
                <Link 
                  to="/mens/hoodies"
                  className="block py-1 text-gray-600 hover:text-black"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Hoodies
                </Link>
                <Link 
                  to="/mens/hats"
                  className="block py-1 text-gray-600 hover:text-black"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Hats
                </Link>
                <Link 
                  to="/mens/jackets"
                  className="block py-1 text-gray-600 hover:text-black"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Jackets
                </Link>
              </div>
            </div>
            
            {/* Womens Mobile Navigation */}
            <div className="py-2 border-b border-gray-100 space-y-2">
              <Link 
                to="/womens" 
                className="block text-lg font-medium font-playfair"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Womens
              </Link>
              <div className="pl-4 space-y-2 text-sm">
                <Link 
                  to="/womens/tees"
                  className="block py-1 text-gray-600 hover:text-black"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Tees
                </Link>
                <Link 
                  to="/womens/hoodies"
                  className="block py-1 text-gray-600 hover:text-black"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Hoodies
                </Link>
                <Link 
                  to="/womens/hats"
                  className="block py-1 text-gray-600 hover:text-black"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Hats
                </Link>
                <Link 
                  to="/womens/jackets"
                  className="block py-1 text-gray-600 hover:text-black"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Jackets
                </Link>
              </div>
            </div>
            
            {/* Kids Mobile Navigation */}
            <div className="py-2 border-b border-gray-100 space-y-2">
              <Link 
                to="/kids" 
                className="block text-lg font-medium font-playfair"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Kids
              </Link>
              <div className="pl-4 space-y-2 text-sm">
                <Link 
                  to="/kids/tees"
                  className="block py-1 text-gray-600 hover:text-black"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Tees
                </Link>
                <Link 
                  to="/kids/hoodies"
                  className="block py-1 text-gray-600 hover:text-black"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Hoodies
                </Link>
                <Link 
                  to="/kids/hats"
                  className="block py-1 text-gray-600 hover:text-black"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Hats
                </Link>
                <Link 
                  to="/kids/jackets"
                  className="block py-1 text-gray-600 hover:text-black"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Jackets
                </Link>
              </div>
            </div>
            
            {/* Drops Mobile Navigation */}
            <div className="py-2 border-b border-gray-100 space-y-2">
              <Link 
                to="/drops" 
                className="block text-lg font-medium font-playfair"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Drops
              </Link>
              <div className="pl-4 space-y-2 text-sm">
                <Link 
                  to="/drops/new-arrivals"
                  className="block py-1 text-gray-600 hover:text-black"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  New Arrivals
                </Link>
                <Link 
                  to="/drops/limited-edition"
                  className="block py-1 text-gray-600 hover:text-black"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Limited Edition
                </Link>
                <Link 
                  to="/drops/collaborations"
                  className="block py-1 text-gray-600 hover:text-black"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Collaborations
                </Link>
              </div>
            </div>
            
            <Link 
              to="/vips" 
              className="py-2 text-lg font-medium border-b border-gray-100 font-playfair"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              VIPs
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Navbar;

