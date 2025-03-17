
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Index from './pages/Index';
import TeeDetail from './pages/TeeDetail';
import HatDetail from './pages/HatDetail';
import HoodieDetail from './pages/HoodieDetail';
import Hats from './pages/Hats';
import Tees from './pages/Tees';
import Hoodies from './pages/Hoodies';
import NotFound from './pages/NotFound';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import AccountPage from './pages/account/AccountPage';
import UserProfile from './pages/account/UserProfile';
import AdminPortal from './pages/account/AdminPortal';

function App() {
  // Mocked user for UserProfile component
  const mockUser = {
    id: 'user-1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
  };

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
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/account/profile" element={<UserProfile user={mockUser} />} />
        <Route path="/account/admin" element={<AdminPortal />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
