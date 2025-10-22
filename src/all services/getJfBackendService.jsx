import axios from "axios";

// --- AUTH ENDPOINTS ---
export const LOGIN_URL = "http://localhost:8080/public/auth/login";
export const REGISTER_URL = "http://localhost:8080/public/auth/register";
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

// --- JOB ALERTS ---
export const JOB_ALERTS_BASE = "http://localhost:8080/api/job-alerts";
export const GET_JOB_ALERTS_BY_USER =
  "http://localhost:8080/api/job-alerts/user"; // + /{userId}
export const CREATE_JOB_ALERT = "http://localhost:8080/api/job-alerts/create";
export const DELETE_JOB_ALERT = "http://localhost:8080/api/job-alerts/delete"; // + /{alertId}

// --- RESUMES ---
export const RESUMES_BASE = "http://localhost:8080/api/resumes";
export const GET_RESUMES_BY_USER = "http://localhost:8080/api/resumes/user"; // + /{userId}
export const UPLOAD_RESUME = "http://localhost:8080/api/resumes/upload";
export const DELETE_RESUME = "http://localhost:8080/api/resumes/delete"; // + /{resumeId}

// --- MESSAGES ---
export const MESSAGES_BASE = "http://localhost:8080/api/messages";
export const GET_SENT_MESSAGES = "http://localhost:8080/api/messages/sent"; // + /{userId}
export const GET_RECEIVED_MESSAGES =
  "http://localhost:8080/api/messages/received"; // + /{userId}
export const GET_CONVERSATION =
  "http://localhost:8080/api/messages/conversation";
export const SEND_MESSAGE = "http://localhost:8080/api/messages/send";
export const DELETE_MESSAGE = "http://localhost:8080/api/messages/delete"; // + /{messageId}

// --- COMPANIES ---
export const COMPANIES_BASE = "http://localhost:8080/api/companies";
export const CREATE_COMPANY =
  "http://localhost:8080/api/companies/create-or-update";
export const DELETE_COMPANY = "http://localhost:8080/api/companies/delete"; // + /{id}
export const GET_COMPANY_BY_ID = "http://localhost:8080/api/companies"; // + /{id}

// --- COMPANY REVIEWS ---
export const COMPANY_REVIEWS_BASE = "http://localhost:8080/api/company-reviews";
export const GET_COMPANY_REVIEWS =
  "http://localhost:8080/api/company-reviews/company"; // + /{companyId}
export const ADD_COMPANY_REVIEW =
  "http://localhost:8080/api/company-reviews/add";
export const DELETE_COMPANY_REVIEW =
  "http://localhost:8080/api/company-reviews/delete"; // + /{reviewId}

// --- INTERVIEWS ---
export const INTERVIEWS_BASE = "http://localhost:8080/api/interviews";
export const GET_INTERVIEWS_BY_USER =
  "http://localhost:8080/api/interviews/user"; // + /{userId}
export const GET_INTERVIEWS_BY_EMPLOYER =
  "http://localhost:8080/api/interviews/employer"; // + /{employerId}
export const GET_INTERVIEWS_BY_APPLICATION =
  "http://localhost:8080/api/interviews/application"; // + /{applicationId}
export const SCHEDULE_INTERVIEW =
  "http://localhost:8080/api/interviews/schedule";
export const UPDATE_INTERVIEW_STATUS =
  "http://localhost:8080/api/interviews/update-status"; // + /{interviewId}
export const DELETE_INTERVIEW = "http://localhost:8080/api/interviews/delete"; // + /{interviewId}

// --- GENERIC AXIOS CALLS ---
const getAuthHeaders = () => {
  const token = sessionStorage.getItem("jwt");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Example: Public jobs
export const getJobs = (params = {}) => {
  return axios.get(GET_JOBS_PUBLIC, {
    params,
    headers: getAuthHeaders(),
  });
};

// --- ADMIN ---
export const adminGetAllUsers = () =>
  axios.get(ADMIN_GET_ALL_USERS, { headers: getAuthHeaders() });
export const adminDeleteUser = (username) =>
  axios.delete(`${ADMIN_DELETE_USER}/${username}`, {
    headers: getAuthHeaders(),
  });
export const adminUpdateUser = (username, data) =>
  axios.put(`${ADMIN_UPDATE_USER}/${username}`, data, {
    headers: getAuthHeaders(),
  });
export const adminCreateJob = (data) =>
  axios.post(ADMIN_CREATE_JOB, data, { headers: getAuthHeaders() });
export const adminBulkCreateJobs = (data) =>
  axios.post(ADMIN_BULK_CREATE_JOBS, data, { headers: getAuthHeaders() });
export const adminDeleteJob = (jobId) =>
  axios.delete(`${ADMIN_DELETE_JOB}/${jobId}`, { headers: getAuthHeaders() });
export const adminUpdateJob = (jobId, data) =>
  axios.put(`${ADMIN_UPDATE_JOB}/${jobId}`, data, {
    headers: getAuthHeaders(),
  });
export const adminDeleteAllJobs = () =>
  axios.delete(ADMIN_DELETE_ALL_JOBS, { headers: getAuthHeaders() });
export const adminGetAllApplications = () =>
  axios.get(ADMIN_GET_ALL_APPLICATIONS, { headers: getAuthHeaders() });
export const adminGetAllApplicationsWithProfiles = () =>
  axios.get(ADMIN_GET_ALL_APPLICATIONS_WITH_PROFILES, {
    headers: getAuthHeaders(),
  });
export const adminGetAllAppliers = () =>
  axios.get(ADMIN_GET_ALL_APPLIERS, { headers: getAuthHeaders() });
export const adminGetApplicationsForJob = (jobId) =>
  axios.get(`${ADMIN_GET_APPLICATIONS_FOR_JOB}/${jobId}`, {
    headers: getAuthHeaders(),
  });
export const adminGetApplicationsByUser = (userId) =>
  axios.get(`${ADMIN_GET_APPLICATIONS_BY_USER}/${userId}`, {
    headers: getAuthHeaders(),
  });
export const adminCreateAdminUser = (data) =>
  axios.post(ADMIN_CREATE_ADMIN_USER, data, { headers: getAuthHeaders() });

// --- USER ---
export const userGetPaginatedJobs = (params = {}) =>
  axios.get(USER_PAGINATION_URL, { params, headers: getAuthHeaders() });
export const userUploadJobs = (data) =>
  axios.post(USER_UPLOAD_JOBS, data, { headers: getAuthHeaders() });
export const userGetJobs = () =>
  axios.get(USER_GET_JOBS, { headers: getAuthHeaders() });
export const userGetJobById = (id) =>
  axios.get(`${USER_GET_JOB_BY_ID}/${id}`, { headers: getAuthHeaders() });
export const userGetJobsSorted = () =>
  axios.get(USER_GET_JOBS_SORTED, { headers: getAuthHeaders() });

// --- JOB APPLICATIONS ---
export const applyToJob = (jobId) =>
  axios.post(APPLY_JOB, null, { params: { jobId }, headers: getAuthHeaders() });
export const getMyAppliedJobs = () =>
  axios.get(GET_MY_APPLIED_JOBS_DTO, { headers: getAuthHeaders() });
export const getMyAppliedJobsDTO = () =>
  axios.get(GET_MY_APPLIED_JOBS_DTO, { headers: getAuthHeaders() });
export const cancelApplication = (jobId) =>
  axios.delete(CANCEL_APPLICATION, {
    params: { jobId },
    headers: getAuthHeaders(),
  });
export const deleteApplicationById = (applicationId) =>
  axios.delete(`http://localhost:8080/apply/applications/${applicationId}`, {
    headers: getAuthHeaders(),
  });
export const updateApplicationById = (applicationId, updates) =>
  axios.put(
    `http://localhost:8080/apply/applications/${applicationId}`,
    updates,
    { headers: getAuthHeaders() }
  );
export const adminGetAllApplicationsApply = () =>
  axios.get(ADMIN_GET_ALL_APPLICATIONS_APPLY, { headers: getAuthHeaders() });

// --- RECRUITER ---
export const recruiterGet = (endpoint, params = {}) =>
  axios.get(`${RECRUITER_BASE}${endpoint}`, {
    params,
    headers: getAuthHeaders(),
  });
export const recruiterPost = (endpoint, data) =>
  axios.post(`${RECRUITER_BASE}${endpoint}`, data, {
    headers: getAuthHeaders(),
  });
export const recruiterPut = (endpoint, data) =>
  axios.put(`${RECRUITER_BASE}${endpoint}`, data, {
    headers: getAuthHeaders(),
  });
export const recruiterDelete = (endpoint) =>
  axios.delete(`${RECRUITER_BASE}${endpoint}`, { headers: getAuthHeaders() });

// --- SAVED JOBS ---
export const getSavedJobsByUser = (userId) =>
  axios.get(`${GET_SAVED_JOBS_BY_USER}/${userId}`, {
    headers: getAuthHeaders(),
  });
export const saveJobApi = (userId, jobId) =>
  axios.post(`${SAVE_JOB}`, null, {
    params: { userId, jobId },
    headers: getAuthHeaders(),
  });
export const unsaveJobApi = (userId, jobId) =>
  axios.delete(`${UNSAVE_JOB}`, {
    params: { userId, jobId },
    headers: getAuthHeaders(),
  });

// --- USER REGISTRATION ---
export const registerUser = (data) => axios.post(USER_REGISTER_BASE, data);

// --- USER MANAGEMENT ---
export const getUsers = () =>
  axios.get(USERS_BASE, { headers: getAuthHeaders() });
export const getUserById = (id) =>
  axios.get(`${GET_USER_BY_ID}/${id}`, { headers: getAuthHeaders() });
export const updateUser = (userId, data) =>
  axios.put(`${USERS_BASE}/${userId}`, data, { headers: getAuthHeaders() });
export const deleteUser = (userId) =>
  axios.delete(`${USERS_BASE}/${userId}`, { headers: getAuthHeaders() });

// --- EMAIL ---
export const sendEmail = (data) =>
  axios.post(EMAIL_SEND, data, { headers: getAuthHeaders() });

// --- ROLE PROFILE ---
export const updateProfile = (data) =>
  axios.put(UPDATE_PROFILE, data, { headers: getAuthHeaders() });
export const getProfile = () =>
  axios.get(GET_PROFILE, { headers: getAuthHeaders() });
export const getUsersName = () =>
  axios.get(GET_USERS_NAME, { headers: getAuthHeaders() });
export const getFullName = () =>
  axios.get(GET_NAME, { headers: getAuthHeaders() });

// --- JOB ALERTS ---
export const getJobAlertsByUser = (userId) =>
  axios.get(`${GET_JOB_ALERTS_BY_USER}/${userId}`, {
    headers: getAuthHeaders(),
  });
export const createJobAlertApi = (userId, criteria) =>
  axios.post(CREATE_JOB_ALERT, null, {
    params: { userId, criteria },
    headers: getAuthHeaders(),
  });
export const deleteJobAlertApi = (alertId) =>
  axios.delete(`${DELETE_JOB_ALERT}/${alertId}`, { headers: getAuthHeaders() });

// --- RESUMES ---
export const getResumesByUser = (userId) =>
  axios.get(`${GET_RESUMES_BY_USER}/${userId}`, { headers: getAuthHeaders() });
export const uploadResumeApi = (userId, filePath) =>
  axios.post(UPLOAD_RESUME, null, {
    params: { userId, filePath },
    headers: getAuthHeaders(),
  });
export const deleteResumeApi = (resumeId) =>
  axios.delete(`${DELETE_RESUME}/${resumeId}`, { headers: getAuthHeaders() });

// --- MESSAGES ---
export const getSentMessages = (userId) =>
  axios.get(`${GET_SENT_MESSAGES}/${userId}`, { headers: getAuthHeaders() });
export const getReceivedMessages = (userId) =>
  axios.get(`${GET_RECEIVED_MESSAGES}/${userId}`, {
    headers: getAuthHeaders(),
  });
export const getConversation = (senderId, receiverId) =>
  axios.get(GET_CONVERSATION, {
    params: { senderId, receiverId },
    headers: getAuthHeaders(),
  });
export const sendMessageApi = (senderId, receiverId, content) =>
  axios.post(SEND_MESSAGE, null, {
    params: { senderId, receiverId, content },
    headers: getAuthHeaders(),
  });
export const deleteMessageApi = (messageId) =>
  axios.delete(`${DELETE_MESSAGE}/${messageId}`, { headers: getAuthHeaders() });

// --- COMPANIES ---
export const getCompanies = () =>
  axios.get(COMPANIES_BASE, { headers: getAuthHeaders() });
export const createCompanyApi = (company) =>
  axios.post(CREATE_COMPANY, company, { headers: getAuthHeaders() });
export const deleteCompanyApi = (id) =>
  axios.delete(`${DELETE_COMPANY}/${id}`, { headers: getAuthHeaders() });
export const getCompanyById = (id) =>
  axios.get(`${GET_COMPANY_BY_ID}/${id}`, { headers: getAuthHeaders() });

// --- COMPANY REVIEWS ---
export const getCompanyReviewsApi = (companyId) =>
  axios.get(`${GET_COMPANY_REVIEWS}/${companyId}`, {
    headers: getAuthHeaders(),
  });
export const addCompanyReviewApi = (companyId, userId, content, rating) =>
  axios.post(ADD_COMPANY_REVIEW, null, {
    params: { companyId, userId, content, rating },
    headers: getAuthHeaders(),
  });
export const deleteCompanyReviewApi = (reviewId) =>
  axios.delete(`${DELETE_COMPANY_REVIEW}/${reviewId}`, {
    headers: getAuthHeaders(),
  });

// --- INTERVIEWS ---
export const getInterviewsByUser = (userId) =>
  axios.get(`${GET_INTERVIEWS_BY_USER}/${userId}`, {
    headers: getAuthHeaders(),
  });
export const getInterviewsByEmployer = (employerId) =>
  axios.get(`${GET_INTERVIEWS_BY_EMPLOYER}/${employerId}`, {
    headers: getAuthHeaders(),
  });
export const getInterviewsByApplication = (applicationId) =>
  axios.get(`${GET_INTERVIEWS_BY_APPLICATION}/${applicationId}`, {
    headers: getAuthHeaders(),
  });
export const scheduleInterviewApi = (
  userId,
  employerId,
  applicationId,
  dateTime
) =>
  axios.post(SCHEDULE_INTERVIEW, null, {
    params: { userId, employerId, applicationId, dateTime },
    headers: getAuthHeaders(),
  });
export const updateInterviewStatusApi = (interviewId, status) =>
  axios.put(`${UPDATE_INTERVIEW_STATUS}/${interviewId}`, null, {
    params: { status },
    headers: getAuthHeaders(),
  });
export const deleteInterviewApi = (interviewId) =>
  axios.delete(`${DELETE_INTERVIEW}/${interviewId}`, {
    headers: getAuthHeaders(),
  });
