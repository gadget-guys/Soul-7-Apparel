
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { FadeIn } from '@/components/ui/transitions';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Bell, Mail, ShieldAlert, Eye, Globe } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/supabase';
import { User } from '@supabase/supabase-js';

interface UserSettingsProps {
  user: User | null;
}

const UserSettings = ({ user }: UserSettingsProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [settings, setSettings] = useState({
    emailNotifications: true,
    orderUpdates: true,
    promotions: false,
    newProducts: true,
    newFeatures: true,
    theme: 'dark',
    language: 'en',
    currency: 'USD',
  });
  
  const { toast } = useToast();
  
  const toggleSetting = (key: keyof typeof settings) => {
    if (typeof settings[key] === 'boolean') {
      setSettings({
        ...settings,
        [key]: !settings[key],
      });
    }
  };
  
  const updateSetting = (key: keyof typeof settings, value: string) => {
    setSettings({
      ...settings,
      [key]: value,
    });
  };
  
  const saveSettings = async () => {
    if (!user) return;
    
    try {
      setIsLoading(true);
      
      // Save to supabase
      const { error } = await supabase
        .from('user_settings')
        .upsert({
          user_id: user.id,
          settings: settings,
          updated_at: new Date().toISOString(),
        });
      
      if (error) throw error;
      
      toast({
        title: "Settings saved",
        description: "Your preferences have been updated successfully"
      });
    } catch (error) {
      console.error('Error saving settings:', error);
      toast({
        title: "Error",
        description: "Failed to save settings",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="space-y-8">
      <FadeIn>
        <div>
          <h2 className="text-2xl font-medium mb-1">Settings</h2>
          <p className="text-sm text-gray-400">Manage your account settings and preferences</p>
        </div>
      </FadeIn>
      
      <Separator />
      
      <FadeIn delay={100}>
        <Card className="bg-black/30 border-gray-800">
          <CardHeader className="flex flex-row items-center gap-4">
            <Bell className="w-5 h-5 text-primary" />
            <div>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>Manage how you receive notifications</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="emailNotifications">Email Notifications</Label>
                <p className="text-sm text-gray-500">Receive all notifications via email</p>
              </div>
              <Switch 
                id="emailNotifications"
                checked={settings.emailNotifications}
                onCheckedChange={() => toggleSetting('emailNotifications')}
              />
            </div>
            
            <Separator />
            
            <div className="space-y-4">
              <h4 className="text-sm font-medium">Email preferences</h4>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="orderUpdates">Order Updates</Label>
                  <p className="text-sm text-gray-500">Get notified about your order status</p>
                </div>
                <Switch 
                  id="orderUpdates"
                  checked={settings.orderUpdates}
                  onCheckedChange={() => toggleSetting('orderUpdates')}
                  disabled={!settings.emailNotifications}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="promotions">Promotions</Label>
                  <p className="text-sm text-gray-500">Receive offers and discount codes</p>
                </div>
                <Switch 
                  id="promotions"
                  checked={settings.promotions}
                  onCheckedChange={() => toggleSetting('promotions')}
                  disabled={!settings.emailNotifications}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="newProducts">New Products</Label>
                  <p className="text-sm text-gray-500">Be the first to know about new arrivals</p>
                </div>
                <Switch 
                  id="newProducts"
                  checked={settings.newProducts}
                  onCheckedChange={() => toggleSetting('newProducts')}
                  disabled={!settings.emailNotifications}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="newFeatures">New Features</Label>
                  <p className="text-sm text-gray-500">Learn about new features and updates</p>
                </div>
                <Switch 
                  id="newFeatures"
                  checked={settings.newFeatures}
                  onCheckedChange={() => toggleSetting('newFeatures')}
                  disabled={!settings.emailNotifications}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </FadeIn>
      
      <FadeIn delay={200}>
        <Card className="bg-black/30 border-gray-800">
          <CardHeader className="flex flex-row items-center gap-4">
            <Globe className="w-5 h-5 text-primary" />
            <div>
              <CardTitle>Preferences</CardTitle>
              <CardDescription>Customize your shopping experience</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="language">Language</Label>
                <Select
                  value={settings.language}
                  onValueChange={(value) => updateSetting('language', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                    <SelectItem value="de">German</SelectItem>
                    <SelectItem value="jp">Japanese</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="currency">Currency</Label>
                <Select
                  value={settings.currency}
                  onValueChange={(value) => updateSetting('currency', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD ($)</SelectItem>
                    <SelectItem value="EUR">EUR (€)</SelectItem>
                    <SelectItem value="GBP">GBP (£)</SelectItem>
                    <SelectItem value="CAD">CAD ($)</SelectItem>
                    <SelectItem value="AUD">AUD ($)</SelectItem>
                    <SelectItem value="JPY">JPY (¥)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="theme">Theme</Label>
                <Select
                  value={settings.theme}
                  onValueChange={(value) => updateSetting('theme', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select theme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={saveSettings} disabled={isLoading}>
              {isLoading ? "Saving..." : "Save Preferences"}
            </Button>
          </CardFooter>
        </Card>
      </FadeIn>
      
      <FadeIn delay={300}>
        <Card className="bg-black/30 border-gray-800">
          <CardHeader className="flex flex-row items-center gap-4">
            <ShieldAlert className="w-5 h-5 text-primary" />
            <div>
              <CardTitle>Privacy & Security</CardTitle>
              <CardDescription>Manage your account security settings</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Two-Factor Authentication</Label>
                <p className="text-sm text-gray-500">Protect your account with an additional security layer</p>
              </div>
              <Button variant="outline">Set Up</Button>
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Change Password</Label>
                <p className="text-sm text-gray-500">Update your password regularly for better security</p>
              </div>
              <Button variant="outline">Change</Button>
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Account Data</Label>
                <p className="text-sm text-gray-500">Download or delete your personal data</p>
              </div>
              <div className="space-x-2">
                <Button variant="outline" size="sm">Download</Button>
                <Button variant="destructive" size="sm">Delete</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </FadeIn>
    </div>
  );
};

export default UserSettings;
