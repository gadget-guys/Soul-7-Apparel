
import { Truck, RotateCcw } from 'lucide-react';

const ShippingInfo = () => {
  return (
    <div className="space-y-3 pt-2">
      <div className="flex items-center text-sm text-gray-300">
        <Truck size={18} className="mr-2 text-gray-500" />
        <span>Free delivery on orders over $50</span>
      </div>
      <div className="flex items-center text-sm text-gray-300">
        <RotateCcw size={18} className="mr-2 text-gray-500" />
        <span>30-day free returns</span>
      </div>
    </div>
  );
};

export default ShippingInfo;
