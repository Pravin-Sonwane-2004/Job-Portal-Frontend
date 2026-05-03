const SESSION_EVENT = 'sessionchange';
const USER_KEY = 'currentUser';

export function getCurrentUser() {
  const value = sessionStorage.getItem(USER_KEY);

  if (!value) {
    return null;
  }

  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}

export function setCurrentUser(user) {
  sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  window.dispatchEvent(new Event(SESSION_EVENT));
}

export function clearCurrentUser() {
  sessionStorage.removeItem(USER_KEY);
  window.dispatchEvent(new Event(SESSION_EVENT));
}

export function subscribeToSessionChange(listener) {
  window.addEventListener('storage', listener);
  window.addEventListener(SESSION_EVENT, listener);

  return () => {
    window.removeEventListener('storage', listener);
    window.removeEventListener(SESSION_EVENT, listener);
  };
}
