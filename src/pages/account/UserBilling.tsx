
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { FadeIn } from '@/components/ui/transitions';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  CardFooter
} from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { 
  CreditCard, 
  Trash2, 
  PlusCircle, 
  MapPin, 
  Check, 
  Edit
} from 'lucide-react';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/supabase';
import { User } from '@supabase/supabase-js';

interface PaymentMethod {
  id: string;
  type: 'card' | 'paypal';
  isDefault: boolean;
  details: {
    last4?: string;
    brand?: string;
    expMonth?: number;
    expYear?: number;
    email?: string;
  };
}

interface Address {
  id: string;
  name: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  isDefault: boolean;
}

interface UserBillingProps {
  user: User | null;
}

const UserBilling = ({ user }: UserBillingProps) => {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: 'pm-1',
      type: 'card',
      isDefault: true,
      details: {
        last4: '4242',
        brand: 'visa',
        expMonth: 12,
        expYear: 2025
      }
    },
    {
      id: 'pm-2',
      type: 'paypal',
      isDefault: false,
      details: {
        email: 'john.doe@example.com'
      }
    }
  ]);
  
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: 'addr-1',
      name: 'John Doe',
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zip: '10001',
      country: 'United States',
      isDefault: true
    },
    {
      id: 'addr-2',
      name: 'John Doe',
      street: '456 Park Ave',
      city: 'Los Angeles',
      state: 'CA',
      zip: '90001',
      country: 'United States',
      isDefault: false
    }
  ]);
  
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>(
    paymentMethods.find(pm => pm.isDefault)?.id || ''
  );
  
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState<string | null>(null);
  
  const { toast } = useToast();
  
  const handleSetDefaultPayment = (id: string) => {
    setPaymentMethods(
      paymentMethods.map(pm => ({
        ...pm,
        isDefault: pm.id === id
      }))
    );
    
    toast({
      title: "Default payment method updated",
      description: "Your default payment method has been updated successfully"
    });
  };
  
  const handleRemovePayment = (id: string) => {
    setPaymentMethods(paymentMethods.filter(pm => pm.id !== id));
    
    toast({
      title: "Payment method removed",
      description: "Your payment method has been removed successfully"
    });
  };
  
  const handleSetDefaultAddress = (id: string) => {
    setAddresses(
      addresses.map(addr => ({
        ...addr,
        isDefault: addr.id === id
      }))
    );
    
    toast({
      title: "Default address updated",
      description: "Your default address has been updated successfully"
    });
  };
  
  const handleRemoveAddress = (id: string) => {
    setAddresses(addresses.filter(addr => addr.id !== id));
    
    toast({
      title: "Address removed",
      description: "Your address has been removed successfully"
    });
  };
  
  const handleAddCard = () => {
    // In a real app, this would integrate with Stripe or another payment processor
    const newCard: PaymentMethod = {
      id: `pm-${paymentMethods.length + 1}`,
      type: 'card',
      isDefault: false,
      details: {
        last4: '1234',
        brand: 'mastercard',
        expMonth: 9,
        expYear: 2026
      }
    };
    
    setPaymentMethods([...paymentMethods, newCard]);
    setIsAddingCard(false);
    
    toast({
      title: "Card added",
      description: "Your card has been added successfully"
    });
  };
  
  const getBrandLogo = (brand?: string) => {
    switch (brand?.toLowerCase()) {
      case 'visa':
        return '💳 Visa';
      case 'mastercard':
        return '💳 Mastercard';
      case 'amex':
        return '💳 Amex';
      case 'discover':
        return '💳 Discover';
      default:
        return '💳 Card';
    }
  };
  
  return (
    <div className="space-y-8">
      <FadeIn>
        <div>
          <h2 className="text-2xl font-medium mb-1">Billing</h2>
          <p className="text-sm text-gray-400">Manage your payment methods and addresses</p>
        </div>
      </FadeIn>
      
      <Separator />
      
      <FadeIn delay={100}>
        <Card className="bg-black/30 border-gray-800">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center">
                  <CreditCard className="mr-2 h-5 w-5 text-primary" />
                  Payment Methods
                </CardTitle>
                <CardDescription>
                  Manage your payment options
                </CardDescription>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setIsAddingCard(!isAddingCard)}
              >
                {isAddingCard ? "Cancel" : "Add Method"}
              </Button>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {isAddingCard ? (
              <div className="border border-gray-800 rounded-lg p-4 space-y-4">
                <h3 className="text-sm font-medium mb-4">Add Payment Method</h3>
                
                <RadioGroup defaultValue="card" className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="card" id="payment-card" />
                    <Label htmlFor="payment-card" className="flex items-center">
                      <CreditCard className="mr-2 h-4 w-4" />
                      Credit/Debit Card
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="paypal" id="payment-paypal" />
                    <Label htmlFor="payment-paypal">PayPal</Label>
                  </div>
                </RadioGroup>
                
                <div className="grid gap-4 pt-2">
                  <div className="space-y-2">
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expMonth">Expiration Month</Label>
                      <Select>
                        <SelectTrigger id="expMonth">
                          <SelectValue placeholder="Month" />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
                            <SelectItem key={month} value={month.toString()}>
                              {month.toString().padStart(2, '0')}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="expYear">Expiration Year</Label>
                      <Select>
                        <SelectTrigger id="expYear">
                          <SelectValue placeholder="Year" />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + i).map(year => (
                            <SelectItem key={year} value={year.toString()}>
                              {year}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="cvc">CVC</Label>
                      <Input id="cvc" placeholder="123" />
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-2 pt-2">
                  <Button onClick={handleAddCard}>
                    Add Card
                  </Button>
                </div>
              </div>
            ) : (
              <>
                {paymentMethods.length === 0 ? (
                  <div className="text-center py-10">
                    <CreditCard className="h-12 w-12 mx-auto text-gray-500 mb-4" />
                    <h3 className="text-lg font-medium mb-2">No payment methods</h3>
                    <p className="text-gray-400 mb-6">
                      You haven't added any payment methods yet.
                    </p>
                    <Button onClick={() => setIsAddingCard(true)}>
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Add Payment Method
                    </Button>
                  </div>
                ) : (
                  <RadioGroup 
                    value={selectedPaymentMethod} 
                    onValueChange={setSelectedPaymentMethod}
                    className="space-y-4"
                  >
                    {paymentMethods.map(method => (
                      <div key={method.id} className="flex items-start space-x-3">
                        <RadioGroupItem value={method.id} id={method.id} className="mt-1" />
                        <div className="flex-1 border border-gray-800 rounded-lg p-4">
                          <div className="flex items-start justify-between">
                            <div>
                              <Label htmlFor={method.id} className="text-sm font-medium flex items-center">
                                {method.type === 'card' ? (
                                  getBrandLogo(method.details.brand)
                                ) : (
                                  '📧 PayPal'
                                )}
                                {method.isDefault && (
                                  <span className="ml-2 text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full">
                                    Default
                                  </span>
                                )}
                              </Label>
                              {method.type === 'card' ? (
                                <div className="text-sm text-gray-400 mt-1">
                                  •••• •••• •••• {method.details.last4}
                                  <div className="mt-1">
                                    Expires {method.details.expMonth?.toString().padStart(2, '0')}/{method.details.expYear}
                                  </div>
                                </div>
                              ) : (
                                <div className="text-sm text-gray-400 mt-1">
                                  {method.details.email}
                                </div>
                              )}
                            </div>
                            
                            <div className="flex space-x-2">
                              {!method.isDefault && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleSetDefaultPayment(method.id)}
                                  className="h-8 px-2 text-xs"
                                >
                                  <Check className="h-3.5 w-3.5 mr-1" />
                                  Set Default
                                </Button>
                              )}
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleRemovePayment(method.id)}
                                className="h-8 px-2 text-xs text-red-500 hover:text-red-400 hover:bg-red-950/20"
                              >
                                <Trash2 className="h-3.5 w-3.5 mr-1" />
                                Remove
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </RadioGroup>
                )}
              </>
            )}
          </CardContent>
        </Card>
      </FadeIn>
      
      <FadeIn delay={200}>
        <Card className="bg-black/30 border-gray-800">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center">
                  <MapPin className="mr-2 h-5 w-5 text-primary" />
                  Addresses
                </CardTitle>
                <CardDescription>
                  Manage your billing and shipping addresses
                </CardDescription>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setIsAddingAddress(!isAddingAddress)}
              >
                {isAddingAddress ? "Cancel" : "Add Address"}
              </Button>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {isAddingAddress || isEditingAddress ? (
              <AddressForm 
                onCancel={() => {
                  setIsAddingAddress(false);
                  setIsEditingAddress(null);
                }} 
                editingAddress={isEditingAddress ? addresses.find(a => a.id === isEditingAddress) : undefined}
              />
            ) : (
              <>
                {addresses.length === 0 ? (
                  <div className="text-center py-10">
                    <MapPin className="h-12 w-12 mx-auto text-gray-500 mb-4" />
                    <h3 className="text-lg font-medium mb-2">No addresses</h3>
                    <p className="text-gray-400 mb-6">
                      You haven't added any addresses yet.
                    </p>
                    <Button onClick={() => setIsAddingAddress(true)}>
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Add Address
                    </Button>
                  </div>
                ) : (
                  <div className="grid gap-4 md:grid-cols-2">
                    {addresses.map(address => (
                      <div key={address.id} className="border border-gray-800 rounded-lg p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center">
                            <h3 className="text-sm font-medium">{address.name}</h3>
                            {address.isDefault && (
                              <span className="ml-2 text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full">
                                Default
                              </span>
                            )}
                          </div>
                          <div className="flex space-x-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setIsEditingAddress(address.id)}
                              className="h-7 w-7 p-0"
                            >
                              <Edit className="h-3.5 w-3.5" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleRemoveAddress(address.id)}
                              className="h-7 w-7 p-0 text-red-500 hover:text-red-400 hover:bg-red-950/20"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                        </div>
                        
                        <address className="text-sm not-italic text-gray-400 space-y-1">
                          <p>{address.street}</p>
                          <p>{address.city}, {address.state} {address.zip}</p>
                          <p>{address.country}</p>
                        </address>
                        
                        {!address.isDefault && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleSetDefaultAddress(address.id)}
                            className="mt-3 h-8 text-xs"
                          >
                            <Check className="h-3.5 w-3.5 mr-1" />
                            Set as Default
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>
      </FadeIn>
      
      <FadeIn delay={300}>
        <Card className="bg-black/30 border-gray-800">
          <CardHeader>
            <CardTitle>Billing History</CardTitle>
            <CardDescription>View your past invoices and payments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <p className="text-gray-400 mb-2">No billing history available</p>
              <p className="text-sm text-gray-500">Your past orders and payments will appear here</p>
            </div>
          </CardContent>
          <CardFooter className="justify-between">
            <Button variant="outline" size="sm">
              Download Invoices
            </Button>
            <Button size="sm">View All Transactions</Button>
          </CardFooter>
        </Card>
      </FadeIn>
    </div>
  );
};

interface AddressFormProps {
  onCancel: () => void;
  editingAddress?: Address;
}

const AddressForm = ({ onCancel, editingAddress }: AddressFormProps) => {
  const [formData, setFormData] = useState({
    name: editingAddress?.name || '',
    street: editingAddress?.street || '',
    city: editingAddress?.city || '',
    state: editingAddress?.state || '',
    zip: editingAddress?.zip || '',
    country: editingAddress?.country || 'United States',
  });
  
  const { toast } = useToast();
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, this would save to the database
    toast({
      title: editingAddress ? "Address updated" : "Address added",
      description: `Your address has been ${editingAddress ? 'updated' : 'added'} successfully`
    });
    
    onCancel();
  };
  
  return (
    <form onSubmit={handleSubmit} className="border border-gray-800 rounded-lg p-4 space-y-4">
      <h3 className="text-sm font-medium mb-4">
        {editingAddress ? 'Edit Address' : 'Add New Address'}
      </h3>
      
      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <Input 
          id="name" 
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="street">Street Address</Label>
        <Input 
          id="street" 
          name="street"
          value={formData.street}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="city">City</Label>
          <Input 
            id="city" 
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="state">State/Province</Label>
          <Input 
            id="state" 
            name="state"
            value={formData.state}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="zip">ZIP/Postal Code</Label>
          <Input 
            id="zip" 
            name="zip"
            value={formData.zip}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="country">Country</Label>
          <Select
            value={formData.country}
            onValueChange={(value) => setFormData({ ...formData, country: value })}
          >
            <SelectTrigger id="country">
              <SelectValue placeholder="Select country" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="United States">United States</SelectItem>
              <SelectItem value="Canada">Canada</SelectItem>
              <SelectItem value="United Kingdom">United Kingdom</SelectItem>
              <SelectItem value="Australia">Australia</SelectItem>
              <SelectItem value="France">France</SelectItem>
              <SelectItem value="Germany">Germany</SelectItem>
              <SelectItem value="Japan">Japan</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="flex justify-end space-x-2 pt-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {editingAddress ? 'Update Address' : 'Add Address'}
        </Button>
      </div>
    </form>
  );
};

export default UserBilling;
