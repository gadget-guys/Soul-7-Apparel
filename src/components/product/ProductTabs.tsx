
import { useState } from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Product } from '@/lib/product-data';

interface ProductTabsProps {
  product: Product;
}

const ProductTabs = ({ product }: ProductTabsProps) => {
  const [activeTab, setActiveTab] = useState<'description' | 'features' | 'details'>('description');
  
  return (
    <div className="space-y-6 py-2">
      {/* Tabs for product information */}
      <div className="border-b border-gray-800">
        <div className="flex space-x-8">
          {[
            { id: 'description', label: 'Description' },
            { id: 'features', label: 'Features' },
            { id: 'details', label: 'Details' },
          ].map((tab) => (
            <button
              key={tab.id}
              className={cn(
                "py-3 text-sm font-medium border-b-2 -mb-px transition-colors",
                activeTab === tab.id 
                  ? "border-primary text-primary" 
                  : "border-transparent text-gray-400 hover:text-gray-300"
              )}
              onClick={() => setActiveTab(tab.id as any)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      
      {/* Tab content */}
      <div className="py-2 min-h-[120px]">
        {activeTab === 'description' && (
          <p className="text-gray-300 leading-relaxed">
            {product.description}
          </p>
        )}
        
        {activeTab === 'features' && (
          <ul className="space-y-2">
            {product.features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <Check size={18} className="text-primary shrink-0 mt-0.5 mr-2" />
                <span className="text-gray-300">{feature}</span>
              </li>
            ))}
          </ul>
        )}
        
        {activeTab === 'details' && (
          <div className="space-y-2">
            {Object.entries(product.details).map(([key, value]) => (
              <div key={key} className="grid grid-cols-3 text-sm">
                <div className="font-medium text-gray-400">{key}</div>
                <div className="col-span-2 text-gray-300">{value}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductTabs;
