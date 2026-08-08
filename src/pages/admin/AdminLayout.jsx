import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { LayoutDashboard, Package, Users, ShoppingBag, Mail } from 'lucide-react';
import styles from './AdminLayout.module.css';

const AdminLayout = () => {
  return (
    <div className={styles.layout}>
      <aside className={styles.sidebar}>
        <nav className={styles.nav}>
          <NavLink 
            to="/admin" 
            end
            className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}
          >
            <LayoutDashboard size={20} />
            Dashboard
          </NavLink>
          <NavLink 
            to="/admin/products" 
            className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}
          >
            <Package size={20} />
            Products
          </NavLink>
          <NavLink 
            to="/admin/orders" 
            className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}
          >
            <ShoppingBag size={20} />
            Orders
          </NavLink>
          <NavLink 
            to="/admin/users" 
            className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}
          >
            <Users size={20} />
            Users
          </NavLink>
          <NavLink 
            to="/admin/messages" 
            className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}
          >
            <Mail size={20} />
            Contact Messages
          </NavLink>
        </nav>
      </aside>
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
