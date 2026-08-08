export const USERS_KEY = 'kroos_users';
export const PRODUCTS_KEY = 'kroos_products';
export const CATEGORIES_KEY = 'kroos_categories';
export const ORDERS_KEY = 'kroos_orders';
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

export const initialCategories = [
  {
    "id": "c1",
    "name": "T-Shirts"
  },
  {
    "id": "c2",
    "name": "Polo Shirts"
  },
  {
    "id": "c3",
    "name": "Shirts"
  },
  {
    "id": "c5",
    "name": "Jackets"
  },
  {
    "id": "c7",
    "name": "Trousers"
  }
];

export const initialProducts = [
  {
    "id": "p1",
    "name": "Basic T-Shirt",
    "categoryId": "c1",
    "brand": "LuxeWear",
    "description": "",
    "price": 29,
    "discount": 0,
    "sizes": [
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "colors": [
      "Black",
      "White"
    ],
    "stock": 16,
    "images": [
      "/Images/Basic T-Shirts black.webp",
      "/Images/Basic T-shirts white.jpg"
    ],
    "rating": "5.0",
    "featured": false,
    "createdAt": "2026-08-07T05:37:37.594Z"
  },
  {
    "id": "p2",
    "name": "Premium T-Shirt",
    "categoryId": "c1",
    "brand": "Kroos Premium",
    "description": "",
    "price": 49,
    "discount": 10,
    "sizes": [
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "colors": [
      "Black",
      "White"
    ],
    "stock": 19,
    "images": [
      "/Images/Premium T-Shirts black.jpg",
      "/Images/Premium T-Shirts white.jpg"
    ],
    "rating": "5.0",
    "featured": true,
    "createdAt": "2026-08-07T05:37:37.621Z"
  },
  {
    "id": "p3",
    "name": "Basic Polo",
    "categoryId": "c2",
    "brand": "LuxeWear",
    "description": "",
    "price": 39,
    "discount": 0,
    "sizes": [
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "colors": [
      "Black",
      "White"
    ],
    "stock": 22,
    "images": [
      "/Images/Basic Polo black.webp",
      "/Images/Basic Polo white.webp"
    ],
    "rating": "5.0",
    "featured": false,
    "createdAt": "2026-08-07T05:37:37.621Z"
  },
  {
    "id": "p4",
    "name": "Premium Polo",
    "categoryId": "c2",
    "brand": "Kroos Premium",
    "description": "",
    "price": 65,
    "discount": 10,
    "sizes": [
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "colors": [
      "Black",
      "White"
    ],
    "stock": 16,
    "images": [
      "/Images/Premium_Polo black.webp",
      "/Images/Premium_Polo white.webp"
    ],
    "rating": "5.0",
    "featured": true,
    "createdAt": "2026-08-07T05:37:37.621Z"
  },
  {
    "id": "p5",
    "name": "Basic Shirt",
    "categoryId": "c3",
    "brand": "LuxeWear",
    "description": "",
    "price": 45,
    "discount": 0,
    "sizes": [
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "colors": [
      "Black",
      "White"
    ],
    "stock": 20,
    "images": [
      "/Images/Basic Shirts black.webp",
      "/Images/Basic Shirts white.webp"
    ],
    "rating": "5.0",
    "featured": false,
    "createdAt": "2026-08-07T05:37:37.621Z"
  },
  {
    "id": "p6",
    "name": "Premium Shirt",
    "categoryId": "c3",
    "brand": "Kroos Premium",
    "description": "",
    "price": 75,
    "discount": 10,
    "sizes": [
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "colors": [
      "Black",
      "White"
    ],
    "stock": 41,
    "images": [
      "/Images/Premium Shirts black.webp",
      "/Images/Premium Shirts  white.webp"
    ],
    "rating": "5.0",
    "featured": true,
    "createdAt": "2026-08-07T05:37:37.621Z"
  },
  {
    "id": "p7",
    "name": "Basic Jacket",
    "categoryId": "c5",
    "brand": "LuxeWear",
    "description": "",
    "price": 79,
    "discount": 0,
    "sizes": [
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "colors": [
      "Black",
      "White"
    ],
    "stock": 27,
    "images": [
      "/Images/Basic Jacket black.jpg",
      "/Images/Basic Jacket white.jpg"
    ],
    "rating": "5.0",
    "featured": false,
    "createdAt": "2026-08-07T05:37:37.621Z"
  },
  {
    "id": "p8",
    "name": "Premium Jacket",
    "categoryId": "c5",
    "brand": "Kroos Premium",
    "description": "",
    "price": 129,
    "discount": 10,
    "sizes": [
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "colors": [
      "Black",
      "White"
    ],
    "stock": 25,
    "images": [
      "/Images/Premium Jacket black.jpg",
      "/Images/Premium Jacket white.jpg"
    ],
    "rating": "5.0",
    "featured": true,
    "createdAt": "2026-08-07T05:37:37.621Z"
  },
  {
    "id": "p9",
    "name": "Basic Trousers",
    "categoryId": "c7",
    "brand": "LuxeWear",
    "description": "",
    "price": 55,
    "discount": 0,
    "sizes": [
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "colors": [
      "Black",
      "White"
    ],
    "stock": 44,
    "images": [
      "/Images/Basic Trousers black.webp",
      "/Images/Basic Trousers white.webp"
    ],
    "rating": "5.0",
    "featured": false,
    "createdAt": "2026-08-07T05:37:37.621Z"
  },
  {
    "id": "p10",
    "name": "Premium Trousers",
    "categoryId": "c7",
    "brand": "Kroos Premium",
    "description": "",
    "price": 89,
    "discount": 10,
    "sizes": [
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "colors": [
      "Black",
      "White"
    ],
    "stock": 41,
    "images": [
      "/Images/Premium Trousers black.webp",
      "/Images/Premium Trousers white.webp"
    ],
    "rating": "5.0",
    "featured": true,
    "createdAt": "2026-08-07T05:37:37.621Z"
  }
];

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
  // Carts are now initialized per-user dynamically in CartContext
  if (!localStorage.getItem(WISHLISTS_KEY)) {
    localStorage.setItem(WISHLISTS_KEY, JSON.stringify({}));
  }
};
