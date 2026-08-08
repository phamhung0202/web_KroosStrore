import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import { PRODUCTS_KEY, CATEGORIES_KEY } from '../../../utils/seedData';
import Card from '../../../components/UI/Card/Card';
import Input from '../../../components/UI/Input/Input';
import styles from './Products.module.css';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryQuery = searchParams.get('category') || '';

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(categoryQuery);
  const [sortOption, setSortOption] = useState('newest');

  useEffect(() => {
    const loadedProducts = JSON.parse(localStorage.getItem(PRODUCTS_KEY) || '[]');
    const loadedCategories = JSON.parse(localStorage.getItem(CATEGORIES_KEY) || '[]');
    setProducts(loadedProducts);
    setCategories(loadedCategories);
  }, []);

  useEffect(() => {
    let result = [...products];

    // Filter by search
    if (searchTerm) {
      result = result.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }

    // Filter by category
    if (selectedCategory) {
      result = result.filter(p => p.categoryId === selectedCategory);
    }

    // Sort
    switch (sortOption) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'newest':
      default:
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
    }

    setFilteredProducts(result);
  }, [products, categories, searchTerm, selectedCategory, sortOption]);

  const handleCategoryChange = (e) => {
    const val = e.target.value;
    setSelectedCategory(val);
    if (val) {
      setSearchParams({ category: val });
    } else {
      setSearchParams({});
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>The Collection</h1>
        <p className={styles.subtitle}>Explore our full range of luxury menswear.</p>
      </div>

      <div className={styles.controls}>
        <div className={styles.searchContainer}>
          <Search size={18} className={styles.searchIcon} />
          <input 
            type="text"
            className={styles.premiumInput}
            placeholder="Search Products" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <select 
          className={styles.premiumSelect}
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          <option value="">All Categories</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>

        <select 
          className={styles.premiumSelect}
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="newest">Newest Arrivals</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="name-asc">Name: A to Z</option>
        </select>
      </div>

      {filteredProducts.length > 0 ? (
        <div className={styles.grid}>
          {filteredProducts.map(product => (
            <Card key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className={styles.empty}>
          <p>No products found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default Products;
