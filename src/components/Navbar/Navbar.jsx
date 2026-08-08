import React, { useState } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingBag, User, LogOut, Menu, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import styles from './Navbar.module.css';

const Navbar = () => {
  const { user, logout, isAdmin } = useAuth();
  const { itemCount } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const cartCount = itemCount || 0;
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  const handleLogoutClick = () => {
    setShowLogoutConfirm(true);
  };

  const confirmLogout = () => {
    logout();
    setShowLogoutConfirm(false);
    navigate('/login');
  };

  return (
    <>
    <header className={styles.navbar}>
      <div className={`container ${styles.navContainer}`}>
        <div className={styles.logo}>
          <Link to="/">Kroos Store</Link>
        </div>

        <nav className={`${styles.navLinks} ${isMenuOpen ? styles.active : ''}`}>
          {!isAdmin && (
            <>
              <NavLink to="/" className={({ isActive }) => isActive ? `${styles.link} ${styles.activeLink}` : styles.link}>Home</NavLink>
              <NavLink to="/products" className={({ isActive }) => isActive ? `${styles.link} ${styles.activeLink}` : styles.link}>Shop</NavLink>
              <NavLink to="/contact" className={({ isActive }) => isActive ? `${styles.link} ${styles.activeLink}` : styles.link}>Contact</NavLink>
            </>
          )}

          {isAdmin && (
            <>
              <NavLink to="/" className={({ isActive }) => isActive ? `${styles.link} ${styles.activeLink}` : styles.link}>Home</NavLink>
              <NavLink to="/products" className={({ isActive }) => isActive ? `${styles.link} ${styles.activeLink}` : styles.link}>Shop</NavLink>
            </>
          )}
        </nav>

        <div className={styles.actions}>
          {user ? (
            <>
              {user.role === 'Admin' && (
                <Link to="/admin" className={styles.iconBtn} aria-label="Admin">
                  <ShieldCheck size={24} strokeWidth={1.5} />
                </Link>
              )}
              <Link to="/profile" className={styles.iconBtn} aria-label="Profile">
                <User size={24} strokeWidth={1.5} />
              </Link>
              <Link to="/cart" className={styles.iconBtn} aria-label="Cart">
                <ShoppingBag size={24} strokeWidth={1.5} />
                {cartCount > 0 && <span className={styles.cartBadge}>{cartCount}</span>}
              </Link>
              <button onClick={handleLogoutClick} className={styles.iconBtn} aria-label="Logout">
                <LogOut size={24} strokeWidth={1.5} />
              </button>
            </>
          ) : (
            <>
              {isAuthPage ? (
                <>
                  <Link to="/cart" className={styles.iconBtn} aria-label="Cart">
                    <ShoppingBag size={24} strokeWidth={1.5} />
                    {cartCount > 0 && <span className={styles.cartBadge}>{cartCount}</span>}
                  </Link>
                  <NavLink to="/login" className={({ isActive }) => isActive ? `${styles.link} ${styles.activeLink}` : styles.link}>Sign In</NavLink>
                  <NavLink to="/register" className={({ isActive }) => isActive ? `${styles.link} ${styles.activeLink}` : styles.link}>Sign Up</NavLink>
                </>
              ) : (
                <>
                  <Link to="/login" className={styles.iconBtn} aria-label="Login">
                    <User size={24} strokeWidth={1.5} />
                  </Link>
                  <Link to="/cart" className={styles.iconBtn} aria-label="Cart">
                    <ShoppingBag size={24} strokeWidth={1.5} />
                    {cartCount > 0 && <span className={styles.cartBadge}>{cartCount}</span>}
                  </Link>
                </>
              )}
            </>
          )}
          <button className={styles.mobileMenuBtn} onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Menu size={24} strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </header>

    {showLogoutConfirm && (
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: '24px' }}>
        <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '32px', width: '100%', maxWidth: '400px', textAlign: 'center', boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '16px' }}>Confirm Logout</h2>
          <p style={{ color: '#4a4a4a', marginBottom: '32px' }}>
            Are you sure you want to log out?
          </p>
          <div style={{ display: 'flex', gap: '16px' }}>
            <button 
              onClick={() => setShowLogoutConfirm(false)}
              style={{ flex: 1, padding: '12px', border: '1px solid #d1d1d1', borderRadius: '8px', background: 'white', cursor: 'pointer', fontSize: '1rem', fontWeight: '500' }}
            >
              Cancel
            </button>
            <button 
              onClick={confirmLogout}
              style={{ flex: 1, padding: '12px', border: 'none', borderRadius: '8px', background: '#000', color: 'white', cursor: 'pointer', fontSize: '1rem', fontWeight: '500' }}
            >
              OK / Logout
            </button>
          </div>
        </div>
      </div>
    )}
    </>
  );
};

export default Navbar;
