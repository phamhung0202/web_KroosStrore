const fs = require('fs');

const file = fs.readFileSync('src/utils/seedData.js', 'utf8');

const initialCategories = [
  { id: 'c1', name: 'T-Shirts' },
  { id: 'c2', name: 'Polo Shirts' },
  { id: 'c3', name: 'Shirts' },
  { id: 'c5', name: 'Jackets' },
  { id: 'c7', name: 'Trousers' },
  { id: 'c8', name: 'Shorts' }
];

const tiers = ['Basic', 'Classic', 'Premium'];
const brands = ['LuxeWear', 'Urban Denim', 'Kroos Premium'];
let initialProducts = [];
let pId = 1;

initialCategories.forEach(c => {
  tiers.forEach((tier, idx) => {
    let categoryName = c.name;
    if (categoryName === 'T-Shirts') categoryName = 'T-Shirt';
    else if (categoryName === 'Polo Shirts') categoryName = 'Polo';
    else if (categoryName === 'Shirts') categoryName = 'Shirt';
    else if (categoryName === 'Jackets') categoryName = 'Jacket';
    
    initialProducts.push({
      id: 'p' + (pId++),
      name: tier + ' ' + categoryName,
      categoryId: c.id,
      brand: brands[idx],
      description: 'Premium quality ' + c.name.toLowerCase() + ' made from the finest materials. Perfect for any occasion.',
      price: Math.floor(Math.random() * 100) + 20,
      discount: idx === 2 ? 10 : 0,
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['Black', 'White'],
      stock: Math.floor(Math.random() * 40) + 10,
      images: ['https://images.unsplash.com/photo-1516826957135-700ede19c6e4?auto=format&fit=crop&q=80&w=800'],
      rating: (Math.random() * 2 + 3).toFixed(1),
      featured: idx === 2,
      createdAt: new Date().toISOString()
    });
  });
});

const newProductsStr = 'export const initialProducts = ' + JSON.stringify(initialProducts, null, 2) + ';';

const startIdx = file.indexOf('export const initialProducts =');
const endIdx = file.indexOf('export const seedDatabase =');
if (startIdx !== -1 && endIdx !== -1) {
  const newFile = file.slice(0, startIdx) + newProductsStr + '\n\n' + file.slice(endIdx);
  fs.writeFileSync('src/utils/seedData.js', newFile);
  console.log('Successfully updated seedData.js');
} else {
  console.log('Failed to find indices');
}
