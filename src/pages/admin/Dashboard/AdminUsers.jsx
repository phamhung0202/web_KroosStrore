import React, { useState, useEffect } from 'react';
import { Trash2 } from 'lucide-react';
import { USERS_KEY } from '../../../utils/seedData';
import styles from './Dashboard.module.css';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setUsers(JSON.parse(localStorage.getItem(USERS_KEY) || '[]'));
  }, []);

  const handleDelete = (id, role) => {
    if (role === 'Admin') {
      alert('You cannot delete an Administrator account.');
      return;
    }
    if (window.confirm('Are you sure you want to delete this user?')) {
      const updated = users.filter(u => u.id !== id);
      setUsers(updated);
      localStorage.setItem(USERS_KEY, JSON.stringify(updated));
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Manage Users</h1>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>User</th>
              <th>Email</th>
              <th>Role</th>
              <th className={styles.actionsColumn}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => (
              <tr key={user.id} className={idx % 2 === 0 ? styles.rowEven : styles.rowOdd}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                    <img src={user.avatar || 'https://i.pravatar.cc/150'} alt="" style={{ width: '48px', height: '48px', borderRadius: '50%', border: '1px solid var(--color-light-gray)' }} />
                    <span className={styles.boldText}>{user.name}</span>
                  </div>
                </td>
                <td>{user.email}</td>
                <td>
                  <span className={`${styles.badge} ${user.role === 'Admin' ? styles.Completed : styles.Active}`}>
                    {user.role}
                  </span>
                </td>
                <td>
                  <div className={styles.actions}>
                    <button 
                      className={styles.iconBtnDanger}
                      style={{ opacity: user.role === 'Admin' ? 0.3 : 1, cursor: user.role === 'Admin' ? 'not-allowed' : 'pointer' }}
                      onClick={() => handleDelete(user.id, user.role)}
                      disabled={user.role === 'Admin'}
                      title="Delete User"
                    ><Trash2 size={18} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUsers;
