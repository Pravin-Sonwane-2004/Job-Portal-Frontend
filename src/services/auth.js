// auth.js stores login data and provides helper functions for checking user roles.
const USER_KEY = 'currentUser';
const SESSION_EVENT = 'sessionchange';

// Read the saved user from sessionStorage.
export function getCurrentUser() {
  const value = sessionStorage.getItem(USER_KEY);
  if (!value) return null;

  // If stored data is broken, return null instead of crashing the app.
  try { return JSON.parse(value); } catch { return null; }
}

// Save login data after a successful login or signup.
export function setCurrentUser(user) {
  // Some backend responses wrap the real user inside a "user" property.
  const normalized = user?.user
    ? { ...user.user, token: user.token || user.user.token }
    : user;
  sessionStorage.setItem(USER_KEY, JSON.stringify(normalized));

  // Tell the rest of the app that login state changed.
  window.dispatchEvent(new Event(SESSION_EVENT));
}

// Remove saved login data during logout or expired sessions.
export function clearCurrentUser() {
  sessionStorage.removeItem(USER_KEY);
  window.dispatchEvent(new Event(SESSION_EVENT));
}

// Let components subscribe to login/logout changes.
export function onSessionChange(listener) {
  window.addEventListener('storage', listener);
  window.addEventListener(SESSION_EVENT, listener);

  // Return a cleanup function so React components can unsubscribe safely.
  return () => {
    window.removeEventListener('storage', listener);
    window.removeEventListener(SESSION_EVENT, listener);
  };
}

// Role helpers keep role-checking logic readable in components and routes.
export function isAdmin(user) {
  return String(user?.role || '').toUpperCase() === 'ADMIN';
}

export function isUser(user) {
  return String(user?.role || '').toUpperCase() === 'USER';
}

export function isRecruiter(user) {
  return String(user?.role || '').toUpperCase() === 'RECRUITER';
}

export function isCompanyAdmin(user) {
  return String(user?.role || '').toUpperCase() === 'COMPANY_ADMIN';
}

export function isCompanyEmployee(user) {
  return String(user?.role || '').toUpperCase() === 'COMPANY_EMPLOYEE';
}

export function isCompanyUser(user) {
  return isCompanyAdmin(user) || isCompanyEmployee(user);
}

// After login, send each role to the page that matters most for that role.
export function getDefaultPortal(user) {
  const role = String(user?.role || '').toUpperCase();
  if (role === 'ADMIN') return '/admin';
  if (role === 'RECRUITER') return '/recruiter';
  if (role === 'COMPANY_ADMIN' || role === 'COMPANY_EMPLOYEE') return '/company';
  if (role === 'USER') return '/dashboard';
  return '/find-jobs';
}

// Pick the best name available for the header/profile area.
export function getDisplayName(user) {
  return user?.name || user?.email || 'User';
}

// Convert backend role codes into user-friendly labels.
export function getRoleLabel(user) {
  const role = String(user?.role || '').toUpperCase();
  if (role === 'ADMIN') return 'Admin';
  if (role === 'RECRUITER') return 'Recruiter';
  if (role === 'COMPANY_ADMIN') return 'Company Admin';
  if (role === 'COMPANY_EMPLOYEE') return 'Company Employee';
  if (role === 'USER') return 'Candidate';
  return 'Guest';
}
