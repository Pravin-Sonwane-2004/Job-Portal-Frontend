import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import PageWrapper from '../../components/PageWrapper';
import { applyToJobByUser, getMyAppliedJobsDTO } from '../../services/jobPortalApi';
import { getUserIdFromJwt } from '../../utils/jwtUtils';

const Apply = () => {
  const { jobId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const job = location.state?.job;

  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [fetchingApplied, setFetchingApplied] = useState(false);
  const [fetchError, setFetchError] = useState('');

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      setFetchingApplied(true);
      setFetchError('');

      try {
        const response = await getMyAppliedJobsDTO();
        setAppliedJobs(Array.isArray(response.data) ? response.data : []);
      } catch {
        setFetchError('Could not fetch applied jobs.');
      } finally {
        setFetchingApplied(false);
      }
    };

    fetchAppliedJobs();
  }, []);

  const handleApply = async () => {
    const userId = getUserIdFromJwt();

    if (!userId) {
      setStatus('Could not determine your user ID. Please log out and sign in again.');
      return;
    }

    setLoading(true);
    setStatus('');

    try {
      const response = await applyToJobByUser(userId, jobId);
      const message =
        typeof response.data === 'string' ? response.data : 'Application submitted.';

      setStatus(message);

      if (message.toLowerCase().includes('successfully')) {
        const jobsResponse = await getMyAppliedJobsDTO();
        setAppliedJobs(Array.isArray(jobsResponse.data) ? jobsResponse.data : []);
      }
    } catch {
      setStatus('Failed to apply. Try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!job) {
    return (
      <PageWrapper>
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
          No job details found.
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <div className="mx-auto max-w-3xl space-y-6">
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
          <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
            Apply for {job.jobTitle || job.title}
          </h1>

          <dl className="mt-4 space-y-2 text-sm text-slate-700 dark:text-slate-300">
            <div>
              <dt className="font-medium text-slate-900 dark:text-slate-100">Company</dt>
              <dd>{job.company || 'Unknown Company'}</dd>
            </div>
            <div>
              <dt className="font-medium text-slate-900 dark:text-slate-100">Location</dt>
              <dd>{job.location || job.jobLocation || 'N/A'}</dd>
            </div>
            <div>
              <dt className="font-medium text-slate-900 dark:text-slate-100">Salary</dt>
              <dd>{job.salary || job.jobSalary || 'Negotiable'}</dd>
            </div>
            <div>
              <dt className="font-medium text-slate-900 dark:text-slate-100">Posted</dt>
              <dd>{job.postedDaysAgo ? `${job.postedDaysAgo} days ago` : 'Recently'}</dd>
            </div>
          </dl>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              className="rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-60"
              onClick={handleApply}
              disabled={loading}
            >
              {loading ? 'Applying...' : 'Confirm Apply'}
            </button>
            <button
              type="button"
              className="rounded-2xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-600 dark:text-slate-100 dark:hover:bg-slate-700"
              onClick={() => navigate(-1)}
            >
              Back
            </button>
          </div>

          {status && (
            <div className="mt-4 rounded-2xl border border-indigo-200 bg-indigo-50 px-4 py-3 text-sm text-indigo-700 dark:border-indigo-500/30 dark:bg-indigo-500/10 dark:text-indigo-300">
              {status}
            </div>
          )}
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            Current Applications
          </h2>

          {fetchingApplied ? (
            <p className="mt-4 text-sm text-slate-600 dark:text-slate-400">
              Loading applied jobs...
            </p>
          ) : fetchError ? (
            <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-300">
              {fetchError}
            </div>
          ) : appliedJobs.length === 0 ? (
            <p className="mt-4 text-sm text-slate-600 dark:text-slate-400">
              No jobs applied yet.
            </p>
          ) : (
            <ul className="mt-4 space-y-3">
              {appliedJobs.map((application, index) => (
                <li
                  key={application.id || `${application.title}-${index}`}
                  className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-300"
                >
                  <span className="font-medium text-slate-900 dark:text-slate-100">
                    {application.title}
                  </span>
                  {application.company ? ` at ${application.company}` : ''}
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </PageWrapper>
  );
};

export default Apply;
