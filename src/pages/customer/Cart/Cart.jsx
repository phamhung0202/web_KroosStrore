import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Minus, Plus, Trash2, CheckCircle } from 'lucide-react';
import { useCart } from '../../../contexts/CartContext';
import { useAuth } from '../../../contexts/AuthContext';
import { ORDERS_KEY } from '../../../utils/seedData';
import Button from '../../../components/UI/Button/Button';
import CheckoutModal from '../../../components/Checkout/CheckoutModal';
import styles from './Cart.module.css';

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, getSubtotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [showCheckout, setShowCheckout] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const subtotal = getSubtotal();
  const shipping = subtotal > 0 ? 15.00 : 0;
  const total = subtotal + shipping;

  const handleProceedCheckout = () => {
    if (!user) {
      setShowLoginModal(true);
      return;
    }
    setShowCheckout(true);
  };

  const handleCheckoutSuccess = (formData, paymentMethod) => {
    const orders = JSON.parse(localStorage.getItem(ORDERS_KEY) || '[]');
    const newOrder = {
      id: `ORD-${Date.now()}`,
      userId: user.id,
      items: [...cartItems],
      total: total,
      status: 'Processing',
      date: new Date().toISOString(),
      customer: formData,
      paymentMethod: paymentMethod
    };
    
    localStorage.setItem(ORDERS_KEY, JSON.stringify([...orders, newOrder]));
    clearCart();
    setShowCheckout(false);
    setShowSuccess(true);
  };

  const handleCloseSuccess = () => {
    setShowSuccess(false);
    navigate('/products');
  };

  if (cartItems.length === 0 && !showSuccess) {
    return (
      <div className={styles.container}>
        <div className={styles.emptyState}>
          <h2>Your Cart is Empty</h2>
          <p style={{ marginBottom: '2rem', color: 'var(--color-dark-gray)' }}>
            Looks like you haven't added anything to your cart yet.
          </p>
          <Link to="/products">
            <Button variant="primary">Start Shopping</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {!showSuccess && <h1 className={styles.title}>Shopping Cart</h1>}

      {!showSuccess ? (
        <div className={styles.grid}>
          <div className={styles.cartItems}>
            {cartItems.map((item) => (
              <div key={item.cartItemId} className={styles.cartItem}>
                <Link to={`/products/${item.productId}`}>
                  <img 
                    src={item.color ? (item.product.images.find(img => img.toLowerCase().includes(item.color.toLowerCase())) || item.product.images[0]) : item.product.images[0]} 
                    alt={item.product.name} 
                    className={styles.itemImage} 
                  />
                </Link>
                
                <div className={styles.itemDetails}>
                  <Link to={`/products/${item.productId}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <h3 className={styles.itemName}>{item.product.name}</h3>
                  </Link>
                  <div style={{ color: 'var(--color-dark-gray)', fontSize: '0.9rem', marginBottom: '8px' }}>
                    Size: {item.size} | Color: {item.color}
                  </div>
                  <div className={styles.itemPrice}>${item.product.price.toFixed(2)}</div>
                  
                  <div className={styles.itemActions}>
                    <div className={styles.quantityControl}>
                      <button 
                        className={styles.qtyBtn}
                        onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                      >
                        <Minus size={14} />
                      </button>
                      <span className={styles.qtyValue}>{item.quantity}</span>
                      <button 
                        className={styles.qtyBtn}
                        onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                        disabled={item.quantity >= item.product.stock}
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    
                    <button 
                      className={styles.removeBtn}
                      onClick={() => removeFromCart(item.cartItemId)}
                    >
                      <Trash2 size={16} />
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.summary}>
            <h2 className={styles.summaryTitle}>Order Summary</h2>
            
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
            
            <Button 
              variant="gold" 
              fullWidth 
              size="lg" 
              onClick={handleProceedCheckout}
            >
              Proceed to Checkout
            </Button>
            
            {!user && (
              <p style={{ textAlign: 'center', fontSize: '0.85rem', marginTop: '1rem', color: 'var(--color-dark-gray)' }}>
                You will be redirected to login before checkout.
              </p>
            )}
          </div>
        </div>
      ) : (
        <div className={styles.emptyState} style={{ marginTop: '40px' }}>
          {/* Fallback empty state space if needed, modal covers it anyway */}
        </div>
      )}

      <CheckoutModal 
        isOpen={showCheckout} 
        onClose={() => setShowCheckout(false)} 
        cartItems={cartItems}
        subtotal={subtotal}
        shipping={shipping}
        total={total}
        onSuccess={handleCheckoutSuccess}
      />

      {showSuccess && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal} style={{ maxWidth: '480px' }}>
            <div className={styles.modalIcon}>
              <CheckCircle size={56} color="var(--color-black)" strokeWidth={1.5} />
            </div>
            <h2 className={styles.modalTitle}>Kroos Store</h2>
            <p style={{ fontSize: '1.2rem', fontWeight: '500', marginBottom: '8px' }}>Order placed successfully!</p>
            <p style={{ color: 'var(--color-dark-gray)', marginBottom: '32px' }}>Thank you for shopping with Kroos.</p>
            <Button variant="primary" fullWidth size="lg" onClick={handleCloseSuccess}>
              Continue Shopping
            </Button>
          </div>
        </div>
      )}

      {showLoginModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal} style={{ maxWidth: '480px', textAlign: 'center' }}>
            <h2 className={styles.modalTitle}>Login Required</h2>
            <p style={{ color: 'var(--color-dark-gray)', marginBottom: '32px', fontSize: '1.1rem' }}>
              You need to sign in before placing an order.
            </p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
              <Button variant="outline" fullWidth onClick={() => setShowLoginModal(false)}>
                Cancel
              </Button>
              <Button variant="primary" fullWidth onClick={() => navigate('/login?redirect=/cart')}>
                Sign In
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
