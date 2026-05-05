// emailApi.js contains API functions for one feature area of the job portal.
import { http } from '../http';

// sendEmail sends one HTTP request and returns the Axios promise to the page.
export const sendEmail = (data) => http.post('/email/send', data);
