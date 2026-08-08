import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ShoppingBag, Heart, Star, ArrowLeft, Ruler } from 'lucide-react';
import { PRODUCTS_KEY, CATEGORIES_KEY, WISHLISTS_KEY } from '../../../utils/seedData';
import { useCart } from '../../../contexts/CartContext';
import { useAuth } from '../../../contexts/AuthContext';
import Button from '../../../components/UI/Button/Button';
import Modal from '../../../components/UI/Modal/Modal';
import styles from './ProductDetails.module.css';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { user } = useAuth();
  
  const [product, setProduct] = useState(null);
  const [category, setCategory] = useState(null);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [adding, setAdding] = useState(false);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');

  useEffect(() => {
    const products = JSON.parse(localStorage.getItem(PRODUCTS_KEY) || '[]');
    const foundProduct = products.find(p => p.id === id);
    if (foundProduct) {
      setProduct(foundProduct);
      if (foundProduct.sizes && foundProduct.sizes.length > 0) setSelectedSize(foundProduct.sizes[0]);
      if (foundProduct.colors && foundProduct.colors.length > 0) setSelectedColor(foundProduct.colors[0]);
      
      const categories = JSON.parse(localStorage.getItem(CATEGORIES_KEY) || '[]');
      setCategory(categories.find(c => c.id === foundProduct.categoryId));
      
      // Check wishlist
      if (user) {
        const wishlists = JSON.parse(localStorage.getItem(WISHLISTS_KEY) || '{}');
        const userWishlist = wishlists[user.id] || [];
        setIsWishlisted(userWishlist.includes(id));
      }
    }
  }, [id, user]);

  const handleAddToCart = () => {
    setAdding(true);
    // In a real app we'd save selected size and color in the cart item
    addToCart(product.id, selectedSize, selectedColor, 1);
    setTimeout(() => {
      setAdding(false);
    }, 500);
  };

  const handleToggleWishlist = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    const wishlists = JSON.parse(localStorage.getItem(WISHLISTS_KEY) || '{}');
    const userWishlist = wishlists[user.id] || [];
    
    if (isWishlisted) {
      wishlists[user.id] = userWishlist.filter(pId => pId !== product.id);
    } else {
      wishlists[user.id] = [...userWishlist, product.id];
    }
    
    localStorage.setItem(WISHLISTS_KEY, JSON.stringify(wishlists));
    setIsWishlisted(!isWishlisted);
  };

  if (!product) {
    return <div className={styles.notFound}>Product not found</div>;
  }

  const finalPrice = product.discount ? product.price - product.discount : product.price;

  return (
    <div className={styles.container}>
      <Link to="/products" className={styles.backLink}>
        <ArrowLeft size={18} />
        Back to Shop
      </Link>
      <div className={styles.grid}>
        <div className={styles.imageGallery}>
          <img 
            src={
              selectedColor 
                ? (product.images.find(img => img.toLowerCase().includes(selectedColor.toLowerCase())) || product.images[0]) 
                : product.images[0]
            } 
            alt={product.name} 
            className={styles.mainImage} 
          />
        </div>
        
        <div className={styles.info}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <span className={styles.category}>{category?.name || 'Uncategorized'} &bull; {product.brand}</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--color-gold)', fontWeight: 600 }}>
                <Star size={16} fill="var(--color-gold)" /> {product.rating}
              </span>
            </div>
            <h1 className={styles.title}>{product.name}</h1>
          </div>
          
          <div className={styles.priceContainer}>
            {product.discount > 0 && (
              <span className={styles.originalPrice}>${product.price.toFixed(2)}</span>
            )}
            <span className={styles.price}>${finalPrice.toFixed(2)}</span>
          </div>
          
          {/* Sizes */}
          {product.sizes && product.sizes.length > 0 && (
            <div className={styles.variantSection}>
              <div className={styles.variantLabel}>Size</div>
              <div className={styles.variantOptions}>
                {product.sizes.map(size => (
                  <button 
                    key={size}
                    className={`${styles.variantBtn} ${selectedSize === size ? styles.selected : ''}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
              <button className={styles.sizeGuideLink} onClick={() => setShowSizeGuide(true)}>
                <Ruler size={14} /> View Size Guide
              </button>
            </div>
          )}

          {/* Colors */}
          {product.colors && product.colors.length > 0 && (
            <div className={styles.variantSection}>
              <div className={styles.variantLabel}>Color</div>
              <div className={styles.variantOptions}>
                {product.colors.map(color => (
                  <button 
                    key={color}
                    className={`${styles.variantBtn} ${selectedColor === color ? styles.selected : ''}`}
                    onClick={() => setSelectedColor(color)}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          <div className={styles.stock}>
            {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
          </div>
          
          <div className={styles.actions}>
            <Button 
              variant="primary" 
              size="lg" 
              icon={ShoppingBag}
              fullWidth
              disabled={product.stock === 0}
              onClick={handleAddToCart}
            >
              {adding ? 'Added to Cart' : 'Add to Cart'}
            </Button>
            
            <Button 
              variant={isWishlisted ? "gold" : "secondary"} 
              size="lg" 
              icon={Heart}
              onClick={handleToggleWishlist}
              style={{ width: 'auto', padding: '0 1.5rem' }}
            />
          </div>
        </div>
      </div>
      
      <Modal
        isOpen={showSizeGuide}
        title="Kroos Size Guide"
        message={
          <table className={styles.sizeTable}>
            <thead>
              <tr>
                <th>Size</th>
                <th>Height</th>
                <th>Weight</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>M</td><td>1.60m – 1.73m</td><td>55–65 kg</td></tr>
              <tr><td>L</td><td>1.60m – 1.80m</td><td>65–75 kg</td></tr>
              <tr><td>XL</td><td>1.65m – 1.85m</td><td>75–82 kg</td></tr>
              <tr><td>XXL</td><td>1.65m – 1.88m</td><td>82–88 kg</td></tr>
            </tbody>
          </table>
        }
        type="alert"
        onConfirm={() => setShowSizeGuide(false)}
      />
    </div>
  );
};

export default ProductDetails;
