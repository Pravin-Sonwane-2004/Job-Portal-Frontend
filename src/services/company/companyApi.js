import { http } from '../http';

export const registerCompany = (payload) => http.post('/public/company/signup', payload);
export const getCompanies = () => http.get('/api/companies');
export const getCompanyById = (id) => http.get(`/api/companies/${id}`);
export const getCompanyReviews = (companyId) => http.get(`/api/company-reviews/company/${companyId}`);
export const addCompanyReview = (companyId, data) => http.post(`/api/company-reviews/company/${companyId}`, data);
