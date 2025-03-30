
import { Product } from '@/lib/product-data';
import { ScaleIn } from '@/components/ui/transitions';

interface ProductPricingProps {
  product: Product;
  delay?: number;
}

const ProductPricing = ({ product, delay = 300 }: ProductPricingProps) => {
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: product.currency,
  }).format(product.price);
  
  const formattedDiscountPrice = product.discountPrice 
    ? new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: product.currency,
      }).format(product.discountPrice)
    : null;
    
  const discountPercentage = product.discountPrice 
    ? Math.round(100 - (product.discountPrice / product.price) * 100)
    : null;

  return (
    <ScaleIn delay={delay}>
      <div className="flex items-baseline space-x-3 mt-1">
        {formattedDiscountPrice ? (
          <>
            <span className="text-2xl font-semibold text-white">{formattedDiscountPrice}</span>
            <span className="text-lg text-gray-500 line-through">{formattedPrice}</span>
            <span className="inline-block bg-red-900 text-red-300 px-2 py-0.5 rounded text-xs font-medium">
              Save {discountPercentage}%
            </span>
          </>
        ) : (
          <span className="text-2xl font-semibold text-white">{formattedPrice}</span>
        )}
      </div>
    </ScaleIn>
  );
};

export default ProductPricing;
