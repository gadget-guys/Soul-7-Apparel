
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { FadeIn } from '@/components/ui/transitions';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/supabase';
import { User } from '@supabase/supabase-js';

interface UserProfileProps {
  user: User | null;
}

const UserProfile = ({ user }: UserProfileProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [profile, setProfile] = useState({
    fullName: '',
    username: '',
    bio: '',
    avatarUrl: '',
    email: user?.email || '',
  });
  
  const { toast } = useToast();
  
  useEffect(() => {
    if (user) {
      loadUserProfile();
    }
  }, [user]);
  
  const loadUserProfile = async () => {
    if (!user) return;
    
    try {
      setIsLoading(true);
      
      // Fetch user profile data from Supabase
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      
      if (error) {
        throw error;
      }
      
      if (data) {
        setProfile({
          fullName: data.full_name || '',
          username: data.username || '',
          bio: data.bio || '',
          avatarUrl: data.avatar_url || '',
          email: user.email || '',
        });
      }
    } catch (error) {
      console.error('Error loading user profile:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const updateProfile = async () => {
    if (!user) return;
    
    try {
      setIsLoading(true);
      
      const updates = {
        id: user.id,
        full_name: profile.fullName,
        username: profile.username,
        bio: profile.bio,
        avatar_url: profile.avatarUrl,
        updated_at: new Date().toISOString(),
      };
      
      const { error } = await supabase
        .from('profiles')
        .upsert(updates, { returning: 'minimal' });
      
      if (error) {
        throw error;
      }
      
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully"
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value
    });
  };
  
  return (
    <div className="space-y-8">
      <FadeIn>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-medium mb-1">Your Profile</h2>
            <p className="text-sm text-gray-400">Manage your personal information and preferences</p>
          </div>
          <Avatar className="h-16 w-16">
            <AvatarImage src={profile.avatarUrl} alt={profile.fullName} />
            <AvatarFallback className="bg-primary text-black">
              {profile.fullName.split(' ').map(name => name[0]).join('')}
            </AvatarFallback>
          </Avatar>
        </div>
      </FadeIn>
      
      <Separator />
      
      <FadeIn delay={100}>
        <Card className="bg-black/30 border-gray-800">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Update your personal details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input 
                  id="fullName" 
                  name="fullName" 
                  placeholder="Enter your full name" 
                  value={profile.fullName}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input 
                  id="username" 
                  name="username" 
                  placeholder="Choose a username" 
                  value={profile.username}
                  onChange={handleChange}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input 
                id="email" 
                name="email" 
                type="email" 
                value={profile.email}
                disabled
              />
              <p className="text-xs text-gray-500">
                Your email address is linked to your account and cannot be changed here
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea 
                id="bio" 
                name="bio" 
                placeholder="Tell us about yourself" 
                value={profile.bio}
                onChange={handleChange}
                rows={4}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={updateProfile} disabled={isLoading}>
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </CardFooter>
        </Card>
      </FadeIn>
      
      <FadeIn delay={200}>
        <Card className="bg-black/30 border-gray-800">
          <CardHeader>
            <CardTitle>Profile Photo</CardTitle>
            <CardDescription>Update your profile picture</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={profile.avatarUrl} alt={profile.fullName} />
                <AvatarFallback className="bg-primary text-black text-lg">
                  {profile.fullName.split(' ').map(name => name[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="avatarUrl">Profile Image URL</Label>
                  <Input 
                    id="avatarUrl" 
                    name="avatarUrl" 
                    placeholder="Enter image URL" 
                    value={profile.avatarUrl}
                    onChange={handleChange}
                  />
                </div>
                <p className="text-xs text-gray-500">
                  Enter a URL for your profile picture, or use a service like Gravatar
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={updateProfile} disabled={isLoading}>
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </CardFooter>
        </Card>
      </FadeIn>
    </div>
  );
};

export default UserProfile;
