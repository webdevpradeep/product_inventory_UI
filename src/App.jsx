// src/App.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import EntriesExits from './pages/EntriesExits';
import History from './pages/History';
import Layout from './components/Layout';
import { load } from './utils/storage';

export default function App() {
  const user = load('pi:user', null);

  return (
    <Routes>
      {!user ? (
        <>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </>
      ) : (
        <>
          <Route element={<Layout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/products" element={<Products />} />
            <Route path="/entries-exits" element={<EntriesExits />} />
            <Route path="/history" element={<History />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </>
      )}
    </Routes>
  );
}
