// savedJobsApi.js contains API functions for one feature area of the job portal.
import { http } from '../http';

// getSavedJobs sends one HTTP request and returns the Axios promise to the page.
export const getSavedJobs = (userId) => http.get(`/api/saved-jobs/user/${userId}`);
// saveJob sends one HTTP request and returns the Axios promise to the page.
export const saveJob = (userId, jobId) => http.post('/api/saved-jobs/save', null, { params: { userId, jobId } });
// unsaveJob sends one HTTP request and returns the Axios promise to the page.
export const unsaveJob = (userId, jobId) => http.delete('/api/saved-jobs/unsave', { params: { userId, jobId } });
