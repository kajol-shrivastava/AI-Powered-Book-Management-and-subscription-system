import axios from 'axios';
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const getBookById = async (id) => {
  const token = localStorage.getItem("token");

  const response = await axios.get(`${API_BASE_URL}/api/books/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,

    }
  });

  return response.data;
};

export const getBooks = async (category) => {
  const token = localStorage.getItem('token');

  const response = await axios.get(`${API_BASE_URL}/api/books`, {
    params: category ? { category } : {}, 
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const saveBook = async (bookId) => {
  const token = localStorage.getItem("token");
  const response = await axios.post(`${API_BASE_URL}/api/user/save-book`, {bookId:bookId}, {
    headers: {
      Authorization: `Bearer ${token}`,

    }
  });
  return response.data;
};

export const getBookMarkedAndSavedBooks = async (bookId) => {
  const token = localStorage.getItem("token");
  
  const response = await axios.get(`${API_BASE_URL}/api/user/book-lists`,  {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });
  return response.data;
};

export const saveToContinueReadingBook = async (bookId) => {
  const token = localStorage.getItem("token");
  const response = await axios.post(`${API_BASE_URL}/api/user/read-book`, {bookId:bookId}, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });
  return response.data;
};
