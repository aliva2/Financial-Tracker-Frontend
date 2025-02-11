// services/dashboardService.js

import { get } from './apiService';

export const getDashboardData = async () => {
  try {
    const data = await get('/dashboard'); // Fetch dashboard data from the API
    return data;
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    throw error;
  }
};
