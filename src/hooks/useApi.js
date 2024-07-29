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

export const updateUserProfile = async (data) => {
  try {
    const response = await api.put('/usuarios', data);
    return response.data;
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
};

export const fetchExperiences = async () => {
  try {
    const response = await api.get('/experiencias');
    return response.data;
  } catch (error) {
    console.error('Error fetching experiences:', error);
    throw error;
  }
};

export const postExperience = async (formData) => {
  try {
    const response = await api.post('/experiencias', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error posting experience:', error);
    throw error;
  }
};

export const fetchCountries = async () => {
  try {
    const response = await api.get('/paises');
    return response.data;
  } catch (error) {
    console.error('Error fetching countries:', error);
    throw error;
  }
};

export const fetchDestinations = async (countryId) => {
  try {
    const response = await api.get(`/destinos?id_pais=${countryId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching destinations:', error);
    throw error;
  }
};

export const addDestination = async (destinationData) => {
  try {
    const response = await api.post('/destinos', destinationData);
    return response.data;
  } catch (error) {
    console.error('Error adding destination:', error);
    throw error;
  }
};

export const logout = () => {
  localStorage.removeItem('token');
};

export default api;
