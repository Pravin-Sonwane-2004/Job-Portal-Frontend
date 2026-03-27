import { NavLink } from 'react-router-dom';

import { getSessionToken } from '../services/sessionService';
import { parseJwt } from '../utils/jwtUtils';

const userLinks = [
  { to: '/find-jobs', label: 'Find Jobs' },
  { to: '/resume-builder', label: 'Resume Builder' },
  { to: '/my-applications', label: 'My Applications' },
  { to: '/dashboard', label: 'Dashboard' },
];

const adminLinks = [
  { to: '/all-users', label: 'All Users' },
  { to: '/all-applications', label: 'All Applications' },
  { to: '/find-talent', label: 'Find Talent' },
  { to: '/upload-jobs', label: 'Upload Job' },
];

const getRoles = (payload) => {
  if (!payload) {
    return [];
  }

  if (payload.roles !== undefined) {
    return Array.isArray(payload.roles) ? payload.roles : [payload.roles];
  }

  if (payload.role !== undefined) {
    return Array.isArray(payload.role) ? payload.role : [payload.role];
  }

  if (payload.authorities !== undefined) {
    return Array.isArray(payload.authorities)
      ? payload.authorities
      : [payload.authorities];
  }

  if (payload.userRole !== undefined) {
    return Array.isArray(payload.userRole)
      ? payload.userRole
      : [payload.userRole];
  }

  if (payload.userRoles !== undefined) {
    return Array.isArray(payload.userRoles)
      ? payload.userRoles
      : [payload.userRoles];
  }

  return [];
};

const HeaderNav = ({ mobile = false }) => {
  const payload = parseJwt(getSessionToken());
  const roles = getRoles(payload);
  const isAdmin = roles.some((role) => role && role.toUpperCase().includes('ADMIN'));
  const isUser = roles.some((role) => role && role.toUpperCase().includes('USER'));

  const navClass = mobile
    ? 'flex flex-col gap-3 text-slate-900 dark:text-slate-100'
    : 'flex gap-4 text-sm font-medium text-slate-900 dark:text-slate-100 sm:gap-8';

  const getLinkClass = (isActive) =>
    [
      'relative rounded-lg px-1 py-2 transition-colors',
      mobile ? 'text-base' : 'text-sm sm:text-base',
      isActive
        ? 'text-indigo-600 dark:text-indigo-400'
        : 'hover:text-indigo-600 dark:hover:text-indigo-400',
    ].join(' ');

  const renderLink = (link) => (
    <NavLink key={link.to} to={link.to} className={({ isActive }) => getLinkClass(isActive)}>
      {({ isActive }) => (
        <>
          {link.label}
          {!mobile && (
            <span
              className={`absolute inset-x-0 -bottom-0.5 h-0.5 rounded-full bg-indigo-600 transition-opacity dark:bg-indigo-400 ${
                isActive ? 'opacity-100' : 'opacity-0'
              }`}
            />
          )}
        </>
      )}
    </NavLink>
  );

  return (
    <nav className={navClass}>
      {isUser && userLinks.map(renderLink)}
      {isAdmin && adminLinks.map(renderLink)}
    </nav>
  );
};

export default HeaderNav;
