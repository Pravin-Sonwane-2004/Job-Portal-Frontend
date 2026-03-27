import React from 'react';
import PageWrapper from '../../components/PageWrapper';

const AdminPage = () => {
  return (
    <PageWrapper>
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
          Admin Dashboard
        </h1>
      </section>
    </PageWrapper>
  );
};

export default AdminPage;
