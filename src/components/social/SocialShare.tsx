
import { useState } from 'react';
import { Facebook, Twitter, Linkedin, Link2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

interface SocialShareProps {
  title: string;
  imageUrl?: string;
  description?: string;
  className?: string;
}

const SocialShare = ({ title, imageUrl, description, className }: SocialShareProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { toast } = useToast();
  
  const url = window.location.href;
  
  const handleShare = (platform: string) => {
    let shareUrl = '';
    
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
      case 'copy':
        navigator.clipboard.writeText(url);
        toast({
          title: "Link copied",
          description: "Product link has been copied to clipboard",
        });
        return;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  };
  
  return (
    <div className={className}>
      <div className="flex items-center gap-2">
        <Button 
          size="icon" 
          variant="outline" 
          className="rounded-full w-9 h-9" 
          onClick={() => handleShare('facebook')}
          aria-label="Share on Facebook"
        >
          <Facebook size={16} />
        </Button>
        <Button 
          size="icon" 
          variant="outline" 
          className="rounded-full w-9 h-9" 
          onClick={() => handleShare('twitter')}
          aria-label="Share on Twitter"
        >
          <Twitter size={16} />
        </Button>
        <Button 
          size="icon" 
          variant="outline" 
          className="rounded-full w-9 h-9" 
          onClick={() => handleShare('linkedin')}
          aria-label="Share on LinkedIn"
        >
          <Linkedin size={16} />
        </Button>
        <Button 
          size="icon" 
          variant="outline" 
          className="rounded-full w-9 h-9" 
          onClick={() => handleShare('copy')}
          aria-label="Copy link"
        >
          <Link2 size={16} />
        </Button>
      </div>
    </div>
  );
};

export default SocialShare;
