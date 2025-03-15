
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Product } from '@/lib/product-data';
import ProductCard from '@/components/product/ProductCard';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/supabase';

interface ProductRecommendationsProps {
  currentProductId?: string;
  userId?: string;
}

const ProductRecommendations = ({ currentProductId, userId }: ProductRecommendationsProps) => {
  const [recommendations, setRecommendations] = useState<Product[]>([]);
  const { toast } = useToast();
  
  const { data: products, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      // In a real app, this would fetch from your database
      // For demo purposes, we're using mock data
      const { data: products } = await supabase
        .from('products')
        .select('*')
        .limit(20);
        
      return products || [];
    },
  });

  const getRecommendations = async () => {
    try {
      // Get OpenAI API key from Supabase
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
        return;
      }

      // In a real implementation, this would call your backend which would then:
      // 1. Get user browsing history
      // 2. Call OpenAI with context about products and user preferences
      // 3. Parse the response to get recommended product IDs
      // 4. Fetch those products from database
      
      // For demo purposes, we'll just return random products
      if (products) {
        const randomProducts = [...products]
          .sort(() => 0.5 - Math.random())
          .slice(0, 4);
          
        setRecommendations(randomProducts as Product[]);
        
        toast({
          title: "AI Recommendations Generated",
          description: "We've curated some products just for you!",
        });
      }
    } catch (error) {
      console.error("Error generating recommendations:", error);
      toast({
        title: "Error",
        description: "Could not generate recommendations at this time",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="mt-12 mb-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-medium font-playfair">Recommended For You</h2>
        <Button 
          onClick={getRecommendations} 
          variant="outline" 
          className="flex items-center gap-2"
          disabled={isLoading}
        >
          <Sparkles size={16} />
          <span>AI Recommendations</span>
        </Button>
      </div>
      
      {recommendations.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {recommendations.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-900 rounded-lg">
          <p className="text-gray-400 mb-4">
            Click the button above to generate personalized product recommendations
          </p>
        </div>
      )}
    </div>
  );
};

export default ProductRecommendations;
