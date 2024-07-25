import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-blue-500 text-white p-4 flex justify-between">
      <div>
        <Link to="/" className="mr-4">Home</Link>
        {user ? (
          <>
            <Link to="/dashboard" className="mr-4">Dashboard</Link>
            {user.id_rol === 4 && <Link to="/admin" className="mr-4">Admin</Link>}
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="mr-4">Login</Link>
            <Link to="/register" className="mr-4">Register</Link>
          </>
        )}
      </div>
      {user && <div>Welcome, {user.nombre}</div>}
    </nav>
  );
};

export default Navbar;
