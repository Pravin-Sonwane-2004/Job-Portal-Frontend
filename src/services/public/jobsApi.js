// jobsApi.js contains API functions for one feature area of the job portal.
import { http } from '../http';

// getPublicJobs sends one HTTP request and returns the Axios promise to the page.
export const getPublicJobs = (params) => http.get('/public/jobs/paginated', { params });
