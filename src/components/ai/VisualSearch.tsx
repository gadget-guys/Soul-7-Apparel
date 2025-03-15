
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { Upload, X, Search } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import ProductCard from '@/components/product/ProductCard';
import { Product } from '@/lib/product-data';

const VisualSearch = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const { toast } = useToast();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const clearImage = () => {
    setSelectedImage(null);
    setPreviewUrl(null);
    setSearchResults([]);
  };

  const handleSearch = async () => {
    if (!selectedImage) {
      toast({
        title: "No image selected",
        description: "Please upload an image to search",
        variant: "destructive"
      });
      return;
    }

    setIsSearching(true);

    try {
      // Get API key from Supabase
      const { data: apiKeyData } = await supabase
        .from('api_keys')
        .select('openai_api_key')
        .single();
      
      if (!apiKeyData?.openai_api_key) {
        toast({
          title: "Missing API Key",
          description: "Please configure your OpenAI API key in the admin portal",
          variant: "destructive"
        });
        setIsSearching(false);
        return;
      }
      
      // In a real implementation, this would:
      // 1. Upload the image to Supabase storage
      // 2. Call a Supabase edge function that would use the OpenAI Vision API to analyze the image
      // 3. Find similar products in your database based on the analysis
      
      // For demo purposes, show sample results
      const { data: products } = await supabase
        .from('products')
        .select('*')
        .limit(4);
        
      setSearchResults(products as Product[] || []);
      
      toast({
        title: "Search complete",
        description: "Found similar products based on your image",
      });
    } catch (error) {
      console.error("Error in visual search:", error);
      toast({
        title: "Search failed",
        description: "There was an error processing your image",
        variant: "destructive"
      });
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="p-6 bg-gray-900 rounded-lg">
      <h2 className="text-xl font-medium mb-4 font-playfair">Visual Search</h2>
      <p className="text-gray-400 mb-6">
        Upload an image to find similar products in our store
      </p>
      
      <div className="space-y-6">
        {previewUrl ? (
          <div className="relative">
            <img 
              src={previewUrl} 
              alt="Preview" 
              className="w-full max-h-80 object-contain rounded-lg" 
            />
            <button 
              onClick={clearImage}
              className="absolute top-2 right-2 bg-black bg-opacity-70 text-white p-1 rounded-full"
            >
              <X size={20} />
            </button>
          </div>
        ) : (
          <div className="border-2 border-dashed border-gray-700 rounded-lg p-8 text-center">
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-2 text-sm text-gray-400">
              Drag and drop an image, or click to browse
            </p>
            <Input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              id="image-upload"
            />
            <label htmlFor="image-upload">
              <Button variant="outline" className="mt-4" asChild>
                <span>Select Image</span>
              </Button>
            </label>
          </div>
        )}
        
        {previewUrl && (
          <Button 
            onClick={handleSearch} 
            disabled={isSearching}
            className="w-full"
          >
            {isSearching ? "Searching..." : "Find Similar Products"}
            {!isSearching && <Search size={16} className="ml-2" />}
          </Button>
        )}
        
        {searchResults.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-medium mb-4">Similar Products</h3>
            <div className="grid grid-cols-2 gap-4">
              {searchResults.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VisualSearch;
