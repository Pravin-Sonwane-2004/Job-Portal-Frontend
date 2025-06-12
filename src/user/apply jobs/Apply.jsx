import React, { useState, useEffect } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
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

  // getUserIdFromJwt is now imported from utils

  // Fetch applied jobs on mount
  useEffect(() => {
    const fetchAppliedJobs = async () => {
      setFetchingApplied(true);
      setFetchError('');
      try {
        const res = await fetch('https://job-portal-backend-production-8f84.up.railway.app/apply/applications/my-applied-dto', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('jwt')}`,
          },
        });
        if (!res.ok) throw new Error('Failed to fetch applied jobs');
        const jobs = await res.json();
        setAppliedJobs(jobs);
      } catch (err) {
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
      const res = await fetch(`https://job-portal-backend-production-8f84.up.railway.app/apply/applications/apply?userId=${userId}&jobId=${jobId}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('jwt')}`,
        },
      });
      const msg = await res.text();
      setStatus(msg);
      // Refresh applied jobs after applying
      if (msg.includes('successfully')) {
        // Re-fetch applied jobs
        const jobsRes = await fetch('https://job-portal-backend-production-8f84.up.railway.app/apply/applications/my-applied-dto', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('jwt')}`,
          },
        });
        if (jobsRes.ok) {
          const jobs = await jobsRes.json();
          setAppliedJobs(jobs);
        }
      }
    } catch {
      setStatus('Failed to apply. Try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!job) {
    return <div className="p-8">No job details found.</div>;
  }

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Apply for: {job.jobTitle}</h2>
      <div className="mb-2"><b>Company:</b> {job.company}</div>
      <div className="mb-2"><b>Location:</b> {job.location}</div>
      <div className="mb-2"><b>Salary:</b> {job.salary}</div>
      <div className="mb-2"><b>Posted:</b> {job.postedDaysAgo}</div>
      <button
        className="mt-4 bg-bright-sun-400 text-masala-950 font-semibold py-2 px-5 rounded-lg hover:bg-bright-sun-500 transition-colors duration-200 shadow"
        onClick={handleApply}
        disabled={loading}
      >
        {loading ? 'Applying...' : 'Confirm Apply'}
      </button>
      {status && (
        <div className="mt-4 text-yellow-500">{status}</div>
      )}
      <button
        className="mt-4 ml-4 text-blue-500 underline"
        onClick={() => navigate(-1)}
      >
        Back
      </button>

      <div className="mt-10">
        <h3 className="text-xl font-semibold mb-2">My Applied Jobs</h3>
        {fetchingApplied ? (
          <div>Loading applied jobs...</div>
        ) : fetchError ? (
          <div className="text-red-500">{fetchError}</div>
        ) : appliedJobs.length === 0 ? (
          <div>No jobs applied yet.</div>
        ) : (
          <ul className="list-disc pl-5">
            {appliedJobs.map((aj, idx) => (
              <li key={aj.id || idx} className="mb-2">
                <b>{aj.title}</b> {aj.company ? `at ${aj.company}` : ''}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Apply;
