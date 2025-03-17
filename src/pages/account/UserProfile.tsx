
import { useState } from 'react';
import { User } from '@supabase/supabase-js';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/supabase';
import { Avatar } from '@/components/ui/avatar';
import { AvatarImage, AvatarFallback } from '@/components/ui/avatar';

// Create a simpler user interface that can be used for mocking
export interface SimpleUser {
  id: string;
  email?: string;
  name?: string;
  avatar?: string;
}

// Update the props to accept either a Supabase User or our SimpleUser
interface UserProfileProps {
  user: User | SimpleUser | null;
}

const UserProfile = ({ user }: UserProfileProps) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Helper function to check if the user is a Supabase User
  const isSupabaseUser = (user: any): user is User => {
    return user && 'app_metadata' in user && 'user_metadata' in user;
  };

  // Get email safely from either user type
  const getUserEmail = (): string => {
    if (!user) return '';
    if (isSupabaseUser(user)) return user.email || '';
    return user.email || '';
  };

  // Get user name (for avatar fallback)
  const getUserName = (): string => {
    if (!user) return 'User';
    if (isSupabaseUser(user)) {
      return user.user_metadata?.name || user.email?.charAt(0) || 'U';
    }
    return user.name || user.email?.charAt(0) || 'U';
  };

  // Get avatar URL
  const getAvatarUrl = (): string => {
    if (!user) return '';
    if (isSupabaseUser(user)) {
      return user.user_metadata?.avatar_url || '';
    }
    return user.avatar || '';
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) return;
    
    setLoading(true);
    
    try {
      // Only attempt to update profile if it's a Supabase user
      if (isSupabaseUser(user)) {
        const { error } = await supabase
          .from('profiles')
          .upsert({
            id: user.id,
            first_name: firstName,
            last_name: lastName,
            updated_at: new Date()
          });
          
        if (error) throw error;
      }
      
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully."
      });
    } catch (error: any) {
      toast({
        title: "Update failed",
        description: error.message || "There was an error updating your profile.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-900 p-6 rounded-lg">
      <div className="flex items-center gap-4 mb-6">
        <Avatar className="h-16 w-16">
          <AvatarImage src={getAvatarUrl()} alt={getUserName()} />
          <AvatarFallback>{getUserName().charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-xl font-medium">{getUserName()}</h2>
          <p className="text-gray-400">{getUserEmail()}</p>
        </div>
      </div>
      
      <form onSubmit={handleUpdateProfile} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="firstName" className="block text-sm font-medium">
              First Name
            </label>
            <Input
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="bg-gray-800 border-gray-700"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="lastName" className="block text-sm font-medium">
              Last Name
            </label>
            <Input
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="bg-gray-800 border-gray-700"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium">
            Email
          </label>
          <Input
            id="email"
            value={getUserEmail()}
            disabled
            className="bg-gray-800 border-gray-700 opacity-70"
          />
        </div>
        
        <Button 
          type="submit" 
          disabled={loading || !isSupabaseUser(user)}
        >
          {loading ? "Updating..." : "Update Profile"}
        </Button>
        {!isSupabaseUser(user) && (
          <p className="text-sm text-gray-400 mt-2">
            Note: Profile updates are only available for authenticated users.
          </p>
        )}
      </form>
    </div>
  );
};

export default UserProfile;
