import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { ORDERS_KEY } from '../../../utils/seedData';
import Input from '../../../components/UI/Input/Input';
import Button from '../../../components/UI/Button/Button';
import styles from './Profile.module.css';

const Profile = () => {
  const { user, updateProfile, changePassword } = useAuth();
  const [activeTab, setActiveTab] = useState('orders');
  const [orders, setOrders] = useState([]);

  // Profile Form
  const [name, setName] = useState(user?.name || '');
  const [avatar, setAvatar] = useState(user?.avatar || '');
  const [profileMsg, setProfileMsg] = useState('');

  // Password Form
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMsg, setPasswordMsg] = useState({ type: '', text: '' });

  useEffect(() => {
    if (user) {
      const allOrders = JSON.parse(localStorage.getItem(ORDERS_KEY) || '[]');
      const userOrders = allOrders.filter(o => o.userId === user.id);
      userOrders.sort((a, b) => new Date(b.date) - new Date(a.date));
      setOrders(userOrders);
    }
  }, [user]);

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    const success = updateProfile({ name, avatar });
    if (success) {
      setProfileMsg('Profile updated successfully.');
      setTimeout(() => setProfileMsg(''), 3000);
    }
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    setPasswordMsg({ type: '', text: '' });

    if (newPassword !== confirmPassword) {
      setPasswordMsg({ type: 'error', text: 'New passwords do not match.' });
      return;
    }

    if (newPassword.length < 6) {
      setPasswordMsg({ type: 'error', text: 'Password must be at least 6 characters.' });
      return;
    }

    const success = changePassword(oldPassword, newPassword);
    if (success) {
      setPasswordMsg({ type: 'success', text: 'Password changed successfully.' });
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } else {
      setPasswordMsg({ type: 'error', text: 'Incorrect current password.' });
    }
  };

  if (!user) return null;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <img src={user.avatar || 'https://i.pravatar.cc/150'} alt={user.name} className={styles.avatar} />
        <div className={styles.userInfo}>
          <h1>{user.name}</h1>
          <p>{user.email} &bull; {user.role}</p>
        </div>
      </div>

      <div className={styles.tabs}>
        <button 
          className={`${styles.tab} ${activeTab === 'orders' ? styles.active : ''}`}
          onClick={() => setActiveTab('orders')}
        >
          Order History
        </button>
        <button 
          className={`${styles.tab} ${activeTab === 'settings' ? styles.active : ''}`}
          onClick={() => setActiveTab('settings')}
        >
          Account Settings
        </button>
        <button 
          className={`${styles.tab} ${activeTab === 'security' ? styles.active : ''}`}
          onClick={() => setActiveTab('security')}
        >
          Security
        </button>
      </div>

      <div className={styles.content}>
        {activeTab === 'orders' && (
          <div className={styles.section}>
            <h2>Recent Orders</h2>
            {orders.length === 0 ? (
              <p style={{ marginTop: '1rem', color: 'var(--color-dark-gray)' }}>You haven't placed any orders yet.</p>
            ) : (
              <div className={styles.orderList} style={{ marginTop: '1.5rem' }}>
                {orders.map(order => (
                  <div key={order.id} className={styles.orderCard}>
                    <div className={styles.orderHeader}>
                      <div>
                        <div className={styles.orderId}>{order.id}</div>
                        <div className={styles.orderDate}>{new Date(order.date).toLocaleDateString()}</div>
                      </div>
                      <div className={`${styles.orderStatus} ${styles[order.status]}`}>
                        {order.status}
                      </div>
                    </div>
                    <div className={styles.orderItems}>
                      {order.items.map(item => (
                        <div key={item.productId} className={styles.orderItem}>
                          <span>{item.quantity}x {item.product.name}</span>
                          <span>${(item.product.price * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                    <div className={styles.orderTotal}>
                      <span>Total</span>
                      <span>${order.total.toFixed(2)}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'settings' && (
          <div className={styles.section}>
            <h2>Profile Information</h2>
            <p style={{ marginBottom: '1.5rem', color: 'var(--color-dark-gray)' }}>Update your account details below.</p>
            
            {profileMsg && <div className={`${styles.message} ${styles.success}`}>{profileMsg}</div>}
            
            <form className={styles.form} onSubmit={handleUpdateProfile}>
              <Input 
                label="Email Address" 
                value={user.email} 
                disabled 
                title="Email cannot be changed"
              />
              <Input 
                label="Full Name" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                required 
              />
              <Input 
                label="Avatar URL" 
                value={avatar} 
                onChange={(e) => setAvatar(e.target.value)} 
              />
              <Button type="submit" variant="primary" style={{ marginTop: '1rem' }}>
                Save Changes
              </Button>
            </form>
          </div>
        )}

        {activeTab === 'security' && (
          <div className={styles.section}>
            <h2>Change Password</h2>
            <p style={{ marginBottom: '1.5rem', color: 'var(--color-dark-gray)' }}>Ensure your account is using a long, random password to stay secure.</p>
            
            {passwordMsg.text && (
              <div className={`${styles.message} ${styles[passwordMsg.type]}`}>{passwordMsg.text}</div>
            )}
            
            <form className={styles.form} onSubmit={handleChangePassword}>
              <Input 
                label="Current Password" 
                type="password"
                value={oldPassword} 
                onChange={(e) => setOldPassword(e.target.value)} 
                required 
              />
              <Input 
                label="New Password" 
                type="password"
                value={newPassword} 
                onChange={(e) => setNewPassword(e.target.value)} 
                required 
              />
              <Input 
                label="Confirm New Password" 
                type="password"
                value={confirmPassword} 
                onChange={(e) => setConfirmPassword(e.target.value)} 
                required 
              />
              <Button type="submit" variant="primary" style={{ marginTop: '1rem' }}>
                Update Password
              </Button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
