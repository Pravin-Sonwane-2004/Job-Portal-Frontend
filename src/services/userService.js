import http from './http';
import { GET_NAME } from './jobPortalApi';

export function fetchCurrentUserName() {
  return http.get(GET_NAME, { withCredentials: true });
}
