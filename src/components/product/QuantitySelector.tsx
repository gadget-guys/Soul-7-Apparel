
import { useState } from 'react';

interface QuantitySelectorProps {
  initialQuantity?: number;
  onChange: (quantity: number) => void;
}

const QuantitySelector = ({ 
  initialQuantity = 1, 
  onChange 
}: QuantitySelectorProps) => {
  const [quantity, setQuantity] = useState(initialQuantity);
  
  const increment = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    onChange(newQuantity);
  };
  
  const decrement = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      onChange(newQuantity);
    }
  };
  
  return (
    <div className="flex items-center border border-gray-700 rounded-md">
      <button 
        onClick={decrement}
        disabled={quantity <= 1}
        className="px-3 py-2 text-gray-400 hover:text-gray-300 disabled:opacity-50"
        aria-label="Decrease quantity"
      >
        -
      </button>
      <div className="w-10 text-center py-2 font-medium text-sm">
        {quantity}
      </div>
      <button 
        onClick={increment}
        className="px-3 py-2 text-gray-400 hover:text-gray-300"
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
};

export default QuantitySelector;
