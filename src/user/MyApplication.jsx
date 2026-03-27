import React, { useEffect, useState } from 'react';

import PageWrapper from '../components/PageWrapper';
import { RingLoader } from '../loader/RingLoader';
import {
  deleteApplicationById,
  getMyAppliedJobs,
  updateApplicationById,
} from '../services/jobPortalApi';
import AppliedJobCard from './MyApplications/AppliedJobCard';

const MyApplication = () => {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [loadingJobId, setLoadingJobId] = useState(null);

  useEffect(() => {
    getMyAppliedJobs()
      .then((response) => {
        setAppliedJobs(Array.isArray(response.data) ? response.data : []);
      })
      .catch(() => {
        setError('Unable to load your applications right now.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleCancel = async (job) => {
    if (!window.confirm(`Cancel your application for "${job.jobTitle}"?`)) {
      return;
    }

    setLoadingJobId(job.applicationId);

    try {
      await deleteApplicationById(job.applicationId);
      setAppliedJobs((currentJobs) =>
        currentJobs.filter((currentJob) => currentJob.applicationId !== job.applicationId)
      );
    } catch {
      setError('Failed to cancel the application.');
    } finally {
      setLoadingJobId(null);
    }
  };

  const handleUpdate = async (job) => {
    const newStatus = window.prompt('Enter new status for this application:', '');

    if (newStatus === null || !newStatus.trim()) {
      return;
    }

    setLoadingJobId(job.applicationId);

    try {
      await updateApplicationById(job.applicationId, { status: newStatus.trim() });
      setAppliedJobs((currentJobs) =>
        currentJobs.map((currentJob) =>
          currentJob.applicationId === job.applicationId
            ? { ...currentJob, status: newStatus.trim() }
            : currentJob
        )
      );
    } catch {
      setError('Failed to update the application.');
    } finally {
      setLoadingJobId(null);
    }
  };

  return (
    <PageWrapper>
      <section className="space-y-6">
        <header className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
          <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
            My Applications
          </h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            Review active applications, update a status, or cancel one if needed.
          </p>
        </header>

        {error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-300">
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex min-h-56 items-center justify-center rounded-3xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800">
            <RingLoader color="#4f46e5" size="48px" />
          </div>
        ) : appliedJobs.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 px-6 py-12 text-center text-sm text-slate-600 dark:border-slate-600 dark:bg-slate-800/60 dark:text-slate-400">
            You have not applied to any jobs yet.
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {appliedJobs.map((job) => (
              <AppliedJobCard
                key={job.applicationId}
                job={job}
                onCancel={handleCancel}
                onUpdate={handleUpdate}
                loading={loadingJobId === job.applicationId}
              />
            ))}
          </div>
        )}
      </section>
    </PageWrapper>
  );
};

export default MyApplication;
