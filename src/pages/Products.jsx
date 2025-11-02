// src/pages/Products.jsx
import React, { useEffect, useState } from 'react';
import ProductForm from '../components/ProductForm';
import CategoryForm from '../components/CategoryForm';
import { LS, load, save } from '../utils/storage';

export default function Products() {
  const [categories, setCategories] = useState(() => load(LS.categories, []));
  const [products, setProducts] = useState(() => load(LS.products, []));
  const [logs] = useState(() => load(LS.logs, [])); // not mutated here

  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  useEffect(() => save(LS.categories, categories), [categories]);
  useEffect(() => save(LS.products, products), [products]);

  const uid = (p = '') => p + Math.random().toString(36).slice(2, 9);

  const addOrUpdateProduct = (prod) => {
    if (prod.id) {
      setProducts((prev) => prev.map((p) => (p.id === prod.id ? prod : p)));
    } else {
      prod.id = uid('p-');
      setProducts((prev) => [prod, ...prev]);
    }
    setShowProductModal(false);
    setEditingProduct(null);
  };

  const deleteProduct = (id) => {
    if (!confirm('Delete product?')) return;
    setProducts((prev) => prev.filter((p) => p.id !== id));
    // optionally remove related logs
    const updatedLogs = logs.filter((l) => l.productId !== id);
    save(LS.logs, updatedLogs);
  };

  const addOrUpdateCategory = (cat) => {
    if (cat.id)
      setCategories((prev) => prev.map((c) => (c.id === cat.id ? cat : c)));
    else {
      cat.id = uid('cat-');
      setCategories((prev) => [cat, ...prev]);
    }
    setShowCategoryModal(false);
    setEditingCategory(null);
  };

  const deleteCategory = (id) => {
    if (!confirm('Delete category? Products will keep their category id.'))
      return;
    setCategories((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Products</h2>
        <div className="flex gap-2">
          <button
            onClick={() => {
              setShowCategoryModal(true);
              setEditingCategory(null);
            }}
            className="px-3 py-2 rounded bg-indigo-100"
          >
            Manage Categories
          </button>
          <button
            onClick={() => {
              setShowProductModal(true);
              setEditingProduct(null);
            }}
            className="px-3 py-2 rounded bg-green-600 text-white"
          >
            Add Product
          </button>
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl shadow">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="py-2 text-left">SKU</th>
              <th className="py-2 text-left">Name</th>
              <th className="py-2 text-left">Category</th>
              <th className="py-2 text-left">Stock</th>
              <th className="py-2 text-left">Price</th>
              <th className="py-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-b hover:bg-gray-50">
                <td className="py-2">{p.sku}</td>
                <td className="py-2">{p.name}</td>
                <td className="py-2">
                  {categories.find((c) => c.id === p.categoryId)?.name || '—'}
                </td>
                <td className="py-2 font-semibold">{p.stock}</td>
                <td className="py-2">${Number(p.price || 0).toFixed(2)}</td>
                <td className="py-2">
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setEditingProduct(p);
                        setShowProductModal(true);
                      }}
                      className="px-2 py-1 bg-yellow-100 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteProduct(p.id)}
                      className="px-2 py-1 bg-red-100 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan="6" className="py-4 text-center text-gray-400">
                  No products
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Product Modal */}
      {showProductModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-2xl p-6 rounded-xl shadow">
            <h3 className="text-lg font-semibold mb-3">
              {editingProduct ? 'Edit Product' : 'Add Product'}
            </h3>
            <ProductForm
              categories={categories}
              product={editingProduct}
              onSave={addOrUpdateProduct}
              onCancel={() => setShowProductModal(false)}
            />
          </div>
        </div>
      )}

      {/* Category Modal */}
      {showCategoryModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md p-6 rounded-xl shadow">
            <h3 className="text-lg font-semibold mb-3">
              {editingCategory ? 'Edit Category' : 'Add Category'}
            </h3>
            <CategoryForm
              category={editingCategory}
              onSave={addOrUpdateCategory}
              onCancel={() => setShowCategoryModal(false)}
              onDelete={(id) => deleteCategory(id)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
