// src/pages/EntriesExits.jsx
import React, { useEffect, useState } from 'react';
import { load, save, LS } from '../utils/storage';

export default function EntriesExits() {
  const [categories] = useState(() => load(LS.categories, []));
  const [products, setProducts] = useState(() => load(LS.products, []));
  const [logs, setLogs] = useState(() => load(LS.logs, []));

  const [selected, setSelected] = useState(null);
  const [mode, setMode] = useState('in'); // 'in' or 'out'
  const [qty, setQty] = useState('');
  const [note, setNote] = useState('');

  useEffect(() => save(LS.products, products), [products]);
  useEffect(() => save(LS.logs, logs), [logs]);

  const uid = (p = '') => p + Math.random().toString(36).slice(2, 9);

  const openFor = (product, m) => {
    setSelected(product);
    setMode(m);
    setQty('');
    setNote('');
  };

  const submit = () => {
    const qn = Number(qty);
    if (!selected) return alert('Select product');
    if (!qn || qn <= 0) return alert('Enter valid qty');
    const p = selected;
    const newStock = mode === 'in' ? p.stock + qn : p.stock - qn;
    if (newStock < 0) return alert('Not enough stock');

    setProducts((prev) =>
      prev.map((x) => (x.id === p.id ? { ...x, stock: newStock } : x))
    );
    const newLog = {
      id: uid('l-'),
      productId: p.id,
      type: mode,
      qty: qn,
      note: note || (mode === 'in' ? 'Stock in' : 'Stock out'),
      date: Date.now(),
    };
    setLogs((prev) => [newLog, ...prev]);
    setSelected(null);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Entries & Exits</h2>

      <div className="bg-white p-4 rounded-xl shadow">
        <table className="w-full">
          <thead>
            <tr className="border-b text-gray-600">
              <th className="py-2 text-left">SKU</th>
              <th className="py-2 text-left">Name</th>
              <th className="py-2 text-left">Category</th>
              <th className="py-2 text-left">Stock</th>
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
                <td className="py-2 space-x-2">
                  <button
                    onClick={() => openFor(p, 'in')}
                    className="px-3 py-1 bg-green-100 text-green-700 rounded"
                  >
                    Entry +
                  </button>
                  <button
                    onClick={() => openFor(p, 'out')}
                    className="px-3 py-1 bg-red-100 text-red-700 rounded"
                  >
                    Exit −
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white max-w-md w-full p-6 rounded-xl shadow">
            <h3 className="text-lg font-semibold mb-3">
              {mode === 'in' ? 'Add Entry' : 'Add Exit'} — {selected.name}
            </h3>
            <input
              type="number"
              value={qty}
              onChange={(e) => setQty(e.target.value)}
              placeholder="Quantity"
              className="w-full border p-2 rounded mb-2"
            />
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Note (optional)"
              className="w-full border p-2 rounded mb-3"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setSelected(null)}
                className="px-3 py-2 bg-gray-200 rounded"
              >
                Cancel
              </button>
              <button
                onClick={submit}
                className="px-3 py-2 bg-indigo-600 text-white rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
