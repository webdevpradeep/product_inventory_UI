// src/pages/History.jsx
import React, { useState } from 'react';
import { load, LS } from '../utils/storage';

export default function History() {
  const [logs] = useState(() => load(LS.logs, []));
  const [products] = useState(() => load(LS.products, []));
  const [filterType, setFilterType] = useState('all');

  const filtered = logs.filter((l) =>
    filterType === 'all' ? true : l.type === filterType
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">History</h2>
        <div className="flex gap-2 items-center">
          <label className="text-sm text-gray-600">Filter</label>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="all">All</option>
            <option value="in">Entries</option>
            <option value="out">Exits</option>
          </select>
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl shadow">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b text-gray-600">
              <th className="py-2 text-left">Date</th>
              <th className="py-2 text-left">Product</th>
              <th className="py-2 text-left">Type</th>
              <th className="py-2 text-left">Qty</th>
              <th className="py-2 text-left">Note</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((l) => (
              <tr key={l.id} className="border-b hover:bg-gray-50">
                <td className="py-2">{new Date(l.date).toLocaleString()}</td>
                <td className="py-2">
                  {products.find((p) => p.id === l.productId)?.name || '—'}
                </td>
                <td
                  className={`py-2 font-semibold ${
                    l.type === 'in' ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {l.type.toUpperCase()}
                </td>
                <td className="py-2">{l.qty}</td>
                <td className="py-2">{l.note}</td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan="5" className="py-6 text-center text-gray-400">
                  No history
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
