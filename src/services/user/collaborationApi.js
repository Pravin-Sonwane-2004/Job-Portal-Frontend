import { http } from '../http';

export const getMyJobAlerts = () => http.get('/api/job-alerts/me');
export const createJobAlert = (data) => http.post('/api/job-alerts', data);
export const deleteJobAlert = (id) => http.delete(`/api/job-alerts/${id}`);
export const getInbox = () => http.get('/api/messages/inbox');
export const getSentMessages = () => http.get('/api/messages/sent');
export const sendMessage = (data) => http.post('/api/messages', data);
export const getMyInterviews = () => http.get('/api/interviews/me');
export const scheduleInterview = (data) => http.post('/api/interviews', data);
export const updateInterviewStatus = (id, status) => http.patch(`/api/interviews/${id}/status`, { status });
