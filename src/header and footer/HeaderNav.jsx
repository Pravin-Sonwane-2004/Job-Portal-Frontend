import React from 'react';
import { NavLink } from 'react-router-dom';
import { IconBookmark, IconBell, IconMessage, IconCalendarEvent } from '@tabler/icons-react';

function base64UrlDecode(str) {
  try {
    str = str.replace(/-/g, '+').replace(/_/g, '/');
    while (str.length % 4) str += '=';
    return atob(str);
  } catch {
    return '';
  }
}

function parseJwt(token) {
  if (!token) return null;
  try {
    const base64Payload = token.split('.')[1];
    if (!base64Payload) return null;
    const jsonPayload = base64UrlDecode(base64Payload);
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
}

const HeaderNav = ({ mobile = false }) => {
  let token = sessionStorage.getItem('jwt');
  // Handle case where JWT is stored as a JSON object with a 'token' property
  try {
    const parsed = JSON.parse(token);
    if (parsed && parsed.token) {
      token = parsed.token;
    }
  } catch (e) {
    // If not JSON, assume it's a raw JWT string
  }
  const payload = parseJwt(token);
  let roles = [];
  // Try all possible field names for roles
  if (payload) {
    if (payload.roles !== undefined) {
      roles = Array.isArray(payload.roles)
        ? payload.roles
        : [payload.roles];
    } else if (payload.role !== undefined) {
      roles = Array.isArray(payload.role)
        ? payload.role
        : [payload.role];
    } else if (payload.authorities !== undefined) {
      roles = Array.isArray(payload.authorities)
        ? payload.authorities
        : [payload.authorities];
    } else if (payload.userRole !== undefined) {
      roles = Array.isArray(payload.userRole)
        ? payload.userRole
        : [payload.userRole];
    } else if (payload.userRoles !== undefined) {
      roles = Array.isArray(payload.userRoles)
        ? payload.userRoles
        : [payload.userRoles];
    }
  } else {
    roles = [];
  }

  // Remove debug/info logs, only keep critical errors if needed
  // (No logs here unless truly necessary)

  // Robust role checks (case-insensitive, substring match)
  const isAdmin = roles.some(role => role && role.toUpperCase().includes('ADMIN'));
  const isUser = roles.some(role => role && role.toUpperCase().includes('USER'));

  // Responsive classes
  const navClass = mobile
    ? 'flex flex-col gap-4 text-white text-lg'
    : 'flex gap-4 sm:gap-8 text-white text-base sm:text-lg relative';
  const linkClass = ({ isActive }) =>
    `relative pb-2 transition-all ${isActive ? 'text-bright-sun-400' : 'hover:text-bright-sun-400'}` +
    (mobile ? ' text-xl py-2' : '');

  return (
    <nav className={navClass}>
      {/* User important links */}
      {isUser && (
        <>
          <NavLink to="/find-jobs" className={linkClass}>
            {({ isActive }) => (
              <>
                Find Jobs
                <span className={`block h-0.5 bg-bright-sun-400 transition-all duration-300 absolute left-0 right-0 bottom-0 ${isActive ? 'w-full' : 'w-0'}`} />
              </>
            )}
          </NavLink>
          <NavLink to="/resume-builder" className={linkClass}>
            {({ isActive }) => (
              <>
                Resume Builder
                <span className={`block h-0.5 bg-bright-sun-400 transition-all duration-300 absolute left-0 right-0 bottom-0 ${isActive ? 'w-full' : 'w-0'}`} />
              </>
            )}
          </NavLink>
          <NavLink to="/my-applications" className={linkClass}>
            {({ isActive }) => (
              <>
                My Applications
                <span className={`block h-0.5 bg-bright-sun-400 transition-all duration-300 absolute left-0 right-0 bottom-0 ${isActive ? 'w-full' : 'w-0'}`} />
              </>
            )}
          </NavLink>
          <NavLink to="/dashboard" className={linkClass}>
            {({ isActive }) => (
              <>
                Dashboard
                <span className={`block h-0.5 bg-bright-sun-400 transition-all duration-300 absolute left-0 right-0 bottom-0 ${isActive ? 'w-full' : 'w-0'}`} />
              </>
            )}
          </NavLink>
        </>
      )}
      {/* Admin specific links */}
      {isAdmin && (
        <>
          <NavLink to="/all-users" className={linkClass}>
            {({ isActive }) => (
              <>
                All Users
                <span className={`block h-0.5 bg-bright-sun-400 transition-all duration-300 absolute left-0 right-0 bottom-0 ${isActive ? 'w-full' : 'w-0'}`} />
              </>
            )}
          </NavLink>
          <NavLink to="/all-applications" className={linkClass}>
            {({ isActive }) => (
              <>
                All Applications
                <span className={`block h-0.5 bg-bright-sun-400 transition-all duration-300 absolute left-0 right-0 bottom-0 ${isActive ? 'w-full' : 'w-0'}`} />
              </>
            )}
          </NavLink>
          <NavLink to="/find-talent" className={linkClass}>
            {({ isActive }) => (
              <>
                Find Talent
                <span className={`block h-0.5 bg-bright-sun-400 transition-all duration-300 absolute left-0 right-0 bottom-0 ${isActive ? 'w-full' : 'w-0'}`} />
              </>
            )}
          </NavLink>
          <NavLink to="/upload-jobs" className={linkClass}>
            {({ isActive }) => (
              <>
                Upload Job
                <span className={`block h-0.5 bg-bright-sun-400 transition-all duration-300 absolute left-0 right-0 bottom-0 ${isActive ? 'w-full' : 'w-0'}`} />
              </>
            )}
          </NavLink>
        </>
      )}
    </nav>
  );
};

export default HeaderNav;
