
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { TeeProduct } from '@/lib/tees-data';
import ProductRating from './ProductRating';
import ProductPrice from './ProductPrice';
import { useToast } from '@/components/ui/use-toast';

interface TeeCardProps {
  product: TeeProduct;
  index?: number;
}

const TeeCard = ({ product, index = 0 }: TeeCardProps) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const { toast } = useToast();
  
  // Add a small staggered delay for each card
  const animationDelay = 100 + index * 50;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation
    
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation
    
    setIsFavorite(!isFavorite);
    
    toast({
      title: isFavorite ? "Removed from wishlist" : "Added to wishlist",
      description: `${product.name} has been ${isFavorite ? "removed from" : "added to"} your wishlist.`,
    });
  };

  return (
    <div
      className="group animate-fade-in"
      style={{ animationDelay: `${animationDelay}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/tee/${product.id}`} className="block">
        <div className="relative overflow-hidden rounded-lg aspect-square bg-gray-900 mb-3">
          {/* Product image */}
          <div
            className={cn(
              "absolute inset-0 bg-cover bg-center transition-transform duration-700",
              isHovered && "scale-105"
            )}
            style={{ backgroundImage: `url(${product.images[0]})` }}
          />
          
          <img 
            src={product.images[0]} 
            alt={product.name}
            className={cn(
              "w-full h-full object-cover transition-opacity duration-500",
              isImageLoaded ? "opacity-0" : "opacity-100 blur-lg"
            )}
            onLoad={() => setIsImageLoaded(true)}
          />
          
          <div 
            className={cn(
              "absolute bottom-0 left-0 right-0 p-3 flex justify-between opacity-0 translate-y-2 transition-all duration-300",
              isHovered && "opacity-100 translate-y-0"
            )}
          >
            <button 
              className="bg-gray-800 rounded-full p-2 shadow-md hover:bg-gray-700 transition-colors"
              onClick={handleAddToCart}
              aria-label="Add to cart"
            >
              <ShoppingCart size={18} className="text-gray-200" />
            </button>
            <button 
              className={cn(
                "rounded-full p-2 shadow-md transition-colors", 
                isFavorite 
                  ? "bg-primary/20 hover:bg-primary/30" 
                  : "bg-gray-800 hover:bg-gray-700"
              )}
              onClick={handleToggleFavorite}
              aria-label={isFavorite ? "Remove from wishlist" : "Add to wishlist"}
            >
              <Heart 
                size={18} 
                className={isFavorite ? "text-primary" : "text-gray-200"}
                fill={isFavorite ? "currentColor" : "none"}
              />
            </button>
          </div>
          
          {/* Status tags */}
          <div className="absolute top-2 left-2 flex flex-col gap-2">
            {product.soldOut && (
              <div className="bg-gray-800 text-white text-xs font-medium px-2 py-1 rounded">
                Sold Out
              </div>
            )}
            {product.new && (
              <div className="bg-primary text-black text-xs font-medium px-2 py-1 rounded">
                New
              </div>
            )}
            {product.isExclusive && (
              <div className="bg-secondary text-black text-xs font-medium px-2 py-1 rounded">
                Exclusive
              </div>
            )}
            {product.discountPrice && (
              <div className="bg-red-500 text-white text-xs font-medium px-2 py-1 rounded">
                Sale
              </div>
            )}
          </div>
        </div>
        
        <div className="space-y-1">
          <ProductRating rating={product.rating} reviewCount={product.reviewCount} />
          
          <h3 className="font-medium text-gray-100 group-hover:text-primary transition-colors font-playfair">
            {product.name}
          </h3>
          
          <ProductPrice 
            price={product.price} 
            discountPrice={product.discountPrice} 
            currency={product.currency} 
          />
        </div>
      </Link>
    </div>
  );
};

export default TeeCard;
