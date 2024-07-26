import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { ClipLoader } from 'react-spinners';

const Register = () => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [contraseña, setContraseña] = useState('');
  const { handleRegister, loading } = useAuth();

  const onSubmit = async (e) => {
    e.preventDefault();
    await handleRegister(nombre, apellido, email, contraseña);
  };

  return (
    <form onSubmit={onSubmit} className="register-form">
      <input
        type="text"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        placeholder="Nombre"
        className="input"
      />
      <input
        type="text"
        value={apellido}
        onChange={(e) => setApellido(e.target.value)}
        placeholder="Apellido"
        className="input"
      />
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
        {loading ? <ClipLoader size={24} color={"#ffffff"} /> : 'Register'}
      </button>
    </form>
  );
};

export default Register;
