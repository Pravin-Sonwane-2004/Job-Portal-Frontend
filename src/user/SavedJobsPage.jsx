import React, { useEffect, useState } from 'react';

import PageWrapper from '../components/PageWrapper';
import {
  getSavedJobsByUser,
  unsaveJobApi,
  userGetJobById,
} from '../services/jobPortalApi';
import { getUserIdFromJwt } from '../utils/jwtUtils';

export default function SavedJobsPage() {
  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const userId = getUserIdFromJwt();

  const loadSavedJobs = async () => {
    if (!userId || Number.isNaN(Number(userId))) {
      setError('Please sign in again to load saved jobs.');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await getSavedJobsByUser(userId);
      const saved = Array.isArray(response.data) ? response.data : [];
      const jobs = await Promise.all(
        saved.map(async (item) => {
          try {
            const jobResponse = await userGetJobById(item.jobId);
            return { ...item, job: jobResponse.data };
          } catch {
            return { ...item, job: null };
          }
        })
      );
      setSavedJobs(jobs);
    } catch {
      setError('Could not load saved jobs.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSavedJobs();
  }, [userId]);

  const handleUnsave = async (jobId) => {
    await unsaveJobApi(userId, jobId);
    setSavedJobs((current) => current.filter((item) => item.jobId !== jobId));
  };

  return (
    <PageWrapper>
      <section className="mx-auto max-w-5xl">
        <div className="rounded border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800">
          <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
            Saved Jobs
          </h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            Jobs you saved from the listings page.
          </p>
        </div>

        {error && (
          <div className="mt-4 rounded border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="mt-6 rounded border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800">
          {loading ? (
            <p className="p-6 text-sm text-slate-600 dark:text-slate-300">Loading saved jobs...</p>
          ) : savedJobs.length === 0 ? (
            <p className="p-6 text-sm text-slate-600 dark:text-slate-300">
              You have not saved any jobs yet.
            </p>
          ) : (
            <div className="divide-y divide-slate-200 dark:divide-slate-700">
              {savedJobs.map((item) => (
                <article key={item.id} className="p-5">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                        {item.job?.title || `Job #${item.jobId}`}
                      </h2>
                      <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                        {item.job?.company || 'Company not available'} ·{' '}
                        {item.job?.location || 'Location not available'}
                      </p>
                      {item.job?.salary && (
                        <p className="mt-1 text-sm text-slate-700 dark:text-slate-300">
                          Salary: {item.job.salary}
                        </p>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => handleUnsave(item.jobId)}
                      className="rounded border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-700"
                    >
                      Remove
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </PageWrapper>
  );
}
