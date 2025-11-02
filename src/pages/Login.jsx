// src/pages/Login.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { load, save, LS } from '../utils/storage';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // naive auth: check a saved user in localStorage (signup saves to LS.user)
    const raw = localStorage.getItem('pi:user');
    if (!raw) return alert('No user found. Please signup first.');
    const user = JSON.parse(raw);
    if (user.email === email && user.password === password) {
      localStorage.setItem('pi:user', JSON.stringify(user));
      navigate('/', { replace: true });
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4">Login</h2>
        <form onSubmit={handleLogin} className="space-y-3">
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
              Login
            </button>
            <Link to="/signup" className="text-sm text-indigo-600">
              Create account
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
