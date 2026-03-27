import axios from 'axios';

const http = axios.create();

http.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('jwt');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default http;
