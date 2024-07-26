import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

export const getUserData = async () => {
  try {
    const response = await api.get('/me');
    return response.data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};

export const login = async (email, contraseña) => {
  try {
    const response = await api.post('/login', { email, contraseña });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

export const register = async (nombre, apellido, email, contraseña) => {
  try {
    const response = await api.post('/register', {
      nombre,
      apellido,
      email,
      contraseña,
    });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  } catch (error) {
    console.error('Error registering:', error);
    throw error;
  }
};

export const logout = () => {
  localStorage.removeItem('token');
};

export default api;
