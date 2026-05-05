// jobsApi.js contains API functions for one feature area of the job portal.
import { http } from '../http';

// adminGetJobs sends one HTTP request and returns the Axios promise to the page.
export const adminGetJobs = () => http.get('/admin/jobs');
// adminCreateJob sends one HTTP request and returns the Axios promise to the page.
export const adminCreateJob = (data) => http.post('/admin/jobs', data);
// adminUpdateJob sends one HTTP request and returns the Axios promise to the page.
export const adminUpdateJob = (id, data) => http.put(`/admin/jobs/${id}`, data);
// adminDeleteJob sends one HTTP request and returns the Axios promise to the page.
export const adminDeleteJob = (id) => http.delete(`/admin/jobs/${id}`);
