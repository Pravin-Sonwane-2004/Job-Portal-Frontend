import http from './http';
import { LOGIN_URL, REGISTER_URL } from './jobPortalApi';

export function loginUser(payload) {
  return http.post(LOGIN_URL, payload, {
    headers: { 'Content-Type': 'application/json' },
  });
}

export function registerUserAccount(payload) {
  return http.post(REGISTER_URL, payload, {
    headers: { 'Content-Type': 'application/json' },
  });
}
