
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Index from './pages/Index';
import TeeDetail from './pages/TeeDetail';
import HatDetail from './pages/HatDetail';
import HoodieDetail from './pages/HoodieDetail';
import Hats from './pages/Hats';
import Tees from './pages/Tees';
import Hoodies from './pages/Hoodies';
import Shop from './pages/Shop';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import NotFound from './pages/NotFound';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import AccountPage from './pages/account/AccountPage';
import UserProfile from './pages/account/UserProfile';
import UserSettings from './pages/account/UserSettings';
import UserOrders from './pages/account/UserOrders';
import UserBilling from './pages/account/UserBilling';
import UserWishlist from './pages/account/UserWishlist';
import AdminPortal from './pages/account/AdminPortal';
import MiniCart from './components/cart/MiniCart';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/tee/:id" element={<TeeDetail />} />
        <Route path="/hat/:id" element={<HatDetail />} />
        <Route path="/hoodie/:id" element={<HoodieDetail />} />
        <Route path="/mens/tees" element={<Tees />} />
        <Route path="/mens/hats" element={<Hats />} />
        <Route path="/mens/hoodies" element={<Hoodies />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/account/profile" element={<UserProfile user={null} />} />
        <Route path="/account/settings" element={<UserSettings user={null} />} />
        <Route path="/account/orders" element={<UserOrders user={null} />} />
        <Route path="/account/billing" element={<UserBilling user={null} />} />
        <Route path="/account/wishlist" element={<UserWishlist user={null} />} />
        <Route path="/account/admin" element={<AdminPortal />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <MiniCart />
    </BrowserRouter>
  );
}

export default App;
