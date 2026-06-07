import axios from 'axios';

const API_URL = 'http://localhost:8000/api/products';

const getAuthConfig = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  if (!user || !user.token) {
    console.log('No token found in localStorage');
  } else {
    console.log('Token found:', user.token);
  }

  return {
    headers: {
      Authorization: user && user.token ? `Bearer ${user.token}` : '',
    },
  };
};

export const getProducts = async () => {
  const response = await axios.get(API_URL, getAuthConfig());
  return response.data;
};

export const getProductById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`, getAuthConfig());
  return response.data;
};

export const createProduct = async (productData) => {
  const response = await axios.post(API_URL, productData, getAuthConfig());
  return response.data;
};

export const updateProduct = async (id, productData) => {
  const response = await axios.put(`${API_URL}/${id}`, productData, getAuthConfig());
  return response.data;
};

export const deleteProduct = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`, getAuthConfig());
  return response.data;
};