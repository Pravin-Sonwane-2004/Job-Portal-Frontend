import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

// Decode base64url string
function base64UrlDecode(str) {
  try {
    str = str.replace(/-/g, '+').replace(/_/g, '/');
    while (str.length % 4) str += '=';
    return atob(str);
  } catch {
    return '';
  }
}

// Parse JWT and return payload
function parseJwt(token) {
  if (!token) return null;
  try {
    const base64Payload = token.split('.')[1];
    if (!base64Payload) return null;
    const jsonPayload = base64UrlDecode(base64Payload);
    return JSON.parse(jsonPayload); // ✅ fixed this line
  } catch {
    return null;
  }
}

// Check if JWT is not expired
function isTokenValid(token) {
  if (!token) return false;
  const payload = parseJwt(token);
  if (!payload || !payload.exp) return false;
  return payload.exp * 1000 > Date.now();
}

// Main protected route logic
const ProtectedRoute = ({ children, requiredRole, requiredRoles }) => {
  const token = sessionStorage.getItem('jwt');
  const location = useLocation();

  if (!isTokenValid(token)) {
    sessionStorage.removeItem('jwt');
    return <Navigate to="/signin" replace />;
  }

  const payload = parseJwt(token);
  let roles = [];
  if (payload?.roles !== undefined) {
    roles = Array.isArray(payload.roles)
      ? payload.roles
      : [payload.roles];
  } else if (payload?.role !== undefined) {
    roles = Array.isArray(payload.role)
      ? payload.role
      : [payload.role];
  } else if (payload?.authorities !== undefined) {
    roles = Array.isArray(payload.authorities)
      ? payload.authorities
      : [payload.authorities];
  }

  // Support both requiredRole (string) and requiredRoles (array)
  if (requiredRoles && Array.isArray(requiredRoles)) {
    const hasAnyRole = requiredRoles.some(
      (reqRole) => roles.includes(reqRole) || roles.includes(`ROLE_${reqRole}`)
    );
    if (!hasAnyRole) {
      return <Navigate to="/" replace state={{ from: location }} />;
    }
  } else if (requiredRole) {
    const hasRole = roles.some(
      (role) => role === requiredRole || role === `ROLE_${requiredRole}`
    );
    if (!hasRole) {
      return <Navigate to="/" replace state={{ from: location }} />;
    }
  }

  return children;
};

export default ProtectedRoute;
