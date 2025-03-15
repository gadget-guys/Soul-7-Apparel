
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { Ruler, ThumbsUp } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface SizeFormData {
  height: string;
  weight: string;
  gender: string;
  bodyType: string;
  preferredFit: string;
}

const SizeRecommendation = () => {
  const [formData, setFormData] = useState<SizeFormData>({
    height: '',
    weight: '',
    gender: '',
    bodyType: '',
    preferredFit: '',
  });
  const [recommendedSize, setRecommendedSize] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
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
        setLoading(false);
        return;
      }
      
      // In a real implementation, this would:
      // 1. Send the form data to your backend
      // 2. The backend would use OpenAI to analyze the data
      // 3. Return a recommended size based on AI analysis
      
      // For demo purposes, we'll calculate a size based on simple rules
      let size = 'M';
      const height = parseInt(formData.height);
      const weight = parseInt(formData.weight);
      
      if (formData.gender === 'male') {
        if (height < 170) size = 'S';
        else if (height > 185) size = 'L';
        
        if (weight < 65) size = 'S';
        else if (weight > 90) size = 'XL';
      } else {
        if (height < 160) size = 'S';
        else if (height > 175) size = 'L';
        
        if (weight < 55) size = 'S';
        else if (weight > 75) size = 'L';
      }
      
      if (formData.preferredFit === 'loose') {
        if (size === 'S') size = 'M';
        else if (size === 'M') size = 'L';
        else if (size === 'L') size = 'XL';
      } else if (formData.preferredFit === 'tight') {
        if (size === 'XL') size = 'L';
        else if (size === 'L') size = 'M';
        else if (size === 'M') size = 'S';
      }
      
      setRecommendedSize(size);
      
      toast({
        title: "Size recommendation ready",
        description: `Based on your measurements, we recommend size ${size}`,
      });
    } catch (error) {
      console.error("Error generating size recommendation:", error);
      toast({
        title: "Error",
        description: "Could not generate a size recommendation",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-900 rounded-lg">
      <div className="flex items-center gap-2 mb-4">
        <Ruler size={20} />
        <h2 className="text-xl font-medium font-playfair">Smart Size Finder</h2>
      </div>
      
      <p className="text-gray-400 mb-6">
        Enter your measurements to get a personalized size recommendation
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="height" className="block text-sm font-medium">
              Height (cm)
            </label>
            <Input
              id="height"
              name="height"
              type="number"
              value={formData.height}
              onChange={handleInputChange}
              className="bg-gray-800 border-gray-700"
              required
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="weight" className="block text-sm font-medium">
              Weight (kg)
            </label>
            <Input
              id="weight"
              name="weight"
              type="number"
              value={formData.weight}
              onChange={handleInputChange}
              className="bg-gray-800 border-gray-700"
              required
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <label htmlFor="gender" className="block text-sm font-medium">
              Gender
            </label>
            <Select 
              onValueChange={(value) => handleSelectChange('gender', value)}
              value={formData.gender}
            >
              <SelectTrigger className="bg-gray-800 border-gray-700">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="bodyType" className="block text-sm font-medium">
              Body Type
            </label>
            <Select 
              onValueChange={(value) => handleSelectChange('bodyType', value)}
              value={formData.bodyType}
            >
              <SelectTrigger className="bg-gray-800 border-gray-700">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="athletic">Athletic</SelectItem>
                <SelectItem value="average">Average</SelectItem>
                <SelectItem value="slim">Slim</SelectItem>
                <SelectItem value="curvy">Curvy</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="preferredFit" className="block text-sm font-medium">
              Preferred Fit
            </label>
            <Select 
              onValueChange={(value) => handleSelectChange('preferredFit', value)}
              value={formData.preferredFit}
            >
              <SelectTrigger className="bg-gray-800 border-gray-700">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tight">Tight</SelectItem>
                <SelectItem value="regular">Regular</SelectItem>
                <SelectItem value="loose">Loose</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <Button 
          type="submit" 
          className="w-full"
          disabled={loading}
        >
          {loading ? "Calculating..." : "Get Size Recommendation"}
        </Button>
      </form>
      
      {recommendedSize && (
        <div className="mt-6 p-4 bg-gray-800 rounded-lg flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-400">Recommended Size:</p>
            <p className="text-2xl font-bold">{recommendedSize}</p>
          </div>
          <ThumbsUp className="text-primary h-8 w-8" />
        </div>
      )}
    </div>
  );
};

export default SizeRecommendation;
