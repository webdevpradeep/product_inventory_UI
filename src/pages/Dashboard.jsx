// src/pages/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import {
  load,
  save,
  LS,
  sampleCategories,
  sampleProducts,
  sampleLogs,
} from '../utils/storage';

export default function Dashboard() {
  const [categories, setCategories] = useState(() =>
    load(LS.categories, sampleCategories)
  );
  const [products, setProducts] = useState(() =>
    load(LS.products, sampleProducts)
  );
  const [logs, setLogs] = useState(() => load(LS.logs, sampleLogs));

  useEffect(() => save(LS.categories, categories), [categories]);
  useEffect(() => save(LS.products, products), [products]);
  useEffect(() => save(LS.logs, logs), [logs]);

  const totalStock = products.reduce((s, p) => s + Number(p.stock || 0), 0);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl shadow">
          <div className="text-sm text-gray-500">Total Products</div>
          <div className="text-2xl font-bold">{products.length}</div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow">
          <div className="text-sm text-gray-500">Total Stock</div>
          <div className="text-2xl font-bold">{totalStock}</div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow">
          <div className="text-sm text-gray-500">Total Categories</div>
          <div className="text-2xl font-bold">{categories.length}</div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl shadow">
        <h3 className="font-semibold mb-2">Recent Movements</h3>
        <div className="text-sm text-gray-600">
          {logs.slice(0, 8).map((l) => (
            <div
              key={l.id}
              className="py-2 border-b last:border-b-0 flex justify-between"
            >
              <div>
                <div className="font-medium">
                  {products.find((p) => p.id === l.productId)?.name || '—'}
                </div>
                <div className="text-xs text-gray-500">
                  {new Date(l.date).toLocaleString()}
                </div>
              </div>
              <div
                className={`font-semibold ${
                  l.type === 'in' ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {l.type.toUpperCase()} {l.qty}
              </div>
            </div>
          ))}
          {logs.length === 0 && (
            <div className="text-gray-400 italic py-3">No movements yet</div>
          )}
        </div>
      </div>
    </div>
  );
}
