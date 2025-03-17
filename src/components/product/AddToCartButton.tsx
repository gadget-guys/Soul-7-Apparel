
import { useState } from 'react';
import { ShoppingCart, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { getAvailablePaymentMethods } from '@/lib/payment';
import { useCart, CartItem } from '@/hooks/useCart';
import { v4 as uuidv4 } from 'uuid';

interface AddToCartButtonProps {
  onClick?: () => void;
  productId: string;
  name: string;
  price: number;
  discountPrice?: number;
  image: string;
  color: string;
  size: string;
  variantId: string;
  quantity: number;
  disabled?: boolean;
}

const AddToCartButton = ({ 
  onClick, 
  productId,
  name,
  price,
  discountPrice,
  image,
  color,
  size,
  variantId,
  quantity,
  disabled = false
}: AddToCartButtonProps) => {
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [paymentMethods, setPaymentMethods] = useState<string[]>([]);
  const { addToCart, openCart } = useCart();
  
  const handleClick = () => {
    if (disabled) return;
    
    setIsAddedToCart(true);
    
    // Create a new cart item
    const item: CartItem = {
      id: uuidv4(),
      productId,
      name,
      price,
      discountPrice,
      quantity,
      image,
      color,
      size,
      variantId
    };
    
    // Add the item to the cart
    addToCart(item);
    
    // Open the mini cart
    openCart();
    
    // Call the onClick handler if provided
    if (onClick) onClick();
    
    // Reset the added to cart state after animation completes
    setTimeout(() => {
      setIsAddedToCart(false);
    }, 1000);
  };
  
  return (
    <Button 
      onClick={handleClick}
      className={cn(
        "flex-1 flex items-center justify-center space-x-2 h-11",
        isAddedToCart && "add-to-cart-animation"
      )}
      disabled={disabled}
    >
      <ShoppingCart size={18} />
      <span>{isAddedToCart ? "Added to Cart!" : "Add to Cart"}</span>
      
      {/* Display payment method icons if available */}
      {paymentMethods.length > 0 && (
        <div className="ml-2 flex items-center space-x-1">
          {paymentMethods.includes('stripe') && (
            <CreditCard size={14} className="text-green-400" />
          )}
          {paymentMethods.includes('paypal') && (
            <span className="text-blue-400 text-xs font-bold">PayPal</span>
          )}
        </div>
      )}
    </Button>
  );
};

export default AddToCartButton;
