// src/views/AdminDashboard.jsx
import React from 'react';
import { useAuth } from '../context/AuthContext';

const AdminDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center text-white">
      <h1 className="text-2xl">Welcome to the Admin Dashboard, {user ? user.nombre : 'Admin'}!</h1>
    </div>
  );
};

export default AdminDashboard;
