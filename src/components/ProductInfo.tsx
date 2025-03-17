import { useState } from 'react';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FadeIn, SlideIn, ScaleIn } from '@/components/ui/transitions';
import ColorSelector from '@/components/ColorSelector';
import SizeSelector from '@/components/product/SizeSelector';
import ProductTabs from '@/components/product/ProductTabs';
import QuantitySelector from '@/components/product/QuantitySelector';
import AddToCartButton from '@/components/product/AddToCartButton';
import ShippingInfo from '@/components/product/ShippingInfo';
import { Product, ProductVariant, SizeOption } from '@/lib/product-data';
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';

interface ProductInfoProps {
  product: Product;
}

const ProductInfo = ({ product }: ProductInfoProps) => {
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(product.variants[0]);
  const [selectedSize, setSelectedSize] = useState<SizeOption | null>(
    product.variants[0]?.sizes[0] || null
  );
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const { toast } = useToast();
  
  const handleAddToCart = () => {
    console.log('Added to cart:', {
      product: product.name,
      variant: selectedVariant.color,
      size: selectedSize?.size,
      quantity
    });
  };
  
  const handleSelectVariant = (variant: ProductVariant) => {
    setSelectedVariant(variant);
    setSelectedSize(variant.sizes[0] || null);
  };
  
  const handleSelectSize = (size: SizeOption) => {
    setSelectedSize(size);
  };
  
  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast({
      title: isFavorite ? "Removed from wishlist" : "Added to wishlist",
      description: `${product.name} has been ${isFavorite ? "removed from" : "added to"} your wishlist.`,
    });
  };
  
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
    
  const discountPercentage = product.discountPrice 
    ? Math.round(100 - (product.discountPrice / product.price) * 100)
    : null;

  const variantImage = selectedVariant?.images?.[0] || product.images[0];
  
  const isAddToCartDisabled = !selectedSize || !selectedSize.inStock;

  return (
    <div className="space-y-6">
      <FadeIn>
        <div className="inline-block bg-secondary/50 px-2.5 py-1 rounded-full text-xs font-medium text-primary">
          New Arrival
        </div>
      </FadeIn>
      
      <div className="space-y-2">
        <SlideIn delay={100}>
          <h1 className="text-2xl sm:text-3xl font-medium tracking-tight text-white">
            {product.name}
          </h1>
        </SlideIn>
        
        <FadeIn delay={200}>
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg
                  key={i}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill={i < Math.round(product.rating) ? "currentColor" : "none"}
                  stroke="currentColor"
                  className={i < Math.round(product.rating) ? "text-yellow-400" : "text-gray-600"}
                  width="16"
                  height="16"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              ))}
              <span className="ml-2 text-sm text-gray-400">
                {product.rating} ({product.reviewCount} reviews)
              </span>
            </div>
          </div>
        </FadeIn>
        
        <ScaleIn delay={300}>
          <div className="flex items-baseline space-x-3 mt-1">
            {formattedDiscountPrice ? (
              <>
                <span className="text-2xl font-semibold text-white">{formattedDiscountPrice}</span>
                <span className="text-lg text-gray-500 line-through">{formattedPrice}</span>
                <span className="inline-block bg-red-900 text-red-300 px-2 py-0.5 rounded text-xs font-medium">
                  Save {discountPercentage}%
                </span>
              </>
            ) : (
              <span className="text-2xl font-semibold text-white">{formattedPrice}</span>
            )}
          </div>
        </ScaleIn>
      </div>
      
      <div className="space-y-6 pt-2">
        <FadeIn delay={400}>
          <ProductTabs product={product} />
        </FadeIn>
        
        <SlideIn delay={500}>
          <ColorSelector 
            variants={product.variants}
            selectedVariant={selectedVariant}
            onSelectVariant={handleSelectVariant}
          />
        </SlideIn>
        
        <SlideIn delay={600}>
          <SizeSelector 
            sizes={selectedVariant.sizes}
            selectedSize={selectedSize}
            onSelectSize={handleSelectSize}
          />
        </SlideIn>
        
        <ScaleIn delay={700}>
          <div className="flex items-center space-x-4">
            <QuantitySelector 
              initialQuantity={quantity} 
              onChange={setQuantity} 
            />
            
            <AddToCartButton 
              onClick={handleAddToCart}
              productId={product.id}
              name={product.name}
              price={product.price}
              discountPrice={product.discountPrice}
              image={variantImage}
              color={selectedVariant.color}
              size={selectedSize?.size || ''}
              variantId={selectedVariant.id}
              quantity={quantity}
              disabled={isAddToCartDisabled}
            />
            
            <Button 
              variant="outline" 
              size="icon" 
              className={cn(
                "h-11 w-11 transition-colors",
                isFavorite && "bg-red-950/20 border-red-800 text-red-500"
              )}
              aria-label="Add to wishlist"
              onClick={toggleFavorite}
            >
              <Heart 
                size={18} 
                fill={isFavorite ? "currentColor" : "none"}
              />
            </Button>
          </div>
          
          {isAddToCartDisabled && selectedSize && (
            <p className="text-red-500 text-sm mt-2">
              This size is currently out of stock.
            </p>
          )}
          
          {!selectedSize && (
            <p className="text-amber-500 text-sm mt-2">
              Please select a size.
            </p>
          )}
        </ScaleIn>
        
        <FadeIn delay={800}>
          <ShippingInfo />
        </FadeIn>
      </div>
    </div>
  );
};

export default ProductInfo;
