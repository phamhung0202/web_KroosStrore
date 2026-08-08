import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import Button from '../UI/Button/Button';
import { useAuth } from '../../contexts/AuthContext';
import styles from './CheckoutModal.module.css';

const CheckoutModal = ({ isOpen, onClose, cartItems, subtotal, shipping, total, onSuccess }) => {
  const { user } = useAuth();

  const [formData, setFormData] = useState(() => {
    if (user) {
      const saved = localStorage.getItem(`kroos_checkout_info_${user.id}`);
      if (saved) return JSON.parse(saved);
    }
    return {
      fullName: '',
      phone: '',
      email: '',
      province: '',
      district: '',
      ward: '',
      street: '',
      notes: ''
    };
  });
  
  const [errors, setErrors] = useState({});
  const [paymentMethod, setPaymentMethod] = useState('cod');

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error on change
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.province.trim()) newErrors.province = 'Province / City is required';
    if (!formData.district.trim()) newErrors.district = 'District is required';
    if (!formData.ward.trim()) newErrors.ward = 'Ward is required';
    if (!formData.street.trim()) newErrors.street = 'Street Address is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      if (user) {
        localStorage.setItem(`kroos_checkout_info_${user.id}`, JSON.stringify(formData));
      }
      onSuccess(formData, paymentMethod);
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2 className={styles.title}>Checkout</h2>
          <button className={styles.closeBtn} onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <div className={styles.content}>
          {/* Left Column: Form */}
          <div className={styles.leftColumn}>
            <h3 className={styles.sectionTitle}>Customer Information</h3>
            <div className={styles.formGrid}>
              <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                <label>Full Name <span className={styles.required}>*</span></label>
                <input 
                  type="text" 
                  name="fullName"
                  value={formData.fullName} 
                  onChange={handleChange}
                  className={`${styles.input} ${errors.fullName ? styles.inputError : ''}`} 
                  placeholder="John Doe"
                />
                {errors.fullName && <span className={styles.errorText}>{errors.fullName}</span>}
              </div>

              <div className={styles.formGroup}>
                <label>Phone Number <span className={styles.required}>*</span></label>
                <input 
                  type="tel" 
                  name="phone"
                  value={formData.phone} 
                  onChange={handleChange}
                  className={`${styles.input} ${errors.phone ? styles.inputError : ''}`} 
                  placeholder="+84 988..."
                />
                {errors.phone && <span className={styles.errorText}>{errors.phone}</span>}
              </div>

              <div className={styles.formGroup}>
                <label>Email Address</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email} 
                  onChange={handleChange}
                  className={styles.input} 
                  placeholder="john@example.com"
                />
              </div>

              <div className={styles.formGroup}>
                <label>Province / City <span className={styles.required}>*</span></label>
                <input 
                  type="text" 
                  name="province"
                  value={formData.province} 
                  onChange={handleChange}
                  className={`${styles.input} ${errors.province ? styles.inputError : ''}`} 
                  placeholder="Ho Chi Minh City"
                />
                {errors.province && <span className={styles.errorText}>{errors.province}</span>}
              </div>

              <div className={styles.formGroup}>
                <label>District <span className={styles.required}>*</span></label>
                <input 
                  type="text" 
                  name="district"
                  value={formData.district} 
                  onChange={handleChange}
                  className={`${styles.input} ${errors.district ? styles.inputError : ''}`} 
                  placeholder="District 1"
                />
                {errors.district && <span className={styles.errorText}>{errors.district}</span>}
              </div>

              <div className={styles.formGroup}>
                <label>Ward <span className={styles.required}>*</span></label>
                <input 
                  type="text" 
                  name="ward"
                  value={formData.ward} 
                  onChange={handleChange}
                  className={`${styles.input} ${errors.ward ? styles.inputError : ''}`} 
                  placeholder="Ben Nghe Ward"
                />
                {errors.ward && <span className={styles.errorText}>{errors.ward}</span>}
              </div>

              <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                <label>Street Address <span className={styles.required}>*</span></label>
                <input 
                  type="text" 
                  name="street"
                  value={formData.street} 
                  onChange={handleChange}
                  className={`${styles.input} ${errors.street ? styles.inputError : ''}`} 
                  placeholder="123 Le Loi Street, Apt 4B"
                />
                {errors.street && <span className={styles.errorText}>{errors.street}</span>}
              </div>

              <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                <label>Additional Notes (optional)</label>
                <textarea 
                  name="notes"
                  value={formData.notes} 
                  onChange={handleChange}
                  className={styles.textarea} 
                  placeholder="Delivery instructions..."
                />
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary */}
          <div className={styles.rightColumn}>
            <h3 className={styles.sectionTitle}>Order Summary</h3>
            
            <div className={styles.itemList}>
              {cartItems.map((item) => (
                <div key={item.cartItemId} className={styles.item}>
                  <div className={styles.itemName}>{item.product.name}</div>
                  <div className={styles.itemMeta}>Size: {item.size} | Color: {item.color} | Qty: {item.quantity}</div>
                  <div className={styles.itemMath}>${item.product.price.toFixed(2)} × {item.quantity} = ${(item.product.price * item.quantity).toFixed(2)}</div>
                </div>
              ))}
            </div>

            <div className={styles.paymentSummary}>
              <div className={styles.summaryRow}>
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className={styles.summaryRow}>
                <span>Shipping</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              <div className={styles.summaryTotal}>
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <h3 className={styles.sectionTitle} style={{ fontSize: '1.1rem' }}>Payment Method</h3>
            <div className={styles.paymentMethod}>
              <label className={styles.radioLabel}>
                <input 
                  type="radio" 
                  name="payment" 
                  value="cod" 
                  checked={paymentMethod === 'cod'} 
                  onChange={(e) => setPaymentMethod(e.target.value)} 
                />
                Cash on Delivery
              </label>
              <label className={styles.radioLabel}>
                <input 
                  type="radio" 
                  name="payment" 
                  value="bank" 
                  checked={paymentMethod === 'bank'} 
                  onChange={(e) => setPaymentMethod(e.target.value)} 
                />
                Bank Transfer
              </label>
            </div>

            <div className={styles.buttonWrapper}>
              <Button variant="gold" fullWidth size="lg" onClick={handleSubmit}>
                Place Order
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;
