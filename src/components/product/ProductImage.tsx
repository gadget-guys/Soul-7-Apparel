
import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { FadeIn } from '@/components/ui/transitions';
import { cn } from '@/lib/utils';
import ImageThumbnail from './ImageThumbnail';

interface ProductImageProps {
  images: string[];
  productName: string;
}

const ProductImage = ({ images, productName }: ProductImageProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState<boolean[]>([]);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });
  const imageRef = useRef<HTMLDivElement>(null);

  // Log images for debugging
  useEffect(() => {
    console.log("ProductImage received images:", images);
  }, [images]);

  useEffect(() => {
    const loadImages = async () => {
      const loadStatuses = images.map(() => false);
      setImagesLoaded(loadStatuses);
      
      const imagePromises = images.map((src, index) => {
        return new Promise<void>((resolve) => {
          const img = new Image();
          // Remove 'public/' prefix if it exists as it causes loading issues
          const cleanedSrc = src.startsWith('public/') ? src.substring(7) : src;
          console.log(`Loading image ${index}: ${cleanedSrc}`);
          img.src = cleanedSrc;
          img.onload = () => {
            console.log(`Image ${index} loaded successfully`);
            setImagesLoaded(prev => {
              const newState = [...prev];
              newState[index] = true;
              return newState;
            });
            resolve();
          };
          img.onerror = (error) => {
            console.error(`Error loading image ${index}:`, cleanedSrc, error);
            resolve();
          };
        });
      });
      
      await Promise.all(imagePromises);
    };
    
    loadImages();
  }, [images]);

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  const goToPrevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const handleThumbnailClick = (index: number) => {
    setCurrentIndex(index);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current || !isZoomed) return;
    
    const { left, top, width, height } = imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    
    setZoomPosition({ x, y });
  };

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  // Process image paths to remove 'public/' prefix
  const processedImages = images.map(img => 
    img.startsWith('public/') ? img.substring(7) : img
  );

  return (
    <div className="relative lg:sticky lg:top-20 select-none">
      {/* Main Image */}
      <div 
        ref={imageRef}
        className={cn(
          "relative overflow-hidden rounded-lg bg-gray-100 aspect-square",
          isZoomed ? "cursor-zoom-out" : "cursor-zoom-in"
        )}
        onClick={toggleZoom}
        onMouseMove={handleMouseMove}
      >
        {processedImages.map((image, index) => (
          <div
            key={index}
            className={cn(
              "absolute inset-0 transition-opacity duration-500",
              currentIndex === index ? "opacity-100" : "opacity-0 pointer-events-none"
            )}
          >
            <div 
              className={cn(
                "absolute inset-0 bg-cover bg-center transition-transform duration-500",
                isZoomed ? "scale-150" : "scale-100"
              )}
              style={{ 
                backgroundImage: `url(${image})`, 
                backgroundPosition: isZoomed ? `${zoomPosition.x}% ${zoomPosition.y}%` : 'center',
              }}
            />
            <img 
              src={image} 
              alt={`${productName} - View ${index + 1}`}
              className={cn(
                "w-full h-full object-cover transition-opacity duration-500 select-none",
                imagesLoaded[index] ? "opacity-0" : "opacity-100 blur-lg",
                isZoomed ? "opacity-0" : ""
              )} 
              draggable="false"
            />
          </div>
        ))}
        
        {/* Zoom icon */}
        <div className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm opacity-70 hover:opacity-100 transition-opacity z-10">
          <ZoomIn size={18} className="text-gray-700" />
        </div>
        
        <ImageNavigationControls 
          onPrevClick={(e) => {
            e.stopPropagation();
            goToPrevSlide();
          }}
          onNextClick={(e) => {
            e.stopPropagation();
            goToNextSlide();
          }}
        />
      </div>
      
      {/* Thumbnails */}
      <div className="mt-4 grid grid-cols-4 gap-2">
        {processedImages.map((image, index) => (
          <FadeIn key={index} delay={100 + index * 50}>
            <ImageThumbnail 
              image={image}
              index={index}
              isSelected={currentIndex === index}
              isLoaded={imagesLoaded[index]}
              onClick={() => handleThumbnailClick(index)}
            />
          </FadeIn>
        ))}
      </div>
    </div>
  );
};

interface ImageNavigationControlsProps {
  onPrevClick: (e: React.MouseEvent) => void;
  onNextClick: (e: React.MouseEvent) => void;
}

const ImageNavigationControls = ({ onPrevClick, onNextClick }: ImageNavigationControlsProps) => (
  <>
    <button
      onClick={onPrevClick}
      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-sm opacity-70 hover:opacity-100 transition-opacity z-10"
      aria-label="Previous image"
    >
      <ChevronLeft size={20} className="text-gray-700" />
    </button>
    
    <button
      onClick={onNextClick}
      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-sm opacity-70 hover:opacity-100 transition-opacity z-10"
      aria-label="Next image"
    >
      <ChevronRight size={20} className="text-gray-700" />
    </button>
  </>
);

export default ProductImage;
