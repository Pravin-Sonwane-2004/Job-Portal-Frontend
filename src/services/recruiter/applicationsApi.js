// applicationsApi.js contains API functions for one feature area of the job portal.
import { http } from '../http';

// recruiterGetApplications sends one HTTP request and returns the Axios promise to the page.
export const recruiterGetApplications = () => http.get('/recruiter/applications');
// recruiterGetApplicationsForJob sends one HTTP request and returns the Axios promise to the page.
export const recruiterGetApplicationsForJob = (jobId) => http.get(`/recruiter/jobs/${jobId}/applications`);
// recruiterUpdateApplication sends one HTTP request and returns the Axios promise to the page.
export const recruiterUpdateApplication = (applicationId, data) => http.put(`/recruiter/applications/${applicationId}`, data);
