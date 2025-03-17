
import { ShoppingBag, X, Trash2, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useCart, CartItem } from '@/hooks/useCart';
import { cn } from '@/lib/utils';

export function MiniCart() {
  const { cartItems, isCartOpen, closeCart, removeFromCart, updateQuantity, getSubtotal } = useCart();
  
  const subtotal = getSubtotal();
  
  return (
    <Sheet open={isCartOpen} onOpenChange={(open) => !open && closeCart()}>
      <SheetContent className="w-full sm:max-w-md border-l border-gray-800">
        <SheetHeader className="space-y-2.5 pr-6">
          <SheetTitle className="text-left flex items-center">
            <ShoppingBag className="mr-2 h-5 w-5" />
            Your Cart ({cartItems.length})
          </SheetTitle>
          <SheetDescription className="text-left">
            {cartItems.length === 0 
              ? "Your cart is empty" 
              : `You have ${cartItems.length} ${cartItems.length === 1 ? 'item' : 'items'} in your cart`}
          </SheetDescription>
        </SheetHeader>
        
        <div className="mt-8 flex flex-col h-[calc(100vh-12rem)]">
          {cartItems.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center">
              <ShoppingBag className="h-12 w-12 text-gray-500 mb-4" />
              <h3 className="text-lg font-medium mb-2">Your cart is empty</h3>
              <p className="text-sm text-gray-500 mb-6">
                Items added to your cart will appear here.
              </p>
              <Button asChild onClick={closeCart}>
                <Link to="/shop">Start Shopping</Link>
              </Button>
            </div>
          ) : (
            <>
              <ScrollArea className="flex-1 pr-4">
                <ul className="space-y-5">
                  {cartItems.map((item) => (
                    <MiniCartItem 
                      key={item.id} 
                      item={item} 
                      onRemove={() => removeFromCart(item.id)}
                      onUpdateQuantity={(q) => updateQuantity(item.id, q)}
                    />
                  ))}
                </ul>
              </ScrollArea>
              
              <div className="mt-auto pt-6">
                <Separator className="mb-4" />
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-gray-400">Subtotal</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="space-y-3">
                  <Button asChild className="w-full" onClick={closeCart}>
                    <Link to="/cart">View Cart</Link>
                  </Button>
                  <Button asChild variant="secondary" className="w-full" onClick={closeCart}>
                    <Link to="/checkout">
                      Checkout
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
                <p className="text-xs text-center text-gray-500 mt-4">
                  Shipping and taxes calculated at checkout
                </p>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

interface MiniCartItemProps {
  item: CartItem;
  onRemove: () => void;
  onUpdateQuantity: (quantity: number) => void;
}

function MiniCartItem({ item, onRemove, onUpdateQuantity }: MiniCartItemProps) {
  const itemPrice = item.discountPrice || item.price;
  
  return (
    <li className="flex py-2">
      <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border border-gray-800">
        <img
          src={item.image}
          alt={item.name}
          className="h-full w-full object-cover"
        />
      </div>
      
      <div className="ml-4 flex flex-1 flex-col">
        <div className="flex justify-between text-sm font-medium">
          <Link to={`/tee/${item.productId}`} className="hover:text-primary" onClick={() => useCart.getState().closeCart()}>
            {item.name}
          </Link>
          <p className="ml-4 whitespace-nowrap">
            ${(itemPrice * item.quantity).toFixed(2)}
          </p>
        </div>
        
        <div className="flex items-center text-xs text-gray-500 mt-0.5">
          {item.color && <span className="mr-2">Color: {item.color}</span>}
          {item.size && <span>Size: {item.size}</span>}
        </div>
        
        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center border border-gray-700 rounded">
            <button 
              className="w-5 h-5 flex items-center justify-center text-xs text-gray-500 hover:text-white"
              onClick={() => onUpdateQuantity(Math.max(1, item.quantity - 1))}
              aria-label="Decrease quantity"
            >
              -
            </button>
            <span className="w-6 text-center text-xs">{item.quantity}</span>
            <button 
              className="w-5 h-5 flex items-center justify-center text-xs text-gray-500 hover:text-white"
              onClick={() => onUpdateQuantity(item.quantity + 1)}
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
          
          <button
            type="button"
            className={cn(
              "text-gray-500 hover:text-red-500 transition-colors",
              "p-1 rounded-full hover:bg-red-900/20"
            )}
            onClick={onRemove}
            aria-label="Remove item"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </li>
  );
}

export default MiniCart;
