import axios from 'axios';

const API_URL = 'http://localhost:8000/api/orders';

const getAuthConfig = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  return {
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
  };
};

export const getOrders = async () => {
  const response = await axios.get(API_URL, getAuthConfig());
  return response.data;
};

export const createOrder = async (orderData) => {
  const response = await axios.post(
    API_URL,
    orderData,
    getAuthConfig()
  );
  return response.data;
};

export const deleteOrder = async (id) => {
  const response = await axios.delete(
    `${API_URL}/${id}`,
    getAuthConfig()
  );
  return response.data;
};