
import { Link } from 'react-router-dom';
import { Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';
import { FadeIn } from '@/components/ui/transitions';

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  authorImage?: string;
  coverImage: string;
  date: string;
  category: string;
  tags: string[];
  slug: string;
}

interface BlogCardProps {
  post: BlogPost;
  index?: number;
  featured?: boolean;
}

const BlogCard = ({ post, index = 0, featured = false }: BlogCardProps) => {
  // Add a small staggered delay for each card
  const animationDelay = 100 + index * 50;
  
  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <FadeIn delay={animationDelay}>
      <Link to={`/blog/${post.slug}`} className="block group">
        <div className={cn(
          "overflow-hidden rounded-lg bg-gray-900 mb-4",
          featured ? "aspect-[16/9]" : "aspect-square"
        )}>
          <div 
            className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
            style={{ backgroundImage: `url(${post.coverImage})` }}
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center text-sm text-gray-400 gap-4">
            <span className="inline-flex items-center gap-1">
              <Calendar size={14} />
              {formattedDate}
            </span>
            <span className="uppercase text-xs font-medium text-primary">{post.category}</span>
          </div>
          
          <h3 className={cn(
            "font-playfair text-white group-hover:text-primary transition-colors",
            featured ? "text-2xl" : "text-lg"
          )}>
            {post.title}
          </h3>
          
          <p className="text-gray-400 line-clamp-2 text-sm">
            {post.excerpt}
          </p>
        </div>
      </Link>
    </FadeIn>
  );
};

export default BlogCard;
