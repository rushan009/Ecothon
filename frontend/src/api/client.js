import axios from 'axios';
import Constants from 'expo-constants';
import { Platform } from 'react-native';

const resolveHostFromExpo = () => {
  const hostUri = Constants.expoConfig?.hostUri || Constants.manifest?.debuggerHost;
  if (!hostUri) {
    return null;
  }

  return hostUri.split(':')[0];
};

const resolveDefaultBaseUrl = () => {
  if (process.env.EXPO_PUBLIC_API_URL) {
    return process.env.EXPO_PUBLIC_API_URL;
  }

  const host = resolveHostFromExpo();
  if (host) {
    return `http://${host}:3000`;
  }

  if (Platform.OS === 'android') {
    return 'http://10.0.2.2:3000';
  }

  return 'http://localhost:3000';
};

export const baseURL = resolveDefaultBaseUrl();

export const api = axios.create({
  baseURL,
  timeout: 10000,
});

export const setAccessToken = (token) => {
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common.Authorization;
  }
};

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
