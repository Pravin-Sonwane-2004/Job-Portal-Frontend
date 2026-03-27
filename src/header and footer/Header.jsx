import React, { useState, useEffect } from 'react';
import { IconBriefcaseFilled } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import HeaderNav from './HeaderNav';
import HeaderUserSection from './HeaderUserSection';
import { GET_NAME } from '../all services/getJfBackendService';
import axios from 'axios';

// Use parseJwt from utils for JWT payload
import { parseJwt } from '../utils/jwtUtils';
import {
  isDarkThemeEnabled,
  toggleTheme as toggleAppTheme,
} from '../utils/themeUtils';

const parseJwtPayload = (token) => {
  if (!token) return null;
  try {
    return parseJwt(token);
  } catch (e) {
    console.error('Failed to parse JWT payload:', e);
    return null;
  }
};

// Generic role checker
const hasRole = (token, targetRoles) => {
  const payload = parseJwtPayload(token);
  if (!payload) return false;
  let roles = [];
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
  }
  return roles.some((role) => targetRoles.includes(role));
};

const isAdmin = (token) => hasRole(token, ['ADMIN', 'ROLE_ADMIN']);
const isUser = (token) => hasRole(token, ['USER', 'ROLE_USER']);

// Debug: Log JWT payload and roles for troubleshooting
const debugLogRoles = (token) => {
  const payload = parseJwtPayload(token);
  let roles = [];
  if (payload) {
    if (payload.roles !== undefined) {
      roles = Array.isArray(payload.roles) ? payload.roles : [payload.roles];
    } else if (payload.role !== undefined) {
      roles = Array.isArray(payload.role) ? payload.role : [payload.role];
    } else if (payload.authorities !== undefined) {
      roles = Array.isArray(payload.authorities) ? payload.authorities : [payload.authorities];
    }
    // Only keep important logs for errors, remove debug/info logs
  }
};

const Header = () => {
  const navigate = useNavigate();
  const [showSignUp, setShowSignUp] = useState(false);
  const [opened, setOpened] = useState(false);
  const [isSignIn, setIsSignIn] = useState(true);
  const [jwt, setJwt] = useState(sessionStorage.getItem('jwt'));
  const [userName, setUserName] = useState('');
  const [userId, setUserId] = useState(null);

  // Theme state
  const [themeDark, setThemeDark] = useState(isDarkThemeEnabled());

  // Toggle theme
  const toggleTheme = () => {
    const nextTheme = toggleAppTheme();
    setThemeDark(nextTheme === 'dark');
  };

  // Apply theme on mount
  useEffect(() => {
    document.documentElement.classList.toggle('dark', themeDark);
    document.documentElement.style.colorScheme = themeDark ? 'dark' : 'light';
  }, [themeDark]);

  useEffect(() => {
    const syncTheme = () => setThemeDark(isDarkThemeEnabled());

    syncTheme();
    window.addEventListener('storage', syncTheme);
    window.addEventListener('themechange', syncTheme);

    return () => {
      window.removeEventListener('storage', syncTheme);
      window.removeEventListener('themechange', syncTheme);
    };
  }, []);

  // Notification states
  const [notifications, setNotifications] = useState([]);
  const [notifLoading, setNotifLoading] = useState(false);
  const [notifError, setNotifError] = useState('');
  const [notifUnread, setNotifUnread] = useState(false);

  // Settings states
  const [settingsOpened, setSettingsOpened] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [emailNotif, setEmailNotif] = useState(true);

  // Count unread notifications
  const unreadCount = notifications.filter((n) => !n.read).length;

  // Listen for JWT changes across tabs
  useEffect(() => {
    const onStorage = () => {
      setJwt(sessionStorage.getItem('jwt'));
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  // Extract userId from JWT
  useEffect(() => {
    if (!jwt) {
      setUserId(null);
      return;
    }
    const payload = parseJwtPayload(jwt);
    setUserId(payload?.id || payload?.userId || null);
  }, [jwt]);

  // Fetch user full name when JWT changes
  useEffect(() => {
    const fetchUserName = async () => {
      if (!jwt) {
        setUserName('');
        return;
      }
      try {
        const res = await axios.get(GET_NAME, {
          withCredentials: true,
          headers: { Authorization: `Bearer ${jwt}` },
        });
        setUserName(res.data || '');
      } catch (e) {
        console.error('Failed to fetch user name:', e);
        setUserName('');
      }
    };
    fetchUserName();

    // Listen for profile updates
    const onProfileUpdated = () => fetchUserName();
    window.addEventListener('profileUpdated', onProfileUpdated);
    return () => window.removeEventListener('profileUpdated', onProfileUpdated);
  }, [jwt]);

  // Fetch notifications when popover opens
  useEffect(() => {
    if (!opened || !jwt) return;

    setNotifLoading(true);
    setNotifError('');
    axios
      .get('/api/notifications', {
        headers: { Authorization: `Bearer ${jwt}` },
        withCredentials: true,
      })
      .then((res) => {
        const notifList = res.data || [];
        setNotifications(notifList);
        setNotifUnread(notifList.some((n) => !n.read));
      })
      .catch((e) => {
        console.error('Failed to load notifications:', e);
        setNotifError('Failed to load notifications');
        setNotifications([]);
        setNotifUnread(false);
      })
      .finally(() => setNotifLoading(false));
  }, [opened, jwt]);

  // Mark all as read
  const markAllAsRead = async () => {
    try {
      await axios.post(
        '/api/notifications/mark-all-read',
        {},
        {
          headers: { Authorization: `Bearer ${jwt}` },
          withCredentials: true,
        }
      );
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
      setNotifUnread(false);
    } catch (e) {
      console.error('Failed to mark all notifications as read:', e);
    }
  };

  // Mark individual notification as read
  const markAsRead = async (id) => {
    try {
      await axios.post(
        `/api/notifications/${id}/mark-read`,
        {},
        {
          headers: { Authorization: `Bearer ${jwt}` },
          withCredentials: true,
        }
      );
      setNotifications((prev) => {
        const updated = prev.map((n) => (n.id === id ? { ...n, read: true } : n));
        setNotifUnread(updated.some((n) => !n.read));
        return updated;
      });
    } catch (e) {
      console.error(`Failed to mark notification ${id} as read:`, e);
    }
  };

  // Clear all notifications
  const clearAll = async () => {
    try {
      await axios.delete('/api/notifications/clear-all', {
        headers: { Authorization: `Bearer ${jwt}` },
        withCredentials: true,
      });
      setNotifications([]);
      setNotifUnread(false);
    } catch (e) {
      console.error('Failed to clear notifications:', e);
    }
  };

  // Logout handler
  const handleLogout = () => {
    sessionStorage.removeItem('jwt');
    setJwt(null);
    navigate('/signin');
  };

  const isLoggedIn = !!jwt;
  debugLogRoles(jwt); // Log roles for debugging
  const admin = isAdmin(jwt);
  const user = isUser(jwt);

  return (
    <header className="bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 w-full px-4 sm:px-8 h-16 sm:h-20 flex justify-between items-center shadow-sm dark:shadow-slate-700 relative">
      {/* Logo Section */}
      <div
        className="flex gap-2 items-center text-indigo-600 dark:text-indigo-400 cursor-pointer min-w-0"
        onClick={() => navigate('/')}
      >
        <IconBriefcaseFilled className="h-8 w-8 sm:h-10 sm:w-10" stroke={2.5} />
        <span className="text-lg sm:text-2xl font-bold tracking-wide truncate">SkillSync</span>
      </div>

      {/* Theme Toggle */}
      <button
        onClick={toggleTheme}
        className="p-2 rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
        aria-label="Toggle theme"
      >
        {themeDark ? (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
          </svg>
        ) : (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
          </svg>
        )}
      </button>

      {/* Hamburger for mobile */}
      <div className="sm:hidden flex items-center">
        <button
          className="text-slate-900 dark:text-slate-100 focus:outline-none"
          onClick={() => setOpened((prev) => !prev)}
          aria-label="Open navigation menu"
        >
          <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Navigation Links (hidden on mobile) */}
      <div className="hidden sm:flex flex-1 justify-center">
        <HeaderNav admin={admin} user={user} />
      </div>

      {/* User/Settings/Notifications Section */}
      <div className="hidden sm:flex">
        <HeaderUserSection
          isLoggedIn={isLoggedIn}
          userName={userName}
          admin={admin}
          user={user}
          jwt={jwt}
          navigate={navigate}
          setJwt={setJwt}
          markAllAsRead={markAllAsRead}
          markAsRead={markAsRead}
          clearAll={clearAll}
          notifications={notifications}
          notifLoading={notifLoading}
          notifError={notifError}
          notifUnread={notifUnread}
          setOpened={setOpened}
          opened={opened}
          handleLogout={handleLogout}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          emailNotif={emailNotif}
          setEmailNotif={setEmailNotif}
          settingsOpened={settingsOpened}
          setSettingsOpened={setSettingsOpened}
        />
      </div>

      {/* Mobile Drawer */}
      {opened && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex justify-end sm:hidden">
          <div className="w-3/4 max-w-xs bg-white dark:bg-slate-800 h-full shadow-lg p-6 flex flex-col gap-6">
            <button
              className="self-end mb-4 text-slate-900 dark:text-slate-100"
              onClick={() => setOpened(false)}
              aria-label="Close navigation menu"
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <HeaderNav admin={admin} user={user} mobile={true} />
            <div className="mt-auto">
              <HeaderUserSection
                isLoggedIn={isLoggedIn}
                userName={userName}
                admin={admin}
                user={user}
                jwt={jwt}
                navigate={navigate}
                setJwt={setJwt}
                markAllAsRead={markAllAsRead}
                markAsRead={markAsRead}
                clearAll={clearAll}
                notifications={notifications}
                notifLoading={notifLoading}
                notifError={notifError}
                notifUnread={notifUnread}
                setOpened={setOpened}
                opened={opened}
                handleLogout={handleLogout}
                darkMode={darkMode}
                setDarkMode={setDarkMode}
                emailNotif={emailNotif}
                setEmailNotif={setEmailNotif}
                settingsOpened={settingsOpened}
                setSettingsOpened={setSettingsOpened}
              />
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
