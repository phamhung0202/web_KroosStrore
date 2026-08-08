import React, { useEffect, useState } from 'react';
import { Package, Users, ShoppingBag, DollarSign } from 'lucide-react';
import { PRODUCTS_KEY, USERS_KEY, ORDERS_KEY, CATEGORIES_KEY } from '../../../utils/seedData';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import Button from '../../../components/UI/Button/Button';
import styles from './Dashboard.module.css';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalUsers: 0,
    totalOrders: 0,
  });
  
  const [categoryData, setCategoryData] = useState([]);
  
  // Date filters
  const [fromDate, setFromDate] = useState('2026-01-01');
  const [toDate, setToDate] = useState('2026-08-07');
  
  const [filteredRevenue, setFilteredRevenue] = useState(0);

  const calculateRevenue = (ordersList, startStr, endStr) => {
    const start = new Date(startStr);
    const end = new Date(endStr);
    end.setHours(23, 59, 59, 999);

    const productsStr = localStorage.getItem('kroos_products');
    const categoriesStr = localStorage.getItem('kroos_categories');
    
    // Only proceed if we have valid local storage data
    if (!productsStr || !categoriesStr) return;
    
    const products = JSON.parse(productsStr);
    const categories = JSON.parse(categoriesStr);

    let rev = 0;
    const categorySales = {};
    
    categories.forEach(c => {
      categorySales[c.id] = { name: c.name, sales: 0 };
    });

    ordersList.forEach(order => {
      const orderDate = new Date(order.date || order.createdAt || new Date());
      if (orderDate >= start && orderDate <= end) {
        rev += order.total;
        
        if (order.items) {
          order.items.forEach(item => {
            const product = products.find(p => p.id === item.productId);
            if (product && categorySales[product.categoryId]) {
              categorySales[product.categoryId].sales += (product.price * item.quantity);
            }
          });
        }
      }
    });

    setFilteredRevenue(rev);
    
    const formattedChartData = Object.values(categorySales)
      .filter(cat => cat.sales >= 0) // Ensure we format all categories appropriately
      .map(cat => ({
        name: cat.name,
        sales: parseFloat(cat.sales.toFixed(2))
      }));
      
    setCategoryData(formattedChartData);
  };

  useEffect(() => {
    const products = JSON.parse(localStorage.getItem(PRODUCTS_KEY) || '[]');
    const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
    const orders = JSON.parse(localStorage.getItem(ORDERS_KEY) || '[]');

    setStats({
      totalProducts: products.length,
      totalUsers: users.length,
      totalOrders: orders.length,
    });
    
    // Initial calculate
    calculateRevenue(orders, fromDate, toDate);
  }, []);

  const handleApply = () => {
    const orders = JSON.parse(localStorage.getItem(ORDERS_KEY) || '[]');
    calculateRevenue(orders, fromDate, toDate);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Dashboard Overview</h1>

      <div className={styles.grid}>
        <div className={styles.statCard}>
          <div className={styles.statIcon}><Package size={24} /></div>
          <div>
            <div className={styles.statLabel}>Total Products</div>
            <div className={styles.statValue}>{stats.totalProducts}</div>
          </div>
        </div>
        
        <div className={styles.statCard}>
          <div className={styles.statIcon}><Users size={24} /></div>
          <div>
            <div className={styles.statLabel}>Total Users</div>
            <div className={styles.statValue}>{stats.totalUsers}</div>
          </div>
        </div>
        
        <div className={styles.statCard}>
          <div className={styles.statIcon}><ShoppingBag size={24} /></div>
          <div>
            <div className={styles.statLabel}>Total Orders</div>
            <div className={styles.statValue}>{stats.totalOrders}</div>
          </div>
        </div>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Revenue Overview</h2>
        
        <div className={styles.filterRow}>
          <div className={styles.filterGroup}>
            <span className={styles.filterLabel}>From:</span>
            <input 
              type="date" 
              className={styles.filterInput}
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
            />
          </div>
          <div className={styles.filterGroup}>
            <span className={styles.filterLabel}>To:</span>
            <input 
              type="date" 
              className={styles.filterInput}
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
            />
          </div>
          <Button variant="primary" onClick={handleApply}>Apply</Button>
        </div>

        <div className={styles.revenueDisplay}>
          <div className={styles.revenueLabel}>Revenue</div>
          <div className={styles.largeRevenue}>
            <DollarSign size={32} />
            {filteredRevenue.toFixed(2)}
          </div>
        </div>
      </div>



      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Sales by Category</h2>
        <div className={styles.chartWrapper} style={{ position: 'relative' }}>
          {filteredRevenue === 0 && (
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 10, color: 'var(--color-dark-gray)', textAlign: 'center' }}>
              <p>No sales found for the selected date range.</p>
            </div>
          )}
          <ResponsiveContainer width="100%" height={400} style={{ opacity: filteredRevenue === 0 ? 0.3 : 1, transition: 'opacity 0.3s ease' }}>
            <BarChart data={categoryData} margin={{ top: 20, right: 30, left: 20, bottom: 50 }}>
              <XAxis dataKey="name" stroke="#777777" tick={{ fill: '#777777', fontSize: 12 }} angle={-45} textAnchor="end" />
              <YAxis stroke="#777777" tick={{ fill: '#777777', fontSize: 12 }} />
              <Tooltip 
                cursor={{ fill: '#F5F1EB' }}
                contentStyle={{ backgroundColor: '#FFFFFF', borderRadius: '8px', border: '1px solid #EBEBEB', boxShadow: '0 4px 16px rgba(0, 0, 0, 0.06)' }} 
              />
              <Bar dataKey="sales" fill="#C8A96A" radius={[4, 4, 0, 0]} animationDuration={800} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
