import { http } from '../http';

export const getProfile = () => http.get('/role-profile/get-profile');
export const updateProfile = (data) => http.put('/role-profile/update-profile', data);
export const getFullName = () => http.get('/role-profile/full-name');
export const getProfileUserName = () => http.get('/role-profile/users-name');
export const getProfileInsights = () => http.get('/api/profile-insights/me');
export const registerUser = (payload) => http.post('/api/register', payload);
export const getRegisteredUserByEmail = (email) => http.get('/api/register/by-email', { params: { email } });
