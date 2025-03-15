
interface ProductPriceProps {
  price: number;
  discountPrice?: number | null;
  currency: string;
}

const ProductPrice = ({ price, discountPrice, currency }: ProductPriceProps) => {
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(price);
  
  const formattedDiscountPrice = discountPrice 
    ? new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency,
      }).format(discountPrice)
    : null;

  return (
    <div className="flex items-baseline space-x-2">
      {formattedDiscountPrice ? (
        <>
          <span className="font-medium text-white">{formattedDiscountPrice}</span>
          <span className="text-sm text-gray-500 line-through">{formattedPrice}</span>
        </>
      ) : (
        <span className="font-medium text-white">{formattedPrice}</span>
      )}
    </div>
  );
};

export default ProductPrice;
