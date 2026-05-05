import { http } from '../http';

export const getSavedJobs = (userId) => http.get(`/api/saved-jobs/user/${userId}`);
export const saveJob = (userId, jobId) => http.post('/api/saved-jobs/save', null, { params: { userId, jobId } });
export const unsaveJob = (userId, jobId) => http.delete('/api/saved-jobs/unsave', { params: { userId, jobId } });
