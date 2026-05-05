// profileApi.js contains API functions for one feature area of the job portal.
import { http } from '../http';

// getProfile sends one HTTP request and returns the Axios promise to the page.
export const getProfile = () => http.get('/role-profile/get-profile');
// updateProfile sends one HTTP request and returns the Axios promise to the page.
export const updateProfile = (data) => http.put('/role-profile/update-profile', data);
// getFullName sends one HTTP request and returns the Axios promise to the page.
export const getFullName = () => http.get('/role-profile/full-name');
// getProfileUserName sends one HTTP request and returns the Axios promise to the page.
export const getProfileUserName = () => http.get('/role-profile/users-name');
// getProfileInsights sends one HTTP request and returns the Axios promise to the page.
export const getProfileInsights = () => http.get('/api/profile-insights/me');
// registerUser sends one HTTP request and returns the Axios promise to the page.
export const registerUser = (payload) => http.post('/api/register', payload);
// getRegisteredUserByEmail sends one HTTP request and returns the Axios promise to the page.
export const getRegisteredUserByEmail = (email) => http.get('/api/register/by-email', { params: { email } });
