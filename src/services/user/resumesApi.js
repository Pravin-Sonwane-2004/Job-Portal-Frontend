import { http } from '../http';

export const getResumes = (userId) => http.get(`/api/resumes/user/${userId}`);
export const uploadResume = (userId, filePath) => http.post('/api/resumes/upload', null, { params: { userId, filePath } });
export const deleteResume = (id) => http.delete(`/api/resumes/delete/${id}`);
