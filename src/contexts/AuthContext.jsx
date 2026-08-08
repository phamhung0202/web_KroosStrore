import React, { createContext, useState, useEffect, useContext } from 'react';
import { AUTH_SESSION_KEY, USERS_KEY } from '../utils/seedData';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const session = localStorage.getItem(AUTH_SESSION_KEY);
    if (session) {
      setUser(JSON.parse(session));
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
    const foundUser = users.find(u => u.email === email && u.password === password);
    if (foundUser) {
      // Don't store password in session
      const { password: _, ...sessionUser } = foundUser;
      localStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(sessionUser));
      setUser(sessionUser);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem(AUTH_SESSION_KEY);
    setUser(null);
  };

  const updateProfile = (updatedData) => {
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
    const userIndex = users.findIndex(u => u.id === user.id);
    if (userIndex !== -1) {
      const updatedUser = { ...users[userIndex], ...updatedData };
      users[userIndex] = updatedUser;
      localStorage.setItem(USERS_KEY, JSON.stringify(users));
      
      const { password: _, ...sessionUser } = updatedUser;
      localStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(sessionUser));
      setUser(sessionUser);
      return true;
    }
    return false;
  };

  const changePassword = (oldPassword, newPassword) => {
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
    const userIndex = users.findIndex(u => u.id === user.id);
    if (userIndex !== -1 && users[userIndex].password === oldPassword) {
      users[userIndex].password = newPassword;
      localStorage.setItem(USERS_KEY, JSON.stringify(users));
      return true;
    }
    return false;
  };

  const register = (userData) => {
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
    if (users.find(u => u.email === userData.email)) {
      return { success: false, message: 'Email already exists' };
    }
    const newUser = {
      id: Date.now().toString(),
      role: 'Customer', // Default role
      ...userData
    };
    users.push(newUser);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    
    // Auto login
    const { password: _, ...sessionUser } = newUser;
    localStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(sessionUser));
    setUser(sessionUser);
    
    return { success: true };
  };

  const value = {
    user,
    loading,
    login,
    logout,
    register,
    updateProfile,
    changePassword,
    isAdmin: user?.role === 'Admin',
    isCustomer: user?.role === 'Customer'
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
