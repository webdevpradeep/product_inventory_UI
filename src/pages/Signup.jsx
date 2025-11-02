// src/pages/Signup.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router';

export default function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = (e) => {
    e.preventDefault();
    if (!name || !email || !password) return alert('Fill all fields');
    const user = { name, email, password };
    localStorage.setItem('pi:user', JSON.stringify(user)); // simple persistence
    // also initialize sample data if not present
    if (!localStorage.getItem('pi:categories')) {
      localStorage.setItem(
        'pi:categories',
        JSON.stringify([
          { id: 'cat-1', name: 'Electronics' },
          { id: 'cat-2', name: 'Stationery' },
        ])
      );
    }
    if (!localStorage.getItem('pi:products')) {
      localStorage.setItem('pi:products', JSON.stringify([]));
    }
    if (!localStorage.getItem('pi:logs')) {
      localStorage.setItem('pi:logs', JSON.stringify([]));
    }
    navigate('/', { replace: true });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4">Create account</h2>
        <form onSubmit={handleSignup} className="space-y-3">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full name"
            className="w-full border p-2 rounded"
            required
          />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full border p-2 rounded"
            required
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            type="password"
            className="w-full border p-2 rounded"
            required
          />
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded"
            >
              Signup
            </button>
            <Link to="/login" className="text-sm text-indigo-600">
              Already have an account?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
