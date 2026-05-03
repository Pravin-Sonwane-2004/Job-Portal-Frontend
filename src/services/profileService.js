import http from './http';
import { GET_PROFILE, UPDATE_PROFILE } from './jobPortalApi';

const VERIFY_PROFILE_URL = 'http://localhost:8080/api/user/verify';

export function fetchUserProfile(userId) {
  return http.get(GET_PROFILE, { params: { userId } });
}

export function updateUserProfile(userId, payload) {
  return http.put(UPDATE_PROFILE, payload, { params: { userId } });
}

export function requestUserVerification() {
  return http.post(VERIFY_PROFILE_URL, {}, { withCredentials: true });
}
