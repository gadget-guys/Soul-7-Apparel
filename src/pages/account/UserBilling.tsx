
import { useState, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/supabase';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { CreditCard, PlusCircle, Edit, Trash2, Check, AlertCircle } from 'lucide-react';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { getAvailablePaymentMethods } from '@/lib/payment';

interface UserBillingProps {
  user: User | null;
}

interface PaymentMethod {
  id: string;
  type: 'card' | 'paypal';
  last_four?: string;
  expiry_date?: string;
  card_type?: string;
  paypal_email?: string;
  is_default: boolean;
}

interface BillingAddress {
  id: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  is_default: boolean;
}

const UserBilling = ({ user }: UserBillingProps) => {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [billingAddresses, setBillingAddresses] = useState<BillingAddress[]>([]);
  const [availablePaymentOptions, setAvailablePaymentOptions] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [addressFormOpen, setAddressFormOpen] = useState(false);
  const [paymentFormOpen, setPaymentFormOpen] = useState(false);
  const { toast } = useToast();

  const [newAddress, setNewAddress] = useState({
    street: '',
    city: '',
    state: '',
    zip: '',
    country: 'US',
    is_default: false
  });

  const [newPaymentMethod, setNewPaymentMethod] = useState({
    type: 'card',
    card_number: '',
    expiry_date: '',
    cvv: '',
    name_on_card: '',
    paypal_email: '',
    is_default: false
  });

  useEffect(() => {
    const fetchBillingInfo = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        // Fetch payment methods
        const { data: paymentData, error: paymentError } = await supabase
          .from('payment_methods')
          .select('*')
          .eq('user_id', user.id);

        if (paymentError) throw paymentError;
        setPaymentMethods(paymentData || []);

        // Fetch billing addresses
        const { data: addressData, error: addressError } = await supabase
          .from('billing_addresses')
          .select('*')
          .eq('user_id', user.id);

        if (addressError) throw addressError;
        setBillingAddresses(addressData || []);

        // Get available payment methods from the system
        const availableMethods = await getAvailablePaymentMethods();
        setAvailablePaymentOptions(availableMethods);
      } catch (error) {
        console.error('Error fetching billing info:', error);
        toast({
          title: "Error loading billing information",
          description: "Unable to load your billing details. Please try again later.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchBillingInfo();
  }, [user, toast]);

  const handleAddAddress = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('billing_addresses')
        .insert({
          user_id: user.id,
          ...newAddress,
          created_at: new Date()
        })
        .select();
        
      if (error) throw error;
      
      if (newAddress.is_default) {
        // Update other addresses to non-default
        const updatedAddresses = billingAddresses.map(address => ({
          ...address,
          is_default: false
        }));
        
        setBillingAddresses([...updatedAddresses, data[0]]);
      } else {
        setBillingAddresses([...billingAddresses, data[0]]);
      }
      
      setAddressFormOpen(false);
      setNewAddress({
        street: '',
        city: '',
        state: '',
        zip: '',
        country: 'US',
        is_default: false
      });
      
      toast({
        title: "Address added",
        description: "Your billing address has been added successfully."
      });
    } catch (error: any) {
      toast({
        title: "Error adding address",
        description: error.message || "There was an error adding your address.",
        variant: "destructive"
      });
    }
  };

  const handleAddPaymentMethod = async () => {
    if (!user) return;
    
    try {
      // In a real implementation, you would integrate with Stripe or PayPal API
      // This is a simplified example
      
      let paymentData: Partial<PaymentMethod> = {
        type: newPaymentMethod.type,
        is_default: newPaymentMethod.is_default
      };
      
      if (newPaymentMethod.type === 'card') {
        paymentData = {
          ...paymentData,
          last_four: newPaymentMethod.card_number.slice(-4),
          expiry_date: newPaymentMethod.expiry_date,
          card_type: getCardType(newPaymentMethod.card_number)
        };
      } else if (newPaymentMethod.type === 'paypal') {
        paymentData = {
          ...paymentData,
          paypal_email: newPaymentMethod.paypal_email
        };
      }
      
      const { data, error } = await supabase
        .from('payment_methods')
        .insert({
          user_id: user.id,
          ...paymentData,
          created_at: new Date()
        })
        .select();
        
      if (error) throw error;
      
      if (newPaymentMethod.is_default) {
        // Update other payment methods to non-default
        const updatedMethods = paymentMethods.map(method => ({
          ...method,
          is_default: false
        }));
        
        setPaymentMethods([...updatedMethods, data[0]]);
      } else {
        setPaymentMethods([...paymentMethods, data[0]]);
      }
      
      setPaymentFormOpen(false);
      setNewPaymentMethod({
        type: 'card',
        card_number: '',
        expiry_date: '',
        cvv: '',
        name_on_card: '',
        paypal_email: '',
        is_default: false
      });
      
      toast({
        title: "Payment method added",
        description: "Your payment method has been added successfully."
      });
    } catch (error: any) {
      toast({
        title: "Error adding payment method",
        description: error.message || "There was an error adding your payment method.",
        variant: "destructive"
      });
    }
  };

  const handleMakeDefaultPayment = async (id: string) => {
    if (!user) return;
    
    try {
      // Update the selected payment method
      await supabase
        .from('payment_methods')
        .update({ is_default: true })
        .eq('id', id);
        
      // Update all other payment methods to non-default
      await supabase
        .from('payment_methods')
        .update({ is_default: false })
        .neq('id', id)
        .eq('user_id', user.id);
        
      // Update local state
      const updatedMethods = paymentMethods.map(method => ({
        ...method,
        is_default: method.id === id
      }));
      
      setPaymentMethods(updatedMethods);
      
      toast({
        title: "Default payment updated",
        description: "Your default payment method has been updated."
      });
    } catch (error: any) {
      toast({
        title: "Error updating default payment",
        description: error.message || "There was an error updating your default payment method.",
        variant: "destructive"
      });
    }
  };

  const handleMakeDefaultAddress = async (id: string) => {
    if (!user) return;
    
    try {
      // Update the selected address
      await supabase
        .from('billing_addresses')
        .update({ is_default: true })
        .eq('id', id);
        
      // Update all other addresses to non-default
      await supabase
        .from('billing_addresses')
        .update({ is_default: false })
        .neq('id', id)
        .eq('user_id', user.id);
        
      // Update local state
      const updatedAddresses = billingAddresses.map(address => ({
        ...address,
        is_default: address.id === id
      }));
      
      setBillingAddresses(updatedAddresses);
      
      toast({
        title: "Default address updated",
        description: "Your default billing address has been updated."
      });
    } catch (error: any) {
      toast({
        title: "Error updating default address",
        description: error.message || "There was an error updating your default address.",
        variant: "destructive"
      });
    }
  };

  const handleDeletePaymentMethod = async (id: string) => {
    if (!user) return;
    
    try {
      await supabase
        .from('payment_methods')
        .delete()
        .eq('id', id);
        
      // Update local state
      setPaymentMethods(paymentMethods.filter(method => method.id !== id));
      
      toast({
        title: "Payment method removed",
        description: "Your payment method has been removed successfully."
      });
    } catch (error: any) {
      toast({
        title: "Error removing payment method",
        description: error.message || "There was an error removing your payment method.",
        variant: "destructive"
      });
    }
  };

  const handleDeleteAddress = async (id: string) => {
    if (!user) return;
    
    try {
      await supabase
        .from('billing_addresses')
        .delete()
        .eq('id', id);
        
      // Update local state
      setBillingAddresses(billingAddresses.filter(address => address.id !== id));
      
      toast({
        title: "Address removed",
        description: "Your billing address has been removed successfully."
      });
    } catch (error: any) {
      toast({
        title: "Error removing address",
        description: error.message || "There was an error removing your address.",
        variant: "destructive"
      });
    }
  };

  // Helper function to determine card type from number
  const getCardType = (cardNumber: string) => {
    const firstDigit = cardNumber.charAt(0);
    const firstTwoDigits = parseInt(cardNumber.substring(0, 2));
    
    if (firstDigit === '4') return 'Visa';
    if (firstTwoDigits >= 51 && firstTwoDigits <= 55) return 'Mastercard';
    if (firstTwoDigits === 34 || firstTwoDigits === 37) return 'Amex';
    if (firstTwoDigits === 65 || firstTwoDigits === 62) return 'Discover';
    return 'Unknown';
  };

  if (loading) {
    return (
      <div className="bg-gray-900 p-6 rounded-lg flex justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-primary" />
            Payment Methods
          </CardTitle>
          <Dialog open={paymentFormOpen} onOpenChange={setPaymentFormOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <PlusCircle className="h-4 w-4" />
                Add Payment Method
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-gray-900 border-gray-800 text-white">
              <DialogHeader>
                <DialogTitle>Add Payment Method</DialogTitle>
              </DialogHeader>
              
              <div className="mt-4 space-y-4">
                {availablePaymentOptions.length === 0 ? (
                  <div className="p-4 bg-orange-950/30 border border-orange-800/50 rounded-md flex items-start gap-2">
                    <AlertCircle className="h-5 w-5 text-orange-400 shrink-0 mt-0.5" />
                    <p className="text-sm text-orange-300">
                      No payment methods are available. Please contact the administrator.
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Payment Type</label>
                      <div className="flex gap-2">
                        {availablePaymentOptions.includes('stripe') && (
                          <Button
                            type="button"
                            variant={newPaymentMethod.type === 'card' ? 'default' : 'outline'}
                            onClick={() => setNewPaymentMethod({...newPaymentMethod, type: 'card'})}
                            className="flex-1"
                          >
                            Credit Card
                          </Button>
                        )}
                        {availablePaymentOptions.includes('paypal') && (
                          <Button
                            type="button"
                            variant={newPaymentMethod.type === 'paypal' ? 'default' : 'outline'}
                            onClick={() => setNewPaymentMethod({...newPaymentMethod, type: 'paypal'})}
                            className="flex-1"
                          >
                            PayPal
                          </Button>
                        )}
                      </div>
                    </div>
                    
                    {newPaymentMethod.type === 'card' && (
                      <>
                        <div className="space-y-2">
                          <label htmlFor="name_on_card" className="text-sm font-medium">Name on Card</label>
                          <Input
                            id="name_on_card"
                            value={newPaymentMethod.name_on_card}
                            onChange={(e) => setNewPaymentMethod({...newPaymentMethod, name_on_card: e.target.value})}
                            className="bg-gray-800 border-gray-700"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <label htmlFor="card_number" className="text-sm font-medium">Card Number</label>
                          <Input
                            id="card_number"
                            value={newPaymentMethod.card_number}
                            onChange={(e) => setNewPaymentMethod({...newPaymentMethod, card_number: e.target.value})}
                            placeholder="•••• •••• •••• ••••"
                            className="bg-gray-800 border-gray-700"
                          />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label htmlFor="expiry_date" className="text-sm font-medium">Expiry Date</label>
                            <Input
                              id="expiry_date"
                              value={newPaymentMethod.expiry_date}
                              onChange={(e) => setNewPaymentMethod({...newPaymentMethod, expiry_date: e.target.value})}
                              placeholder="MM/YY"
                              className="bg-gray-800 border-gray-700"
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <label htmlFor="cvv" className="text-sm font-medium">CVV</label>
                            <Input
                              id="cvv"
                              value={newPaymentMethod.cvv}
                              onChange={(e) => setNewPaymentMethod({...newPaymentMethod, cvv: e.target.value})}
                              placeholder="•••"
                              className="bg-gray-800 border-gray-700"
                            />
                          </div>
                        </div>
                      </>
                    )}
                    
                    {newPaymentMethod.type === 'paypal' && (
                      <div className="space-y-2">
                        <label htmlFor="paypal_email" className="text-sm font-medium">PayPal Email</label>
                        <Input
                          id="paypal_email"
                          type="email"
                          value={newPaymentMethod.paypal_email}
                          onChange={(e) => setNewPaymentMethod({...newPaymentMethod, paypal_email: e.target.value})}
                          className="bg-gray-800 border-gray-700"
                        />
                      </div>
                    )}
                    
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={newPaymentMethod.is_default}
                        onChange={(e) => setNewPaymentMethod({...newPaymentMethod, is_default: e.target.checked})}
                        className="rounded border-gray-600 bg-gray-800 text-primary"
                      />
                      <span className="text-sm">Set as default payment method</span>
                    </label>
                    
                    <div className="pt-4 flex justify-end">
                      <Button onClick={handleAddPaymentMethod}>Add Payment Method</Button>
                    </div>
                  </>
                )}
              </div>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          {paymentMethods.length === 0 ? (
            <div className="text-center py-6">
              <p className="text-gray-400">No payment methods added yet.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {paymentMethods.map((method) => (
                <div 
                  key={method.id}
                  className={`flex items-center justify-between p-3 rounded-md border ${
                    method.is_default ? 'border-primary/50 bg-primary/5' : 'border-gray-800 bg-gray-800/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {method.type === 'card' ? (
                      <div className="h-10 w-16 bg-gray-700 rounded flex items-center justify-center text-xs">
                        {method.card_type}
                      </div>
                    ) : (
                      <div className="h-10 w-16 bg-blue-900/30 text-blue-400 rounded flex items-center justify-center text-xs">
                        PayPal
                      </div>
                    )}
                    
                    <div>
                      {method.type === 'card' ? (
                        <>
                          <p className="text-sm font-medium">•••• •••• •••• {method.last_four}</p>
                          <p className="text-xs text-gray-400">Expires {method.expiry_date}</p>
                        </>
                      ) : (
                        <>
                          <p className="text-sm font-medium">PayPal</p>
                          <p className="text-xs text-gray-400">{method.paypal_email}</p>
                        </>
                      )}
                    </div>
                    
                    {method.is_default && (
                      <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full ml-2">
                        Default
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-1">
                    {!method.is_default && (
                      <Button 
                        variant="ghost"
                        size="sm"
                        onClick={() => handleMakeDefaultPayment(method.id)}
                        className="h-8 w-8 p-0"
                      >
                        <Check className="h-4 w-4" />
                        <span className="sr-only">Make Default</span>
                      </Button>
                    )}
                    <Button 
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                    >
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button 
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeletePaymentMethod(method.id)}
                      className="h-8 w-8 p-0 text-red-500 hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
      
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Billing Addresses</CardTitle>
          <Dialog open={addressFormOpen} onOpenChange={setAddressFormOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <PlusCircle className="h-4 w-4" />
                Add Address
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-gray-900 border-gray-800 text-white">
              <DialogHeader>
                <DialogTitle>Add Billing Address</DialogTitle>
              </DialogHeader>
              
              <div className="mt-4 space-y-4">
                <div className="space-y-2">
                  <label htmlFor="street" className="text-sm font-medium">Street Address</label>
                  <Input
                    id="street"
                    value={newAddress.street}
                    onChange={(e) => setNewAddress({...newAddress, street: e.target.value})}
                    className="bg-gray-800 border-gray-700"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="city" className="text-sm font-medium">City</label>
                    <Input
                      id="city"
                      value={newAddress.city}
                      onChange={(e) => setNewAddress({...newAddress, city: e.target.value})}
                      className="bg-gray-800 border-gray-700"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="state" className="text-sm font-medium">State</label>
                    <Input
                      id="state"
                      value={newAddress.state}
                      onChange={(e) => setNewAddress({...newAddress, state: e.target.value})}
                      className="bg-gray-800 border-gray-700"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="zip" className="text-sm font-medium">ZIP Code</label>
                    <Input
                      id="zip"
                      value={newAddress.zip}
                      onChange={(e) => setNewAddress({...newAddress, zip: e.target.value})}
                      className="bg-gray-800 border-gray-700"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="country" className="text-sm font-medium">Country</label>
                    <select
                      id="country"
                      value={newAddress.country}
                      onChange={(e) => setNewAddress({...newAddress, country: e.target.value})}
                      className="w-full h-10 rounded-md bg-gray-800 border border-gray-700 px-3 py-2"
                    >
                      <option value="US">United States</option>
                      <option value="CA">Canada</option>
                      <option value="UK">United Kingdom</option>
                      <option value="AU">Australia</option>
                    </select>
                  </div>
                </div>
                
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newAddress.is_default}
                    onChange={(e) => setNewAddress({...newAddress, is_default: e.target.checked})}
                    className="rounded border-gray-600 bg-gray-800 text-primary"
                  />
                  <span className="text-sm">Set as default billing address</span>
                </label>
                
                <div className="pt-4 flex justify-end">
                  <Button onClick={handleAddAddress}>Add Address</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          {billingAddresses.length === 0 ? (
            <div className="text-center py-6">
              <p className="text-gray-400">No billing addresses added yet.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {billingAddresses.map((address) => (
                <div 
                  key={address.id}
                  className={`p-3 rounded-md border ${
                    address.is_default ? 'border-primary/50 bg-primary/5' : 'border-gray-800 bg-gray-800/50'
                  }`}
                >
                  <div className="flex justify-between">
                    <div>
                      <p className="text-sm">
                        {address.street}, {address.city}, {address.state} {address.zip}
                      </p>
                      <p className="text-xs text-gray-400">{address.country}</p>
                      
                      {address.is_default && (
                        <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full mt-1 inline-block">
                          Default
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-start gap-1">
                      {!address.is_default && (
                        <Button 
                          variant="ghost"
                          size="sm"
                          onClick={() => handleMakeDefaultAddress(address.id)}
                          className="h-8 w-8 p-0"
                        >
                          <Check className="h-4 w-4" />
                          <span className="sr-only">Make Default</span>
                        </Button>
                      )}
                      <Button 
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                      >
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <Button 
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteAddress(address.id)}
                        className="h-8 w-8 p-0 text-red-500 hover:text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default UserBilling;
