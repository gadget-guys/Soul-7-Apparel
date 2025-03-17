
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Tees from "./pages/Tees";
import Hoodies from "./pages/Hoodies";
import Hats from "./pages/Hats";
import TeeDetail from "./pages/TeeDetail";
import NotFound from "./pages/NotFound";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import AccountPage from "./pages/account/AccountPage";
import ShopAssistant from "./components/ai/ShopAssistant";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/product/:id" element={<Index />} />
          <Route path="/mens/tees" element={<Tees />} />
          <Route path="/womens/tees" element={<Tees />} />
          <Route path="/kids/tees" element={<Tees />} />
          <Route path="/mens/hoodies" element={<Hoodies />} />
          <Route path="/womens/hoodies" element={<Hoodies />} />
          <Route path="/kids/hoodies" element={<Hoodies />} />
          <Route path="/mens/hats" element={<Hats />} />
          <Route path="/womens/hats" element={<Hats />} />
          <Route path="/kids/hats" element={<Hats />} />
          <Route path="/tee/:id" element={<TeeDetail />} />
          <Route path="/account/login" element={<Login />} />
          <Route path="/account/register" element={<Register />} />
          <Route path="/account" element={<AccountPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ShopAssistant />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
