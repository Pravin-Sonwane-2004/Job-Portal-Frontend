import { http } from '../http';

export const adminGetJobs = () => http.get('/admin/jobs');
export const adminCreateJob = (data) => http.post('/admin/jobs', data);
export const adminUpdateJob = (id, data) => http.put(`/admin/jobs/${id}`, data);
export const adminDeleteJob = (id) => http.delete(`/admin/jobs/${id}`);
