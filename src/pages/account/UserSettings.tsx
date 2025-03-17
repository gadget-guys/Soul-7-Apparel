
import { useState, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/supabase';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Bell, Shield, Globe, Moon } from 'lucide-react';

interface UserSettingsProps {
  user: User | null;
}

interface UserPreferences {
  id?: string;
  email_notifications: boolean;
  marketing_emails: boolean;
  dark_mode: boolean;
  two_factor_auth: boolean;
  language: string;
}

const UserSettings = ({ user }: UserSettingsProps) => {
  const [preferences, setPreferences] = useState<UserPreferences>({
    email_notifications: true,
    marketing_emails: false,
    dark_mode: false,
    two_factor_auth: false,
    language: 'en'
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetchPreferences = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('user_preferences')
          .select('*')
          .eq('user_id', user.id)
          .single();

        if (!error && data) {
          setPreferences({
            id: data.id,
            email_notifications: data.email_notifications,
            marketing_emails: data.marketing_emails,
            dark_mode: data.dark_mode,
            two_factor_auth: data.two_factor_auth,
            language: data.language
          });
        }
      } catch (error) {
        console.error('Error fetching preferences:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPreferences();
  }, [user]);

  const handleToggle = (field: keyof UserPreferences, value: boolean) => {
    setPreferences(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleLanguageChange = (value: string) => {
    setPreferences(prev => ({
      ...prev,
      language: value
    }));
  };

  const handleSaveSettings = async () => {
    if (!user) return;
    
    setSaving(true);
    
    try {
      const { error } = await supabase
        .from('user_preferences')
        .upsert({
          user_id: user.id,
          ...preferences,
          updated_at: new Date()
        });
        
      if (error) throw error;
      
      toast({
        title: "Settings saved",
        description: "Your preferences have been updated successfully."
      });
    } catch (error: any) {
      toast({
        title: "Error saving settings",
        description: error.message || "There was an error saving your settings.",
        variant: "destructive"
      });
    } finally {
      setSaving(false);
    }
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
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-primary" />
            Notification Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium">Email Notifications</h3>
              <p className="text-xs text-gray-400">Receive order updates and account notifications</p>
            </div>
            <Switch 
              checked={preferences.email_notifications}
              onCheckedChange={(checked) => handleToggle('email_notifications', checked)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium">Marketing Emails</h3>
              <p className="text-xs text-gray-400">Receive promotions, discounts, and product updates</p>
            </div>
            <Switch 
              checked={preferences.marketing_emails}
              onCheckedChange={(checked) => handleToggle('marketing_emails', checked)}
            />
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            Security Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium">Two-Factor Authentication</h3>
              <p className="text-xs text-gray-400">Add an extra layer of security to your account</p>
            </div>
            <Switch 
              checked={preferences.two_factor_auth}
              onCheckedChange={(checked) => handleToggle('two_factor_auth', checked)}
            />
          </div>
          
          <div className="pt-2">
            <Button variant="outline" size="sm">
              Change Password
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-primary" />
            Display Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium">Dark Mode</h3>
              <p className="text-xs text-gray-400">Toggle dark mode for the application</p>
            </div>
            <Switch 
              checked={preferences.dark_mode}
              onCheckedChange={(checked) => handleToggle('dark_mode', checked)}
            />
          </div>
          
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Language</h3>
            <select 
              value={preferences.language}
              onChange={(e) => handleLanguageChange(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-sm"
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
              <option value="ja">Japanese</option>
            </select>
          </div>
        </CardContent>
      </Card>
      
      <Button 
        onClick={handleSaveSettings} 
        disabled={saving || !user}
        className="w-full"
      >
        {saving ? "Saving..." : "Save Settings"}
      </Button>
    </div>
  );
};

export default UserSettings;
