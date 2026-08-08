import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import { seedDatabase } from './utils/seedData';

import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Home from './pages/public/Home/Home';

import Products from './pages/public/Products/Products';
import ProductDetails from './pages/public/ProductDetails/ProductDetails';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

import Cart from './pages/customer/Cart/Cart';
import Profile from './pages/customer/Profile/Profile';

import AdminLayout from './pages/admin/AdminLayout';
import Dashboard from './pages/admin/Dashboard/Dashboard';
import AdminProducts from './pages/admin/Dashboard/AdminProducts';
import AdminUsers from './pages/admin/Dashboard/AdminUsers';
import AdminOrders from './pages/admin/Dashboard/AdminOrders';
import AdminContact from './pages/admin/Dashboard/AdminContact';
import NotFound from './pages/public/NotFound/NotFound';
import Contact from './pages/public/Contact/Contact';
import ShippingReturns from './pages/public/ShippingReturns/ShippingReturns';
import FAQ from './pages/public/FAQ/FAQ';

const ProtectedRoute = ({ children, roles }) => {
  const { user, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;
  if (roles && !roles.includes(user.role)) return <Navigate to="/" replace />;
  return children;
};

const GuestRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  if (user) return <Navigate to="/" replace />;
  return children;
};

const AppContent = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <main style={{ flexGrow: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/shipping-returns" element={<ShippingReturns />} />
          
          <Route path="/login" element={<GuestRoute><Login /></GuestRoute>} />
          <Route path="/register" element={<GuestRoute><Register /></GuestRoute>} />
          
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<ProtectedRoute roles={['Customer', 'Admin']}><Profile /></ProtectedRoute>} />
          
          <Route path="/admin" element={<ProtectedRoute roles={['Admin']}><AdminLayout /></ProtectedRoute>}>
            <Route index element={<Dashboard />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="messages" element={<AdminContact />} />
          </Route>
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

const App = () => {
  useEffect(() => {
    seedDatabase();
    
    // Enforce 5.0 rating for all existing products in localStorage
    try {
      const productsStr = localStorage.getItem('kroos_products');
      if (productsStr) {
        const products = JSON.parse(productsStr);
        if (products.length > 10) {
          localStorage.removeItem('kroos_products');
          localStorage.removeItem('kroos_categories');
          window.location.reload();
          return;
        }

        let updated = false;
        const normalized = products.map(p => {
          if (p.rating !== "5.0") {
            updated = true;
            return { ...p, rating: "5.0" };
          }
          return p;
        });
        if (updated) {
          localStorage.setItem('kroos_products', JSON.stringify(normalized));
          window.location.reload();
        }
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <AppContent />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
