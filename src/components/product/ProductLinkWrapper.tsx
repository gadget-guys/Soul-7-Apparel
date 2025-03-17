
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface ProductLinkWrapperProps {
  id: string;
  children: React.ReactNode;
  className?: string;
}

const ProductLinkWrapper = ({ id, children, className }: ProductLinkWrapperProps) => {
  // Extract product type from id (e.g., tee-001, hat-002, hoodie-003)
  const getProductType = (productId: string) => {
    if (productId.startsWith('tee-')) return 'tee';
    if (productId.startsWith('hat-')) return 'hat';
    if (productId.startsWith('hoodie-')) return 'hoodie';
    return 'product'; // Fallback
  };

  const productType = getProductType(id);
  const linkPath = `/${productType}/${id}`;

  return (
    <Link to={linkPath} className={cn('block', className)}>
      {children}
    </Link>
  );
};

export default ProductLinkWrapper;
