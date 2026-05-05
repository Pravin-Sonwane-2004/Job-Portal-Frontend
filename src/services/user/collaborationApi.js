// collaborationApi.js contains API functions for one feature area of the job portal.
import { http } from '../http';

// getMyJobAlerts sends one HTTP request and returns the Axios promise to the page.
export const getMyJobAlerts = () => http.get('/api/job-alerts/me');
// createJobAlert sends one HTTP request and returns the Axios promise to the page.
export const createJobAlert = (data) => http.post('/api/job-alerts', data);
// deleteJobAlert sends one HTTP request and returns the Axios promise to the page.
export const deleteJobAlert = (id) => http.delete(`/api/job-alerts/${id}`);
// getInbox sends one HTTP request and returns the Axios promise to the page.
export const getInbox = () => http.get('/api/messages/inbox');
// getSentMessages sends one HTTP request and returns the Axios promise to the page.
export const getSentMessages = () => http.get('/api/messages/sent');
// sendMessage sends one HTTP request and returns the Axios promise to the page.
export const sendMessage = (data) => http.post('/api/messages', data);
// getMyInterviews sends one HTTP request and returns the Axios promise to the page.
export const getMyInterviews = () => http.get('/api/interviews/me');
// scheduleInterview sends one HTTP request and returns the Axios promise to the page.
export const scheduleInterview = (data) => http.post('/api/interviews', data);
// updateInterviewStatus sends one HTTP request and returns the Axios promise to the page.
export const updateInterviewStatus = (id, status) => http.patch(`/api/interviews/${id}/status`, { status });
