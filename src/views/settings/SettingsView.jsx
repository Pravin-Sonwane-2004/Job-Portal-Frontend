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
import { useNavigate } from 'react-router-dom';

import SurfaceCard from '@/components/ui/SurfaceCard';
import ToggleSwitch from '@/components/ui/ToggleSwitch';
import useSessionToken from '@/hooks/useSessionToken';
import useThemeMode from '@/hooks/useThemeMode';
import { clearSessionToken } from '@/services/sessionService';
import { fetchCurrentUserName } from '@/services/userService';
import { parseJwt } from '@/utils/jwtUtils';

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
    description: 'Update your bio, skills, and core profile details.',
    icon: IconUserCircle,
    destination: '/edit-profile',
    tone: 'bg-indigo-50 text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-300',
  },
  {
    title: 'Messages',
    description: 'Continue conversations with recruiters and applicants.',
    icon: IconMessageCircle,
    destination: '/messages',
    tone: 'bg-sky-50 text-sky-700 dark:bg-sky-500/15 dark:text-sky-300',
  },
  {
    title: 'Resume upload',
    description: 'Manage the resume file attached to your job applications.',
    icon: IconFileCv,
    destination: '/resume-upload',
    tone: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300',
  },
];

const PreferenceRow = ({
  icon: Icon,
  title,
  description,
  tone,
  checked,
  onToggle,
  ariaLabel,
}) => {
  return (
    <div className="flex items-start justify-between gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900/70">
      <div className="flex gap-3">
        <div className={`mt-0.5 rounded-2xl p-3 ${tone}`}>
          <Icon size={18} />
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
            {title}
          </p>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            {description}
          </p>
        </div>
      </div>

      <ToggleSwitch checked={checked} onChange={onToggle} ariaLabel={ariaLabel} />
    </div>
  );
};

const SettingsView = () => {
  const navigate = useNavigate();
  const jwt = useSessionToken();
  const { isDarkMode, toggleTheme } = useThemeMode();
  const payload = parseJwt(jwt);
  const roles = getRoles(payload);
  const isAdmin = roles.some((role) => role === 'ADMIN' || role === 'ROLE_ADMIN');
  const isUser = roles.some((role) => role === 'USER' || role === 'ROLE_USER');
  const roleLabel = isAdmin ? 'Admin' : isUser ? 'User' : 'Guest';

  const [userName, setUserName] = useState(
    payload?.name || payload?.username || payload?.email || 'User'
  );
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
        const response = await fetchCurrentUserName();
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

  const handleLogout = () => {
    clearSessionToken();
    navigate('/signin');
  };

  const themeLabel = isDarkMode ? 'Dark mode' : 'Light mode';
  const ThemeIcon = isDarkMode ? IconMoonStars : IconSunHigh;
  const languageLabelMap = {
    en: 'English',
    hi: 'Hindi',
    es: 'Spanish',
    fr: 'French',
  };

  return (
    <div className="px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-5xl flex-col gap-6">
        <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800">
          <div className="bg-gradient-to-r from-indigo-600 via-sky-500 to-cyan-400 px-6 py-8 text-white sm:px-8">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-2xl">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/80">
                  Personal preferences
                </p>
                <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">
                  Structured settings for a Tailwind-first app
                </h1>
                <p className="mt-3 text-sm text-white/85 sm:text-base">
                  This view is organized like a production page: reusable cards,
                  semantic sections, clear spacing, and one shared theme source.
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
                {languageLabelMap[language] || 'English'}
              </p>
            </div>
          </div>
        </section>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <SurfaceCard as="section">
            <header className="mb-5">
              <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                Preferences
              </h2>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                Store core UI settings locally and keep the page easy to maintain.
              </p>
            </header>

            <div className="space-y-4">
              <PreferenceRow
                icon={ThemeIcon}
                title={themeLabel}
                description="Switches the application between light and dark mode."
                tone="bg-indigo-50 text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-300"
                checked={isDarkMode}
                onToggle={toggleTheme}
                ariaLabel="Toggle theme"
              />

              <PreferenceRow
                icon={IconBellRinging}
                title="Email notifications"
                description="Receive alerts for saved jobs, interviews, and application updates."
                tone="bg-amber-50 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300"
                checked={emailNotif}
                onToggle={() => setEmailNotif((currentValue) => !currentValue)}
                ariaLabel="Toggle email notifications"
              />

              <PreferenceRow
                icon={IconShieldLock}
                title="Public profile"
                description="Control whether recruiters can view your profile details."
                tone="bg-emerald-50 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300"
                checked={profilePublic}
                onToggle={() => setProfilePublic((currentValue) => !currentValue)}
                ariaLabel="Toggle profile visibility"
              />

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
                      Keep the control plain and accessible with semantic form elements.
                    </p>
                  </div>
                </div>

                <label
                  htmlFor="language-select"
                  className="block text-sm font-medium text-slate-700 dark:text-slate-200"
                >
                  Preferred language
                </label>
                <select
                  id="language-select"
                  value={language}
                  onChange={(event) => setLanguage(event.target.value)}
                  className="mt-2 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition-colors focus:border-indigo-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
                >
                  <option value="en">English</option>
                  <option value="hi">Hindi</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                </select>
              </div>
            </div>
          </SurfaceCard>

          <div className="space-y-6">
            <SurfaceCard as="section">
              <header>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                  Quick actions
                </h2>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                  Reusable action tiles make this page easy to extend later.
                </p>
              </header>

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
            </SurfaceCard>

            <SurfaceCard as="section">
              <header>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                  Account
                </h2>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                  Keep destructive actions isolated and easy to scan.
                </p>
              </header>

              <button
                type="button"
                onClick={handleLogout}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700 transition-colors hover:bg-red-100 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-300 dark:hover:bg-red-500/15"
              >
                <IconLogout size={18} />
                Logout
              </button>
            </SurfaceCard>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsView;

