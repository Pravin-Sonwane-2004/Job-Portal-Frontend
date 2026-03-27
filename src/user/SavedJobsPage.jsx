import React from 'react';

import PageWrapper from '../components/PageWrapper';

const SavedJobsPage = () => (
  <PageWrapper>
    <section className="mx-auto max-w-4xl rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
      <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
        Saved Jobs
      </h1>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
        This page is reserved for the saved-jobs list once that API is connected.
      </p>
    </section>
  </PageWrapper>
);

export default SavedJobsPage;
