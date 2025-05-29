import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;


export const searchBooks = async (prompt) => {
  try {
    const token = localStorage.getItem("token"); // Get token from localStorage

    const response = await axios.post(
      `${API_BASE_URL}/api/ai/chat-to-db`,
      { prompt },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Add Bearer token
        },
      }
    );

    return response?.data || [];

  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};
