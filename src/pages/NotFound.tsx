
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "@/components/navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/transitions";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  // Generate suggestions based on current path
  const getSuggestions = () => {
    const path = location.pathname.toLowerCase();
    
    if (path.includes("tee") || path.includes("shirt") || path.includes("t-shirt")) {
      return { text: "Browse our T-shirts collection", link: "/mens/tees" };
    } else if (path.includes("hat") || path.includes("cap")) {
      return { text: "Check out our Hats collection", link: "/mens/hats" };
    } else if (path.includes("hoodie") || path.includes("sweatshirt")) {
      return { text: "View our Hoodies collection", link: "/mens/hoodies" };
    } else if (path.includes("login") || path.includes("signin")) {
      return { text: "Sign in to your account", link: "/auth/login" };
    } else if (path.includes("register") || path.includes("signup")) {
      return { text: "Create a new account", link: "/auth/register" };
    } else if (path.includes("account") || path.includes("profile")) {
      return { text: "Visit your account page", link: "/account" };
    } else if (path.includes("blog") || path.includes("article")) {
      return { text: "Read our latest blog posts", link: "/blog" };
    } else if (path.includes("wordpress") || path.includes("wp")) {
      return { text: "Test WordPress connectivity", link: "/wordpress-test" };
    }
    
    return { text: "Browse all products", link: "/shop" };
  };

  const suggestion = getSuggestions();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar transparent={true} />
      
      <main className="flex-grow flex items-center justify-center py-20">
        <div className="container px-4 sm:px-6">
          <FadeIn>
            <div className="max-w-md mx-auto text-center">
              <h1 className="text-7xl font-bold mb-6 text-primary">404</h1>
              <h2 className="text-2xl font-medium mb-4 font-playfair">Page Not Found</h2>
              <p className="text-gray-400 mb-8">
                We couldn't find the page you're looking for. The page may have been moved, 
                deleted, or is temporarily unavailable.
              </p>
              
              <div className="space-y-4">
                <Button asChild className="w-full">
                  <Link to="/">Return to Home</Link>
                </Button>
                
                <Button asChild variant="outline" className="w-full">
                  <Link to={suggestion.link}>{suggestion.text}</Link>
                </Button>

                <Button asChild variant="ghost" className="w-full">
                  <Link to="/wordpress-test">Test WordPress Integration</Link>
                </Button>
              </div>
            </div>
          </FadeIn>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFound;
