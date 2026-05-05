import { useState, useEffect } from 'react';
import { getMyAppliedJobs, deleteApplicationById } from '../services/user/applicationsApi';
import { getCurrentUser } from '../auth';
import Loader from '../components/Loader';

export default function MyApplications() {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const userId = getCurrentUser()?.id;

  useEffect(() => {
    if (!userId) { setError('Please sign in to view applications.'); setLoading(false); return; }
    getMyAppliedJobs(userId)
      .then(res => setAppliedJobs(Array.isArray(res.data) ? res.data : []))
      .catch(() => setError('Unable to load applications.'))
      .finally(() => setLoading(false));
  }, [userId]);

  const handleCancel = async (job) => {
    if (!window.confirm(`Cancel application for "${job.title || job.jobTitle}"?`)) return;
    try {
      await deleteApplicationById(job.applicationId || job.id);
      setAppliedJobs(prev => prev.filter(j => (j.applicationId || j.id) !== (job.applicationId || job.id)));
    } catch { setError('Failed to cancel.'); }
  };

  if (loading) return <div className="page"><Loader /></div>;

  return (
    <div className="page">
      <div className="card card-header">
        <h2 style={{ fontSize: 22, fontWeight: 600 }}>My Applications</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', marginTop: 4 }}>Review and manage your job applications.</p>
      </div>
      {error && <div className="alert alert-error">{error}</div>}
      {appliedJobs.length === 0 ? (
        <div className="empty-state">You have not applied to any jobs yet.</div>
      ) : (
        <div className="grid grid-3 section-gap">
          {appliedJobs.map(job => (
            <div key={job.applicationId || job.id} className="card job-card">
              <h3>{job.title || job.jobTitle || 'Job'}</h3>
              <p style={{ fontSize: 14, color: 'var(--text-secondary)' }}>{job.company || 'Company'}</p>
              <dl>
                <div><dt>Location:</dt><dd>{job.location || 'N/A'}</dd></div>
                <div><dt>Salary:</dt><dd>{job.salary || 'Negotiable'}</dd></div>
              </dl>
              <button className="btn btn-danger btn-sm" onClick={() => handleCancel(job)}>Cancel</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
