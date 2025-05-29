import axios from 'axios';
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const getPlans = async (id) => {
  const token = localStorage.getItem("token");

  const response = await axios.get(`${API_BASE_URL}/api/plan`, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });

  return response.data;
};

export const subscribePlan = async (planId) => {
  const token = localStorage.getItem("token");

  const response = await axios.post(`${API_BASE_URL}/api/user/subscribe`, {planId},
    {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });

  return response.data;
};
