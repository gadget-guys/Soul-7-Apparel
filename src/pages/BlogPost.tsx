
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FadeIn, SlideIn } from '@/components/ui/transitions';
import { ChevronLeft, Calendar, User, Tag, Facebook, Twitter, Linkedin, Link2, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import Navbar from '@/components/navbar';
import Footer from '@/components/layout/Footer';
import BlogCard, { BlogPost } from '@/components/blog/BlogCard';
import { blogPosts } from '@/lib/blog-data';

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const { toast } = useToast();
  
  useEffect(() => {
    // Find the post with the matching slug
    const currentPost = blogPosts.find(p => p.slug === slug);
    setPost(currentPost || null);
    
    if (currentPost) {
      // Find related posts by checking if they share a category or tags
      const related = blogPosts
        .filter(p => p.id !== currentPost.id)
        .filter(p => 
          p.category === currentPost.category || 
          p.tags.some(tag => currentPost.tags.includes(tag))
        )
        .slice(0, 3);
      setRelatedPosts(related);
    }
    
    // Scroll to top on load
    window.scrollTo(0, 0);
  }, [slug]);
  
  const handleShare = (platform: string) => {
    const url = window.location.href;
    const title = post?.title || 'Check out this article';
    
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
          description: "Article link has been copied to clipboard",
        });
        return;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  };
  
  if (!post) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Navbar transparent={true} />
        <div className="container mx-auto px-4 pt-32 pb-16">
          <div className="text-center">
            <h1 className="text-2xl font-medium mb-4">Article not found</h1>
            <p className="text-gray-400 mb-8">The article you're looking for doesn't exist or has been removed.</p>
            <Button asChild>
              <Link to="/blog">Back to Blog</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar transparent={true} />
      
      <main className="pt-20">
        <article className="container mx-auto px-4 py-12">
          <FadeIn>
            <div className="max-w-5xl mx-auto">
              <Link to="/blog" className="inline-flex items-center text-gray-400 hover:text-primary mb-8">
                <ChevronLeft size={18} />
                <span>Back to Blog</span>
              </Link>
              
              <div className="relative overflow-hidden rounded-lg aspect-[21/9] mb-10">
                <div 
                  className="w-full h-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${post.coverImage})` }}
                />
              </div>
              
              <div className="mb-8">
                <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                  <span className="inline-flex items-center gap-1">
                    <Calendar size={14} />
                    {formattedDate}
                  </span>
                  <span className="uppercase text-xs font-medium text-primary px-2 py-1 bg-primary/10 rounded">
                    {post.category}
                  </span>
                </div>
                
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-playfair mb-6">
                  {post.title}
                </h1>
                
                <div className="flex items-center gap-4 mb-6">
                  <Avatar>
                    <AvatarImage src={post.authorImage} alt={post.author} />
                    <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="text-sm flex items-center gap-1">
                      <User size={14} />
                      <span>Author</span>
                    </div>
                    <div className="font-medium">{post.author}</div>
                  </div>
                </div>
              </div>
              
              <div className="prose prose-invert max-w-none mb-10"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
              
              <div className="flex flex-wrap gap-2 mb-10">
                <div className="flex items-center gap-1 text-gray-400 mr-2">
                  <Tag size={16} />
                  <span>Tags:</span>
                </div>
                {post.tags.map(tag => (
                  <Link 
                    key={tag} 
                    to={`/blog?tag=${tag}`}
                    className="bg-gray-800 hover:bg-gray-700 px-3 py-1 rounded-full text-sm transition-colors"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
              
              <Separator className="mb-6" />
              
              <div className="flex flex-wrap justify-between items-center gap-4 mb-16">
                <div>
                  <h3 className="text-sm text-gray-400 mb-2">Share this article</h3>
                  <div className="flex gap-2">
                    <Button 
                      size="icon" 
                      variant="outline" 
                      className="rounded-full w-9 h-9" 
                      onClick={() => handleShare('facebook')}
                    >
                      <Facebook size={16} />
                    </Button>
                    <Button 
                      size="icon" 
                      variant="outline" 
                      className="rounded-full w-9 h-9" 
                      onClick={() => handleShare('twitter')}
                    >
                      <Twitter size={16} />
                    </Button>
                    <Button 
                      size="icon" 
                      variant="outline" 
                      className="rounded-full w-9 h-9" 
                      onClick={() => handleShare('linkedin')}
                    >
                      <Linkedin size={16} />
                    </Button>
                    <Button 
                      size="icon" 
                      variant="outline" 
                      className="rounded-full w-9 h-9" 
                      onClick={() => handleShare('copy')}
                    >
                      <Link2 size={16} />
                    </Button>
                  </div>
                </div>
                
                <Button className="gap-2">
                  <MessageSquare size={16} />
                  <span>Leave a Comment</span>
                </Button>
              </div>
            </div>
          </FadeIn>
          
          {relatedPosts.length > 0 && (
            <SlideIn>
              <div className="max-w-6xl mx-auto">
                <h2 className="text-2xl font-playfair mb-8">Related Articles</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {relatedPosts.map((post, index) => (
                    <BlogCard key={post.id} post={post} index={index} />
                  ))}
                </div>
              </div>
            </SlideIn>
          )}
        </article>
      </main>
      
      <Footer />
    </div>
  );
};

export default BlogPost;
