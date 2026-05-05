import axios from 'axios';
import { clearCurrentUser, getCurrentUser } from './auth';

const API = import.meta.env.VITE_API_URL || '/api-backend';

export const http = axios.create({
  baseURL: API,
});

http.interceptors.request.use((config) => {
  const token = getCurrentUser()?.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

http.interceptors.response.use(
  response => response,
  error => {
    if (error?.response?.status === 401) {
      const isAuthEndpoint = error.config?.url?.startsWith('/public/');
      if (!isAuthEndpoint) clearCurrentUser();
    }
    return Promise.reject(error);
  }
);
