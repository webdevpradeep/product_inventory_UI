import React from 'react';
import { Outlet, useNavigate } from 'react-router';
import Sidebar from './Sidebar';

export default function Layout() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('pi:user'));

  const logout = () => {
    localStorage.removeItem('pi:user');
    navigate('/login', { replace: true });
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      <Sidebar />
      <div className="flex-1 p-6">
        <header className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Inventory App</h1>
            <p className="text-sm text-gray-500">
              Manage products, stock & history
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-700">
              Hello, <strong>{user?.name || user?.email}</strong>
            </div>
            <button
              onClick={logout}
              className="px-3 py-2 bg-red-100 text-red-700 rounded"
            >
              Logout
            </button>
          </div>
        </header>

        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
