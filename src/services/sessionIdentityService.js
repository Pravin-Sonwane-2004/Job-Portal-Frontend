function normalizeRole(role) {
  return String(role || '').trim().toUpperCase();
}

export function hasRole(role, allowedRoles) {
  const currentRole = normalizeRole(role);
  return allowedRoles.some((allowedRole) => normalizeRole(allowedRole) === currentRole);
}

export function getRoleLabel(role) {
  if (hasRole(role, ['ADMIN'])) {
    return 'Administrator';
  }

  if (hasRole(role, ['USER'])) {
    return 'Candidate';
  }

  if (hasRole(role, ['RECRUITER'])) {
    return 'Recruiter';
  }

  return 'Guest';
}

export function getSessionIdentity(user) {
  const role = user?.role || 'USER';

  return {
    user,
    isAuthenticated: Boolean(user),
    isAdmin: hasRole(role, ['ADMIN']),
    isUser: hasRole(role, ['USER']),
    displayName: user?.name || user?.email || 'User',
    roleLabel: getRoleLabel(role),
  };
}
