
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface CheckoutFormProps {
  onBack: () => void;
  onNext: () => void;
}

const CheckoutForm = ({ onBack, onNext }: CheckoutFormProps) => {
  const [shippingAddress, setShippingAddress] = useState({
    firstName: '',
    lastName: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zip: '',
    country: 'United States',
  });
  
  const [billingSameAsShipping, setBillingSameAsShipping] = useState(true);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setShippingAddress(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setShippingAddress(prev => ({ ...prev, [name]: value }));
  };
  
  return (
    <div className="border border-gray-800 rounded-lg p-6">
      <h2 className="text-lg font-medium mb-4">Shipping Information</h2>
      
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input 
              id="firstName" 
              name="firstName"
              value={shippingAddress.firstName}
              onChange={handleChange}
              placeholder="John"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input 
              id="lastName" 
              name="lastName"
              value={shippingAddress.lastName}
              onChange={handleChange}
              placeholder="Doe"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="address1">Address Line 1</Label>
          <Input 
            id="address1" 
            name="address1"
            value={shippingAddress.address1}
            onChange={handleChange}
            placeholder="123 Main Street"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="address2">Address Line 2 (Optional)</Label>
          <Input 
            id="address2" 
            name="address2"
            value={shippingAddress.address2}
            onChange={handleChange}
            placeholder="Apt, Suite, Unit, etc."
          />
        </div>
        
        <div className="grid grid-cols-6 gap-4">
          <div className="col-span-3 space-y-2">
            <Label htmlFor="city">City</Label>
            <Input 
              id="city" 
              name="city"
              value={shippingAddress.city}
              onChange={handleChange}
              placeholder="New York"
            />
          </div>
          <div className="col-span-1 space-y-2">
            <Label htmlFor="state">State</Label>
            <Input 
              id="state" 
              name="state"
              value={shippingAddress.state}
              onChange={handleChange}
              placeholder="NY"
            />
          </div>
          <div className="col-span-2 space-y-2">
            <Label htmlFor="zip">ZIP Code</Label>
            <Input 
              id="zip" 
              name="zip"
              value={shippingAddress.zip}
              onChange={handleChange}
              placeholder="10001"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="country">Country</Label>
          <Select 
            value={shippingAddress.country} 
            onValueChange={(value) => handleSelectChange('country', value)}
          >
            <SelectTrigger id="country">
              <SelectValue placeholder="Select a country" />
            </SelectTrigger>
            <SelectContent position="popper">
              <SelectItem value="United States">United States</SelectItem>
              <SelectItem value="Canada">Canada</SelectItem>
              <SelectItem value="United Kingdom">United Kingdom</SelectItem>
              <SelectItem value="Australia">Australia</SelectItem>
              <SelectItem value="Germany">Germany</SelectItem>
              <SelectItem value="France">France</SelectItem>
              <SelectItem value="Japan">Japan</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="notes">Order Notes (Optional)</Label>
          <Textarea 
            id="notes" 
            placeholder="Special instructions for delivery"
            className="min-h-[80px] resize-none"
          />
        </div>
        
        <div className="pt-6 border-t border-gray-800">
          <h3 className="text-lg font-medium mb-4">Shipping Method</h3>
          
          <RadioGroup defaultValue="standard" className="space-y-3">
            <div className="border border-gray-800 rounded-lg p-4 flex items-start space-x-3 cursor-pointer hover:border-gray-700">
              <RadioGroupItem value="standard" id="standard" className="mt-1" />
              <div className="flex-1">
                <Label htmlFor="standard" className="text-base font-medium cursor-pointer">
                  Standard Shipping
                </Label>
                <p className="text-sm text-gray-400 mt-1">3-5 business days</p>
              </div>
              <div className="text-right">
                <span className="font-medium">$9.99</span>
              </div>
            </div>
            
            <div className="border border-gray-800 rounded-lg p-4 flex items-start space-x-3 cursor-pointer hover:border-gray-700 opacity-60">
              <RadioGroupItem value="express" id="express" className="mt-1" disabled />
              <div className="flex-1">
                <Label htmlFor="express" className="text-base font-medium cursor-pointer">
                  Express Shipping
                </Label>
                <p className="text-sm text-gray-400 mt-1">1-2 business days</p>
              </div>
              <div className="text-right">
                <span className="font-medium">$19.99</span>
              </div>
            </div>
          </RadioGroup>
        </div>
        
        <div className="pt-6 border-t border-gray-800">
          <h3 className="text-lg font-medium mb-4">Billing Information</h3>
          
          <div className="flex items-center space-x-2 mb-6">
            <input 
              type="checkbox" 
              id="sameAsShipping" 
              checked={billingSameAsShipping}
              onChange={() => setBillingSameAsShipping(!billingSameAsShipping)}
              className="h-4 w-4 rounded border-gray-700 bg-transparent text-primary focus:ring-primary/50"
            />
            <Label htmlFor="sameAsShipping" className="cursor-pointer">
              Same as shipping address
            </Label>
          </div>
          
          {!billingSameAsShipping && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="billingFirstName">First Name</Label>
                  <Input id="billingFirstName" placeholder="John" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="billingLastName">Last Name</Label>
                  <Input id="billingLastName" placeholder="Doe" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="billingAddress1">Address Line 1</Label>
                <Input id="billingAddress1" placeholder="123 Main Street" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="billingAddress2">Address Line 2 (Optional)</Label>
                <Input id="billingAddress2" placeholder="Apt, Suite, Unit, etc." />
              </div>
              
              <div className="grid grid-cols-6 gap-4">
                <div className="col-span-3 space-y-2">
                  <Label htmlFor="billingCity">City</Label>
                  <Input id="billingCity" placeholder="New York" />
                </div>
                <div className="col-span-1 space-y-2">
                  <Label htmlFor="billingState">State</Label>
                  <Input id="billingState" placeholder="NY" />
                </div>
                <div className="col-span-2 space-y-2">
                  <Label htmlFor="billingZip">ZIP Code</Label>
                  <Input id="billingZip" placeholder="10001" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="billingCountry">Country</Label>
                <Select defaultValue="United States">
                  <SelectTrigger id="billingCountry">
                    <SelectValue placeholder="Select a country" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="United States">United States</SelectItem>
                    <SelectItem value="Canada">Canada</SelectItem>
                    <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                    <SelectItem value="Australia">Australia</SelectItem>
                    <SelectItem value="Germany">Germany</SelectItem>
                    <SelectItem value="France">France</SelectItem>
                    <SelectItem value="Japan">Japan</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-6 flex justify-between">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={onNext}>
          Continue to Payment
        </Button>
      </div>
    </div>
  );
};

export default CheckoutForm;
