import http from './http';

// --- AUTH ENDPOINTS ---
export const LOGIN_URL = "http://localhost:8080/public/login";
export const REGISTER_URL = "http://localhost:8080/public/signup";
export const GET_JOBS_PUBLIC = "http://localhost:8080/public/jobs/paginated";

// --- ADMIN DASHBOARD ENDPOINTS ---
export const ADMIN_GET_ALL_USERS = "http://localhost:8080/admin/users";
export const ADMIN_DELETE_USER = "http://localhost:8080/admin/user"; // + /{username}
export const ADMIN_UPDATE_USER = "http://localhost:8080/admin/user"; // + /{username}
export const ADMIN_CREATE_JOB = "http://localhost:8080/admin/jobs";
export const ADMIN_BULK_CREATE_JOBS = "http://localhost:8080/admin/jobs/bulk";
export const ADMIN_DELETE_JOB = "http://localhost:8080/admin/jobs"; // + /{id}
export const ADMIN_UPDATE_JOB = "http://localhost:8080/admin/jobs"; // + /{id}
export const ADMIN_DELETE_ALL_JOBS =
  "http://localhost:8080/admin/deletealljobs";
export const ADMIN_GET_ALL_APPLICATIONS =
  "http://localhost:8080/admin/applications";
export const ADMIN_GET_ALL_APPLICATIONS_WITH_PROFILES =
  "http://localhost:8080/admin/all";
export const ADMIN_GET_ALL_APPLIERS =
  "http://localhost:8080/admin/all-appliers";
export const ADMIN_GET_APPLICATIONS_FOR_JOB =
  "http://localhost:8080/admin/applications/job"; // + /{jobId}
export const ADMIN_GET_APPLICATIONS_BY_USER =
  "http://localhost:8080/admin/applications/user"; // + /{userId}
export const ADMIN_CREATE_ADMIN_USER = "http://localhost:8080/admin/register";
// --- USER DASHBOARD ENDPOINTS ---
export const USER_PAGINATION_URL = "http://localhost:8080/user/jobs/paginated";
export const USER_UPLOAD_JOBS = "http://localhost:8080/user/jobs";
export const USER_GET_JOBS = "http://localhost:8080/user/jobs";
export const USER_GET_JOB_BY_ID = "http://localhost:8080/user/jobs"; // + /{id}
export const USER_GET_JOBS_SORTED = "http://localhost:8080/user/jobs/sorted";

// --- JOB APPLICATIONS ---
export const APPLY_JOB = "http://localhost:8080/apply/applications/apply";
export const GET_MY_APPLIED_JOBS =
  "http://localhost:8080/apply/applications/my-applied-entities";
export const GET_MY_APPLIED_JOBS_DTO =
  "http://localhost:8080/apply/applications/my-applied-dto";
export const CANCEL_APPLICATION =
  "http://localhost:8080/apply/applications/cancel";
export const ADMIN_GET_ALL_APPLICATIONS_APPLY =
  "http://localhost:8080/apply/applications/admin/all";

// --- RECRUITER DASHBOARD ENDPOINTS ---
export const RECRUITER_BASE = "http://localhost:8080/recruiter";

// --- SAVED JOBS ---
export const SAVED_JOBS_BASE = "http://localhost:8080/api/saved-jobs";
export const GET_SAVED_JOBS_BY_USER =
  "http://localhost:8080/api/saved-jobs/user"; // + /{userId}
export const SAVE_JOB = "http://localhost:8080/api/saved-jobs/save";
export const UNSAVE_JOB = "http://localhost:8080/api/saved-jobs/unsave";

// --- USER REGISTRATION ---
export const USER_REGISTER_BASE = "http://localhost:8080/api/register";

// --- USER MANAGEMENT ---
export const USERS_BASE = "http://localhost:8080/api/users";
export const GET_USER_BY_ID = "http://localhost:8080/api/users"; // + /{id}

// --- EMAIL ---
export const EMAIL_BASE = "http://localhost:8080/email";
export const EMAIL_SEND = "http://localhost:8080/email/send";

// --- ROLE PROFILE ---
export const ROLE_PROFILE_BASE = "http://localhost:8080/role-profile";
export const UPDATE_PROFILE =
  "http://localhost:8080/role-profile/update-profile";
export const GET_PROFILE = "http://localhost:8080/role-profile/get-profile";
export const GET_USERS_NAME = "http://localhost:8080/role-profile/users-name";
export const GET_NAME = "http://localhost:8080/role-profile/full-name";

// --- RESUMES ---
export const RESUMES_BASE = "http://localhost:8080/api/resumes";
export const GET_RESUMES_BY_USER = "http://localhost:8080/api/resumes/user"; // + /{userId}
export const UPLOAD_RESUME = "http://localhost:8080/api/resumes/upload";
export const DELETE_RESUME = "http://localhost:8080/api/resumes/delete"; // + /{resumeId}

// --- GENERIC AXIOS CALLS ---
const getAuthHeaders = () => {
  const token = sessionStorage.getItem("jwt");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Example: Public jobs
export const getJobs = (params = {}) => {
  return http.get(GET_JOBS_PUBLIC, {
    params,
    headers: getAuthHeaders(),
  });
};

// --- ADMIN ---
export const adminGetAllUsers = () =>
  http.get(ADMIN_GET_ALL_USERS, { headers: getAuthHeaders() });
export const adminDeleteUser = (username) =>
  http.delete(`${ADMIN_DELETE_USER}/${username}`, {
    headers: getAuthHeaders(),
  });
export const adminUpdateUser = (username, data) =>
  http.put(`${ADMIN_UPDATE_USER}/${username}`, data, {
    headers: getAuthHeaders(),
  });
export const adminCreateJob = (data) =>
  http.post(ADMIN_CREATE_JOB, data, { headers: getAuthHeaders() });
export const adminBulkCreateJobs = (data) =>
  http.post(ADMIN_BULK_CREATE_JOBS, data, { headers: getAuthHeaders() });
export const adminDeleteJob = (jobId) =>
  http.delete(`${ADMIN_DELETE_JOB}/${jobId}`, { headers: getAuthHeaders() });
export const adminUpdateJob = (jobId, data) =>
  http.put(`${ADMIN_UPDATE_JOB}/${jobId}`, data, {
    headers: getAuthHeaders(),
  });
export const adminDeleteAllJobs = () =>
  http.delete(ADMIN_DELETE_ALL_JOBS, { headers: getAuthHeaders() });
export const adminGetAllApplications = () =>
  http.get(ADMIN_GET_ALL_APPLICATIONS, { headers: getAuthHeaders() });
export const adminGetAllApplicationsWithProfiles = () =>
  http.get(ADMIN_GET_ALL_APPLICATIONS_WITH_PROFILES, {
    headers: getAuthHeaders(),
  });
export const adminGetAllAppliers = () =>
  http.get(ADMIN_GET_ALL_APPLIERS, { headers: getAuthHeaders() });
export const adminGetApplicationsForJob = (jobId) =>
  http.get(`${ADMIN_GET_APPLICATIONS_FOR_JOB}/${jobId}`, {
    headers: getAuthHeaders(),
  });
export const adminGetApplicationsByUser = (userId) =>
  http.get(`${ADMIN_GET_APPLICATIONS_BY_USER}/${userId}`, {
    headers: getAuthHeaders(),
  });
export const adminCreateAdminUser = (data) =>
  http.post(ADMIN_CREATE_ADMIN_USER, data, { headers: getAuthHeaders() });

// --- USER ---
export const userGetPaginatedJobs = (params = {}) =>
  http.get(USER_PAGINATION_URL, { params, headers: getAuthHeaders() });
export const userUploadJobs = (data) =>
  http.post(USER_UPLOAD_JOBS, data, { headers: getAuthHeaders() });
export const userGetJobs = () =>
  http.get(USER_GET_JOBS, { headers: getAuthHeaders() });
export const userGetJobById = (id) =>
  http.get(`${USER_GET_JOB_BY_ID}/${id}`, { headers: getAuthHeaders() });
export const userGetJobsSorted = () =>
  http.get(USER_GET_JOBS_SORTED, { headers: getAuthHeaders() });

// --- JOB APPLICATIONS ---
export const applyToJob = (jobId) =>
  http.post(APPLY_JOB, null, { params: { jobId }, headers: getAuthHeaders() });
export const applyToJobByUser = (userId, jobId) =>
  http.post(APPLY_JOB, null, {
    params: { userId, jobId },
    headers: getAuthHeaders(),
  });
export const getMyAppliedJobs = () =>
  http.get(GET_MY_APPLIED_JOBS_DTO, { headers: getAuthHeaders() });
export const getMyAppliedJobsDTO = () =>
  http.get(GET_MY_APPLIED_JOBS_DTO, { headers: getAuthHeaders() });
export const cancelApplication = (jobId) =>
  http.delete(CANCEL_APPLICATION, {
    params: { jobId },
    headers: getAuthHeaders(),
  });
export const deleteApplicationById = (applicationId) =>
  http.delete(`http://localhost:8080/apply/applications/${applicationId}`, {
    headers: getAuthHeaders(),
  });
export const updateApplicationById = (applicationId, updates) =>
  http.put(
    `http://localhost:8080/apply/applications/${applicationId}`,
    updates,
    { headers: getAuthHeaders() }
  );
export const adminGetAllApplicationsApply = () =>
  http.get(ADMIN_GET_ALL_APPLICATIONS_APPLY, { headers: getAuthHeaders() });

// --- RECRUITER ---
export const recruiterGet = (endpoint, params = {}) =>
  http.get(`${RECRUITER_BASE}${endpoint}`, {
    params,
    headers: getAuthHeaders(),
  });
export const recruiterPost = (endpoint, data) =>
  http.post(`${RECRUITER_BASE}${endpoint}`, data, {
    headers: getAuthHeaders(),
  });
export const recruiterPut = (endpoint, data) =>
  http.put(`${RECRUITER_BASE}${endpoint}`, data, {
    headers: getAuthHeaders(),
  });
export const recruiterDelete = (endpoint) =>
  http.delete(`${RECRUITER_BASE}${endpoint}`, { headers: getAuthHeaders() });

// --- SAVED JOBS ---
export const getSavedJobsByUser = (userId) =>
  http.get(`${GET_SAVED_JOBS_BY_USER}/${userId}`, {
    headers: getAuthHeaders(),
  });
export const saveJobApi = (userId, jobId) =>
  http.post(`${SAVE_JOB}`, null, {
    params: { userId, jobId },
    headers: getAuthHeaders(),
  });
export const unsaveJobApi = (userId, jobId) =>
  http.delete(`${UNSAVE_JOB}`, {
    params: { userId, jobId },
    headers: getAuthHeaders(),
  });

// --- USER REGISTRATION ---
export const registerUser = (data) => http.post(USER_REGISTER_BASE, data);

// --- USER MANAGEMENT ---
export const getUsers = () =>
  http.get(USERS_BASE, { headers: getAuthHeaders() });
export const getUserById = (id) =>
  http.get(`${GET_USER_BY_ID}/${id}`, { headers: getAuthHeaders() });
export const updateUser = (userId, data) =>
  http.put(`${USERS_BASE}/${userId}`, data, { headers: getAuthHeaders() });
export const deleteUser = (userId) =>
  http.delete(`${USERS_BASE}/${userId}`, { headers: getAuthHeaders() });

// --- EMAIL ---
export const sendEmail = (data) =>
  http.post(EMAIL_SEND, data, { headers: getAuthHeaders() });

// --- ROLE PROFILE ---
export const updateProfile = (data) =>
  http.put(UPDATE_PROFILE, data, { headers: getAuthHeaders() });
export const getProfile = () =>
  http.get(GET_PROFILE, { headers: getAuthHeaders() });
export const getUsersName = () =>
  http.get(GET_USERS_NAME, { headers: getAuthHeaders() });
export const getFullName = () =>
  http.get(GET_NAME, { headers: getAuthHeaders() });

// --- RESUMES ---
export const getResumesByUser = (userId) =>
  http.get(`${GET_RESUMES_BY_USER}/${userId}`, { headers: getAuthHeaders() });
export const uploadResumeApi = (userId, filePath) =>
  http.post(UPLOAD_RESUME, null, {
    params: { userId, filePath },
    headers: getAuthHeaders(),
  });
export const deleteResumeApi = (resumeId) =>
  http.delete(`${DELETE_RESUME}/${resumeId}`, { headers: getAuthHeaders() });
