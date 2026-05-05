// jobsApi.js contains API functions for one feature area of the job portal.
import { http } from '../http';

// Get all jobs created by the logged-in recruiter.
export const recruiterGetJobs = () => {
  return http.get('/recruiter/jobs');
};

// Create a new job using the form data from the recruiter page.
export const recruiterCreateJob = (data) => {
  return http.post('/recruiter/jobs', data);
};

// Get one job by id. This is used for details or edit screens.
export const recruiterGetJobById = (id) => {
  return http.get(`/recruiter/jobs/${id}`);
};

// Update one job by id with the edited form data.
export const recruiterUpdateJob = (id, data) => {
  return http.put(`/recruiter/jobs/${id}`, data);
};

// Delete one job by id.
export const recruiterDeleteJob = (id) => {
  return http.delete(`/recruiter/jobs/${id}`);
};
