import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { clearSessionToken, getSessionToken } from './services/sessionService';
import {
  getUserRoles,
  hasRequiredRole,
  isSessionTokenValid,
} from './services/sessionIdentityService';

const ProtectedRoute = ({ children, requiredRole, requiredRoles }) => {
  const token = getSessionToken();
  const location = useLocation();

  if (!isSessionTokenValid(token)) {
    clearSessionToken();
    return <Navigate to="/signin" replace />;
  }

  const roles = getUserRoles(token);

  if (requiredRoles && Array.isArray(requiredRoles)) {
    if (!hasRequiredRole(roles, requiredRoles)) {
      return <Navigate to="/" replace state={{ from: location }} />;
    }
  } else if (requiredRole) {
    if (!hasRequiredRole(roles, [requiredRole])) {
      return <Navigate to="/" replace state={{ from: location }} />;
    }
  }

  return children;
};

export default ProtectedRoute;
