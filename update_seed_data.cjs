const fs = require('fs');

const file = fs.readFileSync('src/utils/seedData.js', 'utf8');

const initialCategories = [
  { id: 'c1', name: 'T-Shirts' },
  { id: 'c2', name: 'Polo Shirts' },
  { id: 'c3', name: 'Shirts' },
  { id: 'c5', name: 'Jackets' },
  { id: 'c7', name: 'Trousers' }
];

const tiers = ['Basic', 'Premium'];
const brands = ['LuxeWear', 'Kroos Premium'];
let initialProducts = [];
let pId = 1;

initialCategories.forEach(c => {
  tiers.forEach((tier, idx) => {
    let categoryName = c.name;
    if (categoryName === 'T-Shirts') categoryName = 'T-Shirt';
    else if (categoryName === 'Polo Shirts') categoryName = 'Polo';
    else if (categoryName === 'Shirts') categoryName = 'Shirt';
    else if (categoryName === 'Jackets') categoryName = 'Jacket';
    else if (categoryName === 'Trousers') categoryName = 'Trousers';
    
    initialProducts.push({
      id: 'p' + (pId++),
      name: tier + ' ' + categoryName,
      categoryId: c.id,
      brand: brands[idx],
      description: '', 
      price: Math.floor(Math.random() * 100) + 20,
      discount: idx === 1 ? 10 : 0,
      sizes: ['M', 'L', 'XL', 'XXL'], 
      colors: ['Black', 'White'],
      stock: Math.floor(Math.random() * 40) + 10,
      images: ['https://images.unsplash.com/photo-1516826957135-700ede19c6e4?auto=format&fit=crop&q=80&w=800'],
      rating: "5.0", 
      featured: idx === 1,
      createdAt: new Date().toISOString()
    });
  });
});

const newCategoriesStr = 'export const initialCategories = ' + JSON.stringify(initialCategories, null, 2) + ';';
const newProductsStr = 'export const initialProducts = ' + JSON.stringify(initialProducts, null, 2) + ';';

const catStartIdx = file.indexOf('export const initialCategories =');
const catEndIdx = file.indexOf('export const initialProducts =');
const prodEndIdx = file.indexOf('export const seedDatabase =');

if (catStartIdx !== -1 && catEndIdx !== -1 && prodEndIdx !== -1) {
  const newFile = file.slice(0, catStartIdx) + newCategoriesStr + '\n\n' + newProductsStr + '\n\n' + file.slice(prodEndIdx);
  fs.writeFileSync('src/utils/seedData.js', newFile);
  console.log('Successfully updated seedData.js with exactly 10 products and 5 categories.');
} else {
  console.log('Failed to find indices');
}
