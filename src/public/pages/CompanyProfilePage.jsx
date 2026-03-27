import React from 'react';

import PageWrapper from '../../components/PageWrapper';

const CompanyProfilePage = () => (
  <PageWrapper>
    <section className="mx-auto max-w-4xl rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
      <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
        Company Profile
      </h1>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
        Company details, open jobs, and reviews will be rendered here when the
        public company API is ready.
      </p>
    </section>
  </PageWrapper>
);

export default CompanyProfilePage;
