import http from './http';

const TALENTS_URL = 'http://localhost:8080/api/talents';

export function fetchTalents() {
  return http.get(TALENTS_URL, { withCredentials: true });
}
