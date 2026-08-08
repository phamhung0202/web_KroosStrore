import React from 'react';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import styles from './Card.module.css';

const Card = ({ 
  product, 
  hoverable = true, 
  bordered = false, 
  shadow = false,
  className = '' 
}) => {
  const classes = [
    styles.card,
    hoverable ? styles.hoverable : '',
    bordered ? styles.bordered : '',
    shadow ? styles.shadow : '',
    className
  ].join(' ').trim();

  const finalPrice = product.discount ? product.price - product.discount : product.price;

  return (
    <Link to={`/products/${product.id}`} className={classes}>
      <div className={styles.imageContainer}>
        {product.discount > 0 && <span className={styles.badge}>SALE</span>}
        <img 
          src={product.images[0]} 
          alt={product.name} 
          className={styles.image} 
          loading="lazy"
        />
      </div>
      <div className={styles.content}>
        {product.brand && <div className={styles.brand}>{product.brand}</div>}
        <h3 className={styles.title}>{product.name}</h3>
        
        <div className={styles.priceContainer}>
          {product.discount > 0 && <span className={styles.originalPrice}>${product.price.toFixed(2)}</span>}
          <span className={styles.price}>${finalPrice.toFixed(2)}</span>
        </div>

        {product.rating && (
          <div className={styles.rating}>
            <Star size={12} fill="var(--color-gold)" color="var(--color-gold)" />
            {product.rating}
          </div>
        )}
      </div>
    </Link>
  );
};

export default Card;
