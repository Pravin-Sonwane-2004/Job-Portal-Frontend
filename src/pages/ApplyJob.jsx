import { useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { applyToJob, getMyAppliedJobs } from '../api';
import { getCurrentUser } from '../auth';

export default function ApplyJob() {
  const { jobId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const job = location.state?.job;
  const user = getCurrentUser();

  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleApply = async () => {
    if (!user?.id) { navigate('/signin'); return; }
    setLoading(true);
    setStatus('');
    try {
      const res = await applyToJob(user.id, jobId);
      const msg = typeof res.data === 'string' ? res.data : 'Application submitted.';
      setStatus(msg);
    } catch {
      setStatus('Failed to apply. Try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!job) {
    return <div className="page"><div className="card">No job details found.</div></div>;
  }

  return (
    <div className="page-narrow">
      <div className="card">
        <h2 style={{ fontSize: 22, fontWeight: 600, marginBottom: 12 }}>Apply for {job.title || job.jobTitle}</h2>
        <div className="profile-details">
          <div className="detail-item"><span className="label">Company:</span><span>{job.company || 'N/A'}</span></div>
          <div className="detail-item"><span className="label">Location:</span><span>{job.location || job.jobLocation || 'N/A'}</span></div>
          <div className="detail-item"><span className="label">Salary:</span><span>{job.salary || job.jobSalary || 'Negotiable'}</span></div>
        </div>
        <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
          <button className="btn btn-primary" onClick={handleApply} disabled={loading}>
            {loading ? 'Applying...' : 'Confirm Apply'}
          </button>
          <button className="btn btn-outline" onClick={() => navigate(-1)}>Back</button>
        </div>
        {status && <div className="alert alert-info section-gap">{status}</div>}
      </div>
    </div>
  );
}
