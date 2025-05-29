import axios from 'axios';
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const registerUser = async (userData) => {
    console.log(userData)
    const response = await axios.post(`${API_BASE_URL}/api/user/register`, userData);
    console.log(response)
    return response?.data;
 
};

export const getDashboardData = async () => {
  const token = localStorage.getItem("token");

  const response = await axios.get(`${API_BASE_URL}/api/user/dashboard`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "ngrok-skip-browser-warning": "true"
    }
  });

  return response.data;
};

export const getSubscribe = async () => {
  const token = localStorage.getItem("token");

  const response = await axios.get(`${API_BASE_URL}/api/user/subscribe`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  return response.data;
};


