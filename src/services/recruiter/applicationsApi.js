import { http } from '../http';

export const recruiterGetApplications = () => http.get('/recruiter/applications');
export const recruiterGetApplicationsForJob = (jobId) => http.get(`/recruiter/jobs/${jobId}/applications`);
export const recruiterUpdateApplication = (applicationId, data) => http.put(`/recruiter/applications/${applicationId}`, data);
