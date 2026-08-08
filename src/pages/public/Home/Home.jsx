import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../components/UI/Button/Button';
import { CATEGORIES_KEY } from '../../../utils/seedData';
import { TbShirt, TbJacket } from 'react-icons/tb';
import { GiPoloShirt, GiHoodie, GiTrousers } from 'react-icons/gi';
import { PiPants } from 'react-icons/pi';
import { LuShirt } from 'react-icons/lu';
import styles from './Home.module.css';

const getCategoryIcon = (name) => {
  const iconProps = { size: 36, strokeWidth: 1.2, className: styles.catIconSvg };
  if (name.includes('T-Shirt')) return <TbShirt {...iconProps} />;
  if (name.includes('Polo')) return <GiPoloShirt {...iconProps} />;
  if (name.includes('Shirt')) return <LuShirt {...iconProps} />;
  if (name.includes('Hoodie')) return <GiHoodie {...iconProps} />;
  if (name.includes('Jacket')) return <TbJacket {...iconProps} />;
  if (name.includes('Jean')) return <PiPants {...iconProps} />;
  if (name.includes('Trouser')) return <GiTrousers {...iconProps} />;
  return <TbShirt {...iconProps} />;
};

const Home = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const loadedCategories = JSON.parse(localStorage.getItem(CATEGORIES_KEY) || '[]');
    const filteredCategories = loadedCategories.filter(
      c => c.name !== 'Hoodies' && c.name !== 'Jeans'
    );
    setCategories(filteredCategories);
  }, []);

  return (
    <div className={styles.home}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Kroos Menswear</h1>
          <p className={styles.heroSubtitle}>
            Timeless style crafted for the modern gentleman. Discover premium menswear designed for confidence, comfort, and everyday elegance.
          </p>
          <Link to="/products">
            <Button variant="primary" size="lg" className={styles.heroBtn}>Explore Collection</Button>
          </Link>
        </div>
      </section>

      {/* Shop by Category */}
      <section className={`container ${styles.categorySection}`} style={{ paddingTop: '80px', paddingBottom: '80px' }}>
        <h2 className={styles.sectionTitle}>Categories</h2>
        <div className={styles.categoryGrid}>
          {categories.map(category => (
            <Link to={`/products?category=${category.id}`} key={category.id} className={styles.categoryItem}>
              <div className={styles.iconWrapper}>
                {getCategoryIcon(category.name)}
              </div>
              <span className={styles.categoryName}>{category.name}</span>
            </Link>
          ))}
        </div>
      </section>

    </div>
  );
};

export default Home;
