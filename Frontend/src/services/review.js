import axios from 'axios';
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const addReviews = async (id, data) => {
  const token = localStorage.getItem("token");

  const response = await axios.post(`${API_BASE_URL}/api/books/${id}/review`,{
    reviewedBy: data.reviewedBy,
    rating: data.rating,
    review: data.review
  },
   {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });

  return response.data;
};

export const userReviews = async (id, data) => {
  const token = localStorage.getItem("token");

  const response = await axios.get(`${API_BASE_URL}/api/user/reviews`,
   {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });

  return response.data;
};

export const editReview = async (bookId, reviewId , data) => {
  const token = localStorage.getItem("token");

  const response = await axios.put(`${API_BASE_URL}/api/books/${bookId}/review/${reviewId}`,{
    reviewedBy: data.reviewedBy,
    rating: data.rating,
    review: data.review
  },
   {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });

  return response.data;
};


export const deleteReview = async (bookId , reviewId) => {
  const token = localStorage.getItem("token");

  const response = await axios.delete(`${API_BASE_URL}/api/books/${bookId}/review/${reviewId}`,
   {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });

  return response.data;
};
