const USER_KEY = 'currentUser';
const SESSION_EVENT = 'sessionchange';

export function getCurrentUser() {
  const value = sessionStorage.getItem(USER_KEY);
  if (!value) return null;
  try { return JSON.parse(value); } catch { return null; }
}

export function setCurrentUser(user) {
  const normalized = user?.user
    ? { ...user.user, token: user.token || user.user.token }
    : user;
  sessionStorage.setItem(USER_KEY, JSON.stringify(normalized));
  window.dispatchEvent(new Event(SESSION_EVENT));
}

export function clearCurrentUser() {
  sessionStorage.removeItem(USER_KEY);
  window.dispatchEvent(new Event(SESSION_EVENT));
}

export function onSessionChange(listener) {
  window.addEventListener('storage', listener);
  window.addEventListener(SESSION_EVENT, listener);
  return () => {
    window.removeEventListener('storage', listener);
    window.removeEventListener(SESSION_EVENT, listener);
  };
}

export function isAdmin(user) {
  return String(user?.role || '').toUpperCase() === 'ADMIN';
}

export function isUser(user) {
  return String(user?.role || '').toUpperCase() === 'USER';
}

export function isRecruiter(user) {
  return String(user?.role || '').toUpperCase() === 'RECRUITER';
}

export function getDefaultPortal(user) {
  const role = String(user?.role || '').toUpperCase();
  if (role === 'ADMIN') return '/admin';
  if (role === 'RECRUITER') return '/recruiter';
  if (role === 'USER') return '/dashboard';
  return '/find-jobs';
}

export function getDisplayName(user) {
  return user?.name || user?.email || 'User';
}

export function getRoleLabel(user) {
  const role = String(user?.role || '').toUpperCase();
  if (role === 'ADMIN') return 'Admin';
  if (role === 'RECRUITER') return 'Recruiter';
  if (role === 'USER') return 'Candidate';
  return 'Guest';
}
