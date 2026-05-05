// companyApi.js contains API functions for one feature area of the job portal.
import { http } from '../http';

// registerCompany sends one HTTP request and returns the Axios promise to the page.
export const registerCompany = (payload) => http.post('/public/company/signup', payload);
// getCompanies sends one HTTP request and returns the Axios promise to the page.
export const getCompanies = () => http.get('/api/companies');
// getCompanyById sends one HTTP request and returns the Axios promise to the page.
export const getCompanyById = (id) => http.get(`/api/companies/${id}`);
// getCompanyReviews sends one HTTP request and returns the Axios promise to the page.
export const getCompanyReviews = (companyId) => http.get(`/api/company-reviews/company/${companyId}`);
// addCompanyReview sends one HTTP request and returns the Axios promise to the page.
export const addCompanyReview = (companyId, data) => http.post(`/api/company-reviews/company/${companyId}`, data);
