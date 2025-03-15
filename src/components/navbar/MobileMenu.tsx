
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  return (
    <div 
      className={cn(
        "fixed inset-0 z-40 bg-black text-white transform transition-transform duration-300 ease-in-out",
        isOpen ? "translate-x-0" : "translate-x-full"
      )}
      style={{ paddingTop: "4rem" }}
    >
      <div className="container h-full flex flex-col space-y-6 p-6 overflow-y-auto">
        <nav className="flex flex-col space-y-4">
          <Link 
            to="/" 
            className="py-2 text-lg font-medium border-b border-gray-800"
            onClick={onClose}
          >
            Home
          </Link>
          
          <MobileMenuCategory
            title="Mens"
            to="/mens"
            onClose={onClose}
            items={[
              { label: "Tees", path: "/mens/tees" },
              { label: "Hoodies", path: "/mens/hoodies" },
              { label: "Hats", path: "/mens/hats" },
              { label: "Jackets", path: "/mens/jackets" },
            ]}
          />
          
          <MobileMenuCategory
            title="Womens"
            to="/womens"
            onClose={onClose}
            items={[
              { label: "Tees", path: "/womens/tees" },
              { label: "Hoodies", path: "/womens/hoodies" },
              { label: "Hats", path: "/womens/hats" },
              { label: "Jackets", path: "/womens/jackets" },
            ]}
          />
          
          <MobileMenuCategory
            title="Kids"
            to="/kids"
            onClose={onClose}
            items={[
              { label: "Tees", path: "/kids/tees" },
              { label: "Hoodies", path: "/kids/hoodies" },
              { label: "Hats", path: "/kids/hats" },
              { label: "Jackets", path: "/kids/jackets" },
            ]}
          />
          
          <MobileMenuCategory
            title="Drops"
            to="/drops"
            onClose={onClose}
            items={[
              { label: "New Arrivals", path: "/drops/new-arrivals" },
              { label: "Limited Edition", path: "/drops/limited-edition" },
              { label: "Collaborations", path: "/drops/collaborations" },
            ]}
          />
          
          <Link 
            to="/vips" 
            className="py-2 text-lg font-medium border-b border-gray-800 font-playfair"
            onClick={onClose}
          >
            VIPs
          </Link>
        </nav>
      </div>
    </div>
  );
};

interface MobileMenuCategoryProps {
  title: string;
  to: string;
  items: { label: string; path: string }[];
  onClose: () => void;
}

const MobileMenuCategory = ({ title, to, items, onClose }: MobileMenuCategoryProps) => (
  <div className="py-2 border-b border-gray-800 space-y-2">
    <Link 
      to={to} 
      className="block text-lg font-medium font-playfair"
      onClick={onClose}
    >
      {title}
    </Link>
    <div className="pl-4 space-y-2 text-sm">
      {items.map((item) => (
        <Link 
          key={item.path}
          to={item.path}
          className="block py-1 text-gray-600 hover:text-black"
          onClick={onClose}
        >
          {item.label}
        </Link>
      ))}
    </div>
  </div>
);

export default MobileMenu;
