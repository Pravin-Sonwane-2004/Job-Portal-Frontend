import { parseJwt } from '@/utils/jwtUtils';

const sessionRoleKeys = ['roles', 'role', 'authorities', 'userRole', 'userRoles'];

function normalizeRole(role) {
  return String(role || '')
    .trim()
    .toUpperCase();
}

export function getSessionPayload(token) {
  return parseJwt(token);
}

export function getUserRoles(tokenOrPayload) {
  const payload =
    typeof tokenOrPayload === 'string' ? getSessionPayload(tokenOrPayload) : tokenOrPayload;

  if (!payload) {
    return [];
  }

  const roles = sessionRoleKeys.flatMap((key) => {
    const roleValue = payload[key];

    if (roleValue === undefined || roleValue === null) {
      return [];
    }

    return Array.isArray(roleValue) ? roleValue : [roleValue];
  });

  return [...new Set(roles.map(normalizeRole).filter(Boolean))];
}

export function hasRequiredRole(roles, requiredRoles) {
  const expectedRoles = (requiredRoles || []).map(normalizeRole);

  return expectedRoles.some((expectedRole) =>
    roles.some(
      (role) =>
        role === expectedRole ||
        role === `ROLE_${expectedRole}` ||
        role.replace(/^ROLE_/, '') === expectedRole.replace(/^ROLE_/, '')
    )
  );
}

export function isSessionTokenValid(token) {
  const payload = getSessionPayload(token);

  if (!payload?.exp) {
    return false;
  }

  return payload.exp * 1000 > Date.now();
}

export function getDisplayNameFromPayload(payload) {
  return payload?.name || payload?.username || payload?.email || 'User';
}

export function getRoleLabel({ isAdmin, isUser }) {
  if (isAdmin) {
    return 'Administrator';
  }

  if (isUser) {
    return 'Candidate';
  }

  return 'Guest';
}

export function getSessionIdentity(token, resolvedName = '') {
  const payload = getSessionPayload(token);
  const roles = getUserRoles(payload);
  const isAdmin = hasRequiredRole(roles, ['ADMIN']);
  const isUser = hasRequiredRole(roles, ['USER']);
  const displayName = resolvedName || getDisplayNameFromPayload(payload);

  return {
    payload,
    roles,
    isAuthenticated: Boolean(token),
    isAdmin,
    isUser,
    displayName,
    roleLabel: getRoleLabel({ isAdmin, isUser }),
  };
}
