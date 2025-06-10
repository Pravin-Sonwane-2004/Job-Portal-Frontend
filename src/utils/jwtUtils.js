export function parseJwt(token) {
  if (!token) return null;
  try {
    let base64 = token.split('.')[1];
    base64 = base64.replace(/-/g, '+').replace(/_/g, '/');
    while (base64.length % 4) base64 += '=';
    return JSON.parse(atob(base64));
  } catch {
    return null;
  }
}

export function getUserIdFromJwt() {
  const token = sessionStorage.getItem('jwt');
  const payload = parseJwt(token);
  return (
    payload?.id ||
    payload?.userId ||
    payload?.userid ||
    payload?.user_id ||
    payload?.sub ||
    null
  );
}
