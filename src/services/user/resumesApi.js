// resumesApi.js contains API functions for one feature area of the job portal.
import { http } from '../http';

// getResumes sends one HTTP request and returns the Axios promise to the page.
export const getResumes = (userId) => http.get(`/api/resumes/user/${userId}`);
// uploadResume sends one HTTP request and returns the Axios promise to the page.
export const uploadResume = (userId, filePath) => http.post('/api/resumes/upload', null, { params: { userId, filePath } });
// deleteResume sends one HTTP request and returns the Axios promise to the page.
export const deleteResume = (id) => http.delete(`/api/resumes/delete/${id}`);
