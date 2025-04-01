
import { cn } from '@/lib/utils';

interface ImageThumbnailProps {
  image: string;
  index: number;
  isSelected: boolean;
  isLoaded: boolean;
  onClick: () => void;
}

const ImageThumbnail = ({ 
  image, 
  index, 
  isSelected,
  isLoaded,
  onClick 
}: ImageThumbnailProps) => {
  // Process image path to ensure proper display
  const cleanedImage = image.startsWith('public/') ? image.substring(7) : image;
  
  return (
    <button 
      onClick={onClick}
      className={cn(
        "relative rounded overflow-hidden aspect-square transition-all duration-200",
        isSelected 
          ? "ring-2 ring-primary ring-offset-2" 
          : "hover:opacity-80 opacity-60"
      )}
      aria-label={`View image ${index + 1}`}
    >
      <img 
        src={cleanedImage} 
        alt={`Thumbnail ${index + 1}`} 
        className={cn(
          "w-full h-full object-cover transition-opacity duration-500",
          isLoaded ? "opacity-100" : "opacity-0"
        )}
      />
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
      )}
    </button>
  );
};

export default ImageThumbnail;
