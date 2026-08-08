import React, { useState, useEffect } from 'react';
import { Trash2, CheckCircle } from 'lucide-react';
import styles from './Dashboard.module.css';

const AdminContact = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const loaded = JSON.parse(localStorage.getItem('kroos_contact_messages') || '[]');
    setMessages(loaded);
  }, []);

  const markAsRead = (id) => {
    const updated = messages.map(msg => 
      msg.id === id ? { ...msg, status: 'Read' } : msg
    );
    setMessages(updated);
    localStorage.setItem('kroos_contact_messages', JSON.stringify(updated));
  };

  const deleteMessage = (id) => {
    const updated = messages.filter(msg => msg.id !== id);
    setMessages(updated);
    localStorage.setItem('kroos_contact_messages', JSON.stringify(updated));
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Contact Messages</h1>
      </div>

      <div className={styles.section}>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Date</th>
                <th>Name</th>
                <th>Email</th>
                <th>Subject</th>
                <th>Status</th>
                <th className={styles.actionsColumn}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {messages.length > 0 ? messages.map((msg, idx) => (
                <React.Fragment key={msg.id}>
                  <tr className={idx % 2 === 0 ? styles.rowEven : styles.rowOdd}>
                    <td>{new Date(msg.date).toLocaleDateString()}</td>
                    <td className={styles.boldText}>{msg.name}</td>
                    <td>{msg.email}</td>
                    <td>{msg.subject}</td>
                    <td>
                      <span className={`${styles.badge} ${styles[msg.status]}`}>
                        {msg.status}
                      </span>
                    </td>
                    <td className={styles.actions}>
                      {msg.status === 'Unread' && (
                        <button onClick={() => markAsRead(msg.id)} className={styles.iconBtnPrimary} title="Mark as Read">
                          <CheckCircle size={18} />
                        </button>
                      )}
                      <button onClick={() => deleteMessage(msg.id)} className={styles.iconBtnDanger} title="Delete">
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                  <tr className={idx % 2 === 0 ? styles.rowEven : styles.rowOdd}>
                    <td colSpan="6" className={styles.messageContent}>
                      <strong>Message: </strong> {msg.message}
                    </td>
                  </tr>
                </React.Fragment>
              )) : (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', padding: '3rem', color: 'var(--color-dark-gray)' }}>
                    No messages found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminContact;
