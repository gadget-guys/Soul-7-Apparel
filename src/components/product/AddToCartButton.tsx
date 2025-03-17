
import { useState, useEffect } from 'react';
import { ShoppingCart, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { getAvailablePaymentMethods } from '@/lib/payment';

interface AddToCartButtonProps {
  onClick: () => void;
}

const AddToCartButton = ({ onClick }: AddToCartButtonProps) => {
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [paymentMethods, setPaymentMethods] = useState<string[]>([]);
  
  useEffect(() => {
    // Load available payment methods when component mounts
    const loadPaymentMethods = async () => {
      const methods = await getAvailablePaymentMethods();
      setPaymentMethods(methods);
      
      // Log available payment methods for debugging
      console.log('Available payment methods:', methods);
    };
    
    loadPaymentMethods();
  }, []);
  
  const handleClick = () => {
    setIsAddedToCart(true);
    onClick();
    
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
