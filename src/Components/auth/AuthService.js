import axios from "axios";

// Replace this URL with your Spring Boot API URL
const API_URL = "http://localhost:8080/api/auth";

// Function to login user
export const loginUser = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { username, password });
    return response.data; // Assume it returns some user data or a token
  } catch (error) {
    throw new Error("Login failed. Please check your credentials.");
  }
};

// Function to register user
export const registerUser = async (userData) => {
  try {
    console.log(userData);
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data; // Assume it returns user data after successful registration
  } catch (error) {
    throw new Error("Registration failed. Please try again.");
  }
};
