import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import Button from '../common/Button';

const LogoutButton = () => {
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
  };

  return (
    <Button onClick={handleLogout} className="bg-red-500 hover:bg-red-700">
      Logout
    </Button>
  );
};

export default LogoutButton;
