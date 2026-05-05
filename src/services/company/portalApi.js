// portalApi.js contains API functions for one feature area of the job portal.
import { http } from '../http';

// companyDashboard sends one HTTP request and returns the Axios promise to the page.
export const companyDashboard = () => http.get('/company-portal/dashboard');
// companyGetProfile sends one HTTP request and returns the Axios promise to the page.
export const companyGetProfile = () => http.get('/company-portal/company');
// companyUpdateProfile sends one HTTP request and returns the Axios promise to the page.
export const companyUpdateProfile = (data) => http.put('/company-portal/company', data);
// companyGetEmployees sends one HTTP request and returns the Axios promise to the page.
export const companyGetEmployees = () => http.get('/company-portal/employees');
// companyAddEmployee sends one HTTP request and returns the Axios promise to the page.
export const companyAddEmployee = (data) => http.post('/company-portal/employees', data);
// companyRemoveEmployee sends one HTTP request and returns the Axios promise to the page.
export const companyRemoveEmployee = (id) => http.delete(`/company-portal/employees/${id}`);
// companyGetJobs sends one HTTP request and returns the Axios promise to the page.
export const companyGetJobs = () => http.get('/company-portal/jobs');
// companyCreateJob sends one HTTP request and returns the Axios promise to the page.
export const companyCreateJob = (data) => http.post('/company-portal/jobs', data);
// companyUpdateJob sends one HTTP request and returns the Axios promise to the page.
export const companyUpdateJob = (id, data) => http.put(`/company-portal/jobs/${id}`, data);
// companyDeleteJob sends one HTTP request and returns the Axios promise to the page.
export const companyDeleteJob = (id) => http.delete(`/company-portal/jobs/${id}`);
