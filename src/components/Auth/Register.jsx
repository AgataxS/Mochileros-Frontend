import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { register } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await register(nombre, apellido, email, password);
    if (response.success) {
      toast.success('Registration successful');
    } else {
      toast.error('Registration failed');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form className="bg-gray-800 p-6 rounded shadow-md" onSubmit={handleSubmit}>
        <h2 className="text-white mb-4">Register</h2>
        <div className="mb-4">
          <label className="block text-white mb-2" htmlFor="nombre">Nombre</label>
          <input
            type="text"
            id="nombre"
            className="w-full p-2 border border-gray-400 rounded"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-white mb-2" htmlFor="apellido">Apellido</label>
          <input
            type="text"
            id="apellido"
            className="w-full p-2 border border-gray-400 rounded"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-white mb-2" htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            className="w-full p-2 border border-gray-400 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-white mb-2" htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            className="w-full p-2 border border-gray-400 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
          Register
        </button>
        <ToastContainer />
      </form>
    </div>
  );
};

export default Register;
