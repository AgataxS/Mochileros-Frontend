import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserData, login, register, logout } from '../services/api';
import { toast } from 'react-toastify';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await getUserData();
        setUser(data);
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleLogin = async (email, contraseña) => {
    setLoading(true);
    try {
      await login(email, contraseña);
      const data = await getUserData();
      setUser(data);
      toast.success('Login successful!');
      navigate('/');
    } catch (error) {
      toast.error('Failed to login. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (nombre, apellido, email, contraseña) => {
    setLoading(true);
    try {
      await register(nombre, apellido, email, contraseña);
      const data = await getUserData();
      setUser(data);
      toast.success('Registration successful!');
      navigate('/');
    } catch (error) {
      toast.error('Failed to register. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    setUser(null);
    toast.info('Logged out successfully.');
    navigate('/login');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        handleLogin,
        handleRegister,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
