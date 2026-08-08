import React, { useState, useEffect } from 'react';
import { ORDERS_KEY } from '../../../utils/seedData';
import Button from '../../../components/UI/Button/Button';
import styles from './Dashboard.module.css';
import { X, Printer } from 'lucide-react';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  useEffect(() => {
    const loadedOrders = JSON.parse(localStorage.getItem(ORDERS_KEY) || '[]');
    setOrders(loadedOrders.sort((a, b) => new Date(b.date) - new Date(a.date)));
  }, []);

  const updateStatus = (id, newStatus) => {
    const updated = orders.map(order => 
      order.id === id ? { ...order, status: newStatus } : order
    );
    setOrders(updated);
    localStorage.setItem(ORDERS_KEY, JSON.stringify(updated));
    if (selectedOrder && selectedOrder.id === id) {
      setSelectedOrder({ ...selectedOrder, status: newStatus });
    }
  };

  const openDetails = (order) => {
    setSelectedOrder(order);
    setIsDetailsOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeDetails = () => {
    setIsDetailsOpen(false);
    document.body.style.overflow = 'unset';
  };

  const printInvoice = () => {
    window.print();
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Manage Orders</h1>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Date</th>
              <th>Customer ID</th>
              <th>Total</th>
              <th className={styles.centerAlign}>Details</th>
              <th>Status</th>
              <th>Update Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, idx) => (
              <tr key={order.id} className={idx % 2 === 0 ? styles.rowEven : styles.rowOdd}>
                <td className={styles.boldText}>{order.id}</td>
                <td>{new Date(order.date).toLocaleDateString()}</td>
                <td style={{ fontSize: '0.85rem', color: 'var(--color-dark-gray)' }}>
                  {order.customer?.fullName || order.userId}
                </td>
                <td className={styles.boldText}>${order.total.toFixed(2)}</td>
                <td className={styles.centerAlign}>
                  <Button variant="outline" size="sm" onClick={() => openDetails(order)}>
                    View Details
                  </Button>
                </td>
                <td>
                  <span className={`${styles.badge} ${styles[order.status]}`}>
                    {order.status}
                  </span>
                </td>
                <td>
                  <select 
                    value={order.status}
                    onChange={(e) => updateStatus(order.id, e.target.value)}
                    style={{ 
                      padding: '6px 12px', 
                      borderRadius: 'var(--border-radius-sm)', 
                      border: '1px solid var(--color-medium-gray)',
                      backgroundColor: 'var(--color-white)',
                      cursor: 'pointer',
                      color: 'var(--color-black)'
                    }}
                  >
                    <option value="Processing">Processing</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isDetailsOpen && selectedOrder && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal} style={{ maxWidth: '1080px', width: '95%' }}>
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>Order Details</h2>
              <button className={styles.closeBtn} onClick={closeDetails}>
                <X size={24} />
              </button>
            </div>

            <div className={styles.detailsGrid}>
              <div className={styles.detailsCol}>
                <h3 className={styles.detailsSectionTitle}>Customer Information</h3>
                <div className={styles.detailRow}>
                  <div className={styles.detailLabel}>Full Name:</div>
                  <div className={styles.detailValue}>{selectedOrder.customer?.fullName || 'N/A'}</div>
                </div>
                <div className={styles.detailRow}>
                  <div className={styles.detailLabel}>Phone Number:</div>
                  <div className={styles.detailValue}>{selectedOrder.customer?.phone || 'N/A'}</div>
                </div>
                <div className={styles.detailRow}>
                  <div className={styles.detailLabel}>Email:</div>
                  <div className={styles.detailValue}>{selectedOrder.customer?.email || 'N/A'}</div>
                </div>
                <div className={styles.detailRow}>
                  <div className={styles.detailLabel}>Province / City:</div>
                  <div className={styles.detailValue}>{selectedOrder.customer?.province || 'N/A'}</div>
                </div>
                <div className={styles.detailRow}>
                  <div className={styles.detailLabel}>District:</div>
                  <div className={styles.detailValue}>{selectedOrder.customer?.district || 'N/A'}</div>
                </div>
                <div className={styles.detailRow}>
                  <div className={styles.detailLabel}>Ward:</div>
                  <div className={styles.detailValue}>{selectedOrder.customer?.ward || 'N/A'}</div>
                </div>
                <div className={styles.detailRow}>
                  <div className={styles.detailLabel}>Street Address:</div>
                  <div className={styles.detailValue}>{selectedOrder.customer?.street || 'N/A'}</div>
                </div>
                <div className={styles.detailRow}>
                  <div className={styles.detailLabel}>Payment Method:</div>
                  <div className={styles.detailValue}>
                    {selectedOrder.paymentMethod === 'bank' ? 'Bank Transfer' : 'Cash on Delivery'}
                  </div>
                </div>
                <div className={styles.detailRow}>
                  <div className={styles.detailLabel}>Order Date:</div>
                  <div className={styles.detailValue}>{new Date(selectedOrder.date).toLocaleString()}</div>
                </div>
                <div className={styles.detailRow}>
                  <div className={styles.detailLabel}>Order Status:</div>
                  <div className={styles.detailValue}>
                    <span className={`${styles.badge} ${styles[selectedOrder.status]}`}>
                      {selectedOrder.status}
                    </span>
                  </div>
                </div>
              </div>

              <div className={styles.detailsCol}>
                <h3 className={styles.detailsSectionTitle}>Ordered Products</h3>
                <div style={{ maxHeight: '250px', overflowY: 'auto', paddingRight: '8px' }}>
                  {selectedOrder.items.map(item => (
                    <div key={item.productId} className={styles.orderProductItem}>
                      <div className={styles.orderProductName}>{item.product.name}</div>
                      <div className={styles.orderProductMeta}>
                        Size: {item.product.sizes[0]} | Color: {item.product.colors[0]} | Quantity: {item.quantity}
                      </div>
                      <div className={styles.orderProductMath}>
                        ${item.product.price.toFixed(2)} × {item.quantity} = ${(item.product.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>

                <div className={styles.orderSummaryBox}>
                  <div className={styles.summaryFlex}>
                    <span>Subtotal</span>
                    <span>${(selectedOrder.total - (selectedOrder.total > 0 ? 15 : 0)).toFixed(2)}</span>
                  </div>
                  <div className={styles.summaryFlex}>
                    <span>Shipping</span>
                    <span>${selectedOrder.total > 0 ? '15.00' : '0.00'}</span>
                  </div>
                  <div className={styles.summaryTotalRow}>
                    <span>Total</span>
                    <span>${selectedOrder.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.modalActions}>
              <Button variant="outline" onClick={closeDetails}>Close</Button>
              <Button variant="primary" onClick={printInvoice}>
                <Printer size={18} style={{ marginRight: '8px', display: 'inline-block', verticalAlign: 'middle' }} />
                Print Invoice
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
