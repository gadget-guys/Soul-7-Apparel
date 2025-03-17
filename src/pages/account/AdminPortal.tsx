
import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { supabase } from '@/lib/supabase';

interface ApiKeys {
  openai_api_key?: string;
  replicate_api_key?: string;
  huggingface_api_key?: string;
}

interface PaymentGateways {
  stripe_publishable_key?: string;
  stripe_secret_key?: string;
  stripe_enabled?: boolean;
  paypal_client_id?: string;
  paypal_client_secret?: string;
  paypal_enabled?: boolean;
}

const AdminPortal = () => {
  const [apiKeys, setApiKeys] = useState<ApiKeys>({});
  const [paymentGateways, setPaymentGateways] = useState<PaymentGateways>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        // Fetch API keys
        const { data: apiKeysData, error: apiKeysError } = await supabase
          .from('api_keys')
          .select('*')
          .single();
          
        if (apiKeysError && apiKeysError.code !== 'PGRST116') throw apiKeysError;
        
        if (apiKeysData) {
          setApiKeys({
            openai_api_key: apiKeysData.openai_api_key || '',
            replicate_api_key: apiKeysData.replicate_api_key || '',
            huggingface_api_key: apiKeysData.huggingface_api_key || ''
          });
        }

        // Fetch payment gateway settings
        const { data: paymentData, error: paymentError } = await supabase
          .from('payment_gateways')
          .select('*')
          .single();
          
        if (paymentError && paymentError.code !== 'PGRST116') throw paymentError;
        
        if (paymentData) {
          setPaymentGateways({
            stripe_publishable_key: paymentData.stripe_publishable_key || '',
            stripe_secret_key: paymentData.stripe_secret_key || '',
            stripe_enabled: paymentData.stripe_enabled || false,
            paypal_client_id: paymentData.paypal_client_id || '',
            paypal_client_secret: paymentData.paypal_client_secret || '',
            paypal_enabled: paymentData.paypal_enabled || false
          });
        }
      } catch (error) {
        console.error('Error fetching settings:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchSettings();
  }, []);

  const handleSaveApiKeys = async () => {
    setSaving(true);
    
    try {
      const { error } = await supabase
        .from('api_keys')
        .upsert({
          id: 1,  // Using a fixed ID for single record
          ...apiKeys,
          updated_at: new Date()
        });
        
      if (error) throw error;
      
      toast({
        title: "API keys saved",
        description: "Your API keys have been saved successfully."
      });
    } catch (error: any) {
      toast({
        title: "Error saving API keys",
        description: error.message || "There was an error saving your API keys.",
        variant: "destructive"
      });
    } finally {
      setSaving(false);
    }
  };

  const handleSavePaymentGateways = async () => {
    setSaving(true);
    
    try {
      const { error } = await supabase
        .from('payment_gateways')
        .upsert({
          id: 1,  // Using a fixed ID for single record
          ...paymentGateways,
          updated_at: new Date()
        });
        
      if (error) throw error;
      
      toast({
        title: "Payment settings saved",
        description: "Your payment gateway settings have been saved successfully."
      });
    } catch (error: any) {
      toast({
        title: "Error saving payment settings",
        description: error.message || "There was an error saving your payment gateway settings.",
        variant: "destructive"
      });
    } finally {
      setSaving(false);
    }
  };

  const handleApiKeyChange = (key: keyof ApiKeys, value: string) => {
    setApiKeys(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handlePaymentGatewayChange = (key: keyof PaymentGateways, value: string | boolean) => {
    setPaymentGateways(prev => ({
      ...prev,
      [key]: value
    }));
  };

  if (loading) {
    return (
      <div className="bg-gray-900 p-6 rounded-lg flex justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 p-6 rounded-lg">
      <h2 className="text-xl font-medium mb-4">Admin Portal</h2>
      
      <Tabs defaultValue="api-keys">
        <TabsList className="mb-4">
          <TabsTrigger value="api-keys">API Keys</TabsTrigger>
          <TabsTrigger value="payment-gateways">Payment Gateways</TabsTrigger>
          <TabsTrigger value="ai-settings">AI Settings</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
        </TabsList>
        
        <TabsContent value="api-keys">
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="openai-api-key" className="block text-sm font-medium">
                OpenAI API Key
              </label>
              <Input
                id="openai-api-key"
                type="password"
                value={apiKeys.openai_api_key || ''}
                onChange={(e) => handleApiKeyChange('openai_api_key', e.target.value)}
                className="bg-gray-800 border-gray-700"
                placeholder="sk-..."
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="replicate-api-key" className="block text-sm font-medium">
                Replicate API Key
              </label>
              <Input
                id="replicate-api-key"
                type="password"
                value={apiKeys.replicate_api_key || ''}
                onChange={(e) => handleApiKeyChange('replicate_api_key', e.target.value)}
                className="bg-gray-800 border-gray-700"
                placeholder="r8_..."
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="huggingface-api-key" className="block text-sm font-medium">
                HuggingFace API Key
              </label>
              <Input
                id="huggingface-api-key"
                type="password"
                value={apiKeys.huggingface_api_key || ''}
                onChange={(e) => handleApiKeyChange('huggingface_api_key', e.target.value)}
                className="bg-gray-800 border-gray-700"
                placeholder="hf_..."
              />
            </div>
            
            <Button 
              onClick={handleSaveApiKeys} 
              disabled={saving}
            >
              {saving ? "Saving..." : "Save API Keys"}
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="payment-gateways">
          <div className="space-y-6">
            <div className="border border-gray-700 rounded-lg p-4 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Stripe Integration</h3>
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="stripe-enabled"
                    checked={paymentGateways.stripe_enabled || false}
                    onCheckedChange={(checked) => 
                      handlePaymentGatewayChange('stripe_enabled', checked)
                    }
                  />
                  <label htmlFor="stripe-enabled" className="text-sm">
                    {paymentGateways.stripe_enabled ? "Enabled" : "Disabled"}
                  </label>
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="stripe-publishable-key" className="block text-sm font-medium">
                  Publishable Key
                </label>
                <Input
                  id="stripe-publishable-key"
                  type="password"
                  value={paymentGateways.stripe_publishable_key || ''}
                  onChange={(e) => handlePaymentGatewayChange('stripe_publishable_key', e.target.value)}
                  className="bg-gray-800 border-gray-700"
                  placeholder="pk_..."
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="stripe-secret-key" className="block text-sm font-medium">
                  Secret Key
                </label>
                <Input
                  id="stripe-secret-key"
                  type="password"
                  value={paymentGateways.stripe_secret_key || ''}
                  onChange={(e) => handlePaymentGatewayChange('stripe_secret_key', e.target.value)}
                  className="bg-gray-800 border-gray-700"
                  placeholder="sk_..."
                />
              </div>
            </div>
            
            <div className="border border-gray-700 rounded-lg p-4 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">PayPal Integration</h3>
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="paypal-enabled"
                    checked={paymentGateways.paypal_enabled || false}
                    onCheckedChange={(checked) => 
                      handlePaymentGatewayChange('paypal_enabled', checked)
                    }
                  />
                  <label htmlFor="paypal-enabled" className="text-sm">
                    {paymentGateways.paypal_enabled ? "Enabled" : "Disabled"}
                  </label>
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="paypal-client-id" className="block text-sm font-medium">
                  Client ID
                </label>
                <Input
                  id="paypal-client-id"
                  type="password"
                  value={paymentGateways.paypal_client_id || ''}
                  onChange={(e) => handlePaymentGatewayChange('paypal_client_id', e.target.value)}
                  className="bg-gray-800 border-gray-700"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="paypal-client-secret" className="block text-sm font-medium">
                  Client Secret
                </label>
                <Input
                  id="paypal-client-secret"
                  type="password"
                  value={paymentGateways.paypal_client_secret || ''}
                  onChange={(e) => handlePaymentGatewayChange('paypal_client_secret', e.target.value)}
                  className="bg-gray-800 border-gray-700"
                />
              </div>
            </div>
            
            <Button 
              onClick={handleSavePaymentGateways} 
              disabled={saving}
              className="mt-4"
            >
              {saving ? "Saving..." : "Save Payment Settings"}
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="ai-settings">
          <div className="space-y-4">
            <h3 className="text-lg font-medium mb-2">AI Feature Settings</h3>
            <p className="text-gray-400 mb-4">
              Configure settings for AI features like personalized recommendations,
              visual search, size recommendations, chatbot, and dynamic pricing.
            </p>
            
            {/* Placeholder for future AI settings UI */}
            <div className="p-4 border border-gray-700 rounded-md text-center text-gray-400">
              Advanced AI settings coming soon
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="users">
          <div className="space-y-4">
            <h3 className="text-lg font-medium mb-2">User Management</h3>
            <p className="text-gray-400 mb-4">
              Manage users and their permissions.
            </p>
            
            {/* Placeholder for future user management UI */}
            <div className="p-4 border border-gray-700 rounded-md text-center text-gray-400">
              User management features coming soon
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPortal;
