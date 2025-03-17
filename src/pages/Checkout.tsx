
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, CreditCard, CheckCircle, Truck, ArrowRight, User, UserPlus } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { toast } from 'sonner';
import Navbar from '@/components/navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FadeIn } from '@/components/ui/transitions';
import { initStripe, initPayPal } from '@/lib/payment';
import CheckoutForm from '@/components/checkout/CheckoutForm';
import OrderSummary from '@/components/checkout/OrderSummary';
import ExpressCheckout from '@/components/checkout/ExpressCheckout';

const Checkout = () => {
  const { cartItems, getSubtotal, clearCart } = useCart();
  const [checkoutStep, setCheckoutStep] = useState<'account' | 'shipping' | 'payment' | 'review' | 'confirmation'>('account');
  const [checkoutType, setCheckoutType] = useState<'guest' | 'account'>('guest');
  const navigate = useNavigate();
  
  const subtotal = getSubtotal();
  
  // If cart is empty, redirect to cart page
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar transparent={true} />
        <div className="flex-1 flex flex-col items-center justify-center p-6">
          <div className="text-center">
            <h1 className="text-2xl font-medium mb-4">Your cart is empty</h1>
            <p className="mb-6 text-gray-400">Add some items to your cart before proceeding to checkout.</p>
            <Button onClick={() => navigate('/shop')}>Continue Shopping</Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  const handlePlaceOrder = () => {
    // Simulate order placement
    toast.success('Order placed successfully!');
    clearCart();
    setCheckoutStep('confirmation');
  };

  // Render confirmation step if order is complete
  if (checkoutStep === 'confirmation') {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar transparent={true} />
        <div className="flex-1 flex flex-col items-center justify-center p-6">
          <div className="max-w-md w-full text-center">
            <div className="mb-6">
              <CheckCircle className="h-16 w-16 text-primary mx-auto mb-4" />
              <h1 className="text-2xl font-medium mb-2">Order Confirmed!</h1>
              <p className="text-gray-400">Thank you for your purchase. Your order has been placed successfully.</p>
            </div>
            
            <div className="border border-gray-800 rounded-lg p-6 mb-6 text-left">
              <h2 className="text-lg font-medium mb-4">Order Details</h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Order Number:</span>
                  <span>ORD-{Math.floor(100000 + Math.random() * 900000)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Date:</span>
                  <span>{new Date().toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Total:</span>
                  <span>${(subtotal + 9.99).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Payment Method:</span>
                  <span>Credit Card</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <Button asChild className="w-full">
                <div onClick={() => navigate('/account/orders')}>View Order Status</div>
              </Button>
              <Button onClick={() => navigate('/shop')} variant="outline" className="w-full">
                Continue Shopping
              </Button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen">
      <Navbar transparent={true} />
      
      <main className="pt-20 pb-20">
        <div className="container mx-auto px-4 sm:px-6">
          <FadeIn>
            <h1 className="text-3xl font-playfair font-medium mb-8">Checkout</h1>
          </FadeIn>
          
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {/* Checkout Steps */}
              <FadeIn>
                <div className="flex items-center justify-between mb-6">
                  <div className={`flex items-center ${checkoutStep === 'account' ? 'text-primary' : 'text-gray-400'}`}>
                    <div className="flex items-center justify-center w-8 h-8 rounded-full border border-current mr-2">
                      <User className="h-4 w-4" />
                    </div>
                    <span>Account</span>
                  </div>
                  <div className="h-px w-8 bg-gray-800"></div>
                  <div className={`flex items-center ${checkoutStep === 'shipping' ? 'text-primary' : 'text-gray-400'}`}>
                    <div className="flex items-center justify-center w-8 h-8 rounded-full border border-current mr-2">
                      <Truck className="h-4 w-4" />
                    </div>
                    <span>Shipping</span>
                  </div>
                  <div className="h-px w-8 bg-gray-800"></div>
                  <div className={`flex items-center ${checkoutStep === 'payment' ? 'text-primary' : 'text-gray-400'}`}>
                    <div className="flex items-center justify-center w-8 h-8 rounded-full border border-current mr-2">
                      <CreditCard className="h-4 w-4" />
                    </div>
                    <span>Payment</span>
                  </div>
                  <div className="h-px w-8 bg-gray-800"></div>
                  <div className={`flex items-center ${checkoutStep === 'review' ? 'text-primary' : 'text-gray-400'}`}>
                    <div className="flex items-center justify-center w-8 h-8 rounded-full border border-current mr-2">
                      <CheckCircle className="h-4 w-4" />
                    </div>
                    <span>Review</span>
                  </div>
                </div>
              </FadeIn>
              
              {/* Express Checkout */}
              <FadeIn delay={100}>
                <div className="border border-gray-800 rounded-lg p-6">
                  <h2 className="text-lg font-medium mb-4">Express Checkout</h2>
                  <ExpressCheckout onComplete={() => handlePlaceOrder()} />
                </div>
              </FadeIn>
              
              <FadeIn delay={200}>
                <Separator className="my-6">
                  <span className="mx-2 text-sm text-gray-500">OR</span>
                </Separator>
              </FadeIn>
              
              {/* Main Checkout Process */}
              <FadeIn delay={300}>
                {checkoutStep === 'account' && (
                  <div className="border border-gray-800 rounded-lg p-6">
                    <h2 className="text-lg font-medium mb-4">Choose Checkout Method</h2>
                    
                    <Tabs defaultValue="guest" onValueChange={(value) => setCheckoutType(value as 'guest' | 'account')}>
                      <TabsList className="grid w-full grid-cols-2 mb-6">
                        <TabsTrigger value="guest">Guest Checkout</TabsTrigger>
                        <TabsTrigger value="account">Account Login</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="guest">
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="firstName">First Name</Label>
                              <Input id="firstName" placeholder="John" />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="lastName">Last Name</Label>
                              <Input id="lastName" placeholder="Doe" />
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="email">Email Address</Label>
                            <Input id="email" type="email" placeholder="john.doe@example.com" />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="phone">Phone Number (optional)</Label>
                            <Input id="phone" type="tel" placeholder="(123) 456-7890" />
                          </div>
                          
                          <div className="flex items-center space-x-2 mt-4">
                            <input 
                              type="checkbox" 
                              id="createAccount" 
                              className="h-4 w-4 rounded border-gray-700 bg-transparent text-primary focus:ring-primary/50"
                            />
                            <Label htmlFor="createAccount" className="text-sm cursor-pointer">
                              Create an account for faster checkout next time
                            </Label>
                          </div>
                          
                          <Button 
                            className="w-full mt-2" 
                            onClick={() => setCheckoutStep('shipping')}
                          >
                            Continue to Shipping
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="account">
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="loginEmail">Email Address</Label>
                            <Input id="loginEmail" type="email" placeholder="john.doe@example.com" />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="loginPassword">Password</Label>
                            <Input id="loginPassword" type="password" placeholder="********" />
                          </div>
                          
                          <Button className="w-full">
                            Sign In
                          </Button>
                          
                          <div className="text-center">
                            <Button variant="link" onClick={() => setCheckoutType('guest')}>
                              <UserPlus className="mr-1 h-4 w-4" />
                              Create Account
                            </Button>
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </div>
                )}
                
                {checkoutStep === 'shipping' && (
                  <CheckoutForm 
                    onBack={() => setCheckoutStep('account')}
                    onNext={() => setCheckoutStep('payment')}
                  />
                )}
                
                {checkoutStep === 'payment' && (
                  <div className="border border-gray-800 rounded-lg p-6">
                    <h2 className="text-lg font-medium mb-4">Payment Method</h2>
                    
                    <RadioGroup defaultValue="card" className="space-y-4">
                      <div className="border border-gray-800 rounded-lg p-4 flex items-start space-x-3">
                        <RadioGroupItem value="card" id="card" className="mt-1" />
                        <div className="flex-1">
                          <Label htmlFor="card" className="flex items-center text-base font-medium cursor-pointer">
                            <CreditCard className="mr-2 h-5 w-5" />
                            Credit / Debit Card
                          </Label>
                          
                          <div className="mt-4 space-y-4">
                            <div className="space-y-2">
                              <Label htmlFor="cardNumber">Card Number</Label>
                              <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                            </div>
                            
                            <div className="grid grid-cols-3 gap-4">
                              <div className="space-y-2 col-span-2">
                                <Label htmlFor="expiryDate">Expiry Date</Label>
                                <Input id="expiryDate" placeholder="MM/YY" />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="cvv">CVV</Label>
                                <Input id="cvv" placeholder="123" />
                              </div>
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="nameOnCard">Name on Card</Label>
                              <Input id="nameOnCard" placeholder="John Doe" />
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="border border-gray-800 rounded-lg p-4 flex items-start space-x-3 opacity-60">
                        <RadioGroupItem value="paypal" id="paypal" className="mt-1" disabled />
                        <div className="flex-1">
                          <Label htmlFor="paypal" className="flex items-center text-base font-medium cursor-pointer">
                            <span className="mr-2 text-blue-500 font-bold">Pay</span>
                            <span className="text-blue-700 font-bold">Pal</span>
                          </Label>
                          <p className="text-sm text-gray-400 mt-1">Coming soon</p>
                        </div>
                      </div>
                    </RadioGroup>
                    
                    <div className="mt-6 flex justify-between">
                      <Button variant="outline" onClick={() => setCheckoutStep('shipping')}>
                        Back
                      </Button>
                      <Button onClick={() => setCheckoutStep('review')}>
                        Continue to Review
                      </Button>
                    </div>
                  </div>
                )}
                
                {checkoutStep === 'review' && (
                  <div className="border border-gray-800 rounded-lg p-6">
                    <h2 className="text-lg font-medium mb-4">Review Order</h2>
                    
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-sm font-medium text-gray-400 mb-2">Shipping Address</h3>
                        <div className="border border-gray-800 rounded-lg p-4">
                          <p>John Doe</p>
                          <p>123 Main Street</p>
                          <p>Apt 4B</p>
                          <p>New York, NY 10001</p>
                          <p>United States</p>
                          <Button variant="link" className="px-0 py-1 h-auto text-primary" 
                                onClick={() => setCheckoutStep('shipping')}>
                            Edit
                          </Button>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium text-gray-400 mb-2">Payment Method</h3>
                        <div className="border border-gray-800 rounded-lg p-4">
                          <div className="flex items-center">
                            <CreditCard className="mr-2 h-5 w-5 text-gray-400" />
                            <span>Credit Card ending in 3456</span>
                          </div>
                          <Button variant="link" className="px-0 py-1 h-auto text-primary" 
                                onClick={() => setCheckoutStep('payment')}>
                            Edit
                          </Button>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium text-gray-400 mb-2">Order Items</h3>
                        <div className="border border-gray-800 rounded-lg p-4 space-y-4 max-h-60 overflow-y-auto">
                          {cartItems.map((item) => (
                            <div key={item.id} className="flex items-center">
                              <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-800">
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="h-full w-full object-cover"
                                />
                              </div>
                              <div className="ml-4 flex-1">
                                <p className="text-sm font-medium">{item.name}</p>
                                <p className="text-xs text-gray-400">
                                  {item.color} • {item.size} • Qty: {item.quantity}
                                </p>
                              </div>
                              <div className="text-sm font-medium">
                                ${((item.discountPrice || item.price) * item.quantity).toFixed(2)}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 space-y-4">
                      <div className="flex items-center">
                        <input 
                          type="checkbox" 
                          id="termsAndConditions" 
                          className="h-4 w-4 rounded border-gray-700 bg-transparent text-primary focus:ring-primary/50"
                        />
                        <Label htmlFor="termsAndConditions" className="ml-2 text-sm cursor-pointer">
                          I agree to the <a href="#" className="text-primary hover:underline">Terms and Conditions</a>
                        </Label>
                      </div>
                      
                      <div className="flex justify-between">
                        <Button variant="outline" onClick={() => setCheckoutStep('payment')}>
                          Back
                        </Button>
                        <Button onClick={handlePlaceOrder}>
                          Place Order
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </FadeIn>
            </div>
            
            <div className="lg:col-span-1">
              <OrderSummary />
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Checkout;
