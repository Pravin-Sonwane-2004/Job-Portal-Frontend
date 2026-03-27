import http from './http';
import { GET_PROFILE, UPDATE_PROFILE } from './jobPortalApi';

const VERIFY_PROFILE_URL = 'http://localhost:8080/api/user/verify';

export function fetchUserProfile() {
  return http.get(GET_PROFILE, { withCredentials: true });
}

export function updateUserProfile(payload) {
  return http.put(UPDATE_PROFILE, payload, { withCredentials: true });
}

export function requestUserVerification() {
  return http.post(VERIFY_PROFILE_URL, {}, { withCredentials: true });
}
