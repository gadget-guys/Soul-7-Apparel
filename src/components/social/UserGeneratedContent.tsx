
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { FadeIn } from '@/components/ui/transitions';
import { Camera, Upload, Instagram } from 'lucide-react';

interface UserGeneratedContentProps {
  productName?: string;
  productId?: string;
}

const UserGeneratedContent = ({ productName = 'this product', productId }: UserGeneratedContentProps) => {
  const [activeTab, setActiveTab] = useState('gallery');
  const { toast } = useToast();
  
  // Mock UGC images (in a real app, these would be pulled from a database)
  const userImages = [
    'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    'https://images.unsplash.com/photo-1551803091-e20673f15770?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    'https://images.unsplash.com/photo-1550639525-c97d455acf70?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    'https://images.unsplash.com/photo-1536766820879-059fec98ec0a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    'https://images.unsplash.com/photo-1507114845806-0347040042a6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
  ];
  
  const handleUploadClick = () => {
    toast({
      title: "Upload your own photo",
      description: "This feature will be enabled soon. Stay tuned!",
    });
  };
  
  const handleInstagramConnect = () => {
    toast({
      title: "Connect to Instagram",
      description: "This feature will be enabled soon. Stay tuned!",
    });
  };

  return (
    <div className="py-10">
      <FadeIn>
        <h2 className="text-2xl font-playfair mb-2">Style Gallery</h2>
        <p className="text-gray-400 mb-6">
          See how other customers are styling {productName} or share your own look
        </p>
        
        <Tabs defaultValue="gallery" onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-gray-900 p-1">
            <TabsTrigger value="gallery">Customer Gallery</TabsTrigger>
            <TabsTrigger value="upload">Share Your Style</TabsTrigger>
          </TabsList>
          
          <TabsContent value="gallery" className="space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
              {userImages.map((img, index) => (
                <div 
                  key={index} 
                  className="aspect-square overflow-hidden rounded-md relative group cursor-pointer"
                >
                  <img 
                    src={img}
                    alt={`Customer styling example ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-300 flex items-center justify-center">
                    <Instagram 
                      className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
                      size={24}
                    />
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center">
              <Button variant="outline" onClick={() => setActiveTab('upload')}>
                Share Your Style
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="upload" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-gray-800 rounded-lg p-6 text-center space-y-4">
                <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto">
                  <Upload size={24} />
                </div>
                <h3 className="font-medium">Upload Your Photo</h3>
                <p className="text-gray-400 text-sm">
                  Share photos of you wearing our products and inspire others
                </p>
                <Button onClick={handleUploadClick}>
                  <Upload size={16} className="mr-2" />
                  Select Photos
                </Button>
              </div>
              
              <div className="border border-gray-800 rounded-lg p-6 text-center space-y-4">
                <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto">
                  <Instagram size={24} />
                </div>
                <h3 className="font-medium">Connect Instagram</h3>
                <p className="text-gray-400 text-sm">
                  Tag us in your Instagram posts to automatically share your style
                </p>
                <Button variant="outline" onClick={handleInstagramConnect}>
                  <Instagram size={16} className="mr-2" />
                  Connect Account
                </Button>
              </div>
            </div>
            
            <div className="bg-gray-900 rounded-lg p-6">
              <h3 className="font-medium mb-4">Photo Guidelines</h3>
              <ul className="space-y-2 text-gray-400 text-sm list-disc pl-5">
                <li>Photos should clearly show our products in use</li>
                <li>Make sure you have the rights to any photo you upload</li>
                <li>You consent to us using your photos for marketing purposes</li>
                <li>No explicit or inappropriate content</li>
                <li>Photos may be reviewed before appearing in the gallery</li>
              </ul>
            </div>
          </TabsContent>
        </Tabs>
      </FadeIn>
    </div>
  );
};

export default UserGeneratedContent;
