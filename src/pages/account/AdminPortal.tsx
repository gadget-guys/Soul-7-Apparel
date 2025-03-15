
import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/lib/supabase';

interface ApiKeys {
  openai_api_key?: string;
  replicate_api_key?: string;
  huggingface_api_key?: string;
}

const AdminPortal = () => {
  const [apiKeys, setApiKeys] = useState<ApiKeys>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetchApiKeys = async () => {
      try {
        const { data, error } = await supabase
          .from('api_keys')
          .select('*')
          .single();
          
        if (error && error.code !== 'PGRST116') throw error;
        
        if (data) {
          setApiKeys({
            openai_api_key: data.openai_api_key || '',
            replicate_api_key: data.replicate_api_key || '',
            huggingface_api_key: data.huggingface_api_key || ''
          });
        }
      } catch (error) {
        console.error('Error fetching API keys:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchApiKeys();
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

  const handleApiKeyChange = (key: keyof ApiKeys, value: string) => {
    setApiKeys(prev => ({
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
