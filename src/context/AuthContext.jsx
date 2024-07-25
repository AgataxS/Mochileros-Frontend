import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserData, login as loginUser, register as registerUser, logout as logoutUser } from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUserData();
        setUser(userData);
        if (userData.id_rol === 4) {
          navigate('/admin');
        } else {
          navigate('/dashboard');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        logout();
      }
    };

    if (localStorage.getItem('token')) {
      fetchUser();
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await loginUser(email, password);
      setUser(response.user);
      navigate(response.user.id_rol === 4 ? '/admin' : '/dashboard');
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  };

  const register = async (nombre, apellido, email, password) => {
    try {
      const response = await registerUser(nombre, apellido, email, password);
      setUser(response.user);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error registering:', error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    logoutUser();
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
