// http.js creates the shared Axios client used by all API service files.
import axios from 'axios';
import { clearCurrentUser, getCurrentUser } from './auth';

// Use the deployed backend URL if it exists, otherwise use the local proxy path.
const API = import.meta.env.VITE_API_URL || '/api-backend';

// Create one Axios client so all service files share the same base URL.
export const http = axios.create({
  baseURL: API,
});

// Before every request, attach the logged-in user's token if one exists.
http.interceptors.request.use((config) => {
  const token = getCurrentUser()?.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// After every response, handle common auth failures in one place.
http.interceptors.response.use(
  response => response,
  error => {
    if (error?.response?.status === 401) {
      // Public endpoints should not force logout when they fail.
      const isAuthEndpoint = error.config?.url?.startsWith('/public/');
      if (!isAuthEndpoint) clearCurrentUser();
    }
    return Promise.reject(error);
  }
);
