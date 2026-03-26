import React, { useEffect, useState } from 'react';
import {
  getMyAppliedJobs,
  cancelApplication
} from '../../all services/getJfBackendService';

const MyApplications = () => {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [cancelingId, setCancelingId] = useState(null);
  const [cancelError, setCancelError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const fetchAppliedJobs = () => {
    setLoading(true);
    setError('');
    getMyAppliedJobs()
      .then((res) => {
        setAppliedJobs(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Could not connect to server. Please try again later.');
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchAppliedJobs();
    // eslint-disable-next-line
  }, []);

  const handleCancel = (jobId) => {
    if (!window.confirm('Are you sure you want to cancel this application?')) return;
    setCancelingId(jobId);
    setCancelError('');
    setSuccessMsg('');
    cancelApplication(jobId)
      .then((res) => {
        setSuccessMsg(res.data || 'Application cancelled successfully.');
        fetchAppliedJobs();
      })
      .catch(() => {
        setCancelError('Failed to cancel application. Please try again.');
      })
      .finally(() => {
        setCancelingId(null);
      });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">My Applied Jobs</h2>
      {successMsg && <div className="text-green-600 mb-2">{successMsg}</div>}
      {cancelError && <div className="text-red-500 mb-2">{cancelError}</div>}
      {appliedJobs.length === 0 ? (
        <div>No jobs applied yet.</div>
      ) : (
        <ul className="space-y-4">
          {appliedJobs.map((job) => (
            <li key={job.id} className="border rounded p-4 shadow flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <div className="font-semibold text-lg">{job.title}</div>
                <div className="text-neutral-600">{job.company}</div>
                <div className="text-sm text-neutral-500">
                  Posted: {job.postedDate ? job.postedDate : 'N/A'}
                </div>
              </div>
              <button
                className={`mt-4 md:mt-0 px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600 transition ${cancelingId === job.id ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={() => handleCancel(job.id)}
                disabled={cancelingId === job.id}
              >
                {cancelingId === job.id ? 'Cancelling...' : 'Cancel Application'}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyApplications;
