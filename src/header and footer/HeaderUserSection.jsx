import React, { useEffect, useRef, useState } from 'react';
import {
  IconBell,
  IconBookmark,
  IconCalendarEvent,
  IconMessage,
  IconMoonStars,
  IconSettings,
  IconSunHigh,
  IconUpload,
} from '@tabler/icons-react';
import axios from 'axios';

import {
  isDarkThemeEnabled,
  toggleTheme as toggleAppTheme,
} from '../utils/themeUtils';

const readStoredBoolean = (key, fallback) => {
  if (typeof window === 'undefined') {
    return fallback;
  }

  const storedValue = localStorage.getItem(key);
  if (storedValue === null) {
    return fallback;
  }

  return storedValue === 'true';
};

const iconButtonClass =
  'relative flex h-11 w-11 items-center justify-center rounded-full bg-slate-100 text-slate-700 transition-colors hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-100 dark:hover:bg-slate-600';

const panelClass =
  'absolute right-0 top-14 z-50 w-[min(24rem,calc(100vw-2rem))] rounded-3xl border border-slate-200 bg-white p-4 text-slate-900 shadow-xl dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100';

const shortcutActions = [
  {
    label: 'Saved Jobs',
    icon: IconBookmark,
    destination: '/saved-jobs',
    tone: 'bg-indigo-50 text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-300',
  },
  {
    label: 'Job Alerts',
    icon: IconBell,
    destination: '/job-alerts',
    tone: 'bg-amber-50 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300',
  },
  {
    label: 'Resume Upload',
    icon: IconUpload,
    destination: '/resume-upload',
    tone: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300',
  },
  {
    label: 'Interviews',
    icon: IconCalendarEvent,
    destination: '/interviews',
    tone: 'bg-sky-50 text-sky-700 dark:bg-sky-500/15 dark:text-sky-300',
  },
];

const HeaderUserSection = ({
  userName,
  admin,
  user,
  jwt,
  navigate,
  setJwt,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!sessionStorage.getItem('jwt'));
  const [notifications, setNotifications] = useState([]);
  const [notifLoading, setNotifLoading] = useState(false);
  const [notifError, setNotifError] = useState('');
  const [notifUnread, setNotifUnread] = useState(false);
  const [settingsOpened, setSettingsOpened] = useState(false);
  const [notificationsOpened, setNotificationsOpened] = useState(false);
  const [darkMode, setDarkMode] = useState(isDarkThemeEnabled());
  const [emailNotif, setEmailNotif] = useState(() =>
    readStoredBoolean('settings:emailNotif', true)
  );

  const settingsRef = useRef(null);
  const notificationsRef = useRef(null);

  const unreadCount = notifications.filter((notification) => !notification.read).length;
  const displayName = userName || 'User';
  const roleLabel = admin ? 'Admin' : user ? 'User' : 'Guest';
  const avatarInitial = displayName.trim().charAt(0).toUpperCase() || 'U';

  useEffect(() => {
    const checkJwt = () => setIsLoggedIn(!!sessionStorage.getItem('jwt'));
    window.addEventListener('storage', checkJwt);
    const interval = setInterval(checkJwt, 500);

    return () => {
      window.removeEventListener('storage', checkJwt);
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const syncTheme = () => setDarkMode(isDarkThemeEnabled());
    window.addEventListener('storage', syncTheme);
    window.addEventListener('themechange', syncTheme);

    return () => {
      window.removeEventListener('storage', syncTheme);
      window.removeEventListener('themechange', syncTheme);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem('settings:emailNotif', String(emailNotif));
  }, [emailNotif]);

  useEffect(() => {
    const syncEmailPreference = (event) => {
      if (!event.key || event.key === 'settings:emailNotif') {
        setEmailNotif(readStoredBoolean('settings:emailNotif', true));
      }
    };

    window.addEventListener('storage', syncEmailPreference);
    return () => window.removeEventListener('storage', syncEmailPreference);
  }, []);

  useEffect(() => {
    if (!settingsOpened) {
      return;
    }

    setEmailNotif(readStoredBoolean('settings:emailNotif', true));
  }, [settingsOpened]);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (settingsRef.current && !settingsRef.current.contains(event.target)) {
        setSettingsOpened(false);
      }

      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(event.target)
      ) {
        setNotificationsOpened(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  useEffect(() => {
    if (!notificationsOpened || !jwt) {
      return;
    }

    setNotifLoading(true);
    setNotifError('');

    axios
      .get('/api/notifications', {
        headers: { Authorization: `Bearer ${jwt}` },
        withCredentials: true,
      })
      .then((response) => {
        const notificationList = response.data || [];
        setNotifications(notificationList);
        setNotifUnread(notificationList.some((notification) => !notification.read));
      })
      .catch(() => {
        setNotifError('Failed to load notifications');
        setNotifications([]);
        setNotifUnread(false);
      })
      .finally(() => setNotifLoading(false));
  }, [notificationsOpened, jwt]);

  const markAllAsRead = async () => {
    try {
      await axios.post(
        '/api/notifications/mark-all-read',
        {},
        { headers: { Authorization: `Bearer ${jwt}` }, withCredentials: true }
      );

      setNotifications((currentNotifications) =>
        currentNotifications.map((notification) => ({
          ...notification,
          read: true,
        }))
      );
      setNotifUnread(false);
    } catch {}
  };

  const markAsRead = async (id) => {
    try {
      await axios.post(
        `/api/notifications/${id}/mark-read`,
        {},
        { headers: { Authorization: `Bearer ${jwt}` }, withCredentials: true }
      );

      setNotifications((currentNotifications) => {
        const updatedNotifications = currentNotifications.map((notification) =>
          notification.id === id
            ? { ...notification, read: true }
            : notification
        );

        setNotifUnread(updatedNotifications.some((notification) => !notification.read));
        return updatedNotifications;
      });
    } catch {}
  };

  const clearAll = async () => {
    try {
      await axios.delete('/api/notifications/clear-all', {
        headers: { Authorization: `Bearer ${jwt}` },
        withCredentials: true,
      });

      setNotifications([]);
      setNotifUnread(false);
    } catch {}
  };

  const handleLogout = () => {
    sessionStorage.removeItem('jwt');
    if (setJwt) {
      setJwt(null);
    }
    navigate('/signin');
  };

  const handleThemeToggle = () => {
    const nextTheme = toggleAppTheme();
    setDarkMode(nextTheme === 'dark');
  };

  return (
    <div className="flex items-center gap-3 sm:gap-4">
      {!isLoggedIn ? (
        <button
          type="button"
          className="rounded-full border border-indigo-200 px-4 py-2 text-sm font-semibold text-indigo-600 transition-colors hover:bg-indigo-50 dark:border-indigo-500/30 dark:text-indigo-300 dark:hover:bg-indigo-500/10"
          onClick={() => navigate('/signin')}
        >
          Log In
        </button>
      ) : (
        <button
          type="button"
          className="flex items-center gap-3 rounded-2xl px-2 py-1 transition-colors hover:bg-slate-100 dark:hover:bg-slate-700"
          onClick={() => navigate('/profile')}
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 text-sm font-semibold text-white">
            {avatarInitial}
          </div>
          <div className="hidden text-left md:block">
            <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
              {displayName}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {roleLabel}
            </p>
          </div>
        </button>
      )}

      {isLoggedIn && (
        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-full bg-indigo-600 text-white shadow-sm transition-colors hover:bg-indigo-500"
          onClick={() => navigate('/messages')}
          aria-label="Open messages"
        >
          <IconMessage size={21} />
        </button>
      )}

      <div ref={settingsRef} className="relative">
        <button
          type="button"
          className={iconButtonClass}
          onClick={() => {
            setSettingsOpened((current) => !current);
            setNotificationsOpened(false);
          }}
          aria-label="Open settings"
        >
          <IconSettings size={20} stroke={1.7} />
        </button>

        {settingsOpened && (
          <div className={panelClass}>
            <div className="space-y-4">
              <div className="flex items-center gap-3 rounded-2xl bg-slate-50 p-3 dark:bg-slate-900/70">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-600 text-base font-semibold text-white">
                  {avatarInitial}
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                    {displayName}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {roleLabel}
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900/70">
                <div className="mb-4 flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                      Appearance
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Keeps the notification and settings UI on the same Tailwind theme.
                    </p>
                  </div>
                  <div className="rounded-full bg-white p-2 text-slate-600 shadow-sm dark:bg-slate-800 dark:text-slate-200">
                    {darkMode ? <IconMoonStars size={16} /> : <IconSunHigh size={16} />}
                  </div>
                </div>

                <button
                  type="button"
                  className="flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3 text-left transition-colors hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700"
                  onClick={handleThemeToggle}
                >
                  <div>
                    <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                      {darkMode ? 'Dark mode' : 'Light mode'}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Switch theme
                    </p>
                  </div>
                  <div
                    className={`flex h-7 w-12 items-center rounded-full px-1 transition-colors ${
                      darkMode
                        ? 'bg-indigo-600 justify-end'
                        : 'bg-slate-300 justify-start dark:bg-slate-600'
                    }`}
                  >
                    <span className="h-5 w-5 rounded-full bg-white shadow-sm" />
                  </div>
                </button>
              </div>

              <div className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900/70">
                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                    Email notifications
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Mirrors the preference from the settings page.
                  </p>
                </div>
                <button
                  type="button"
                  className={`flex h-7 w-12 items-center rounded-full px-1 transition-colors ${
                    emailNotif
                      ? 'justify-end bg-indigo-600'
                      : 'justify-start bg-slate-300 dark:bg-slate-600'
                  }`}
                  onClick={() => setEmailNotif((currentValue) => !currentValue)}
                  aria-label="Toggle email notifications"
                >
                  <span className="h-5 w-5 rounded-full bg-white shadow-sm" />
                </button>
              </div>

              {isLoggedIn && (
                <>
                  <div className="grid grid-cols-2 gap-3">
                    {shortcutActions.map((action) => {
                      const ActionIcon = action.icon;

                      return (
                        <button
                          key={action.label}
                          type="button"
                          className={`flex flex-col items-center gap-2 rounded-2xl px-3 py-4 text-center text-sm font-medium transition-colors hover:opacity-90 ${action.tone}`}
                          onClick={() => {
                            setSettingsOpened(false);
                            navigate(action.destination);
                          }}
                        >
                          <ActionIcon size={20} />
                          <span>{action.label}</span>
                        </button>
                      );
                    })}
                  </div>

                  <button
                    type="button"
                    className="w-full rounded-2xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-indigo-500"
                    onClick={() => {
                      setSettingsOpened(false);
                      navigate('/settings');
                    }}
                  >
                    Open full settings
                  </button>

                  <button
                    type="button"
                    className="w-full rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700 transition-colors hover:bg-red-100 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-300 dark:hover:bg-red-500/15"
                    onClick={() => {
                      setSettingsOpened(false);
                      handleLogout();
                    }}
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      <div ref={notificationsRef} className="relative">
        <button
          type="button"
          className={iconButtonClass}
          onClick={() => {
            setNotificationsOpened((current) => !current);
            setSettingsOpened(false);
          }}
          aria-label="Open notifications"
        >
          <IconBell size={20} stroke={1.7} />
          {notifUnread && (
            <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-rose-500" />
          )}
          {unreadCount > 0 && (
            <span className="absolute -right-1 -top-1 min-w-5 rounded-full bg-indigo-600 px-1.5 py-0.5 text-center text-[10px] font-semibold leading-none text-white">
              {unreadCount}
            </span>
          )}
        </button>

        {notificationsOpened && (
          <div className={panelClass}>
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-base font-semibold text-slate-900 dark:text-slate-100">
                    Notifications
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {unreadCount > 0
                      ? `${unreadCount} unread update${unreadCount > 1 ? 's' : ''}`
                      : 'Everything is up to date'}
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    className="rounded-full border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700"
                    onClick={markAllAsRead}
                    disabled={!notifUnread || notifLoading}
                  >
                    Mark all read
                  </button>
                  <button
                    type="button"
                    className="rounded-full border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600 transition-colors hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-red-500/30 dark:text-red-300 dark:hover:bg-red-500/10"
                    onClick={clearAll}
                    disabled={notifications.length === 0 || notifLoading}
                  >
                    Clear
                  </button>
                </div>
              </div>

              {notifLoading ? (
                <div className="flex justify-center py-10">
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-indigo-600 border-t-transparent" />
                </div>
              ) : notifError ? (
                <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-300">
                  {notifError}
                </div>
              ) : notifications.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-slate-300 px-4 py-8 text-center text-sm text-slate-500 dark:border-slate-600 dark:text-slate-400">
                  No notifications right now.
                </div>
              ) : (
                <div className="max-h-56 space-y-3 overflow-y-auto pr-1">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`rounded-2xl border p-3 ${
                        notification.read
                          ? 'border-slate-200 bg-slate-50 text-slate-600 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-300'
                          : 'border-indigo-200 bg-indigo-50/80 text-slate-900 dark:border-indigo-500/30 dark:bg-indigo-500/10 dark:text-slate-100'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p
                            className={`text-sm ${
                              notification.read ? 'font-medium' : 'font-semibold'
                            }`}
                          >
                            {notification.message}
                          </p>
                          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                            {new Date(notification.createdAt).toLocaleString()}
                          </p>
                        </div>

                        {!notification.read && (
                          <button
                            type="button"
                            className="shrink-0 rounded-full bg-indigo-600 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-indigo-500"
                            onClick={() => markAsRead(notification.id)}
                          >
                            Mark read
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HeaderUserSection;
