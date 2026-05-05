import { http } from '../http';

export const getPublicJobs = (params) => http.get('/public/jobs/paginated', { params });
