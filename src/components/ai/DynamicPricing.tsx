
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { DollarSign, TrendingUp, TrendingDown, RefreshCw } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { Progress } from '@/components/ui/progress';

interface PricingInfo {
  originalPrice: number;
  currentPrice: number;
  discount: number;
  demandLevel: number;
  lastUpdated: Date;
}

interface DynamicPricingProps {
  productId: string;
  initialPrice: number;
}

const DynamicPricing = ({ productId, initialPrice }: DynamicPricingProps) => {
  const [pricingInfo, setPricingInfo] = useState<PricingInfo>({
    originalPrice: initialPrice,
    currentPrice: initialPrice,
    discount: 0,
    demandLevel: 50,
    lastUpdated: new Date()
  });
  const [isUpdating, setIsUpdating] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // In a real app, you would fetch the current dynamic pricing data
    // For demo, we'll simulate it
    const fetchPricingData = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Random discount between 0 and 15%
        const discount = Math.floor(Math.random() * 16);
        const currentPrice = initialPrice * (1 - discount / 100);
        const demandLevel = Math.floor(Math.random() * 101); // 0-100
        
        setPricingInfo({
          originalPrice: initialPrice,
          currentPrice: parseFloat(currentPrice.toFixed(2)),
          discount,
          demandLevel,
          lastUpdated: new Date()
        });
      } catch (error) {
        console.error("Error fetching dynamic pricing:", error);
      }
    };
    
    fetchPricingData();
  }, [initialPrice]);

  const updateDynamicPrice = async () => {
    setIsUpdating(true);
    
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
        setIsUpdating(false);
        return;
      }
      
      // In a real implementation, this would:
      // 1. Send a request to your backend
      // 2. The backend would use OpenAI to analyze market data, inventory levels, etc.
      // 3. Generate a new optimized price
      
      // For demo purposes, simulate new pricing
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Generate new random values
      const discount = Math.floor(Math.random() * 21); // 0-20%
      const currentPrice = initialPrice * (1 - discount / 100);
      const demandLevel = Math.floor(Math.random() * 101); // 0-100
      
      setPricingInfo({
        originalPrice: initialPrice,
        currentPrice: parseFloat(currentPrice.toFixed(2)),
        discount,
        demandLevel,
        lastUpdated: new Date()
      });
      
      toast({
        title: "Price updated",
        description: "Dynamic pricing has been refreshed based on current market conditions",
      });
    } catch (error) {
      console.error("Error updating dynamic price:", error);
      toast({
        title: "Update failed",
        description: "There was an error updating the dynamic price",
        variant: "destructive"
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const formatCurrency = (price: number) => {
    return `$${price.toFixed(2)}`;
  };

  return (
    <div className="p-4 bg-gray-900 rounded-lg border border-gray-800">
      <div className="flex items-center gap-2 mb-4">
        <DollarSign size={20} className="text-primary" />
        <h3 className="text-lg font-medium">Dynamic Pricing</h3>
      </div>
      
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-400">Original Price:</span>
          <span className="text-gray-300">{formatCurrency(pricingInfo.originalPrice)}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-400">Current Price:</span>
          <span className="text-xl font-bold text-primary">
            {formatCurrency(pricingInfo.currentPrice)}
          </span>
        </div>
        
        {pricingInfo.discount > 0 && (
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Discount:</span>
            <span className="flex items-center text-green-500">
              <TrendingDown size={16} className="mr-1" />
              {pricingInfo.discount}%
            </span>
          </div>
        )}
        
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Market Demand:</span>
            <span className={pricingInfo.demandLevel > 70 ? "text-green-500" : pricingInfo.demandLevel < 30 ? "text-red-500" : "text-yellow-500"}>
              {pricingInfo.demandLevel > 70 ? "High" : pricingInfo.demandLevel < 30 ? "Low" : "Moderate"}
            </span>
          </div>
          <Progress value={pricingInfo.demandLevel} className="h-2" />
        </div>
        
        <div className="text-xs text-gray-500 flex justify-between items-center">
          <span>Last updated: {pricingInfo.lastUpdated.toLocaleTimeString()}</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={updateDynamicPrice}
            disabled={isUpdating}
            className="h-8 px-2"
          >
            <RefreshCw size={14} className={isUpdating ? "animate-spin" : ""} />
            <span className="ml-1">Refresh</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DynamicPricing;
