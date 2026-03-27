import React from 'react';

const stats = [
  { label: 'Active Jobs', value: '10k+' },
  { label: 'Companies', value: '1k+' },
  { label: 'Candidates Hired', value: '15k+' },
];

const DreamJob = () => {
  return (
    <section className="grid gap-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-700 dark:bg-slate-800 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400">
          Job Portal
        </p>
        <h1 className="mt-4 text-4xl font-semibold leading-tight text-slate-900 dark:text-slate-100 sm:text-5xl">
          Find the right job with a frontend that stays out of the way.
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-400">
          Browse openings, manage applications, and keep your profile current with a
          simple interface built around the actual workflow.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900/70"
            >
              <p className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
                {stat.value}
              </p>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-3xl bg-slate-50 p-6 dark:bg-slate-900/70">
        <img
          src="/homepage images/Boy.png"
          alt="Job search illustration"
          className="mx-auto w-full max-w-md object-contain"
        />
      </div>
    </section>
  );
};

export default DreamJob;
