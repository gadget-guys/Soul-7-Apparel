
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
          <div className="text-sm font-medium bg-muted px-2 py-0.5 rounded-full text-black">
            {selectedSize.size}
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-3 sm:grid-cols-7 gap-2">
        {sizes.map((sizeOption) => (
          <SizeButton
            key={sizeOption.id}
            sizeOption={sizeOption}
            isSelected={selectedSize?.id === sizeOption.id}
            onSelect={() => sizeOption.inStock && onSelectSize(sizeOption)}
          />
        ))}
      </div>
    </div>
  );
};

interface SizeButtonProps {
  sizeOption: SizeOption;
  isSelected: boolean;
  onSelect: () => void;
}

const SizeButton = ({ sizeOption, isSelected, onSelect }: SizeButtonProps) => (
  <button
    className={cn(
      "relative py-2 px-1 sm:px-3 rounded border text-sm font-medium transition-all duration-200",
      isSelected 
        ? "border-primary bg-primary/10 text-primary" 
        : "border-gray-700 hover:border-gray-500",
      !sizeOption.inStock && "opacity-40 cursor-not-allowed"
    )}
    onClick={onSelect}
    disabled={!sizeOption.inStock}
    aria-label={`Select size ${sizeOption.size}`}
  >
    {sizeOption.size}
    {!sizeOption.inStock && (
      <div className="absolute inset-0 flex items-center justify-center text-xs text-gray-400">
        Out of stock
      </div>
    )}
  </button>
);

export default SizeSelector;
