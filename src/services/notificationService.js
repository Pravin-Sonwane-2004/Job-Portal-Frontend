import http from './http';

export function fetchNotifications() {
  return http.get('/api/notifications', { withCredentials: true });
}

export function markAllNotificationsRead() {
  return http.post('/api/notifications/mark-all-read', {}, { withCredentials: true });
}

export function markNotificationRead(id) {
  return http.post(`/api/notifications/${id}/mark-read`, {}, { withCredentials: true });
}

export function clearNotifications() {
  return http.delete('/api/notifications/clear-all', { withCredentials: true });
}
