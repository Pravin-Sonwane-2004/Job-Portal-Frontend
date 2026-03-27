import { useEffect, useMemo, useRef, useState } from 'react';
import {
  IconBell,
  IconBookmark,
  IconCalendarEvent,
  IconMessage,
  IconSettings,
  IconUpload,
} from '@tabler/icons-react';

import {
  clearNotifications,
  fetchNotifications,
  markAllNotificationsRead,
  markNotificationRead,
} from '../services/notificationService';
import { clearSessionToken } from '../services/sessionService';

const iconButtonClass =
  'relative flex h-11 w-11 items-center justify-center rounded-full bg-slate-100 text-slate-700 transition-colors hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700';

const panelClass =
  'absolute right-0 top-14 z-50 w-[min(24rem,calc(100vw-2rem))] rounded-3xl border border-slate-200 bg-white p-4 text-slate-900 shadow-xl dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100';

const shortcutActions = [
  { label: 'Saved Jobs', icon: IconBookmark, destination: '/saved-jobs' },
  { label: 'Job Alerts', icon: IconBell, destination: '/job-alerts' },
  { label: 'Resume Upload', icon: IconUpload, destination: '/resume-upload' },
  { label: 'Interviews', icon: IconCalendarEvent, destination: '/interviews' },
];

const getRoleLabel = (isAdmin, isUser) => {
  if (isAdmin) {
    return 'Admin';
  }

  if (isUser) {
    return 'User';
  }

  return 'Guest';
};

const HeaderUserSection = ({ userName, isAdmin, isUser, jwt, navigate }) => {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [loadingNotifications, setLoadingNotifications] = useState(false);
  const [notificationError, setNotificationError] = useState('');

  const settingsRef = useRef(null);
  const notificationsRef = useRef(null);

  const isLoggedIn = Boolean(jwt);
  const displayName = userName || 'User';
  const roleLabel = getRoleLabel(isAdmin, isUser);
  const avatarInitial = displayName.trim().charAt(0).toUpperCase() || 'U';
  const unreadCount = useMemo(
    () => notifications.filter((notification) => !notification.read).length,
    [notifications]
  );

  useEffect(() => {
    if (!isLoggedIn) {
      setNotifications([]);
      setSettingsOpen(false);
      setNotificationsOpen(false);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (settingsRef.current && !settingsRef.current.contains(event.target)) {
        setSettingsOpen(false);
      }

      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(event.target)
      ) {
        setNotificationsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  useEffect(() => {
    if (!notificationsOpen || !isLoggedIn) {
      return;
    }

    let active = true;
    setLoadingNotifications(true);
    setNotificationError('');

    fetchNotifications()
      .then((response) => {
        if (active) {
          setNotifications(response.data || []);
        }
      })
      .catch(() => {
        if (active) {
          setNotificationError('Failed to load notifications');
          setNotifications([]);
        }
      })
      .finally(() => {
        if (active) {
          setLoadingNotifications(false);
        }
      });

    return () => {
      active = false;
    };
  }, [isLoggedIn, notificationsOpen]);

  const handleLogout = () => {
    clearSessionToken();
    navigate('/signin');
  };

  const handleMarkAllRead = async () => {
    try {
      await markAllNotificationsRead();
      setNotifications((currentNotifications) =>
        currentNotifications.map((notification) => ({
          ...notification,
          read: true,
        }))
      );
    } catch {}
  };

  const handleMarkRead = async (notificationId) => {
    try {
      await markNotificationRead(notificationId);
      setNotifications((currentNotifications) =>
        currentNotifications.map((notification) =>
          notification.id === notificationId
            ? { ...notification, read: true }
            : notification
        )
      );
    } catch {}
  };

  const handleClearNotifications = async () => {
    try {
      await clearNotifications();
      setNotifications([]);
    } catch {}
  };

  if (!isLoggedIn) {
    return (
      <button
        type="button"
        className="rounded-full border border-indigo-200 px-4 py-2 text-sm font-semibold text-indigo-600 transition-colors hover:bg-indigo-50 dark:border-indigo-500/30 dark:text-indigo-300 dark:hover:bg-indigo-500/10"
        onClick={() => navigate('/signin')}
      >
        Log In
      </button>
    );
  }

  return (
    <div className="flex items-center gap-3 sm:gap-4">
      <button
        type="button"
        className="flex items-center gap-3 rounded-2xl px-2 py-1 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800"
        onClick={() => navigate('/profile')}
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 text-sm font-semibold text-white">
          {avatarInitial}
        </div>
        <div className="hidden text-left md:block">
          <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
            {displayName}
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400">{roleLabel}</p>
        </div>
      </button>

      <button
        type="button"
        className="flex h-11 w-11 items-center justify-center rounded-full bg-indigo-600 text-white shadow-sm transition-colors hover:bg-indigo-500"
        onClick={() => navigate('/messages')}
        aria-label="Open messages"
      >
        <IconMessage size={20} />
      </button>

      <div ref={settingsRef} className="relative">
        <button
          type="button"
          className={iconButtonClass}
          onClick={() => {
            setSettingsOpen((current) => !current);
            setNotificationsOpen(false);
          }}
          aria-label="Open account menu"
        >
          <IconSettings size={20} stroke={1.7} />
        </button>

        {settingsOpen && (
          <div className={panelClass}>
            <div className="space-y-4">
              <div className="flex items-center gap-3 rounded-2xl bg-slate-50 p-3 dark:bg-slate-800">
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

              <div className="grid grid-cols-2 gap-3">
                {shortcutActions.map((action) => {
                  const ActionIcon = action.icon;

                  return (
                    <button
                      key={action.label}
                      type="button"
                      className="flex flex-col items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-4 text-center text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
                      onClick={() => {
                        setSettingsOpen(false);
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
                  setSettingsOpen(false);
                  navigate('/settings');
                }}
              >
                Open settings
              </button>

              <button
                type="button"
                className="w-full rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700 transition-colors hover:bg-red-100 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-300 dark:hover:bg-red-500/15"
                onClick={() => {
                  setSettingsOpen(false);
                  handleLogout();
                }}
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>

      <div ref={notificationsRef} className="relative">
        <button
          type="button"
          className={iconButtonClass}
          onClick={() => {
            setNotificationsOpen((current) => !current);
            setSettingsOpen(false);
          }}
          aria-label="Open notifications"
        >
          <IconBell size={20} stroke={1.7} />
          {unreadCount > 0 && (
            <span className="absolute -right-1 -top-1 min-w-5 rounded-full bg-indigo-600 px-1.5 py-0.5 text-center text-[10px] font-semibold leading-none text-white">
              {unreadCount}
            </span>
          )}
        </button>

        {notificationsOpen && (
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
                    onClick={handleMarkAllRead}
                    disabled={unreadCount === 0 || loadingNotifications}
                  >
                    Mark all read
                  </button>
                  <button
                    type="button"
                    className="rounded-full border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600 transition-colors hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-red-500/30 dark:text-red-300 dark:hover:bg-red-500/10"
                    onClick={handleClearNotifications}
                    disabled={notifications.length === 0 || loadingNotifications}
                  >
                    Clear
                  </button>
                </div>
              </div>

              {loadingNotifications ? (
                <div className="flex justify-center py-10">
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-indigo-600 border-t-transparent" />
                </div>
              ) : notificationError ? (
                <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-300">
                  {notificationError}
                </div>
              ) : notifications.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-slate-300 px-4 py-8 text-center text-sm text-slate-500 dark:border-slate-600 dark:text-slate-400">
                  No notifications right now.
                </div>
              ) : (
                <div className="max-h-56 space-y-3 overflow-y-auto pr-1">
                  {notifications.map((notification) => (
                    <article
                      key={notification.id}
                      className={`rounded-2xl border p-3 ${
                        notification.read
                          ? 'border-slate-200 bg-slate-50 text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300'
                          : 'border-indigo-200 bg-indigo-50 text-slate-900 dark:border-indigo-500/30 dark:bg-indigo-500/10 dark:text-slate-100'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className={`text-sm ${notification.read ? 'font-medium' : 'font-semibold'}`}>
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
                            onClick={() => handleMarkRead(notification.id)}
                          >
                            Mark read
                          </button>
                        )}
                      </div>
                    </article>
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
