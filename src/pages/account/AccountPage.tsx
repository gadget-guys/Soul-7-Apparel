
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { FadeIn } from '@/components/ui/transitions';
import Navbar from '@/components/navbar';
import { User } from '@supabase/supabase-js';
import AdminPortal from './AdminPortal';
import UserProfile from './UserProfile';

const AccountPage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();
      
      if (data?.user) {
        setUser(data.user);
        
        // Check if user is admin
        const { data: profile } = await supabase
          .from('profiles')
          .select('is_admin')
          .eq('id', data.user.id)
          .single();
          
        setIsAdmin(profile?.is_admin || false);
      } else {
        navigate('/account/login');
      }
      
      setLoading(false);
    };
    
    checkUser();
  }, [navigate]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Signed out",
      description: "You have been signed out successfully."
    });
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Navbar />
        <div className="container mx-auto px-4 pt-24 flex justify-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      
      <FadeIn>
        <div className="container mx-auto px-4 pt-24 pb-16">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-2xl font-playfair">My Account</h1>
              <Button variant="outline" onClick={handleSignOut}>Sign Out</Button>
            </div>
            
            <Tabs defaultValue="profile">
              <TabsList className="mb-6">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="orders">Orders</TabsTrigger>
                {isAdmin && <TabsTrigger value="admin">Admin Portal</TabsTrigger>}
              </TabsList>
              
              <TabsContent value="profile">
                <UserProfile user={user} />
              </TabsContent>
              
              <TabsContent value="orders">
                <div className="bg-gray-900 p-6 rounded-lg">
                  <h2 className="text-xl font-medium mb-4">Your Orders</h2>
                  <p className="text-gray-400">You haven't placed any orders yet.</p>
                </div>
              </TabsContent>
              
              {isAdmin && (
                <TabsContent value="admin">
                  <AdminPortal />
                </TabsContent>
              )}
            </Tabs>
          </div>
        </div>
      </FadeIn>
    </div>
  );
};

export default AccountPage;
