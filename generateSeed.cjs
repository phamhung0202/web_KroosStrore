const fs = require('fs');

const categories = [
  { id: 'c1', name: 'T-Shirts', slug: 't-shirts', description: 'Essential men\'s t-shirts' },
  { id: 'c2', name: 'Polo Shirts', slug: 'polo-shirts', description: 'Classic and modern polo shirts' },
  { id: 'c3', name: 'Shirts', slug: 'shirts', description: 'Casual and dress shirts' },
  { id: 'c4', name: 'Hoodies', slug: 'hoodies', description: 'Comfortable hoodies' },
  { id: 'c5', name: 'Jackets', slug: 'jackets', description: 'Outerwear and jackets' },
  { id: 'c6', name: 'Jeans', slug: 'jeans', description: 'Denim jeans for men' },
  { id: 'c7', name: 'Trousers', slug: 'trousers', description: 'Chinos and dress trousers' },
  { id: 'c8', name: 'Shorts', slug: 'shorts', description: 'Casual shorts for summer' }
];

const brands = ['Kroos Basics', 'LuxeWear', 'Urban Denim', 'Kroos Premium', 'ActiveMan'];
const colors = ['Black', 'White', 'Navy', 'Gray', 'Olive', 'Beige'];
const sizes = ['S', 'M', 'L', 'XL'];

const generateProducts = () => {
  const products = [];
  let pId = 1;

  for (const cat of categories) {
    for (let i = 1; i <= 3; i++) {
      products.push({
        id: `p${pId++}`,
        name: `Men's ${brands[i%brands.length]} ${cat.name} - Model ${i}`,
        categoryId: cat.id,
        brand: brands[i%brands.length],
        description: `Premium quality ${cat.name.toLowerCase()} made from the finest materials. Perfect for any occasion.`,
        price: Math.floor(Math.random() * 150) + 20,
        discount: Math.random() > 0.7 ? Math.floor(Math.random() * 20) + 5 : 0,
        sizes: sizes,
        colors: [colors[Math.floor(Math.random() * colors.length)], colors[Math.floor(Math.random() * colors.length)]],
        stock: Math.floor(Math.random() * 50) + 10,
        images: [`https://images.unsplash.com/photo-1516826957135-700ede19c6e4?auto=format&fit=crop&q=80&w=800`], // Generic clothing image
        rating: (Math.random() * 2 + 3).toFixed(1), // 3.0 to 5.0
        featured: Math.random() > 0.8,
        createdAt: new Date().toISOString()
      });
    }
  }
  return products;
};

const output = `export const USERS_KEY = 'kroos_users';
export const PRODUCTS_KEY = 'kroos_products';
export const CATEGORIES_KEY = 'kroos_categories';
export const ORDERS_KEY = 'kroos_orders';
export const CARTS_KEY = 'kroos_carts';
export const WISHLISTS_KEY = 'kroos_wishlists';
export const AUTH_SESSION_KEY = 'kroos_auth_session';

export const initialUsers = [
  {
    id: '1',
    name: 'Administrator',
    email: 'admin@kroos.com',
    password: '123456',
    role: 'Admin',
    avatar: 'https://i.pravatar.cc/150?u=admin'
  },
  {
    id: '2',
    name: 'Customer',
    email: 'user@kroos.com',
    password: '123456',
    role: 'Customer',
    avatar: 'https://i.pravatar.cc/150?u=user'
  }
];

export const initialCategories = ${JSON.stringify(categories, null, 2)};

export const initialProducts = ${JSON.stringify(generateProducts(), null, 2)};

export const seedDatabase = () => {
  // Always override products and categories to ensure the new dataset is loaded
  localStorage.setItem(CATEGORIES_KEY, JSON.stringify(initialCategories));
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(initialProducts));
  
  if (!localStorage.getItem(USERS_KEY)) {
    localStorage.setItem(USERS_KEY, JSON.stringify(initialUsers));
  }
  if (!localStorage.getItem(ORDERS_KEY)) {
    localStorage.setItem(ORDERS_KEY, JSON.stringify([]));
  }
  if (!localStorage.getItem(CARTS_KEY)) {
    localStorage.setItem(CARTS_KEY, JSON.stringify({}));
  }
  if (!localStorage.getItem(WISHLISTS_KEY)) {
    localStorage.setItem(WISHLISTS_KEY, JSON.stringify({}));
  }
};
`;

fs.writeFileSync('src/utils/seedData.js', output);
console.log('Generated seedData.js');
