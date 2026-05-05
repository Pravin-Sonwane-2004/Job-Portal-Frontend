import { http } from '../http';

export const companyDashboard = () => http.get('/company-portal/dashboard');
export const companyGetProfile = () => http.get('/company-portal/company');
export const companyUpdateProfile = (data) => http.put('/company-portal/company', data);
export const companyGetEmployees = () => http.get('/company-portal/employees');
export const companyAddEmployee = (data) => http.post('/company-portal/employees', data);
export const companyRemoveEmployee = (id) => http.delete(`/company-portal/employees/${id}`);
export const companyGetJobs = () => http.get('/company-portal/jobs');
export const companyCreateJob = (data) => http.post('/company-portal/jobs', data);
export const companyUpdateJob = (id, data) => http.put(`/company-portal/jobs/${id}`, data);
export const companyDeleteJob = (id) => http.delete(`/company-portal/jobs/${id}`);
