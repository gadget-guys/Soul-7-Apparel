
import { useState } from 'react';
import { FadeIn } from '@/components/ui/transitions';
import Footer from '@/components/layout/Footer';
import Navbar from '@/components/navbar';
import BlogCard from '@/components/blog/BlogCard';
import { blogPosts } from '@/lib/blog-data';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

const categories = [...new Set(blogPosts.map(post => post.category))];
const allTags = [...new Set(blogPosts.flatMap(post => post.tags))];

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  
  // Filter posts based on search query, category, and tag
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = searchQuery === '' || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesCategory = selectedCategory === null || post.category === selectedCategory;
    const matchesTag = selectedTag === null || post.tags.includes(selectedTag);
    
    return matchesSearch && matchesCategory && matchesTag;
  });
  
  // Get the featured/latest post
  const featuredPost = blogPosts[0];
  
  // Get the remaining posts
  const remainingPosts = filteredPosts.filter(post => post.id !== featuredPost.id);

  return (
    <div className="min-h-screen">
      <Navbar transparent={true} />
      
      <main className="pt-20">
        <section className="py-10 bg-black">
          <div className="container mx-auto px-4 sm:px-6">
            <FadeIn>
              <h1 className="text-4xl font-playfair text-center mb-2">Blog & Style Guide</h1>
              <p className="text-gray-400 text-center max-w-2xl mx-auto mb-10">
                Discover the latest trends, style tips, and fashion insights from our team of experts
              </p>
              
              <div className="relative max-w-md mx-auto mb-10">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input 
                  className="pl-10 bg-gray-900 border-gray-800 focus:border-primary"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="flex flex-wrap gap-2 justify-center mb-10">
                <Badge 
                  className={`cursor-pointer ${selectedCategory === null ? 'bg-primary hover:bg-primary/80' : 'bg-gray-800 hover:bg-gray-700'}`}
                  onClick={() => setSelectedCategory(null)}
                >
                  All Categories
                </Badge>
                {categories.map((category) => (
                  <Badge 
                    key={category}
                    className={`cursor-pointer ${selectedCategory === category ? 'bg-primary hover:bg-primary/80' : 'bg-gray-800 hover:bg-gray-700'}`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Badge>
                ))}
              </div>
              
              <div className="flex flex-wrap gap-2 justify-center mb-16">
                <Badge 
                  variant="outline"
                  className={`cursor-pointer ${selectedTag === null ? 'border-primary text-primary' : 'border-gray-700 text-gray-400'}`}
                  onClick={() => setSelectedTag(null)}
                >
                  All Tags
                </Badge>
                {allTags.map((tag) => (
                  <Badge 
                    key={tag}
                    variant="outline"
                    className={`cursor-pointer ${selectedTag === tag ? 'border-primary text-primary' : 'border-gray-700 text-gray-400'}`}
                    onClick={() => setSelectedTag(tag)}
                  >
                    #{tag}
                  </Badge>
                ))}
              </div>
            </FadeIn>
            
            {!searchQuery && !selectedCategory && !selectedTag ? (
              <div className="mb-16">
                <BlogCard post={featuredPost} featured={true} />
              </div>
            ) : null}
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {remainingPosts.map((post, index) => (
                <BlogCard key={post.id} post={post} index={index} />
              ))}
            </div>
            
            {filteredPosts.length === 0 && (
              <div className="text-center py-16">
                <h2 className="text-xl font-medium mb-2">No articles found</h2>
                <p className="text-gray-400">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Blog;
