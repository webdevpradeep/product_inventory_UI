// src/components/ProductForm.jsx
import React, { useEffect, useState } from 'react';

export default function ProductForm({
  categories = [],
  product = null,
  onSave,
  onCancel,
}) {
  const [form, setForm] = useState({
    name: '',
    sku: '',
    categoryId: categories[0]?.id || '',
    stock: 0,
    price: 0,
  });

  useEffect(() => {
    if (product) setForm(product);
    else setForm((f) => ({ ...f, categoryId: categories[0]?.id || '' }));
  }, [product, categories]);

  const submit = (e) => {
    e.preventDefault();
    if (!form.name || !form.sku) return alert('Name and SKU required');
    onSave({
      ...form,
      stock: Number(form.stock || 0),
      price: Number(form.price || 0),
    });
  };

  return (
    <form onSubmit={submit} className="space-y-3">
      <input
        className="w-full border p-2 rounded"
        placeholder="Product name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        required
      />
      <input
        className="w-full border p-2 rounded"
        placeholder="SKU"
        value={form.sku}
        onChange={(e) => setForm({ ...form, sku: e.target.value })}
        required
      />
      <select
        className="w-full border p-2 rounded"
        value={form.categoryId}
        onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
      >
        {categories.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>
      <div className="grid grid-cols-2 gap-2">
        <input
          className="w-full border p-2 rounded"
          type="number"
          placeholder="Stock"
          value={form.stock}
          onChange={(e) => setForm({ ...form, stock: e.target.value })}
        />
        <input
          className="w-full border p-2 rounded"
          type="number"
          step="0.01"
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />
      </div>

      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 rounded bg-gray-200"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 rounded bg-indigo-600 text-white"
        >
          {product ? 'Update' : 'Save'}
        </button>
      </div>
    </form>
  );
}
