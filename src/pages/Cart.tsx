
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, ChevronLeft, ChevronRight, ShoppingBag, CreditCard } from 'lucide-react';
import { useCart, CartItem } from '@/hooks/useCart';
import Navbar from '@/components/navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FadeIn, StaggeredChildren } from '@/components/ui/transitions';
import { cn } from '@/lib/utils';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, getSubtotal } = useCart();
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [discount, setDiscount] = useState(0);
  
  const subtotal = getSubtotal();
  const shipping = subtotal > 0 ? 9.99 : 0;
  const total = subtotal + shipping - discount;
  
  const handleApplyCoupon = () => {
    if (couponCode.toLowerCase() === 'discount10') {
      setDiscount(subtotal * 0.1);
      setCouponApplied(true);
    }
  };
  
  return (
    <div className="min-h-screen">
      <Navbar transparent={true} />
      
      <main className="pt-20 pb-20">
        <div className="container mx-auto px-4 sm:px-6">
          <FadeIn>
            <h1 className="text-3xl font-playfair font-medium mb-8">Shopping Cart</h1>
          </FadeIn>
          
          {cartItems.length === 0 ? (
            <div className="text-center py-16">
              <FadeIn>
                <ShoppingBag className="mx-auto h-16 w-16 text-gray-400 mb-6" />
                <h2 className="text-2xl font-playfair mb-4">Your cart is empty</h2>
                <p className="text-gray-400 mb-8">Looks like you haven't added any items to your cart yet.</p>
                <Button asChild>
                  <Link to="/shop">Continue Shopping</Link>
                </Button>
              </FadeIn>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <FadeIn>
                  <div className="rounded-lg border border-gray-800 overflow-hidden">
                    <table className="w-full">
                      <thead className="border-b border-gray-800 bg-black/30">
                        <tr>
                          <th className="px-6 py-3 text-left text-sm font-medium" colSpan={2}>Product</th>
                          <th className="px-6 py-3 text-left text-sm font-medium">Price</th>
                          <th className="px-6 py-3 text-left text-sm font-medium">Quantity</th>
                          <th className="px-6 py-3 text-left text-sm font-medium">Total</th>
                          <th className="px-6 py-3 text-right text-sm font-medium"></th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-800">
                        <StaggeredChildren staggerDelay={100} className="divide-y divide-gray-800">
                          {cartItems.map((item) => (
                            <CartItemRow
                              key={item.id}
                              item={item}
                              onRemove={() => removeFromCart(item.id)}
                              onUpdateQuantity={(quantity) => updateQuantity(item.id, quantity)}
                            />
                          ))}
                        </StaggeredChildren>
                      </tbody>
                    </table>
                  </div>
                </FadeIn>
                
                <div className="flex justify-between mt-6">
                  <FadeIn delay={100}>
                    <Button variant="outline" asChild>
                      <Link to="/shop" className="flex items-center">
                        <ChevronLeft size={16} className="mr-2" />
                        Continue Shopping
                      </Link>
                    </Button>
                  </FadeIn>
                  
                  <FadeIn delay={150}>
                    <Button variant="outline" onClick={clearCart} className="text-red-500 hover:text-red-400 hover:border-red-400">
                      Clear Cart
                    </Button>
                  </FadeIn>
                </div>
              </div>
              
              <div>
                <FadeIn delay={200}>
                  <div className="rounded-lg border border-gray-800 p-6 space-y-6">
                    <h2 className="text-lg font-medium font-playfair">Order Summary</h2>
                    
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Subtotal</span>
                        <span>${subtotal.toFixed(2)}</span>
                      </div>
                      
                      {discount > 0 && (
                        <div className="flex justify-between text-green-500">
                          <span>Discount</span>
                          <span>-${discount.toFixed(2)}</span>
                        </div>
                      )}
                      
                      <div className="flex justify-between">
                        <span className="text-gray-400">Shipping</span>
                        <span>${shipping.toFixed(2)}</span>
                      </div>
                      
                      <div className="border-t border-gray-800 pt-4 flex justify-between font-medium">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                      </div>
                    </div>
                    
                    {!couponApplied && (
                      <div className="pt-2">
                        <label className="text-sm text-gray-400 mb-1 block">Coupon Code</label>
                        <div className="flex space-x-2">
                          <Input
                            value={couponCode}
                            onChange={(e) => setCouponCode(e.target.value)}
                            placeholder="Enter code"
                            className="bg-black border-gray-800"
                          />
                          <Button variant="outline" onClick={handleApplyCoupon}>Apply</Button>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Try code: DISCOUNT10</p>
                      </div>
                    )}
                    
                    <Button className="w-full" size="lg">
                      <CreditCard size={16} className="mr-2" />
                      Checkout
                    </Button>
                    
                    <div className="text-xs text-gray-500 text-center">
                      Secure payment powered by Stripe and PayPal
                    </div>
                  </div>
                </FadeIn>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

interface CartItemRowProps {
  item: CartItem;
  onRemove: () => void;
  onUpdateQuantity: (quantity: number) => void;
}

const CartItemRow = ({ item, onRemove, onUpdateQuantity }: CartItemRowProps) => {
  const itemPrice = item.discountPrice || item.price;
  const itemTotal = itemPrice * item.quantity;
  
  const incrementQuantity = () => {
    onUpdateQuantity(item.quantity + 1);
  };
  
  const decrementQuantity = () => {
    if (item.quantity > 1) {
      onUpdateQuantity(item.quantity - 1);
    }
  };
  
  return (
    <tr className="group">
      <td className="px-6 py-4 whitespace-nowrap">
        <Link to={`/tee/${item.productId}`} className="block w-16 h-16 bg-gray-900 rounded overflow-hidden">
          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
        </Link>
      </td>
      <td className="px-6 py-4">
        <Link to={`/tee/${item.productId}`} className="font-medium hover:text-primary transition-colors">
          {item.name}
        </Link>
        <div className="text-sm text-gray-400 mt-1">
          {item.color && <span>Color: {item.color}</span>}
          {item.size && <span className="ml-2">Size: {item.size}</span>}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        {item.discountPrice ? (
          <div>
            <span className="font-medium">${item.discountPrice.toFixed(2)}</span>
            <span className="text-sm text-gray-500 line-through ml-2">${item.price.toFixed(2)}</span>
          </div>
        ) : (
          <span className="font-medium">${item.price.toFixed(2)}</span>
        )}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center border border-gray-700 rounded-md w-24">
          <button 
            onClick={decrementQuantity}
            className="px-2 py-1 text-gray-400 hover:text-gray-300"
            aria-label="Decrease quantity"
          >
            <ChevronLeft size={16} />
          </button>
          <div className="w-8 text-center py-1 font-medium text-sm">
            {item.quantity}
          </div>
          <button 
            onClick={incrementQuantity}
            className="px-2 py-1 text-gray-400 hover:text-gray-300"
            aria-label="Increase quantity"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap font-medium">
        ${itemTotal.toFixed(2)}
      </td>
      <td className="px-6 py-4 text-right whitespace-nowrap">
        <button 
          onClick={onRemove}
          className={cn(
            "text-gray-500 p-1 rounded-full",
            "opacity-0 group-hover:opacity-100 transition-opacity",
            "hover:bg-red-900/20 hover:text-red-500"
          )}
          aria-label="Remove item"
        >
          <Trash2 size={16} />
        </button>
      </td>
    </tr>
  );
};

export default Cart;
