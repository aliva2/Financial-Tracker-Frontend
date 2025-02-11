// services/authService.js

import { post } from './apiService';

export const login = async (credentials) => {
  try {
    const data = await post('/auth/login', credentials);
    localStorage.setItem('authToken', data.token); // Save the token in localStorage
    return data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const logout = () => {
  localStorage.removeItem('authToken'); // Remove the token on logout
};

export const isAuthenticated = () => {
  return !!localStorage.getItem('authToken'); // Check if token exists
};
