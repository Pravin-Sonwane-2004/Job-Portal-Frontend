import { http } from '../http';

export const healthCheck = () => http.get('/public/health-check');
export const login = (payload) => http.post('/public/login', payload);
export const register = (payload) => http.post('/public/signup', payload);
export const requestPasswordReset = (email) => http.post('/public/password/forgot', { email });
export const resetPassword = (payload) => http.post('/public/password/reset', payload);
