
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
import SocialShare from '@/components/social/SocialShare';
import ProductPricing from '@/components/product/ProductPricing';
import ProductRating from '@/components/product/ProductRating';
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

  const variantImage = selectedVariant?.images?.[0] || product.images[0];
  
  const isAddToCartDisabled = !selectedSize || !selectedSize.inStock;

  return (
    <div className="space-y-6">
      <FadeIn>
        <div className="flex flex-wrap gap-2">
          {product.new && (
            <div className="inline-block bg-secondary/50 px-2.5 py-1 rounded-full text-xs font-medium text-primary">
              New Arrival
            </div>
          )}
          {product.isExclusive && (
            <div className="inline-block bg-primary/30 px-2.5 py-1 rounded-full text-xs font-medium text-primary">
              Exclusive
            </div>
          )}
        </div>
      </FadeIn>
      
      <div className="space-y-2">
        <SlideIn delay={100}>
          <h1 className="text-2xl sm:text-3xl font-medium tracking-tight text-white">
            {product.name}
          </h1>
        </SlideIn>
        
        <FadeIn delay={200}>
          <ProductRating 
            rating={product.rating} 
            reviewCount={product.reviewCount} 
            size={16}
          />
        </FadeIn>
        
        <ProductPricing product={product} />
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
        
        <FadeIn delay={850}>
          <div className="pt-2">
            <p className="text-sm text-gray-400 mb-2">Share this product</p>
            <SocialShare title={product.name} />
          </div>
        </FadeIn>
      </div>
    </div>
  );
};

export default ProductInfo;
