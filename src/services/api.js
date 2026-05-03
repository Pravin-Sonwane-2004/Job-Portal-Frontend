import axios from 'axios';
import { getCurrentUser, clearCurrentUser } from './auth';

const API = import.meta.env.VITE_API_URL || '/api-backend';

const http = axios.create({
  baseURL: API,
});

http.interceptors.request.use((config) => {
  const token = getCurrentUser()?.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

http.interceptors.response.use(
  response => response,
  error => {
    if (error?.response?.status === 401) {
      const isAuthEndpoint = error.config?.url?.startsWith('/public/');
      if (!isAuthEndpoint) clearCurrentUser();
    }
    return Promise.reject(error);
  }
);

// Auth
export const healthCheck = () => http.get('/public/health-check');
export const login = (payload) => http.post('/public/login', payload);
export const register = (payload) => http.post('/public/signup', payload);
export const registerCompany = (payload) => http.post('/public/company/signup', payload);
export const requestPasswordReset = (email) => http.post('/public/password/forgot', { email });
export const resetPassword = (payload) => http.post('/public/password/reset', payload);
export const registerUser = (payload) => http.post('/api/register', payload);
export const getRegisteredUserByEmail = (email) => http.get('/api/register/by-email', { params: { email } });

// Public jobs (paginated)
export const getPublicJobs = (params) => http.get('/public/jobs/paginated', { params });

// User jobs
export const getUserJobs = () => http.get('/user/jobs');
export const getUserJobById = (id) => http.get(`/user/jobs/${id}`);
export const getUserJobsSorted = (params) => http.get('/user/jobs/sorted', { params });

// Admin - Users
export const adminGetUsers = () => http.get('/admin/users');
export const adminDeleteUser = (username) => http.delete(`/admin/user/${encodeURIComponent(username)}`);
export const adminUpdateUser = (username, data) => http.put(`/admin/user/${encodeURIComponent(username)}`, data);
export const adminCreateUser = (data) => http.post('/admin/signup', data);

// Admin - Jobs
export const adminCreateJob = (data) => http.post('/admin/jobs', data);
export const adminUpdateJob = (id, data) => http.put(`/admin/jobs/${id}`, data);
export const adminDeleteJob = (id) => http.delete(`/admin/jobs/${id}`);

// Admin - Applications
export const adminGetApplications = () => http.get('/admin/applications');
export const adminGetApplicationsForJob = (jobId) => http.get(`/admin/applications/job/${jobId}`);
export const adminGetApplicationsByUser = (userId) => http.get(`/admin/applications/user/${userId}`);
export const adminGetAllAppliers = () => http.get('/admin/admin/all-appliers');

// Recruiter
export const recruiterGetJobs = () => http.get('/recruiter/jobs');
export const recruiterCreateJob = (data) => http.post('/recruiter/jobs', data);
export const recruiterGetJobById = (id) => http.get(`/recruiter/jobs/${id}`);
export const recruiterUpdateJob = (id, data) => http.put(`/recruiter/jobs/${id}`, data);
export const recruiterDeleteJob = (id) => http.delete(`/recruiter/jobs/${id}`);
export const recruiterGetApplications = () => http.get('/recruiter/applications');
export const recruiterGetApplicationsForJob = (jobId) => http.get(`/recruiter/jobs/${jobId}/applications`);
export const recruiterUpdateApplication = (applicationId, data) => http.put(`/recruiter/applications/${applicationId}`, data);
export const recruiterSearchTalent = (params) => http.get('/recruiter/talent', { params });
export const recruiterGetTalentById = (userId) => http.get(`/recruiter/talent/${userId}`);

// Job Applications
export const applyToJob = (_userId, jobId, data) => http.post('/apply/applications/apply', data || null, { params: { jobId } });
export const getMyAppliedJobs = () => http.get('/apply/applications/my-applied-dto');
export const getMyAppliedJobEntities = () => http.get('/apply/applications/my-applied-entities');
export const cancelApplication = (_userId, jobId) => http.delete('/apply/applications/cancel', { params: { jobId } });
export const deleteApplicationById = (id) => http.delete(`/apply/applications/${id}`);
export const updateApplicationById = (id, data) => http.put(`/apply/applications/${id}`, data);

// Saved Jobs
export const getSavedJobs = (userId) => http.get(`/api/saved-jobs/user/${userId}`);
export const saveJob = (userId, jobId) => http.post('/api/saved-jobs/save', null, { params: { userId, jobId } });
export const unsaveJob = (userId, jobId) => http.delete('/api/saved-jobs/unsave', { params: { userId, jobId } });

// Resumes
export const getResumes = (userId) => http.get(`/api/resumes/user/${userId}`);
export const uploadResume = (userId, filePath) => http.post('/api/resumes/upload', null, { params: { userId, filePath } });
export const deleteResume = (id) => http.delete(`/api/resumes/delete/${id}`);

// Profile
export const getProfile = () => http.get('/role-profile/get-profile');
export const updateProfile = (data) => http.put('/role-profile/update-profile', data);
export const getFullName = () => http.get('/role-profile/full-name');
export const getProfileUserName = () => http.get('/role-profile/users-name');
export const getProfileInsights = () => http.get('/api/profile-insights/me');

// Companies
export const getCompanies = () => http.get('/api/companies');
export const getCompanyById = (id) => http.get(`/api/companies/${id}`);
export const getCompanyReviews = (companyId) => http.get(`/api/company-reviews/company/${companyId}`);
export const addCompanyReview = (companyId, data) => http.post(`/api/company-reviews/company/${companyId}`, data);

// Company portal
export const companyDashboard = () => http.get('/company-portal/dashboard');
export const companyGetProfile = () => http.get('/company-portal/company');
export const companyUpdateProfile = (data) => http.put('/company-portal/company', data);
export const companyGetEmployees = () => http.get('/company-portal/employees');
export const companyAddEmployee = (data) => http.post('/company-portal/employees', data);
export const companyRemoveEmployee = (id) => http.delete(`/company-portal/employees/${id}`);
export const companyGetJobs = () => http.get('/company-portal/jobs');
export const companyCreateJob = (data) => http.post('/company-portal/jobs', data);

// Collaboration services
export const getMyJobAlerts = () => http.get('/api/job-alerts/me');
export const createJobAlert = (data) => http.post('/api/job-alerts', data);
export const deleteJobAlert = (id) => http.delete(`/api/job-alerts/${id}`);
export const getInbox = () => http.get('/api/messages/inbox');
export const getSentMessages = () => http.get('/api/messages/sent');
export const sendMessage = (data) => http.post('/api/messages', data);
export const getMyInterviews = () => http.get('/api/interviews/me');
export const scheduleInterview = (data) => http.post('/api/interviews', data);
export const updateInterviewStatus = (id, status) => http.patch(`/api/interviews/${id}/status`, { status });

// Users
export const getUsers = () => http.get('/api/users');
export const getUserById = (id) => http.get(`/api/users/${id}`);
export const deleteUser = (id) => http.delete(`/api/users/${id}`);

// Email
export const sendEmail = (data) => http.post('/email/send', data);
