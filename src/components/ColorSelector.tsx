
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

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="text-sm font-medium">Color</div>
        <div className="text-sm text-gray-500">
          {hoveredColor || selectedVariant.color}
        </div>
      </div>
      
      <div className="flex space-x-3">
        {variants.map((variant) => {
          const isSelected = selectedVariant.id === variant.id;
          
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
                  className={cn(
                    "absolute inset-0 flex items-center justify-center",
                    variant.colorCode === '#FFFFFF' || variant.colorCode === '#DDDDDD' 
                      ? "text-black" 
                      : "text-white"
                  )}
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
