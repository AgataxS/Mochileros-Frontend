import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
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
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={onSubmit} className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="input mb-4"
        />
        <input
          type="password"
          value={contraseña}
          onChange={(e) => setContraseña(e.target.value)}
          placeholder="Contraseña"
          className="input mb-4"
        />
        <button type="submit" className="button w-full">
          {loading ? <ClipLoader size={24} color={"#ffffff"} /> : 'Login'}
        </button>
        <p className="mt-4 text-center">
          ¿No tienes una cuenta? <Link to="/register" className="text-blue-500">Regístrate</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
