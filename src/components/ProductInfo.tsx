
import { useState } from 'react';
import { Star, ShoppingCart, Heart, Truck, RotateCcw, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FadeIn, SlideIn, ScaleIn } from '@/components/ui/transitions';
import ColorSelector from '@/components/ColorSelector';
import SizeSelector from '@/components/SizeSelector';
import { cn } from '@/lib/utils';
import { Product, ProductVariant, SizeOption } from '@/lib/product-data';

interface ProductInfoProps {
  product: Product;
}

const ProductInfo = ({ product }: ProductInfoProps) => {
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(product.variants[0]);
  const [selectedSize, setSelectedSize] = useState<SizeOption | null>(
    product.variants[0]?.sizes[0] || null
  );
  const [quantity, setQuantity] = useState(1);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [activeTab, setActiveTab] = useState<'description' | 'features' | 'details'>('description');
  
  const handleAddToCart = () => {
    setIsAddedToCart(true);
    
    // Reset the added to cart state after animation completes
    setTimeout(() => {
      setIsAddedToCart(false);
    }, 1000);
  };
  
  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };
  
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };
  
  const handleSelectVariant = (variant: ProductVariant) => {
    setSelectedVariant(variant);
    // Reset size to first available size in this variant
    setSelectedSize(variant.sizes[0] || null);
  };
  
  const handleSelectSize = (size: SizeOption) => {
    setSelectedSize(size);
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

  return (
    <div className="space-y-6">
      <FadeIn>
        <div className="inline-block bg-secondary/50 px-2.5 py-1 rounded-full text-xs font-medium text-primary">
          New Arrival
        </div>
      </FadeIn>
      
      <div className="space-y-2">
        <SlideIn delay={100}>
          <h1 className="text-2xl sm:text-3xl font-medium tracking-tight">
            {product.name}
          </h1>
        </SlideIn>
        
        <FadeIn delay={200}>
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star 
                  key={i} 
                  size={16} 
                  className={cn(
                    "text-yellow-400",
                    i >= Math.round(product.rating) && "text-gray-200"
                  )} 
                  fill={i < Math.round(product.rating) ? "currentColor" : "none"}
                />
              ))}
              <span className="ml-2 text-sm text-gray-500">
                {product.rating} ({product.reviewCount} reviews)
              </span>
            </div>
          </div>
        </FadeIn>
        
        <ScaleIn delay={300}>
          <div className="flex items-baseline space-x-3 mt-1">
            {formattedDiscountPrice ? (
              <>
                <span className="text-2xl font-semibold">{formattedDiscountPrice}</span>
                <span className="text-lg text-gray-400 line-through">{formattedPrice}</span>
                <span className="inline-block bg-red-100 text-red-600 px-2 py-0.5 rounded text-xs font-medium">
                  Save {discountPercentage}%
                </span>
              </>
            ) : (
              <span className="text-2xl font-semibold">{formattedPrice}</span>
            )}
          </div>
        </ScaleIn>
      </div>
      
      <div className="space-y-6 pt-2">
        <FadeIn delay={400}>
          {/* Tabs for product information */}
          <div className="border-b border-gray-200">
            <div className="flex space-x-8">
              {[
                { id: 'description', label: 'Description' },
                { id: 'features', label: 'Features' },
                { id: 'details', label: 'Details' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  className={cn(
                    "py-3 text-sm font-medium border-b-2 -mb-px transition-colors",
                    activeTab === tab.id 
                      ? "border-primary text-primary" 
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  )}
                  onClick={() => setActiveTab(tab.id as any)}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
          
          {/* Tab content */}
          <div className="py-2 min-h-[120px]">
            {activeTab === 'description' && (
              <p className="text-gray-600 leading-relaxed">
                {product.description}
              </p>
            )}
            
            {activeTab === 'features' && (
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check size={18} className="text-primary shrink-0 mt-0.5 mr-2" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            )}
            
            {activeTab === 'details' && (
              <div className="space-y-2">
                {Object.entries(product.details).map(([key, value]) => (
                  <div key={key} className="grid grid-cols-3 text-sm">
                    <div className="font-medium text-gray-500">{key}</div>
                    <div className="col-span-2">{value}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
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
            <div className="flex items-center border border-gray-200 rounded-md">
              <button 
                onClick={decrementQuantity}
                disabled={quantity <= 1}
                className="px-3 py-2 text-gray-500 hover:text-gray-700 disabled:opacity-50"
                aria-label="Decrease quantity"
              >
                -
              </button>
              <div className="w-10 text-center py-2 font-medium text-sm">
                {quantity}
              </div>
              <button 
                onClick={incrementQuantity}
                className="px-3 py-2 text-gray-500 hover:text-gray-700"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
            
            <Button 
              onClick={handleAddToCart}
              className={cn(
                "flex-1 flex items-center justify-center space-x-2 h-11",
                isAddedToCart && "add-to-cart-animation"
              )}
            >
              <ShoppingCart size={18} />
              <span>{isAddedToCart ? "Added to Cart!" : "Add to Cart"}</span>
            </Button>
            
            <Button 
              variant="outline" 
              size="icon" 
              className="h-11 w-11"
              aria-label="Add to wishlist"
            >
              <Heart size={18} />
            </Button>
          </div>
        </ScaleIn>
        
        <FadeIn delay={800}>
          <div className="space-y-3 pt-2">
            <div className="flex items-center text-sm text-gray-600">
              <Truck size={18} className="mr-2 text-gray-400" />
              <span>Free delivery on orders over $50</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <RotateCcw size={18} className="mr-2 text-gray-400" />
              <span>30-day free returns</span>
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
};

export default ProductInfo;
