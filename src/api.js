import axios from 'axios';

const API = 'http://localhost:8080';

const http = axios.create();

// Auth
export const login = (payload) => http.post(`${API}/public/login`, payload);
export const register = (payload) => http.post(`${API}/public/signup`, payload);

// Public jobs (paginated)
export const getPublicJobs = (params) => http.get(`${API}/public/jobs/paginated`, { params });

// User jobs
export const getUserJobs = () => http.get(`${API}/user/jobs`);
export const getUserJobById = (id) => http.get(`${API}/user/jobs/${id}`);

// Admin - Users
export const adminGetUsers = () => http.get(`${API}/admin/users`);
export const adminDeleteUser = (username) => http.delete(`${API}/admin/user/${username}`);
export const adminUpdateUser = (username, data) => http.put(`${API}/admin/user/${username}`, data);
export const adminCreateUser = (data) => http.post(`${API}/admin/signup`, data);

// Admin - Jobs
export const adminCreateJob = (data) => http.post(`${API}/admin/jobs`, data);
export const adminUpdateJob = (id, data) => http.put(`${API}/admin/jobs/${id}`, data);
export const adminDeleteJob = (id) => http.delete(`${API}/admin/jobs/${id}`);

// Admin - Applications
export const adminGetApplications = () => http.get(`${API}/admin/applications`);
export const adminGetApplicationsForJob = (jobId) => http.get(`${API}/admin/applications/job/${jobId}`);
export const adminGetApplicationsByUser = (userId) => http.get(`${API}/admin/applications/user/${userId}`);
export const adminGetAllAppliers = () => http.get(`${API}/admin/admin/all-appliers`);

// Job Applications
export const applyToJob = (userId, jobId) => http.post(`${API}/apply/applications/apply`, null, { params: { userId, jobId } });
export const getMyAppliedJobs = (userId) => http.get(`${API}/apply/applications/my-applied-dto`, { params: { userId } });
export const cancelApplication = (userId, jobId) => http.delete(`${API}/apply/applications/cancel`, { params: { userId, jobId } });
export const deleteApplicationById = (id) => http.delete(`${API}/apply/applications/${id}`);
export const updateApplicationById = (id, data) => http.put(`${API}/apply/applications/${id}`, data);

// Saved Jobs
export const getSavedJobs = (userId) => http.get(`${API}/api/saved-jobs/user/${userId}`);
export const saveJob = (userId, jobId) => http.post(`${API}/api/saved-jobs/save`, null, { params: { userId, jobId } });
export const unsaveJob = (userId, jobId) => http.delete(`${API}/api/saved-jobs/unsave`, { params: { userId, jobId } });

// Resumes
export const getResumes = (userId) => http.get(`${API}/api/resumes/user/${userId}`);
export const uploadResume = (userId, filePath) => http.post(`${API}/api/resumes/upload`, null, { params: { userId, filePath } });
export const deleteResume = (id) => http.delete(`${API}/api/resumes/delete/${id}`);

// Profile
export const getProfile = (params) => http.get(`${API}/role-profile/get-profile`, { params });
export const updateProfile = (data, params) => http.put(`${API}/role-profile/update-profile`, data, { params });
export const getFullName = (userId) => http.get(`${API}/role-profile/full-name`, { params: { userId } });

// Users
export const getUsers = () => http.get(`${API}/api/users`);
export const getUserById = (id) => http.get(`${API}/api/users/${id}`);
export const deleteUser = (id) => http.delete(`${API}/api/users/${id}`);
