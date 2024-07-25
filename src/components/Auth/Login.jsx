import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await login(email, password);
    if (response.success) {
      toast.success('Login successful');
    } else {
      toast.error('Login failed');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form className="bg-gray-800 p-6 rounded shadow-md" onSubmit={handleSubmit}>
        <h2 className="text-white mb-4">Login</h2>
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
          Login
        </button>
        <ToastContainer />
      </form>
    </div>
  );
};

export default Login;
