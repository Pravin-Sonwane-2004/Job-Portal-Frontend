// authApi.js contains API functions for one feature area of the job portal.
import { http } from '../http';

// healthCheck sends one HTTP request and returns the Axios promise to the page.
export const healthCheck = () => http.get('/public/health-check');
// login sends one HTTP request and returns the Axios promise to the page.
export const login = (payload) => http.post('/public/login', payload);
// register sends one HTTP request and returns the Axios promise to the page.
export const register = (payload) => http.post('/public/signup', payload);
// requestPasswordReset sends one HTTP request and returns the Axios promise to the page.
export const requestPasswordReset = (email) => http.post('/public/password/forgot', { email });
// resetPassword sends one HTTP request and returns the Axios promise to the page.
export const resetPassword = (payload) => http.post('/public/password/reset', payload);
