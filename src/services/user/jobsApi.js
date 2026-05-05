// jobsApi.js contains API functions for one feature area of the job portal.
import { http } from '../http';

// getUserJobs sends one HTTP request and returns the Axios promise to the page.
export const getUserJobs = () => http.get('/user/jobs');
// getUserJobById sends one HTTP request and returns the Axios promise to the page.
export const getUserJobById = (id) => http.get(`/user/jobs/${id}`);
// getUserJobsSorted sends one HTTP request and returns the Axios promise to the page.
export const getUserJobsSorted = (params) => http.get('/user/jobs/sorted', { params });
