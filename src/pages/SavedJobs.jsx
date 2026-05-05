import { useState, useEffect } from 'react';
import { getUserJobById } from '../services/user/jobsApi';
import { getSavedJobs, unsaveJob } from '../services/user/savedJobsApi';
import { getCurrentUser } from '../auth';
import Loader from '../components/Loader';

export default function SavedJobs() {
  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const userId = getCurrentUser()?.id;

  useEffect(() => {
    if (!userId) { setError('Please sign in to view saved jobs.'); setLoading(false); return; }
    getSavedJobs(userId)
      .then(async res => {
        const saved = Array.isArray(res.data) ? res.data : [];
        const jobs = await Promise.all(saved.map(async item => {
          try {
            const jobRes = await getUserJobById(item.jobId);
            return { ...item, job: jobRes.data };
          } catch { return { ...item, job: null }; }
        }));
        setSavedJobs(jobs);
      })
      .catch(() => setError('Could not load saved jobs.'))
      .finally(() => setLoading(false));
  }, [userId]);

  const handleUnsave = async (jobId) => {
    try {
      await unsaveJob(userId, jobId);
      setSavedJobs(prev => prev.filter(item => item.jobId !== jobId));
    } catch { alert('Failed to remove.'); }
  };

  if (loading) return <div className="page"><Loader /></div>;

  return (
    <div className="page">
      <div className="card card-header">
        <h2 style={{ fontSize: 22, fontWeight: 600 }}>Saved Jobs</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', marginTop: 4 }}>Jobs you bookmarked from listings.</p>
      </div>
      {error && <div className="alert alert-error">{error}</div>}
      {savedJobs.length === 0 ? (
        <div className="empty-state">You have not saved any jobs yet.</div>
      ) : (
        <div className="card section-gap">
          {savedJobs.map(item => (
            <div key={item.id} style={{ padding: '12px 0', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
              <div>
                <h3 style={{ fontSize: 16, fontWeight: 600 }}>{item.job?.title || `Job #${item.jobId}`}</h3>
                <p style={{ fontSize: 14, color: 'var(--text-secondary)' }}>{item.job?.company || 'N/A'} · {item.job?.location || 'N/A'}</p>
                {item.job?.salary && <p style={{ fontSize: 14 }}>Salary: {item.job.salary}</p>}
              </div>
              <button className="btn btn-outline btn-sm" onClick={() => handleUnsave(item.jobId)}>Remove</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
