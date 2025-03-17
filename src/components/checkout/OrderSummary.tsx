
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { ArrowRight } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { useState } from 'react';
import { toast } from 'sonner';

const OrderSummary = () => {
  const { cartItems, getSubtotal } = useCart();
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [appliedCode, setAppliedCode] = useState('');
  
  const subtotal = getSubtotal();
  const shipping = 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax - discount;
  
  const handleApplyPromo = () => {
    if (!promoCode) return;
    
    if (promoCode.toUpperCase() === 'SAVE10') {
      const discountAmount = subtotal * 0.1;
      setDiscount(discountAmount);
      setAppliedCode(promoCode.toUpperCase());
      toast.success('Promo code applied successfully!');
    } else {
      toast.error('Invalid promo code');
    }
    
    setPromoCode('');
  };
  
  return (
    <div className="border border-gray-800 rounded-lg p-6 sticky top-24">
      <h2 className="text-lg font-medium mb-4">Order Summary</h2>
      
      <div className="space-y-4 mb-6">
        {cartItems.map((item) => (
          <div key={item.id} className="flex items-center">
            <div className="h-14 w-14 flex-shrink-0 overflow-hidden rounded-md border border-gray-800">
              <img
                src={item.image}
                alt={item.name}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium">{item.name}</p>
              <p className="text-xs text-gray-400">
                {item.size} • Qty: {item.quantity}
              </p>
            </div>
            <div className="text-sm font-medium">
              ${((item.discountPrice || item.price) * item.quantity).toFixed(2)}
            </div>
          </div>
        ))}
      </div>
      
      {!appliedCode && (
        <div className="mb-6">
          <div className="flex space-x-2">
            <Input
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              placeholder="Promo code"
              className="bg-black border-gray-800"
            />
            <Button variant="outline" onClick={handleApplyPromo}>Apply</Button>
          </div>
          <p className="text-xs text-gray-500 mt-1">Try code: SAVE10</p>
        </div>
      )}
      
      <Separator className="mb-4" />
      
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-400">Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        
        {discount > 0 && (
          <div className="flex justify-between text-green-500">
            <span>Discount ({appliedCode})</span>
            <span>-${discount.toFixed(2)}</span>
          </div>
        )}
        
        <div className="flex justify-between">
          <span className="text-gray-400">Shipping</span>
          <span>${shipping.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-400">Tax (8%)</span>
          <span>${tax.toFixed(2)}</span>
        </div>
      </div>
      
      <Separator className="my-4" />
      
      <div className="flex justify-between text-lg font-medium mb-6">
        <span>Total</span>
        <span>${total.toFixed(2)}</span>
      </div>
      
      <div className="text-xs text-gray-500 mb-6">
        <p>Please note that your order will be processed in accordance with our  
          <a href="#" className="text-primary hover:underline ml-1">Terms of Service</a>.</p>
      </div>
      
      <Button className="w-full">
        Proceed to Checkout
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
};

export default OrderSummary;
