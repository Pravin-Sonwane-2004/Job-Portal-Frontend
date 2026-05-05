// applicationsApi.js contains API functions for one feature area of the job portal.
import { http } from '../http';

// applyToJob sends one HTTP request and returns the Axios promise to the page.
export const applyToJob = (jobId, data) => http.post('/apply/applications/apply', data || null, { params: { jobId } });
// getMyAppliedJobs sends one HTTP request and returns the Axios promise to the page.
export const getMyAppliedJobs = () => http.get('/apply/applications/my-applied-dto');
// getMyAppliedJobEntities sends one HTTP request and returns the Axios promise to the page.
export const getMyAppliedJobEntities = () => http.get('/apply/applications/my-applied-entities');
// cancelApplication sends one HTTP request and returns the Axios promise to the page.
export const cancelApplication = (jobId) => http.delete('/apply/applications/cancel', { params: { jobId } });
// deleteApplicationById sends one HTTP request and returns the Axios promise to the page.
export const deleteApplicationById = (id) => http.delete(`/apply/applications/${id}`);
// updateApplicationById sends one HTTP request and returns the Axios promise to the page.
export const updateApplicationById = (id, data) => http.put(`/apply/applications/${id}`, data);
