import { http } from '../http';

export const applyToJob = (jobId, data) => http.post('/apply/applications/apply', data || null, { params: { jobId } });
export const getMyAppliedJobs = () => http.get('/apply/applications/my-applied-dto');
export const getMyAppliedJobEntities = () => http.get('/apply/applications/my-applied-entities');
export const cancelApplication = (jobId) => http.delete('/apply/applications/cancel', { params: { jobId } });
export const deleteApplicationById = (id) => http.delete(`/apply/applications/${id}`);
export const updateApplicationById = (id, data) => http.put(`/apply/applications/${id}`, data);
