// src/utils/storage.js
export const LS = {
  user: 'pi:user',
  categories: 'pi:categories',
  products: 'pi:products',
  logs: 'pi:logs',
};

export const sampleCategories = [
  { id: 'cat-1', name: 'Electronics' },
  { id: 'cat-2', name: 'Stationery' },
  { id: 'cat-3', name: 'Groceries' },
];

export const sampleProducts = [
  {
    id: 'p-1',
    name: 'Wireless Mouse',
    sku: 'WM-001',
    categoryId: 'cat-1',
    stock: 48,
    price: 12.99,
  },
  {
    id: 'p-2',
    name: 'Notebook A5',
    sku: 'NB-005',
    categoryId: 'cat-2',
    stock: 120,
    price: 2.5,
  },
  {
    id: 'p-3',
    name: 'Olive Oil 1L',
    sku: 'OO-100',
    categoryId: 'cat-3',
    stock: 20,
    price: 9.99,
  },
];

export const sampleLogs = [
  {
    id: 'l-1',
    productId: 'p-1',
    type: 'in',
    qty: 50,
    note: 'Initial stock',
    date: Date.now() - 1000 * 60 * 60 * 24 * 10,
  },
  {
    id: 'l-2',
    productId: 'p-1',
    type: 'out',
    qty: 2,
    note: 'Sold',
    date: Date.now() - 1000 * 60 * 60 * 24 * 4,
  },
];

export const load = (key, fallback) => {
  const raw = localStorage.getItem(key);
  return raw ? JSON.parse(raw) : fallback;
};

export const save = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};
