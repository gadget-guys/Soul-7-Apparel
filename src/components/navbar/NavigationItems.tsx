import React from 'react';
import { Link } from 'react-router-dom';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Tag, Palette, Ruler, ShoppingCart } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/hooks/useCart';

interface NavigationItemsProps {
  className?: string;
}

const NavigationItems = ({ className }: NavigationItemsProps) => {
  const { cartItems } = useCart();
  const itemCount = cartItems.length;

  return (
    <NavigationMenu className={className}>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link to="/" className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white hover:text-gray-300 transition-colors">
            Home
          </Link>
        </NavigationMenuItem>
        
        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-sm font-medium text-white hover:text-gray-300 font-playfair bg-transparent hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent">Shop</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ShopNavigationContent />
          </NavigationMenuContent>
        </NavigationMenuItem>
        
        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-sm font-medium text-white hover:text-gray-300 font-playfair bg-transparent hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent">Mens</NavigationMenuTrigger>
          <NavigationMenuContent>
            <MensNavigationContent />
          </NavigationMenuContent>
        </NavigationMenuItem>
        
        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-sm font-medium text-white hover:text-gray-300 font-playfair bg-transparent hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent">Womens</NavigationMenuTrigger>
          <NavigationMenuContent>
            <WomensNavigationContent />
          </NavigationMenuContent>
        </NavigationMenuItem>
        
        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-sm font-medium text-white hover:text-gray-300 font-playfair bg-transparent hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent">Kids</NavigationMenuTrigger>
          <NavigationMenuContent>
            <KidsNavigationContent />
          </NavigationMenuContent>
        </NavigationMenuItem>
        
        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-sm font-medium text-white hover:text-gray-300 font-playfair bg-transparent hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent">Drops</NavigationMenuTrigger>
          <NavigationMenuContent>
            <DropsNavigationContent />
          </NavigationMenuContent>
        </NavigationMenuItem>
        
        <NavigationMenuItem>
          <Link to="/vips" className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white hover:text-gray-300 transition-colors font-playfair">
            VIPs
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link to="/cart" className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white hover:text-gray-300 transition-colors">
            <ShoppingCart size={18} className="mr-1" />
            {itemCount > 0 && (
              <Badge variant="secondary" className="ml-1 h-5 min-w-5 flex items-center justify-center rounded-full px-1.5 text-xs bg-primary text-black">
                {itemCount}
              </Badge>
            )}
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

const ShopNavigationContent = () => (
  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] bg-black">
    <li className="row-span-3">
      <NavigationMenuLink asChild>
        <Link
          to="/shop"
          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
        >
          <div className="mb-2 mt-4 text-lg font-medium font-playfair">
            All Products
          </div>
          <p className="text-sm leading-tight text-muted-foreground">
            Browse our complete collection of apparel and accessories.
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
    <CategoryLink to="/shop" title="By Category" icon={<Tag size={16} className="mr-2" />} description="T-shirts, hoodies, hats, and more." />
    <CategoryLink to="/shop?filter=color" title="By Color" icon={<Palette size={16} className="mr-2" />} description="Find your perfect color match." />
    <CategoryLink to="/shop?filter=size" title="By Size" icon={<Ruler size={16} className="mr-2" />} description="Find your perfect fit." />
    <CategoryLink to="/shop?sort=popularity" title="Most Popular" description="Our top-selling products." />
  </ul>
);

const MensNavigationContent = () => (
  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] bg-black">
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
    <CategoryLink to="/mens/tees" title="Tees" description="Classic and graphic tees for everyday wear." />
    <CategoryLink to="/mens/hoodies" title="Hoodies" description="Comfortable hoodies for all seasons." />
    <CategoryLink to="/mens/hats" title="Hats" description="Stylish caps and beanies to complement your look." />
    <CategoryLink to="/mens/jackets" title="Jackets" description="Premium jackets for style and protection." />
  </ul>
);

const WomensNavigationContent = () => (
  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] bg-black">
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
    <CategoryLink to="/womens/tees" title="Tees" description="Stylish tees designed for comfort and fashion." />
    <CategoryLink to="/womens/hoodies" title="Hoodies" description="Cozy hoodies perfect for any occasion." />
    <CategoryLink to="/womens/hats" title="Hats" description="Fashionable hats to elevate your style." />
    <CategoryLink to="/womens/jackets" title="Jackets" description="Trendy jackets for all weather conditions." />
  </ul>
);

const KidsNavigationContent = () => (
  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] bg-black">
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
    <CategoryLink to="/kids/tees" title="Tees" description="Colorful and durable tees for active kids." />
    <CategoryLink to="/kids/hoodies" title="Hoodies" description="Warm and playful hoodies for everyday wear." />
    <CategoryLink to="/kids/hats" title="Hats" description="Cute and practical hats for year-round use." />
    <CategoryLink to="/kids/jackets" title="Jackets" description="Durable jackets for growing kids." />
  </ul>
);

const DropsNavigationContent = () => (
  <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] bg-black">
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
    <CategoryLink to="/drops/new-arrivals" title="New Arrivals" description="Just landed in our store." />
    <CategoryLink to="/drops/limited-edition" title="Limited Edition" description="Exclusive pieces available for a limited time." />
    <CategoryLink to="/drops/collaborations" title="Collaborations" description="Special collections created with guest designers." />
  </ul>
);

interface CategoryLinkProps {
  to: string;
  title: string;
  description: string;
  icon?: React.ReactNode;
}

const CategoryLink = ({ to, title, description, icon }: CategoryLinkProps) => (
  <li>
    <Link to={to} className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
      <div className="text-sm font-medium leading-none flex items-center">
        {icon}
        {title}
      </div>
      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
        {description}
      </p>
    </Link>
  </li>
);

export default NavigationItems;
