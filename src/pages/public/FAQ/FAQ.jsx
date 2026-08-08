import React from 'react';
import styles from './FAQ.module.css';

const FAQ = () => {
  return (
    <div className={`container ${styles.container}`}>
      <h1 className={styles.title}>Frequently Asked Questions</h1>
      <p className={styles.subtitle}>Find answers to the most common questions about shopping at Kroos Store.</p>
      
      <div className={styles.faqSection}>
        <h2 className={styles.sectionTitle}>Orders</h2>
        
        <div className={styles.faqItem}>
          <h3 className={styles.question}>How can I place an order?</h3>
          <p className={styles.answer}>Browse our collections, add your favorite products to the cart, and proceed to checkout. Follow the on-screen instructions to complete your purchase.</p>
        </div>
        
        <div className={styles.faqItem}>
          <h3 className={styles.question}>Can I cancel my order?</h3>
          <p className={styles.answer}>Yes. You may cancel your order before it has been processed for shipping. Once shipped, please follow our Return Policy.</p>
        </div>
        
        <div className={styles.faqItem}>
          <h3 className={styles.question}>How can I check my order status?</h3>
          <p className={styles.answer}>Sign in to your account and visit My Orders to view your order history and current status.</p>
        </div>
      </div>
      
      <div className={styles.faqSection}>
        <h2 className={styles.sectionTitle}>Shipping</h2>
        
        <div className={styles.faqItem}>
          <h3 className={styles.question}>How long does delivery take?</h3>
          <p className={styles.answer}>Standard delivery usually takes 3–7 business days, depending on your location.</p>
        </div>
        
        <div className={styles.faqItem}>
          <h3 className={styles.question}>Do you offer international shipping?</h3>
          <p className={styles.answer}>Currently, Kroos Store delivers within Vietnam. International shipping may be available in the future.</p>
        </div>
        
        <div className={styles.faqItem}>
          <h3 className={styles.question}>How much is shipping?</h3>
          <p className={styles.answer}>Shipping fees are calculated during checkout based on your delivery address.</p>
        </div>
      </div>
      
      <div className={styles.faqSection}>
        <h2 className={styles.sectionTitle}>Returns & Exchanges</h2>
        
        <div className={styles.faqItem}>
          <h3 className={styles.question}>Can I return or exchange an item?</h3>
          <p className={styles.answer}>Yes. Products purchased online may be returned or exchanged within 7 days of delivery, while in-store purchases are eligible for exchange only within 7 days of purchase.</p>
          <p className={styles.answer}>To qualify, items must be:</p>
          <ul className={styles.list}>
            <li>unused</li>
            <li>unwashed</li>
            <li>in their original condition</li>
            <li>include all original tags</li>
            <li>include all accessories</li>
            <li>include the original packaging</li>
          </ul>
          <p className={styles.answer}>Please note that clearance items, final-sale products, damaged products, and opened underwear are not eligible for return or exchange.</p>
        </div>
        
        <div className={styles.faqItem}>
          <h3 className={styles.question}>When will I receive my refund?</h3>
          <p className={styles.answer}>Once we receive and inspect your returned item, your refund will be processed within 5–7 business days.</p>
          <p className={styles.answer}>Refunds are issued using the original payment method and apply only to the product value.</p>
          <p className={styles.answer}>Shipping fees and other service charges are non-refundable.</p>
        </div>
      </div>
      
      <div className={styles.faqSection}>
        <h2 className={styles.sectionTitle}>Products</h2>
        
        <div className={styles.faqItem}>
          <h3 className={styles.question}>Are your product images accurate?</h3>
          <p className={styles.answer}>Yes. We strive to display our products as accurately as possible. However, actual colors may vary slightly depending on your screen settings.</p>
        </div>
        
        <div className={styles.faqItem}>
          <h3 className={styles.question}>How do I choose the correct size?</h3>
          <p className={styles.answer}>Each product includes a View Size Guide link beside the size selector.</p>
          <p className={styles.answer}>Click it to view our recommended height and weight chart before choosing your size.</p>
        </div>
        
        <div className={styles.faqItem}>
          <h3 className={styles.question}>Will sold-out products be restocked?</h3>
          <p className={styles.answer}>Some popular items may be restocked, while limited collections may not return.</p>
        </div>
      </div>
      
      <div className={styles.faqSection}>
        <h2 className={styles.sectionTitle}>Payments</h2>
        
        <div className={styles.faqItem}>
          <h3 className={styles.question}>What payment methods do you accept?</h3>
          <p className={styles.answer}>We accept major payment methods supported by the website, including bank transfer and online payment options available during checkout.</p>
        </div>
        
        <div className={styles.faqItem}>
          <h3 className={styles.question}>Is my payment information secure?</h3>
          <p className={styles.answer}>Yes. We use secure technologies to protect your personal and payment information.</p>
        </div>
      </div>
      
      <div className={styles.faqSection}>
        <h2 className={styles.sectionTitle}>Account</h2>
        
        <div className={styles.faqItem}>
          <h3 className={styles.question}>Do I need an account to shop?</h3>
          <p className={styles.answer}>You can browse products without an account, but creating one allows you to:</p>
          <ul className={styles.list}>
            <li>track orders</li>
            <li>save delivery information</li>
            <li>enjoy faster checkout</li>
          </ul>
        </div>
        
        <div className={styles.faqItem}>
          <h3 className={styles.question}>I forgot my password. What should I do?</h3>
          <p className={styles.answer}>Use the Forgot Password option on the Sign In page to reset your password.</p>
        </div>
      </div>
      
      <div className={styles.faqSection}>
        <h2 className={styles.sectionTitle}>Contact</h2>
        
        <div className={styles.faqItem}>
          <h3 className={styles.question}>How can I contact Kroos Store?</h3>
          <p className={styles.answer}>If you need assistance, feel free to reach us through:</p>
          <ul className={styles.list}>
            <li>Email: tonikroos08@gmail.com</li>
            <li>Phone: 0988738556</li>
            <li>Business Hours: Monday – Friday, 9:00 AM – 6:00 PM</li>
          </ul>
          <p className={styles.answer}>Our support team is always happy to help with any questions regarding products, orders, or your shopping experience.</p>
        </div>
      </div>
      
      <div className={styles.supportBox}>
        <h3>Still need help?</h3>
        <p>If you can't find the answer you're looking for, please visit our Contact page.</p>
        <p>Our team will be happy to assist you as quickly as possible.</p>
      </div>
    </div>
  );
};

export default FAQ;
