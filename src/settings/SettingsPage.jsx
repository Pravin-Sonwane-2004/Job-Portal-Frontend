import React, { useEffect, useState } from 'react';
import {
  IconBellRinging,
  IconFileCv,
  IconLanguage,
  IconLogout,
  IconMessageCircle,
  IconMoonStars,
  IconShieldLock,
  IconSunHigh,
  IconUserCircle,
} from '@tabler/icons-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { GET_NAME } from '../all services/getJfBackendService';
import { parseJwt } from '../utils/jwtUtils';
import {
  isDarkThemeEnabled,
  toggleTheme as toggleAppTheme,
} from '../utils/themeUtils';

const getStoredBoolean = (key, fallback) => {
  if (typeof window === 'undefined') {
    return fallback;
  }

  const storedValue = localStorage.getItem(key);
  if (storedValue === null) {
    return fallback;
  }

  return storedValue === 'true';
};

const getStoredValue = (key, fallback) => {
  if (typeof window === 'undefined') {
    return fallback;
  }

  return localStorage.getItem(key) || fallback;
};

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

  return [];
};

const quickActions = [
  {
    title: 'Edit profile',
    description: 'Update your public bio, skills, and personal details.',
    icon: IconUserCircle,
    destination: '/edit-profile',
    tone: 'bg-indigo-50 text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-300',
  },
  {
    title: 'Messages',
    description: 'Continue recruiter conversations and application follow-ups.',
    icon: IconMessageCircle,
    destination: '/messages',
    tone: 'bg-sky-50 text-sky-700 dark:bg-sky-500/15 dark:text-sky-300',
  },
  {
    title: 'Resume upload',
    description: 'Manage the resume version attached to upcoming applications.',
    icon: IconFileCv,
    destination: '/resume-upload',
    tone: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300',
  },
];

const SettingsPage = () => {
  const navigate = useNavigate();
  const jwt = sessionStorage.getItem('jwt');
  const payload = parseJwt(jwt);
  const roles = getRoles(payload);
  const isAdmin = roles.some((role) => role === 'ADMIN' || role === 'ROLE_ADMIN');
  const isUser = roles.some((role) => role === 'USER' || role === 'ROLE_USER');
  const roleLabel = isAdmin ? 'Admin' : isUser ? 'User' : 'Guest';

  const [userName, setUserName] = useState(
    payload?.name || payload?.username || payload?.email || 'User'
  );
  const [darkMode, setDarkMode] = useState(isDarkThemeEnabled());
  const [emailNotif, setEmailNotif] = useState(() =>
    getStoredBoolean('settings:emailNotif', true)
  );
  const [profilePublic, setProfilePublic] = useState(() =>
    getStoredBoolean('settings:profilePublic', true)
  );
  const [language, setLanguage] = useState(() =>
    getStoredValue('settings:language', 'en')
  );

  useEffect(() => {
    if (!jwt) {
      return;
    }

    const fetchUserName = async () => {
      try {
        const response = await axios.get(GET_NAME, {
          withCredentials: true,
          headers: { Authorization: `Bearer ${jwt}` },
        });
        setUserName(response.data || 'User');
      } catch {
        setUserName(payload?.name || payload?.username || payload?.email || 'User');
      }
    };

    fetchUserName();
  }, [jwt, payload?.email, payload?.name, payload?.username]);

  useEffect(() => {
    localStorage.setItem('settings:emailNotif', String(emailNotif));
  }, [emailNotif]);

  useEffect(() => {
    localStorage.setItem('settings:profilePublic', String(profilePublic));
  }, [profilePublic]);

  useEffect(() => {
    localStorage.setItem('settings:language', language);
  }, [language]);

  useEffect(() => {
    const syncTheme = () => setDarkMode(isDarkThemeEnabled());
    window.addEventListener('storage', syncTheme);
    window.addEventListener('themechange', syncTheme);

    return () => {
      window.removeEventListener('storage', syncTheme);
      window.removeEventListener('themechange', syncTheme);
    };
  }, []);

  const handleThemeToggle = () => {
    const nextTheme = toggleAppTheme();
    setDarkMode(nextTheme === 'dark');
  };

  const handleLogout = () => {
    sessionStorage.removeItem('jwt');
    navigate('/signin');
  };

  const themeLabel = darkMode ? 'Dark mode' : 'Light mode';
  const ThemeIcon = darkMode ? IconMoonStars : IconSunHigh;

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10 dark:bg-slate-900 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-5xl flex-col gap-6">
        <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800">
          <div className="bg-gradient-to-r from-indigo-600 via-sky-500 to-cyan-400 px-6 py-8 text-white sm:px-8">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-2xl">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/80">
                  Personal preferences
                </p>
                <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">
                  Settings that stay clean in both themes
                </h1>
                <p className="mt-3 text-sm text-white/85 sm:text-base">
                  This page now stays fully on Tailwind styling, so appearance,
                  notifications, and account controls feel consistent when the theme changes.
                </p>
              </div>

              <div className="rounded-2xl bg-white/15 px-5 py-4 backdrop-blur-sm">
                <p className="text-xs uppercase tracking-[0.2em] text-white/70">
                  Signed in
                </p>
                <p className="mt-2 text-xl font-semibold">{userName}</p>
                <p className="mt-1 text-sm text-white/80">{roleLabel}</p>
              </div>
            </div>
          </div>

          <div className="grid gap-4 border-t border-slate-200 px-6 py-5 sm:grid-cols-3 sm:px-8 dark:border-slate-700">
            <div className="rounded-2xl bg-slate-50 px-4 py-3 dark:bg-slate-900/70">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                Theme
              </p>
              <p className="mt-2 text-base font-semibold text-slate-900 dark:text-slate-100">
                {themeLabel}
              </p>
            </div>
            <div className="rounded-2xl bg-slate-50 px-4 py-3 dark:bg-slate-900/70">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                Notifications
              </p>
              <p className="mt-2 text-base font-semibold text-slate-900 dark:text-slate-100">
                {emailNotif ? 'Enabled' : 'Muted'}
              </p>
            </div>
            <div className="rounded-2xl bg-slate-50 px-4 py-3 dark:bg-slate-900/70">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                Language
              </p>
              <p className="mt-2 text-base font-semibold text-slate-900 dark:text-slate-100">
                {language === 'en'
                  ? 'English'
                  : language === 'hi'
                    ? 'Hindi'
                    : language === 'es'
                      ? 'Spanish'
                      : 'French'}
              </p>
            </div>
          </div>
        </section>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
            <div className="mb-5">
              <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                Preferences
              </h2>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                These controls are stored locally so the UI keeps your choices the next time you visit.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start justify-between gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900/70">
                <div className="flex gap-3">
                  <div className="mt-0.5 rounded-2xl bg-indigo-50 p-3 text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-300">
                    <ThemeIcon size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                      {themeLabel}
                    </p>
                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                      Switches the interface between light and dark mode.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  className={`flex h-7 w-12 items-center rounded-full px-1 transition-colors ${
                    darkMode
                      ? 'justify-end bg-indigo-600'
                      : 'justify-start bg-slate-300 dark:bg-slate-600'
                  }`}
                  onClick={handleThemeToggle}
                  aria-label="Toggle theme"
                >
                  <span className="h-5 w-5 rounded-full bg-white shadow-sm" />
                </button>
              </div>

              <div className="flex items-start justify-between gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900/70">
                <div className="flex gap-3">
                  <div className="mt-0.5 rounded-2xl bg-amber-50 p-3 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300">
                    <IconBellRinging size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                      Email notifications
                    </p>
                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                      Receive alerts for saved jobs, interviews, and application updates.
                    </p>
                  </div>
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

              <div className="flex items-start justify-between gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900/70">
                <div className="flex gap-3">
                  <div className="mt-0.5 rounded-2xl bg-emerald-50 p-3 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300">
                    <IconShieldLock size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                      Public profile
                    </p>
                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                      Controls whether recruiters can view your profile details.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  className={`flex h-7 w-12 items-center rounded-full px-1 transition-colors ${
                    profilePublic
                      ? 'justify-end bg-indigo-600'
                      : 'justify-start bg-slate-300 dark:bg-slate-600'
                  }`}
                  onClick={() => setProfilePublic((currentValue) => !currentValue)}
                  aria-label="Toggle profile visibility"
                >
                  <span className="h-5 w-5 rounded-full bg-white shadow-sm" />
                </button>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900/70">
                <div className="mb-3 flex gap-3">
                  <div className="rounded-2xl bg-sky-50 p-3 text-sky-700 dark:bg-sky-500/15 dark:text-sky-300">
                    <IconLanguage size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                      Language
                    </p>
                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                      Choose the language you want the dashboard to prefer.
                    </p>
                  </div>
                </div>

                <select
                  id="language-select"
                  value={language}
                  onChange={(event) => setLanguage(event.target.value)}
                  className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition-colors focus:border-indigo-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
                >
                  <option value="en">English</option>
                  <option value="hi">Hindi</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                </select>
              </div>
            </div>
          </section>

          <aside className="space-y-6">
            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
              <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                Quick actions
              </h2>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                Shortcuts for the pages you are most likely to reach from settings.
              </p>

              <div className="mt-5 space-y-3">
                {quickActions.map((action) => {
                  const ActionIcon = action.icon;

                  return (
                    <button
                      key={action.title}
                      type="button"
                      onClick={() => navigate(action.destination)}
                      className="flex w-full items-start gap-3 rounded-2xl border border-slate-200 p-4 text-left transition-colors hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-900/70"
                    >
                      <div className={`rounded-2xl p-3 ${action.tone}`}>
                        <ActionIcon size={18} />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                          {action.title}
                        </p>
                        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                          {action.description}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
              <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                Account
              </h2>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                Secure sign-out keeps the rest of the interface responsive and in sync.
              </p>

              <button
                type="button"
                onClick={handleLogout}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700 transition-colors hover:bg-red-100 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-300 dark:hover:bg-red-500/15"
              >
                <IconLogout size={18} />
                Logout
              </button>
            </section>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
