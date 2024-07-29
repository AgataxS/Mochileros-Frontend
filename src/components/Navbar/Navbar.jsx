import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import ProfilePicture from '../common/ProfilePicture';

const Navbar = () => {
  const { user, handleLogout } = useAuth();
  const location = useLocation();

  if (location.pathname === '/login' || location.pathname === '/register') {
    return null;
  }

  return (
    <nav className="navbar">
      <div className="flex items-center">
      <img src="/l1.png" alt="Logo" className="mx-auto mb-6 w-20 h-12 object-contain " />
        <Link to="/">MochiShare</Link>
        {user && <span className="ml-2">{user.nombre}</span>}
      </div>
      {user ? (
        <div className="flex items-center">
          <ProfilePicture user={user} />
          <Link to="/forum" className="ml-4">Foro</Link>
          <Link to="/experience-list" className="ml-4">Experiencias</Link>
          <button onClick={handleLogout} className="ml-4">Logout</button>
        </div>
      ) : (
        <div>
          <Link to="/login" className="ml-4">Login</Link>
          <Link to="/register" className="ml-4">Register</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
