import React from 'react';
import { Link } from 'react-router-dom';
import { Globe, MessageCircle, Share2 } from 'lucide-react';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={`container`}>
        <div className={styles.grid}>
          <div className={styles.brand}>
            <Link to="/" className={styles.logo}>
              Kroos
            </Link>
            <p className={styles.desc}>
              Premium men's fashion designed for everyday confidence and timeless style.
            </p>
          </div>

          <div className={styles.column}>
            <h4>Support</h4>
            <ul className={styles.links}>
              <li><Link to="/contact">Contact Us</Link></li>
              <li><Link to="/faq">FAQs</Link></li>
              <li><Link to="/shipping-returns">Shipping & Returns</Link></li>
            </ul>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>Kroos Store</p>
          <div className={styles.socials}>
            <span className={styles.disabledIcon} aria-label="Social"><Share2 size={20} /></span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
