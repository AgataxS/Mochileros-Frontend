import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { ClipLoader } from 'react-spinners';

const Login = () => {
  const [email, setEmail] = useState('');
  const [contraseña, setContraseña] = useState('');
  const { handleLogin, loading } = useAuth();

  const onSubmit = async (e) => {
    e.preventDefault();
    await handleLogin(email, contraseña);
  };

  return (
    <form onSubmit={onSubmit} className="login-form">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="input"
      />
      <input
        type="password"
        value={contraseña}
        onChange={(e) => setContraseña(e.target.value)}
        placeholder="Contraseña"
        className="input"
      />
      <button type="submit" className="button">
        {loading ? <ClipLoader size={24} color={"#ffffff"} /> : 'Login'}
      </button>
    </form>
  );
};

export default Login;
