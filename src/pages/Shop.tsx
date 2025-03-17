
import { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Filter, ArrowUpDown, Palette, Ruler, Tag, 
  Check, Star, Grid3x3, Grid2x2, X, ChevronDown, ChevronUp 
} from 'lucide-react';
import Navbar from '@/components/navbar';
import Footer from '@/components/layout/Footer';
import { FadeIn, StaggeredChildren } from '@/components/ui/transitions';
import { Button } from '@/components/ui/button';
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger,
  SheetClose
} from '@/components/ui/sheet';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import TeeCard from '@/components/product/TeeCard';
import HatCard from '@/components/product/HatCard';
import HoodieCard from '@/components/product/HoodieCard';
import { teesProducts } from '@/lib/tees-data';
import { hatsProducts } from '@/lib/hats-data';
import { hoodiesProducts } from '@/lib/hoodies-data';
import { cn } from '@/lib/utils';

// Combine product data and add type indicator
const allProducts = [
  ...teesProducts.map(product => ({ ...product, type: 'tee' })),
  ...hatsProducts.map(product => ({ ...product, type: 'hat' })),
  ...hoodiesProducts.map(product => ({ ...product, type: 'hoodie' }))
];

type ProductType = 'tee' | 'hat' | 'hoodie';
type ViewMode = 'grid' | 'compact';
type SortOption = 'newest' | 'popularity' | 'priceAsc' | 'priceDesc';

interface FilterState {
  types: ProductType[];
  colors: string[];
  sizes: string[];
  priceRange: [number, number];
  onlyInStock: boolean;
}

const initialFilters: FilterState = {
  types: [],
  colors: [],
  sizes: [],
  priceRange: [0, 200],
  onlyInStock: false
};

const colorOptions = [
  { name: 'Black', value: 'black', color: '#000000' },
  { name: 'White', value: 'white', color: '#ffffff' },
  { name: 'Gray', value: 'gray', color: '#808080' },
  { name: 'Blue', value: 'blue', color: '#0000ff' },
  { name: 'Red', value: 'red', color: '#ff0000' },
  { name: 'Green', value: 'green', color: '#00ff00' },
];

const sizeOptions = ['XS', 'S', 'M', 'L', 'XL', '2XL'];

const Shop = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [activeSort, setActiveSort] = useState<SortOption>('newest');
  const [filteredProducts, setFilteredProducts] = useState(allProducts);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get query params
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    
    // Handle category filter from URL
    const category = params.get('category');
    if (category) {
      setFilters(prev => ({
        ...prev,
        types: [category as ProductType]
      }));
    }
    
    // Handle sort option from URL
    const sort = params.get('sort');
    if (sort === 'popularity' || sort === 'priceAsc' || sort === 'priceDesc' || sort === 'newest') {
      setActiveSort(sort);
    }
    
    // Handle color filter from URL
    const color = params.get('color');
    if (color) {
      setFilters(prev => ({
        ...prev,
        colors: [color]
      }));
    }
    
    // Handle size filter from URL
    const size = params.get('size');
    if (size) {
      setFilters(prev => ({
        ...prev,
        sizes: [size]
      }));
    }
    
    // Handle inStock filter from URL
    const inStock = params.get('inStock') === 'true';
    if (inStock) {
      setFilters(prev => ({
        ...prev,
        onlyInStock: true
      }));
    }
  }, [location.search]);
  
  // Apply filters and sorting
  useEffect(() => {
    let filtered = [...allProducts];
    
    // Filter by product type
    if (filters.types.length > 0) {
      filtered = filtered.filter(product => filters.types.includes(product.type as ProductType));
    }
    
    // Filter by color (simple string match for demo)
    if (filters.colors.length > 0) {
      filtered = filtered.filter(product => {
        const productColors = product.variants.map(v => v.color.toLowerCase());
        return filters.colors.some(color => productColors.includes(color.toLowerCase()));
      });
    }
    
    // Filter by size (simple string match for demo)
    if (filters.sizes.length > 0) {
      filtered = filtered.filter(product => {
        const productSizes = product.variants.flatMap(v => v.sizes.map(s => s.size.toUpperCase()));
        return filters.sizes.some(size => productSizes.includes(size.toUpperCase()));
      });
    }
    
    // Filter by in-stock status
    if (filters.onlyInStock) {
      filtered = filtered.filter(product => {
        return product.variants.some(variant => variant.sizes.some(size => size.inStock));
      });
    }
    
    // Apply sorting
    filtered.sort((a, b) => {
      switch (activeSort) {
        case 'priceAsc':
          return (a.discountPrice || a.price) - (b.discountPrice || b.price);
        case 'priceDesc':
          return (b.discountPrice || b.price) - (a.discountPrice || a.price);
        case 'popularity':
          return b.rating - a.rating;
        case 'newest':
        default:
          // For demo, use the reverse order of the ID as a proxy for "newest"
          return parseInt(b.id.split('-')[1]) - parseInt(a.id.split('-')[1]);
      }
    });
    
    setFilteredProducts(filtered);
  }, [filters, activeSort]);
  
  // Handle filter changes
  const toggleFilter = useCallback((filterType: keyof FilterState, value: any) => {
    setFilters(prev => {
      if (filterType === 'onlyInStock') {
        return { ...prev, onlyInStock: value };
      }
      
      const currentValues = prev[filterType] as any[];
      
      if (currentValues.includes(value)) {
        return {
          ...prev,
          [filterType]: currentValues.filter(v => v !== value)
        };
      } else {
        return {
          ...prev,
          [filterType]: [...currentValues, value]
        };
      }
    });
  }, []);
  
  const resetFilters = () => {
    setFilters(initialFilters);
    setActiveSort('newest');
    
    // Reset URL params
    navigate('/shop');
  };
  
  // Count active filters
  const activeFilterCount = 
    filters.types.length + 
    filters.colors.length + 
    filters.sizes.length + 
    (filters.onlyInStock ? 1 : 0);
  
  useEffect(() => {
    // Simulate loading state
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);
  
  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-gray-800 border-t-primary rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-300 font-playfair">Loading products...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen">
      <Navbar transparent={true} />
      
      <main className="pt-20 pb-20">
        <div className="container mx-auto px-4 sm:px-6">
          {/* Hero Section */}
          <section className="relative h-80 overflow-hidden mb-12">
            <div className="absolute inset-0 z-0">
              <img 
                src="/lovable-uploads/e50416c5-cb3d-4d08-a15a-f8283eedbd6b.png" 
                alt="Shop Collection" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40"></div>
            </div>
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center">
              <FadeIn>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold text-white mb-4">
                  Shop All Products
                </h1>
                <p className="text-lg md:text-xl text-gray-100 max-w-2xl">
                  Discover our complete collection of premium apparel
                </p>
              </FadeIn>
            </div>
          </section>
          
          {/* Filters and Products Section */}
          <section className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
            {/* Mobile Filters Button */}
            <div className="lg:hidden mb-4">
              <Sheet open={isMobileFilterOpen} onOpenChange={setIsMobileFilterOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" className="w-full">
                    <Filter size={16} className="mr-2" />
                    Filters 
                    {activeFilterCount > 0 && (
                      <Badge className="ml-2 bg-primary text-black" variant="secondary">
                        {activeFilterCount}
                      </Badge>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-full sm:max-w-md">
                  <SheetHeader className="mb-6">
                    <SheetTitle>
                      Filters 
                      {activeFilterCount > 0 && (
                        <Badge className="ml-2 bg-primary text-black" variant="secondary">
                          {activeFilterCount}
                        </Badge>
                      )}
                    </SheetTitle>
                  </SheetHeader>
                  <ScrollArea className="h-[calc(100vh-8rem)]">
                    <FilterSections 
                      filters={filters} 
                      toggleFilter={toggleFilter} 
                      resetFilters={resetFilters}
                      onClose={() => setIsMobileFilterOpen(false)}
                    />
                  </ScrollArea>
                </SheetContent>
              </Sheet>
            </div>
            
            {/* Desktop Filters */}
            <div className="hidden lg:block sticky top-24 self-start">
              <div className={cn(
                "border border-gray-800 rounded-lg overflow-hidden transition-all",
                isFilterOpen ? "h-auto" : "h-14"
              )}>
                <div 
                  className="flex items-center justify-between px-5 py-4 cursor-pointer bg-black/30"
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                >
                  <div className="flex items-center">
                    <Filter size={18} className="mr-2" />
                    <h2 className="font-medium">
                      Filters 
                      {activeFilterCount > 0 && (
                        <Badge className="ml-2 bg-primary text-black" variant="secondary">
                          {activeFilterCount}
                        </Badge>
                      )}
                    </h2>
                  </div>
                  {isFilterOpen ? (
                    <ChevronUp size={18} />
                  ) : (
                    <ChevronDown size={18} />
                  )}
                </div>
                
                {isFilterOpen && (
                  <div className="px-5 py-6 space-y-6">
                    <FilterSections 
                      filters={filters} 
                      toggleFilter={toggleFilter} 
                      resetFilters={resetFilters} 
                    />
                  </div>
                )}
              </div>
            </div>
            
            {/* Products Section */}
            <div>
              {/* Toolbar */}
              <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
                <div className="flex items-center">
                  <p className="text-sm text-gray-400">
                    Showing <span className="font-medium text-white">{filteredProducts.length}</span> of {allProducts.length} products
                  </p>
                </div>
                
                <div className="flex items-center space-x-4">
                  {/* Sort Dropdown */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="border-gray-800">
                        <ArrowUpDown size={16} className="mr-2" />
                        Sort
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-black border border-gray-800">
                      <DropdownMenuItem 
                        className={activeSort === 'newest' ? "bg-gray-800" : ""}
                        onClick={() => setActiveSort('newest')}
                      >
                        Newest
                        {activeSort === 'newest' && <Check size={16} className="ml-2" />}
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        className={activeSort === 'popularity' ? "bg-gray-800" : ""}
                        onClick={() => setActiveSort('popularity')}
                      >
                        Most Popular
                        {activeSort === 'popularity' && <Check size={16} className="ml-2" />}
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        className={activeSort === 'priceAsc' ? "bg-gray-800" : ""}
                        onClick={() => setActiveSort('priceAsc')}
                      >
                        Price: Low to High
                        {activeSort === 'priceAsc' && <Check size={16} className="ml-2" />}
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        className={activeSort === 'priceDesc' ? "bg-gray-800" : ""}
                        onClick={() => setActiveSort('priceDesc')}
                      >
                        Price: High to Low
                        {activeSort === 'priceDesc' && <Check size={16} className="ml-2" />}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  
                  {/* View Mode Toggle */}
                  <div className="hidden sm:flex border border-gray-800 rounded-md overflow-hidden">
                    <button
                      className={cn(
                        "p-2",
                        viewMode === 'grid' && "bg-gray-800"
                      )}
                      onClick={() => setViewMode('grid')}
                      aria-label="Grid view"
                    >
                      <Grid3x3 size={16} />
                    </button>
                    <button
                      className={cn(
                        "p-2",
                        viewMode === 'compact' && "bg-gray-800"
                      )}
                      onClick={() => setViewMode('compact')}
                      aria-label="Compact view"
                    >
                      <Grid2x2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Active Filters */}
              {activeFilterCount > 0 && (
                <div className="mb-6">
                  <div className="flex flex-wrap items-center gap-2">
                    {/* Product Type Filters */}
                    {filters.types.map(type => (
                      <Badge key={type} variant="outline" className="flex items-center gap-1 py-1.5">
                        {type === 'tee' ? 'T-shirts' : type === 'hat' ? 'Hats' : 'Hoodies'}
                        <button
                          onClick={() => toggleFilter('types', type)}
                          className="ml-1 rounded-full hover:bg-gray-800 p-0.5"
                        >
                          <X size={12} />
                        </button>
                      </Badge>
                    ))}
                    
                    {/* Color Filters */}
                    {filters.colors.map(color => (
                      <Badge key={color} variant="outline" className="flex items-center gap-1 py-1.5">
                        <span 
                          className="w-3 h-3 rounded-full mr-1"
                          style={{ backgroundColor: colorOptions.find(c => c.value === color)?.color || color }}
                        />
                        {colorOptions.find(c => c.value === color)?.name || color}
                        <button
                          onClick={() => toggleFilter('colors', color)}
                          className="ml-1 rounded-full hover:bg-gray-800 p-0.5"
                        >
                          <X size={12} />
                        </button>
                      </Badge>
                    ))}
                    
                    {/* Size Filters */}
                    {filters.sizes.map(size => (
                      <Badge key={size} variant="outline" className="flex items-center gap-1 py-1.5">
                        Size: {size}
                        <button
                          onClick={() => toggleFilter('sizes', size)}
                          className="ml-1 rounded-full hover:bg-gray-800 p-0.5"
                        >
                          <X size={12} />
                        </button>
                      </Badge>
                    ))}
                    
                    {/* In Stock Filter */}
                    {filters.onlyInStock && (
                      <Badge variant="outline" className="flex items-center gap-1 py-1.5">
                        In Stock
                        <button
                          onClick={() => toggleFilter('onlyInStock', false)}
                          className="ml-1 rounded-full hover:bg-gray-800 p-0.5"
                        >
                          <X size={12} />
                        </button>
                      </Badge>
                    )}
                    
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={resetFilters}
                      className="h-8 text-gray-400 hover:text-white"
                    >
                      Clear All
                    </Button>
                  </div>
                </div>
              )}
              
              {/* Product Grid */}
              {filteredProducts.length === 0 ? (
                <div className="text-center py-12 border border-gray-800 rounded-lg">
                  <FadeIn>
                    <Filter className="mx-auto h-12 w-12 text-gray-500 mb-4" />
                    <h2 className="text-xl font-medium mb-2">No products found</h2>
                    <p className="text-gray-400 mb-6">
                      Try changing your filters or search query.
                    </p>
                    <Button onClick={resetFilters}>Reset Filters</Button>
                  </FadeIn>
                </div>
              ) : (
                <div className={cn(
                  "grid gap-6 md:gap-8",
                  viewMode === 'grid' 
                    ? "grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4" 
                    : "grid-cols-1 sm:grid-cols-2"
                )}>
                  <StaggeredChildren staggerDelay={100} className="contents">
                    {filteredProducts.map((product, index) => {
                      // Render the appropriate card based on product type
                      if (product.type === 'tee') {
                        return (
                          <TeeCard 
                            key={product.id} 
                            product={product} 
                            index={index}
                          />
                        );
                      } else if (product.type === 'hat') {
                        return (
                          <HatCard 
                            key={product.id} 
                            product={product}
                            index={index}
                          />
                        );
                      } else if (product.type === 'hoodie') {
                        return (
                          <HoodieCard 
                            key={product.id} 
                            product={product}
                            index={index}
                          />
                        );
                      }
                      return null;
                    })}
                  </StaggeredChildren>
                </div>
              )}
              
              {/* Pagination - Static for demo */}
              {filteredProducts.length > 0 && (
                <div className="flex justify-center mt-12">
                  <div className="flex space-x-2">
                    <button className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-800 bg-gray-800 text-white">
                      1
                    </button>
                    <button className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-800 text-gray-300 hover:border-primary hover:text-primary transition-colors">
                      2
                    </button>
                    <button className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-800 text-gray-300 hover:border-primary hover:text-primary transition-colors">
                      3
                    </button>
                  </div>
                </div>
              )}
            </div>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

interface FilterSectionsProps {
  filters: FilterState;
  toggleFilter: (filterType: keyof FilterState, value: any) => void;
  resetFilters: () => void;
  onClose?: () => void;
}

const FilterSections = ({ filters, toggleFilter, resetFilters, onClose }: FilterSectionsProps) => (
  <div className="divide-y divide-gray-800">
    {/* Product Type Filter */}
    <div className="pb-6">
      <div className="flex items-center mb-4">
        <Tag size={16} className="mr-2 text-primary" />
        <h3 className="font-medium">Product Type</h3>
      </div>
      <div className="space-y-3">
        <div className="flex items-center">
          <Checkbox 
            id="filter-tees" 
            checked={filters.types.includes('tee')}
            onCheckedChange={() => toggleFilter('types', 'tee')}
          />
          <label htmlFor="filter-tees" className="ml-2 text-sm cursor-pointer">
            T-shirts
          </label>
        </div>
        <div className="flex items-center">
          <Checkbox 
            id="filter-hoodies" 
            checked={filters.types.includes('hoodie')}
            onCheckedChange={() => toggleFilter('types', 'hoodie')}
          />
          <label htmlFor="filter-hoodies" className="ml-2 text-sm cursor-pointer">
            Hoodies
          </label>
        </div>
        <div className="flex items-center">
          <Checkbox 
            id="filter-hats" 
            checked={filters.types.includes('hat')}
            onCheckedChange={() => toggleFilter('types', 'hat')}
          />
          <label htmlFor="filter-hats" className="ml-2 text-sm cursor-pointer">
            Hats
          </label>
        </div>
      </div>
    </div>
    
    {/* Color Filter */}
    <div className="py-6">
      <div className="flex items-center mb-4">
        <Palette size={16} className="mr-2 text-primary" />
        <h3 className="font-medium">Color</h3>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {colorOptions.map(({ name, value, color }) => (
          <div key={value} className="flex flex-col items-center space-y-1">
            <button
              className={cn(
                "w-8 h-8 rounded-full border-2",
                filters.colors.includes(value) 
                  ? "border-primary" 
                  : "border-transparent hover:border-gray-700"
              )}
              style={{ backgroundColor: color }}
              onClick={() => toggleFilter('colors', value)}
              aria-label={`Filter by color: ${name}`}
            >
              {filters.colors.includes(value) && (
                <Check 
                  size={14} 
                  className={cn(
                    "mx-auto",
                    ['white', 'yellow'].includes(value) ? "text-black" : "text-white"
                  )} 
                />
              )}
            </button>
            <span className="text-xs">{name}</span>
          </div>
        ))}
      </div>
    </div>
    
    {/* Size Filter */}
    <div className="py-6">
      <div className="flex items-center mb-4">
        <Ruler size={16} className="mr-2 text-primary" />
        <h3 className="font-medium">Size</h3>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {sizeOptions.map((size) => (
          <button
            key={size}
            className={cn(
              "flex items-center justify-center h-10 border rounded",
              filters.sizes.includes(size)
                ? "border-primary bg-primary/10 text-primary"
                : "border-gray-700 hover:border-gray-500"
            )}
            onClick={() => toggleFilter('sizes', size)}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
    
    {/* Availability Filter */}
    <div className="py-6">
      <div className="flex items-center mb-4">
        <Check size={16} className="mr-2 text-primary" />
        <h3 className="font-medium">Availability</h3>
      </div>
      <div className="flex items-center">
        <Checkbox 
          id="filter-in-stock" 
          checked={filters.onlyInStock}
          onCheckedChange={(checked) => toggleFilter('onlyInStock', !!checked)}
        />
        <label htmlFor="filter-in-stock" className="ml-2 text-sm cursor-pointer">
          In Stock Only
        </label>
      </div>
    </div>
    
    {/* Filter Actions */}
    <div className="pt-6 flex flex-col sm:flex-row gap-3">
      <Button
        onClick={resetFilters}
        variant="outline"
        className="w-full sm:w-1/2"
      >
        Reset All
      </Button>
      
      {onClose && (
        <Button
          className="w-full sm:w-1/2"
          onClick={onClose}
        >
          View Results
        </Button>
      )}
    </div>
  </div>
);

export default Shop;
