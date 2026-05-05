import { http } from '../http';

export const adminGetApplications = () => http.get('/admin/applications');
export const adminGetApplicationsForJob = (jobId) => http.get(`/admin/applications/job/${jobId}`);
export const adminGetApplicationsByUser = (userId) => http.get(`/admin/applications/user/${userId}`);
export const adminGetAllAppliers = () => http.get('/admin/admin/all-appliers');
