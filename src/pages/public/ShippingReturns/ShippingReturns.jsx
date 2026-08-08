import React from 'react';
import { RefreshCcw, AlertTriangle, CheckCircle, XCircle, FileText, MapPin } from 'lucide-react';
import styles from './ShippingReturns.module.css';

const ShippingReturns = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Shipping & Returns</h1>
        <p className={styles.subtitle}>
          Everything you need to know about our return, exchange, and shipping policies at Kroos Store.
        </p>
      </div>

      <div className={styles.content}>
        
        {/* Exchange & Return Period */}
        <section className={styles.card}>
          <div className={styles.cardHeader}>
            <div className={styles.iconWrapper}>
              <RefreshCcw size={20} />
            </div>
            <h2 className={styles.cardTitle}>Exchange & Return Period</h2>
          </div>
          <div className={styles.cardBody}>
            <h4>Orders purchased in-store</h4>
            <ul>
              <li>Exchanges only.</li>
              <li>Within 7 days from the purchase date.</li>
            </ul>

            <h4>Online Orders</h4>
            <ul>
              <li>Exchanges and returns accepted.</li>
              <li>Within 7 days from the delivery date.</li>
            </ul>
          </div>
        </section>

        {/* Manufacturer Defects */}
        <section className={styles.card}>
          <div className={styles.cardHeader}>
            <div className={styles.iconWrapper}>
              <AlertTriangle size={20} />
            </div>
            <h2 className={styles.cardTitle}>Manufacturer Defects</h2>
          </div>
          <div className={styles.cardBody}>
            <p>If a product has a manufacturing defect, customers may exchange or request a refund within 30 days from the purchase date.</p>
            <ul>
              <li>The original invoice is required.</li>
              <li>Refunds apply only to the product value.</li>
              <li>Shipping fees and packaging costs are non-refundable.</li>
            </ul>
            <p>Kroos Store reserves the right to inspect the product before approving any refund or exchange.</p>
          </div>
        </section>

        {/* Conditions for Exchange & Return */}
        <section className={styles.card}>
          <div className={styles.cardHeader}>
            <div className={styles.iconWrapper}>
              <CheckCircle size={20} />
            </div>
            <h2 className={styles.cardTitle}>Conditions for Exchange & Return</h2>
          </div>
          <div className={styles.cardBody}>
            <h4>Products must:</h4>
            <ul>
              <li>Be unused.</li>
              <li>Be unwashed.</li>
              <li>Have original tags attached.</li>
              <li>Include all accessories.</li>
              <li>Be in original packaging.</li>
              <li>Show no stains, odors, or damage.</li>
            </ul>
          </div>
        </section>

        {/* Products Not Eligible */}
        <section className={styles.card}>
          <div className={styles.cardHeader}>
            <div className={styles.iconWrapper}>
              <XCircle size={20} />
            </div>
            <h2 className={styles.cardTitle}>Products Not Eligible</h2>
          </div>
          <div className={styles.cardBody}>
            <h4>The following cannot be exchanged or returned:</h4>
            <ul>
              <li>Used products.</li>
              <li>Washed products.</li>
              <li>Altered products.</li>
              <li>Damaged by customers.</li>
              <li>Products missing tags or accessories.</li>
              <li>Underwear after packaging has been opened.</li>
              <li>Clearance or final-sale items.</li>
            </ul>
          </div>
        </section>

        {/* Required Documents */}
        <section className={styles.card}>
          <div className={styles.cardHeader}>
            <div className={styles.iconWrapper}>
              <FileText size={20} />
            </div>
            <h2 className={styles.cardTitle}>Required Documents</h2>
          </div>
          <div className={styles.cardBody}>
            <h4>Customers should provide:</h4>
            <ul>
              <li>Original purchase invoice.</li>
              <li>Order confirmation (for online purchases).</li>
              <li>Product in original condition.</li>
              <li>Original packaging and accessories.</li>
            </ul>
          </div>
        </section>

        {/* Exchange & Return Locations */}
        <section className={styles.card}>
          <div className={styles.cardHeader}>
            <div className={styles.iconWrapper}>
              <MapPin size={20} />
            </div>
            <h2 className={styles.cardTitle}>Exchange & Return Locations</h2>
          </div>
          <div className={styles.cardBody}>
            <h4>In-store Purchases</h4>
            <p>Exchanges can be made at any Kroos Store.<br />Refunds are not available for products purchased directly in-store.</p>

            <h4>Online Purchases</h4>
            <p>Products may be:</p>
            <ul>
              <li>Exchanged at any Kroos Store.</li>
              <li>Returned by shipping to the Kroos Returns Center.</li>
            </ul>

            <div style={{ marginTop: '2rem', padding: '1.5rem', backgroundColor: 'var(--color-light-gray)', borderRadius: 'var(--border-radius-sm)' }}>
              <h4 style={{ marginTop: 0 }}>Kroos Returns Center</h4>
              <p style={{ marginBottom: '1rem' }}>
                08 Pham Hung, District 1<br />
                Ho Chi Minh City, Vietnam
              </p>
              
              <h4>Business Hours:</h4>
              <p style={{ marginBottom: '1rem' }}>Monday – Friday<br />9:00 AM – 6:00 PM</p>
              
              <h4>Contact:</h4>
              <p style={{ marginBottom: 0 }}>Phone: 0988 738 556<br />Email: tonikroos08@gmail.com</p>
            </div>
          </div>
        </section>

        {/* Additional Notes */}
        <div style={{ textAlign: 'center', marginTop: '1rem', color: 'var(--color-dark-gray)', fontSize: '0.9rem' }}>
          <p style={{ marginBottom: '0.5rem' }}>Kroos Store reserves the right to make the final decision regarding all exchange and return requests.</p>
          <p>This policy may be updated without prior notice.</p>
        </div>

      </div>
    </div>
  );
};

export default ShippingReturns;
