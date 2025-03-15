
import { useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface AddToCartButtonProps {
  onClick: () => void;
}

const AddToCartButton = ({ onClick }: AddToCartButtonProps) => {
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  
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
    </Button>
  );
};

export default AddToCartButton;
