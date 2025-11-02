import React from 'react';
import { NavLink } from 'react-router';

export default function Sidebar() {
  const links = [
    { to: '/', label: 'Dashboard' },
    { to: '/products', label: 'Products' },
    { to: '/entries-exits', label: 'Entries & Exits' },
    { to: '/history', label: 'History' },
  ];

  return (
    <aside className="w-64 bg-white p-4 border-r">
      <div className="mb-6">
        <div className="font-bold text-xl text-indigo-600">PI</div>
        <div className="text-sm text-gray-500">Product Inventory</div>
      </div>

      <nav className="flex flex-col gap-2">
        {links.map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            className={({ isActive }) =>
              `px-3 py-2 rounded ${
                isActive ? 'bg-indigo-100 text-indigo-700' : 'hover:bg-gray-100'
              }`
            }
            end
          >
            {l.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
