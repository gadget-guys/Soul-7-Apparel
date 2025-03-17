
import React, { useState } from 'react';
import { Trash2, ShoppingBag, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FadeIn, StaggeredChildren } from '@/components/ui/transitions';
import { useToast } from '@/components/ui/use-toast';
import { useCart } from '@/hooks/useCart';
import { supabase } from '@/lib/supabase';
import { User } from '@supabase/supabase-js';

interface WishlistItem {
  id: string;
  product_id: string;
  name: string;
  price: number;
  discountPrice?: number;
  image: string;
  color: string;
  size: string;
  createdAt: string;
  inStock: boolean;
}

interface UserWishlistProps {
  user: User | null;
}

const UserWishlist = ({ user }: UserWishlistProps) => {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([
    {
      id: 'wl-1',
      product_id: 'tee-1',
      name: 'Classic Black T-Shirt',
      price: 29.99,
      image: '/lovable-uploads/fee74c2b-ea75-44d8-a746-d5555aee8f6a.png',
      color: 'Black',
      size: 'M',
      createdAt: '2023-06-15',
      inStock: true
    },
    {
      id: 'wl-2',
      product_id: 'hat-2',
      name: 'Vintage Snapback Cap',
      price: 24.99,
      discountPrice: 19.99,
      image: '/lovable-uploads/cef185b6-a8ec-41e0-8dd2-d202755fe016.png',
      color: 'Grey',
      size: 'One Size',
      createdAt: '2023-06-10',
      inStock: true
    },
    {
      id: 'wl-3',
      product_id: 'hoodie-1',
      name: 'Premium Hoodie',
      price: 59.99,
      image: '/lovable-uploads/e50416c5-cb3d-4d08-a15a-f8283eedbd6b.png',
      color: 'Navy',
      size: 'L',
      createdAt: '2023-05-28',
      inStock: false
    }
  ]);
  
  const { toast } = useToast();
  const { addToCart, openCart } = useCart();
  
  const handleRemoveItem = (id: string) => {
    setWishlistItems(wishlistItems.filter(item => item.id !== id));
    
    toast({
      title: "Item removed",
      description: "Item has been removed from your wishlist"
    });
  };
  
  const handleAddToCart = (item: WishlistItem) => {
    if (!item.inStock) {
      toast({
        title: "Item out of stock",
        description: "This item is currently unavailable",
        variant: "destructive"
      });
      return;
    }
    
    addToCart({
      id: `cart-${item.id}`,
      productId: item.product_id,
      name: item.name,
      price: item.price,
      discountPrice: item.discountPrice,
      image: item.image,
      quantity: 1,
      color: item.color,
      size: item.size,
      variantId: `variant-${item.id}`
    });
    
    openCart();
    
    toast({
      title: "Added to cart",
      description: `${item.name} has been added to your cart`
    });
  };
  
  return (
    <div className="space-y-6">
      <FadeIn>
        <div>
          <h2 className="text-2xl font-medium mb-1">My Wishlist</h2>
          <p className="text-sm text-gray-400">Manage your saved items</p>
        </div>
      </FadeIn>
      
      {wishlistItems.length === 0 ? (
        <FadeIn delay={100}>
          <div className="text-center py-16 border border-gray-800 rounded-lg">
            <Heart className="h-12 w-12 mx-auto text-gray-500 mb-4" />
            <h3 className="text-xl font-medium mb-2">Your wishlist is empty</h3>
            <p className="text-gray-400 mb-6 max-w-md mx-auto">
              Save items you're interested in by clicking the heart icon on product pages.
            </p>
            <Button asChild>
              <a href="/shop">Browse Products</a>
            </Button>
          </div>
        </FadeIn>
      ) : (
        <StaggeredChildren className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {wishlistItems.map((item) => (
            <WishlistCard 
              key={item.id}
              item={item}
              onRemove={() => handleRemoveItem(item.id)}
              onAddToCart={() => handleAddToCart(item)}
            />
          ))}
        </StaggeredChildren>
      )}
    </div>
  );
};

interface WishlistCardProps {
  item: WishlistItem;
  onRemove: () => void;
  onAddToCart: () => void;
}

const WishlistCard = ({ item, onRemove, onAddToCart }: WishlistCardProps) => {
  return (
    <div className="border border-gray-800 rounded-lg overflow-hidden group">
      <div className="relative">
        <a href={`/${item.product_id.split('-')[0]}/${item.product_id}`} className="block">
          <img 
            src={item.image} 
            alt={item.name} 
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </a>
        
        <button
          onClick={onRemove}
          className="absolute top-2 right-2 p-1.5 bg-black/60 rounded-full text-white hover:bg-red-900/80 hover:text-red-400 transition-colors"
          aria-label="Remove from wishlist"
        >
          <Trash2 size={16} />
        </button>
        
        {!item.inStock && (
          <div className="absolute bottom-0 inset-x-0 bg-black/80 text-center py-1.5 text-sm">
            Out of Stock
          </div>
        )}
      </div>
      
      <div className="p-4">
        <a 
          href={`/${item.product_id.split('-')[0]}/${item.product_id}`}
          className="text-base font-medium hover:text-primary transition-colors line-clamp-1"
        >
          {item.name}
        </a>
        
        <div className="flex items-center mt-1 text-sm text-gray-400">
          <span>{item.color}</span>
          <span className="mx-1">•</span>
          <span>{item.size}</span>
        </div>
        
        <div className="mt-2 flex items-center">
          {item.discountPrice ? (
            <>
              <span className="font-medium">${item.discountPrice.toFixed(2)}</span>
              <span className="ml-2 text-sm text-gray-500 line-through">${item.price.toFixed(2)}</span>
            </>
          ) : (
            <span className="font-medium">${item.price.toFixed(2)}</span>
          )}
        </div>
        
        <Button 
          className="w-full mt-3 flex items-center justify-center"
          variant={item.inStock ? "default" : "outline"}
          disabled={!item.inStock}
          onClick={onAddToCart}
        >
          <ShoppingBag className="mr-2 h-4 w-4" />
          {item.inStock ? "Add to Cart" : "Out of Stock"}
        </Button>
      </div>
    </div>
  );
};

export default UserWishlist;
