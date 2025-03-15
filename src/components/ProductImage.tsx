
import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { FadeIn } from './ui/transitions';
import { cn } from '@/lib/utils';

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

  // Preload images and track loading status
  useEffect(() => {
    const loadImages = async () => {
      const loadStatuses = images.map(() => false);
      setImagesLoaded(loadStatuses);
      
      const imagePromises = images.map((src, index) => {
        return new Promise<void>((resolve) => {
          const img = new Image();
          img.src = src;
          img.onload = () => {
            setImagesLoaded(prev => {
              const newState = [...prev];
              newState[index] = true;
              return newState;
            });
            resolve();
          };
          img.onerror = () => {
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
        {images.map((image, index) => (
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
        
        {/* Navigation Arrows */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            goToPrevSlide();
          }}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-sm opacity-70 hover:opacity-100 transition-opacity z-10"
          aria-label="Previous image"
        >
          <ChevronLeft size={20} className="text-gray-700" />
        </button>
        
        <button
          onClick={(e) => {
            e.stopPropagation();
            goToNextSlide();
          }}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-sm opacity-70 hover:opacity-100 transition-opacity z-10"
          aria-label="Next image"
        >
          <ChevronRight size={20} className="text-gray-700" />
        </button>
      </div>
      
      {/* Thumbnails */}
      <div className="mt-4 grid grid-cols-4 gap-2">
        {images.map((image, index) => (
          <FadeIn key={index} delay={100 + index * 50}>
            <button 
              onClick={() => handleThumbnailClick(index)}
              className={cn(
                "relative rounded overflow-hidden aspect-square transition-all duration-200",
                currentIndex === index 
                  ? "ring-2 ring-primary ring-offset-2" 
                  : "hover:opacity-80 opacity-60"
              )}
              aria-label={`View image ${index + 1}`}
            >
              <img 
                src={image} 
                alt={`Thumbnail ${index + 1}`} 
                className={cn(
                  "w-full h-full object-cover transition-opacity duration-500",
                  imagesLoaded[index] ? "opacity-100" : "opacity-0"
                )}
              />
              {!imagesLoaded[index] && (
                <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
              )}
            </button>
          </FadeIn>
        ))}
      </div>
    </div>
  );
};

export default ProductImage;
