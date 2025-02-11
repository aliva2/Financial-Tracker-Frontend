// services/apiService.js

import axios from 'axios';

const API_URL = 'http://localhost:8080/api'; // ? Base URL for your API

// Create an axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Function to handle GET requests
export const get = async (endpoint) => {
  try {
    const response = await api.get(endpoint);
    return response.data;
  } catch (error) {
    console.error('API GET error:', error);
    throw error;
  }
};

// Function to handle POST requests
export const post = async (endpoint, data) => {
  try {
    const response = await api.post(endpoint, data);
    return response.data;
  } catch (error) {
    console.error('API POST error:', error);
    throw error;
  }
};

// Function to handle PUT requests (used for updating data)
export const put = async (endpoint, data) => {
  try {
    const response = await api.put(endpoint, data);
    return response.data;
  } catch (error) {
    console.error('API PUT error:', error);
    throw error;
  }
};

// Function to handle DELETE requests (used for deleting data)
export const remove = async (endpoint) => {
  try {
    const response = await api.delete(endpoint);
    return response.data;
  } catch (error) {
    console.error('API DELETE error:', error);
    throw error;
  }
};


