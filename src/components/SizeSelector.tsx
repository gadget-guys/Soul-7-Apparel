
import { cn } from '@/lib/utils';
import { SizeOption } from '@/lib/product-data';

interface SizeSelectorProps {
  sizes: SizeOption[];
  selectedSize: SizeOption | null;
  onSelectSize: (size: SizeOption) => void;
}

const SizeSelector = ({ 
  sizes, 
  selectedSize, 
  onSelectSize 
}: SizeSelectorProps) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="text-sm font-medium">Size</div>
        {sizes.length > 0 && selectedSize && (
          <div className="text-sm text-gray-500">
            {selectedSize.size}
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-3 gap-2">
        {sizes.map((sizeOption) => {
          const isSelected = selectedSize?.id === sizeOption.id;
          
          return (
            <button
              key={sizeOption.id}
              className={cn(
                "relative py-2 px-3 rounded border text-sm font-medium transition-all duration-200",
                isSelected 
                  ? "border-primary bg-primary/5 text-primary" 
                  : "border-gray-200 hover:border-gray-300",
                !sizeOption.inStock && "opacity-40 cursor-not-allowed"
              )}
              onClick={() => sizeOption.inStock && onSelectSize(sizeOption)}
              disabled={!sizeOption.inStock}
              aria-label={`Select size ${sizeOption.size}`}
            >
              {sizeOption.size}
              {!sizeOption.inStock && (
                <div className="absolute inset-0 flex items-center justify-center text-xs text-gray-500">
                  Out of stock
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SizeSelector;
