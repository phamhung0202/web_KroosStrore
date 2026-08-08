import React, { createContext, useState, useEffect, useContext } from 'react';
import { PRODUCTS_KEY } from '../utils/seedData';
import { useAuth } from './AuthContext';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const { user, loading } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load cart from local storage when user changes, but only after auth is loaded
  useEffect(() => {
    if (loading) return;

    if (user) {
      let userCart = JSON.parse(localStorage.getItem(`kroos_cart_${user.id}`) || '[]');
      const guestCart = JSON.parse(localStorage.getItem('kroos_cart_guest') || '[]');
      
      // Merge guest cart if it has items
      if (guestCart.length > 0) {
        guestCart.forEach(gItem => {
          const existing = userCart.find(uItem => uItem.cartItemId === gItem.cartItemId);
          if (existing) {
            existing.quantity += gItem.quantity;
          } else {
            userCart.push(gItem);
          }
        });
        
        // Save merged cart back to user's storage
        localStorage.setItem(`kroos_cart_${user.id}`, JSON.stringify(userCart));
        
        // Clear guest cart
        localStorage.setItem('kroos_cart_guest', '[]');
      }
      
      setCartItems(userCart);
    } else {
      // Load guest cart for unauthenticated users
      const guestCart = JSON.parse(localStorage.getItem('kroos_cart_guest') || '[]');
      setCartItems(guestCart);
    }
    setIsLoaded(true);
  }, [user, loading]);

  const saveCart = (items) => {
    if (!isLoaded) return;
    const key = user ? `kroos_cart_${user.id}` : 'kroos_cart_guest';
    localStorage.setItem(key, JSON.stringify(items));
  };

  const addToCart = (productId, size, color, quantity = 1) => {
    const products = JSON.parse(localStorage.getItem(PRODUCTS_KEY) || '[]');
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const cartItemId = `${productId}-${size}-${color}`;

    setCartItems(prev => {
      const existingItem = prev.find(item => item.cartItemId === cartItemId);
      let next;
      if (existingItem) {
        next = prev.map(item => 
          item.cartItemId === cartItemId 
            ? { ...item, quantity: item.quantity + quantity } 
            : item
        );
      } else {
        next = [...prev, { cartItemId, productId, size, color, quantity, product }];
      }
      saveCart(next);
      return next;
    });
  };

  const removeFromCart = (cartItemId) => {
    setCartItems(prev => {
      const next = prev.filter(item => item.cartItemId !== cartItemId);
      saveCart(next);
      return next;
    });
  };

  const updateQuantity = (cartItemId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCartItems(prev => {
      const next = prev.map(item => 
        item.cartItemId === cartItemId 
          ? { ...item, quantity } 
          : item
      );
      saveCart(next);
      return next;
    });
  };

  const clearCart = () => {
    setCartItems([]);
    saveCart([]);
  };

  const getSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  };

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getSubtotal,
    itemCount: cartItems.reduce((count, item) => count + item.quantity, 0)
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
