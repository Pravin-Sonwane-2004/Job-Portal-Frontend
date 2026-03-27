import { IconBriefcaseFilled } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import HeaderNav from './HeaderNav';
import HeaderUserSection from './HeaderUserSection';
import useSessionToken from '../hooks/useSessionToken';
import { fetchCurrentUserName } from '../services/userService';
import { parseJwt } from '../utils/jwtUtils';

const getRoles = (token) => {
  const payload = parseJwt(token);

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

  return [];
};

const hasRole = (roles, targetRoles) =>
  roles.some((role) => targetRoles.includes(role));

const Header = () => {
  const navigate = useNavigate();
  const jwt = useSessionToken();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userName, setUserName] = useState('');

  const roles = getRoles(jwt);
  const isLoggedIn = Boolean(jwt);
  const isAdmin = hasRole(roles, ['ADMIN', 'ROLE_ADMIN']);
  const isUser = hasRole(roles, ['USER', 'ROLE_USER']);

  useEffect(() => {
    let cancelled = false;

    if (!jwt) {
      setUserName('');
      return undefined;
    }

    const loadUserName = async () => {
      try {
        const response = await fetchCurrentUserName();
        if (!cancelled) {
          setUserName(response.data || '');
        }
      } catch {
        if (!cancelled) {
          const fallbackPayload = parseJwt(jwt);
          setUserName(
            fallbackPayload?.name ||
              fallbackPayload?.username ||
              fallbackPayload?.email ||
              ''
          );
        }
      }
    };

    loadUserName();

    const syncProfileName = () => {
      loadUserName();
    };

    window.addEventListener('profileUpdated', syncProfileName);

    return () => {
      cancelled = true;
      window.removeEventListener('profileUpdated', syncProfileName);
    };
  }, [jwt]);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 text-slate-900 backdrop-blur dark:border-slate-700 dark:bg-slate-900/95 dark:text-slate-100">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center gap-4 px-4 sm:h-20 sm:px-6 lg:px-8">
        <button
          type="button"
          className="flex min-w-0 items-center gap-2 text-left text-indigo-600 dark:text-indigo-400"
          onClick={() => navigate('/')}
        >
          <IconBriefcaseFilled className="h-8 w-8 sm:h-10 sm:w-10" stroke={2.5} />
          <span className="truncate text-lg font-bold tracking-wide sm:text-2xl">
            SkillSync
          </span>
        </button>

        <div className="hidden flex-1 justify-center sm:flex">
          <HeaderNav admin={isAdmin} user={isUser} />
        </div>

        <button
          type="button"
          className="ml-auto inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700 sm:hidden"
          onClick={() => setMobileMenuOpen(true)}
          aria-label="Open navigation menu"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <div className="hidden sm:flex">
          <HeaderUserSection
            userName={userName}
            isAdmin={isAdmin}
            isUser={isUser}
            jwt={jwt}
            navigate={navigate}
          />
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 sm:hidden">
          <div className="ml-auto flex h-full w-80 max-w-[85vw] flex-col gap-6 bg-white p-6 shadow-xl dark:bg-slate-900">
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                Menu
              </span>
              <button
                type="button"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-700 transition-colors hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close navigation menu"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <HeaderNav admin={isAdmin} user={isUser} mobile />

            <div className="mt-auto">
              <HeaderUserSection
                userName={userName}
                isAdmin={isAdmin}
                isUser={isUser}
                jwt={jwt}
                navigate={navigate}
              />
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
