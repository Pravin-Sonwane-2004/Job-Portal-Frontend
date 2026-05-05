// applicationsApi.js contains API functions for one feature area of the job portal.
import { http } from '../http';

// adminGetApplications sends one HTTP request and returns the Axios promise to the page.
export const adminGetApplications = () => http.get('/admin/applications');
// adminGetApplicationsForJob sends one HTTP request and returns the Axios promise to the page.
export const adminGetApplicationsForJob = (jobId) => http.get(`/admin/applications/job/${jobId}`);
// adminGetApplicationsByUser sends one HTTP request and returns the Axios promise to the page.
export const adminGetApplicationsByUser = (userId) => http.get(`/admin/applications/user/${userId}`);
// adminGetAllAppliers sends one HTTP request and returns the Axios promise to the page.
export const adminGetAllAppliers = () => http.get('/admin/admin/all-appliers');
