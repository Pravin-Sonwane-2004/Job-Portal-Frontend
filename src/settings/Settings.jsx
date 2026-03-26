// filepath: c:\SPRING BOOT\Fullstack JobApp Primary\job-portal-frontend\src\settings\Settings.jsx
import React, { useState } from 'react';

const Settings = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [emailNotif, setEmailNotif] = useState(true);

  // You can fetch user info here if needed
  const userName = localStorage.getItem('userName') || 'User';

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-8 px-4">
      <div className="max-w-md mx-auto">
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-4">
            Settings
          </h3>
          <div className="border-t border-slate-200 dark:border-slate-700 mb-4"></div>

          <div className="space-y-4">
            <div className="text-sm text-slate-700 dark:text-slate-300">
              <span className="font-medium">User:</span> {userName}
            </div>

            <div className="flex items-center justify-between">
              <label htmlFor="dark-mode" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Dark mode
              </label>
              <button
                id="dark-mode"
                type="button"
                onClick={() => setDarkMode(!darkMode)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                  darkMode ? 'bg-indigo-600' : 'bg-slate-200 dark:bg-slate-700'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    darkMode ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <label htmlFor="email-notif" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Email notifications
              </label>
              <button
                id="email-notif"
                type="button"
                onClick={() => setEmailNotif(!emailNotif)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                  emailNotif ? 'bg-indigo-600' : 'bg-slate-200 dark:bg-slate-700'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    emailNotif ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>

          <div className="border-t border-slate-200 dark:border-slate-700 my-6"></div>

          <div className="text-sm text-slate-600 dark:text-slate-400 mb-4">
            Account actions and more settings coming soon.
          </div>

          <button
            type="button"
            disabled
            className="w-full bg-red-600 hover:bg-red-700 disabled:bg-red-400 disabled:cursor-not-allowed text-white font-medium py-2.5 px-4 rounded-lg transition-colors"
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
