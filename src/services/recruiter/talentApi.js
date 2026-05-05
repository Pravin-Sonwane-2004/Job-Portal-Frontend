// talentApi.js contains API functions for one feature area of the job portal.
import { http } from '../http';

// recruiterSearchTalent sends one HTTP request and returns the Axios promise to the page.
export const recruiterSearchTalent = (params) => http.get('/recruiter/talent', { params });
// recruiterGetTalentById sends one HTTP request and returns the Axios promise to the page.
export const recruiterGetTalentById = (userId) => http.get(`/recruiter/talent/${userId}`);
