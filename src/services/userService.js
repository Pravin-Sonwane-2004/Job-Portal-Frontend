import http from './http';
import { GET_NAME } from './jobPortalApi';

export function fetchCurrentUserName(userId) {
  return http.get(GET_NAME, { params: { userId } });
}
