import React from 'react';

const companies = [
  'amazon',
  'Figma',
  'Google',
  'Microsoft',
  'Meta',
  'Oracle',
  'Netflix',
  'Spotify',
  'Pinterest',
  'Slack',
  'Walmart',
];

const Companies = () => {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-700 dark:bg-slate-800">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
            Trusted by hiring teams
          </h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            A simple grid keeps partner branding readable without animation overhead.
          </p>
        </div>
        <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
          1000+ companies
        </p>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {companies.map((company) => (
          <div
            key={company}
            className="flex h-24 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900/70"
          >
            <img
              src={`/Companies/${company}.png`}
              alt={company}
              className="max-h-10 w-auto object-contain"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Companies;
