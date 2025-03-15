
import { useState } from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ProductVariant } from '@/lib/product-data';

interface ColorSelectorProps {
  variants: ProductVariant[];
  selectedVariant: ProductVariant;
  onSelectVariant: (variant: ProductVariant) => void;
}

const ColorSelector = ({ 
  variants, 
  selectedVariant, 
  onSelectVariant 
}: ColorSelectorProps) => {
  const [hoveredColor, setHoveredColor] = useState<string | null>(null);

  // Function to determine if a color is light or dark
  const isLightColor = (hexColor: string): boolean => {
    // Remove the # if it exists
    const hex = hexColor.replace('#', '');
    
    // Convert hex to RGB
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    
    // Calculate brightness (using standard formula)
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    
    // Return true if the color is light
    return brightness > 155;
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="text-sm font-medium">Color</div>
        <div 
          className="text-sm px-2 py-0.5 rounded-full" 
          style={{ 
            backgroundColor: hoveredColor ? selectedVariant.colorCode : selectedVariant.colorCode,
            color: isLightColor(selectedVariant.colorCode) ? '#000000' : '#FFFFFF'
          }}
        >
          {hoveredColor || selectedVariant.color}
        </div>
      </div>
      
      <div className="flex space-x-3">
        {variants.map((variant) => {
          const isSelected = selectedVariant.id === variant.id;
          const isLight = isLightColor(variant.colorCode);
          
          return (
            <button
              key={variant.id}
              className={cn(
                "relative w-10 h-10 rounded-full transition-transform duration-200 ease-bounce-soft",
                isSelected 
                  ? "ring-2 ring-primary ring-offset-2 scale-105" 
                  : "ring-1 ring-gray-200 hover:scale-105"
              )}
              style={{ backgroundColor: variant.colorCode }}
              onClick={() => onSelectVariant(variant)}
              onMouseEnter={() => setHoveredColor(variant.color)}
              onMouseLeave={() => setHoveredColor(null)}
              aria-label={`Select ${variant.color} color`}
            >
              {isSelected && (
                <span 
                  className="absolute inset-0 flex items-center justify-center"
                  style={{ color: isLight ? '#000000' : '#FFFFFF' }}
                >
                  <Check size={16} />
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ColorSelector;
