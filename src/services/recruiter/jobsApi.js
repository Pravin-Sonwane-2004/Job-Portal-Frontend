import { http } from '../http';

export const recruiterGetJobs = () => http.get('/recruiter/jobs');
export const recruiterCreateJob = (data) => http.post('/recruiter/jobs', data);
export const recruiterGetJobById = (id) => http.get(`/recruiter/jobs/${id}`);
export const recruiterUpdateJob = (id, data) => http.put(`/recruiter/jobs/${id}`, data);
export const recruiterDeleteJob = (id) => http.delete(`/recruiter/jobs/${id}`);
