import { http } from '../http';

export const getUserJobs = () => http.get('/user/jobs');
export const getUserJobById = (id) => http.get(`/user/jobs/${id}`);
export const getUserJobsSorted = (params) => http.get('/user/jobs/sorted', { params });
