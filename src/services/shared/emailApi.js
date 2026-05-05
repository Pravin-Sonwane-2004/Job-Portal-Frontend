import { http } from '../http';

export const sendEmail = (data) => http.post('/email/send', data);
