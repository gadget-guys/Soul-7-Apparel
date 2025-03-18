
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';

interface WordPressPost {
  id: number;
  title: { rendered: string };
  excerpt: { rendered: string };
  link: string;
  date: string;
}

const WordPressConnectivityTest = () => {
  const [wpUrl, setWpUrl] = useState<string>('https://demo.wp-api.org');
  const [isTesting, setIsTesting] = useState<boolean>(false);
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [posts, setPosts] = useState<WordPressPost[]>([]);

  const testConnection = async () => {
    setIsTesting(true);
    setIsConnected(null);
    setError(null);
    setPosts([]);
    
    try {
      // Normalize URL - ensure it ends with /wp-json/
      let apiUrl = wpUrl;
      if (!apiUrl.endsWith('/')) apiUrl += '/';
      if (!apiUrl.includes('wp-json')) apiUrl += 'wp-json/';
      
      // Test connection by fetching posts
      const response = await fetch(`${apiUrl}wp/v2/posts?_embed&per_page=3`);
      
      if (!response.ok) {
        throw new Error(`WordPress API returned ${response.status}: ${response.statusText}`);
      }
      
      const data: WordPressPost[] = await response.json();
      setPosts(data);
      setIsConnected(true);
      console.log('WordPress connection successful', data);
    } catch (err) {
      console.error('WordPress connection failed:', err);
      setIsConnected(false);
      setError(err instanceof Error ? err.message : 'Unknown error connecting to WordPress');
    } finally {
      setIsTesting(false);
    }
  };

  // Auto-test on initial load
  useEffect(() => {
    testConnection();
  }, []);

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>WordPress Connectivity Test</CardTitle>
        <CardDescription>
          Test if your React app can connect to a WordPress site's REST API
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-2">
          <Input
            value={wpUrl}
            onChange={(e) => setWpUrl(e.target.value)}
            placeholder="WordPress Site URL (e.g., https://example.com)"
            className="flex-1"
            disabled={isTesting}
          />
          <Button onClick={testConnection} disabled={isTesting}>
            {isTesting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Testing
              </>
            ) : (
              'Test Connection'
            )}
          </Button>
        </div>
        
        {isConnected === true && (
          <Alert className="bg-green-950 border-green-800">
            <CheckCircle className="h-4 w-4 text-green-500" />
            <AlertTitle className="text-green-500">Connection Successful</AlertTitle>
            <AlertDescription>
              Successfully connected to the WordPress REST API and retrieved {posts.length} posts.
            </AlertDescription>
          </Alert>
        )}
        
        {isConnected === false && (
          <Alert className="bg-red-950 border-red-800">
            <XCircle className="h-4 w-4 text-red-500" />
            <AlertTitle className="text-red-500">Connection Failed</AlertTitle>
            <AlertDescription>
              {error || "Couldn't connect to the WordPress REST API. Check the URL and make sure the WordPress site has REST API enabled."}
            </AlertDescription>
          </Alert>
        )}
        
        {posts.length > 0 && (
          <div className="space-y-4 mt-4">
            <h3 className="text-lg font-semibold">Sample Posts Retrieved:</h3>
            {posts.map(post => (
              <div key={post.id} className="p-4 border border-gray-800 rounded-md">
                <h4 className="text-md font-medium" dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
                <div className="text-sm text-gray-400 mt-1" dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
                <div className="text-xs text-gray-500 mt-2">
                  {new Date(post.date).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
      
      <CardFooter className="flex justify-between border-t border-gray-800 pt-4">
        <div className="text-xs text-gray-400">
          Next steps after successful connection: Create custom hooks to fetch WordPress data, build components to display content, etc.
        </div>
      </CardFooter>
    </Card>
  );
};

export default WordPressConnectivityTest;
