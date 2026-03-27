const SESSION_EVENT = 'sessionchange';
const TOKEN_KEY = 'jwt';

export function getSessionToken() {
  return sessionStorage.getItem(TOKEN_KEY);
}

export function setSessionToken(token) {
  sessionStorage.setItem(TOKEN_KEY, token);
  window.dispatchEvent(new Event(SESSION_EVENT));
}

export function clearSessionToken() {
  sessionStorage.removeItem(TOKEN_KEY);
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
