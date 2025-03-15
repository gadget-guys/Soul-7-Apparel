
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Product } from '@/lib/product-data';

interface ProductCardProps {
  product: Product;
  index?: number;
}

const ProductCard = ({ product, index = 0 }: ProductCardProps) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: product.currency,
  }).format(product.price);
  
  const formattedDiscountPrice = product.discountPrice 
    ? new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: product.currency,
      }).format(product.discountPrice)
    : null;
    
  // Add a small staggered delay for each card
  const animationDelay = 100 + index * 50;

  return (
    <div
      className="group animate-fade-in"
      style={{ animationDelay: `${animationDelay}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative overflow-hidden rounded-lg aspect-square bg-gray-50 mb-3">
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
          
          {/* Quick action buttons that appear on hover */}
          <div 
            className={cn(
              "absolute bottom-0 left-0 right-0 p-3 flex justify-between opacity-0 translate-y-2 transition-all duration-300",
              isHovered && "opacity-100 translate-y-0"
            )}
          >
            <button className="bg-white rounded-full p-2 shadow-md hover:bg-gray-50 transition-colors">
              <ShoppingCart size={18} className="text-gray-700" />
            </button>
            <button className="bg-white rounded-full p-2 shadow-md hover:bg-gray-50 transition-colors">
              <Heart size={18} className="text-gray-700" />
            </button>
          </div>
          
          {/* Discount tag */}
          {product.discountPrice && (
            <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-medium px-2 py-1 rounded">
              Sale
            </div>
          )}
        </div>
        
        <div className="space-y-1">
          <div className="flex text-yellow-400">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star 
                key={i} 
                size={14} 
                className={i >= Math.round(product.rating) ? "text-gray-200" : ""} 
                fill="currentColor" 
              />
            ))}
            <span className="ml-1 text-xs text-gray-500">
              ({product.reviewCount})
            </span>
          </div>
          
          <h3 className="font-medium text-gray-900 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          
          <div className="flex items-baseline space-x-2">
            {formattedDiscountPrice ? (
              <>
                <span className="font-medium">{formattedDiscountPrice}</span>
                <span className="text-sm text-gray-400 line-through">{formattedPrice}</span>
              </>
            ) : (
              <span className="font-medium">{formattedPrice}</span>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
