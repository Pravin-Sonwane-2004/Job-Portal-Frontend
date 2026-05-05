// usersApi.js contains API functions for one feature area of the job portal.
import { http } from '../http';

// adminGetUsers sends one HTTP request and returns the Axios promise to the page.
export const adminGetUsers = () => http.get('/admin/users');
// adminDeleteUser sends one HTTP request and returns the Axios promise to the page.
export const adminDeleteUser = (username) => http.delete(`/admin/user/${encodeURIComponent(username)}`);
// adminUpdateUser sends one HTTP request and returns the Axios promise to the page.
export const adminUpdateUser = (username, data) => http.put(`/admin/user/${encodeURIComponent(username)}`, data);
// adminCreateUser sends one HTTP request and returns the Axios promise to the page.
export const adminCreateUser = (data) => http.post('/admin/signup', data);
