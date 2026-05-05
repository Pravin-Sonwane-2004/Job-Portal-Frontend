import { http } from '../http';

export const recruiterSearchTalent = (params) => http.get('/recruiter/talent', { params });
export const recruiterGetTalentById = (userId) => http.get(`/recruiter/talent/${userId}`);
