
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { MessageSquare, X, Bot, User } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Message {
  role: 'system' | 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const ShopAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'system',
      content: 'Hello! I\'m your AI shopping assistant. How can I help you today?',
      timestamp: new Date()
    }
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!query.trim()) return;
    
    const userMessage: Message = {
      role: 'user',
      content: query,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setQuery('');
    setIsLoading(true);
    
    try {
      // Get API key from Supabase
      const { data: apiKeyData } = await supabase
        .from('api_keys')
        .select('openai_api_key')
        .single();
      
      if (!apiKeyData?.openai_api_key) {
        const errorMessage: Message = {
          role: 'system',
          content: 'Sorry, the AI service is not available at the moment. Please try again later or contact support.',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, errorMessage]);
        
        toast({
          title: "Missing API Key",
          description: "Please configure your OpenAI API key in the admin portal",
          variant: "destructive"
        });
        setIsLoading(false);
        return;
      }
      
      // In a real implementation, this would:
      // 1. Send the conversation history to your backend
      // 2. The backend would use OpenAI to generate a response
      // 3. Return the AI-generated response
      
      // For demo purposes, we'll simulate responses
      const demoResponses = [
        "I'd recommend checking out our new collection of graphic tees that just arrived. They're very popular this season!",
        "For slim-fit tees, our premium cotton line offers the best quality. Would you like me to show you some options?",
        "Our sizes generally run true to fit. If you're between sizes, I'd suggest going up for a more comfortable fit.",
        "We offer free shipping on orders over $50, and returns are free within 30 days of purchase.",
        "The limited edition collaboration with local artists is available exclusively online and in select stores."
      ];
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const randomResponse = demoResponses[Math.floor(Math.random() * demoResponses.length)];
      
      const assistantMessage: Message = {
        role: 'assistant',
        content: randomResponse,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error with chatbot:", error);
      const errorMessage: Message = {
        role: 'system',
        content: 'Sorry, I encountered an error. Please try again later.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Chat Button */}
      <Button
        className="fixed bottom-6 right-6 rounded-full h-14 w-14 shadow-lg"
        onClick={() => setIsOpen(true)}
      >
        <MessageSquare size={24} />
      </Button>
      
      {/* Chat Window */}
      <div 
        className={cn(
          "fixed bottom-0 right-0 w-full sm:w-96 h-[500px] bg-black border border-gray-800 shadow-xl rounded-t-lg z-50 transition-transform duration-300",
          isOpen ? "transform translate-y-0" : "transform translate-y-full"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <div className="flex items-center gap-2">
            <Bot size={20} className="text-primary" />
            <h3 className="font-medium">Shop Assistant</h3>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(false)}
          >
            <X size={20} />
          </Button>
        </div>
        
        {/* Messages */}
        <ScrollArea className="h-[390px] p-4">
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div 
                key={index}
                className={cn(
                  "flex max-w-[80%] rounded-lg p-3",
                  message.role === 'user' 
                    ? "bg-primary text-primary-foreground ml-auto" 
                    : "bg-gray-800 mr-auto"
                )}
              >
                <div className="mr-2 mt-0.5">
                  {message.role === 'user' ? (
                    <User size={16} />
                  ) : (
                    <Bot size={16} />
                  )}
                </div>
                <div>
                  <p className="text-sm">{message.content}</p>
                  <p className="text-xs opacity-50 mt-1">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex max-w-[80%] rounded-lg p-3 bg-gray-800 mr-auto">
                <div className="mr-2 mt-0.5">
                  <Bot size={16} />
                </div>
                <div className="flex space-x-1">
                  <div className="h-2 w-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="h-2 w-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="h-2 w-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
        
        {/* Input */}
        <form onSubmit={handleSubmit} className="p-4 border-t border-gray-800">
          <div className="flex items-center gap-2">
            <Input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask about products, sizes, shipping..."
              className="bg-gray-800 border-gray-700"
              disabled={isLoading}
            />
            <Button 
              type="submit" 
              disabled={isLoading || !query.trim()}
              size="icon"
            >
              <MessageSquare size={16} />
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ShopAssistant;
