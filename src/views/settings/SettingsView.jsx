import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import SurfaceCard from '@/components/ui/SurfaceCard';
import ToggleSwitch from '@/components/ui/ToggleSwitch';
import useSessionToken from '@/hooks/useSessionToken';
import useThemeMode from '@/hooks/useThemeMode';
import { clearSessionToken } from '@/services/sessionService';
import { fetchCurrentUserName } from '@/services/userService';
import { parseJwt } from '@/utils/jwtUtils';

const getStoredBoolean = (key, fallback) => {
  const value = localStorage.getItem(key);
  return value === null ? fallback : value === 'true';
};

export default function SettingsView() {
  const navigate = useNavigate();
  const jwt = useSessionToken();
  const payload = parseJwt(jwt);
  const { isDarkMode, toggleTheme } = useThemeMode();
  const [userName, setUserName] = useState(payload?.email || 'User');
  const [emailNotif, setEmailNotif] = useState(() =>
    getStoredBoolean('settings:emailNotif', true)
  );
  const [profilePublic, setProfilePublic] = useState(() =>
    getStoredBoolean('settings:profilePublic', true)
  );

  useEffect(() => {
    if (!jwt) {
      return;
    }

    fetchCurrentUserName()
      .then((response) => setUserName(response.data || payload?.email || 'User'))
      .catch(() => setUserName(payload?.email || 'User'));
  }, [jwt, payload?.email]);

  useEffect(() => {
    localStorage.setItem('settings:emailNotif', String(emailNotif));
  }, [emailNotif]);

  useEffect(() => {
    localStorage.setItem('settings:profilePublic', String(profilePublic));
  }, [profilePublic]);

  const handleLogout = () => {
    clearSessionToken();
    navigate('/signin');
  };

  return (
    <main className="mx-auto max-w-4xl px-4 py-8">
      <SurfaceCard>
        <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
          Settings
        </h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
          Signed in as {userName}
        </p>
      </SurfaceCard>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <SurfaceCard>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            Preferences
          </h2>

          <div className="mt-4 space-y-4">
            <div className="flex items-center justify-between gap-4">
              <span className="text-sm text-slate-700 dark:text-slate-200">Dark mode</span>
              <ToggleSwitch
                checked={isDarkMode}
                onChange={toggleTheme}
                ariaLabel="Toggle dark mode"
              />
            </div>

            <div className="flex items-center justify-between gap-4">
              <span className="text-sm text-slate-700 dark:text-slate-200">
                Email notifications
              </span>
              <ToggleSwitch
                checked={emailNotif}
                onChange={() => setEmailNotif((value) => !value)}
                ariaLabel="Toggle email notifications"
              />
            </div>

            <div className="flex items-center justify-between gap-4">
              <span className="text-sm text-slate-700 dark:text-slate-200">
                Public profile
              </span>
              <ToggleSwitch
                checked={profilePublic}
                onChange={() => setProfilePublic((value) => !value)}
                ariaLabel="Toggle profile visibility"
              />
            </div>
          </div>
        </SurfaceCard>

        <SurfaceCard>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            Account
          </h2>

          <div className="mt-4 grid gap-3">
            <button
              type="button"
              onClick={() => navigate('/edit-profile')}
              className="rounded border border-slate-300 px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              Edit profile
            </button>
            <button
              type="button"
              onClick={() => navigate('/saved-jobs')}
              className="rounded border border-slate-300 px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              Saved jobs
            </button>
            <button
              type="button"
              onClick={handleLogout}
              className="rounded border border-red-200 bg-red-50 px-4 py-2 text-left text-sm font-semibold text-red-700"
            >
              Logout
            </button>
          </div>
        </SurfaceCard>
      </div>
    </main>
  );
}
