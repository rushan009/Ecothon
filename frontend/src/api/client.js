import axios from 'axios';

const baseURL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:5000';

export const api = axios.create({
  baseURL,
  timeout: 10000,
});

export const endpoints = {
  sendOtp: (payload) => api.post('/api/auth/signup', payload),
  verifyOtp: (payload) => api.post('/api/auth/verifyotp', payload),
  scanWaste: (payload) => api.post('/api/waste/scan', payload),
  getPrices: () => api.get('/api/prices/current'),
  createPickup: (payload) => api.post('/api/pickup/create', payload),
  listUserPickups: () => api.get('/api/pickup/list'),
  nearbyRequests: () => api.get('/api/pickup/nearby'),
  acceptPickup: (payload) => api.post('/api/pickup/accept', payload),
  completePickup: (payload) => api.post('/api/pickup/complete', payload),
  getRewards: () => api.get('/api/user/rewards'),
  getUserStats: () => api.get('/api/user/stats'),
};
