import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X } from 'lucide-react';
import { PRODUCTS_KEY, CATEGORIES_KEY } from '../../../utils/seedData';
import Modal from '../../../components/UI/Modal/Modal';
import Button from '../../../components/UI/Button/Button';
import styles from './Dashboard.module.css'; // Reusing dashboard table styles for consistency

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  
  const [productToDelete, setProductToDelete] = useState(null);
  
  const [formData, setFormData] = useState({
    name: '',
    categoryId: '',
    price: '',
    stock: '',
    status: 'Active',
    image: ''
  });

  useEffect(() => {
    setProducts(JSON.parse(localStorage.getItem(PRODUCTS_KEY) || '[]'));
    setCategories(JSON.parse(localStorage.getItem(CATEGORIES_KEY) || '[]'));
  }, []);

  const confirmDelete = (id) => {
    setProductToDelete(id);
  };

  const executeDelete = () => {
    if (productToDelete) {
      const updated = products.filter(p => p.id !== productToDelete);
      setProducts(updated);
      localStorage.setItem(PRODUCTS_KEY, JSON.stringify(updated));
      setProductToDelete(null);
    }
  };

  const cancelDelete = () => {
    setProductToDelete(null);
  };

  const handleOpenModal = (product = null) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        name: product.name,
        categoryId: product.categoryId,
        price: product.price,
        stock: product.stock,
        status: product.stock > 0 ? 'Active' : 'Inactive',
        image: product.images && product.images.length > 0 ? product.images[0] : ''
      });
    } else {
      setEditingProduct(null);
      setFormData({
        name: '',
        categoryId: categories.length > 0 ? categories[0].id : '',
        price: '',
        stock: '',
        status: 'Active',
        image: ''
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  const handleSave = () => {
    let updatedProducts;
    
    // Convert stock based on status if stock is 0 but status is Active, set stock to at least 1?
    // Let's just use what they entered.
    let finalStock = parseInt(formData.stock) || 0;
    if (formData.status === 'Inactive') finalStock = 0;
    else if (finalStock === 0 && formData.status === 'Active') finalStock = 10; // Default active stock
    
    const productData = {
      name: formData.name,
      categoryId: formData.categoryId,
      price: parseFloat(formData.price) || 0,
      stock: finalStock,
      images: [formData.image || 'https://images.unsplash.com/photo-1516826957135-700ede19c6e4?auto=format&fit=crop&q=80&w=800'],
      brand: 'Kroos Store',
      description: 'A premium product from Kroos Store.',
      sizes: ['M', 'L', 'XL', 'XXL'],
      colors: ['Black', 'White'],
      discount: 0,
      rating: "5.0",
      featured: false,
      createdAt: new Date().toISOString()
    };

    if (editingProduct) {
      updatedProducts = products.map(p => 
        p.id === editingProduct.id 
          ? { ...p, ...productData, images: [formData.image || p.images[0]] } 
          : p
      );
    } else {
      const newProduct = {
        ...productData,
        id: `p${Date.now()}`
      };
      updatedProducts = [...products, newProduct];
    }
    
    setProducts(updatedProducts);
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(updatedProducts));
    handleCloseModal();
  };

  return (
    <div className={styles.container}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 className={styles.title} style={{ marginBottom: 0 }}>Manage Products</h1>
        <Button variant="primary" icon={Plus} onClick={() => handleOpenModal()}>Add Product</Button>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Product Details</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Status</th>
              <th className={styles.actionsColumn}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, idx) => (
              <tr key={product.id} className={idx % 2 === 0 ? styles.rowEven : styles.rowOdd}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                    <img src={product.images[0]} alt="" style={{ width: '56px', height: '64px', objectFit: 'cover', borderRadius: '4px', border: '1px solid var(--color-light-gray)' }} />
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span className={styles.boldText}>{product.name}</span>
                      <span style={{ fontSize: '0.8rem', color: 'var(--color-dark-gray)' }}>{product.brand}</span>
                    </div>
                  </div>
                </td>
                <td className={styles.boldText}>${product.price.toFixed(2)}</td>
                <td>{product.stock} units</td>
                <td>
                  <span className={`${styles.badge} ${product.stock > 0 ? styles.Active : styles.Inactive}`}>
                    {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                  </span>
                </td>
                <td>
                  <div className={styles.actions}>
                    <button className={styles.iconBtnPrimary} title="Edit Product" onClick={() => handleOpenModal(product)}>
                      <Edit2 size={18} />
                    </button>
                    <button 
                      className={styles.iconBtnDanger}
                      onClick={() => confirmDelete(product.id)}
                      title="Delete Product"
                    ><Trash2 size={18} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>{editingProduct ? 'Edit Product' : 'Add Product'}</h2>
              <button className={styles.closeBtn} onClick={handleCloseModal}><X size={24} /></button>
            </div>
            
            <div className={styles.formGroup}>
              <label>Product Name</label>
              <input 
                type="text" 
                className={styles.input} 
                value={formData.name} 
                onChange={(e) => setFormData({...formData, name: e.target.value})} 
                placeholder="e.g. Basic T-Shirt"
              />
            </div>
            
            <div className={styles.formGroup}>
              <label>Category</label>
              <select 
                className={styles.select} 
                value={formData.categoryId} 
                onChange={(e) => setFormData({...formData, categoryId: e.target.value})}
              >
                {categories.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className={styles.formGroup}>
                <label>Price ($)</label>
                <input 
                  type="number" 
                  className={styles.input} 
                  value={formData.price} 
                  onChange={(e) => setFormData({...formData, price: e.target.value})} 
                  placeholder="0.00"
                />
              </div>
              
              <div className={styles.formGroup}>
                <label>Stock</label>
                <input 
                  type="number" 
                  className={styles.input} 
                  value={formData.stock} 
                  onChange={(e) => setFormData({...formData, stock: e.target.value})} 
                  placeholder="0"
                />
              </div>
            </div>
            
            <div className={styles.formGroup}>
              <label>Status</label>
              <select 
                className={styles.select} 
                value={formData.status} 
                onChange={(e) => setFormData({...formData, status: e.target.value})}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
            
            <div className={styles.formGroup}>
              <label>Image URL</label>
              <input 
                type="text" 
                className={styles.input} 
                value={formData.image} 
                onChange={(e) => setFormData({...formData, image: e.target.value})} 
                placeholder="https://..."
              />
            </div>
            
            <div className={styles.modalActions}>
              <Button variant="secondary" onClick={handleCloseModal}>Cancel</Button>
              <Button variant="gold" onClick={handleSave}>Save Product</Button>
            </div>
          </div>
        </div>
      )}
      <Modal 
        isOpen={!!productToDelete}
        title="Kroos Store"
        message="Are you sure you want to delete this product?"
        type="confirm"
        onConfirm={executeDelete}
        onCancel={cancelDelete}
      />
    </div>
  );
};

export default AdminProducts;
