import axios from 'axios'
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL||"http://localhost:4000";

export const loginUser = async (email, password) => {
   try {
    const response = await axios.post(`${API_BASE_URL}/api/auth/login`, {
      username: email,
      password,
    });
    return response?.data; // return only useful data
  } catch (error) {
    // Optional: log the full error for debugging
    console.error("Login error:", error);

    // Return a standard error object to the caller
    const message =
      error.response?.data?.message || "Something went wrong during login";
    // throw new Error(message);
    return error.response?.data
  }
};