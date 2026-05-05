import { http } from '../http';

export const adminGetUsers = () => http.get('/admin/users');
export const adminDeleteUser = (username) => http.delete(`/admin/user/${encodeURIComponent(username)}`);
export const adminUpdateUser = (username, data) => http.put(`/admin/user/${encodeURIComponent(username)}`, data);
export const adminCreateUser = (data) => http.post('/admin/signup', data);
