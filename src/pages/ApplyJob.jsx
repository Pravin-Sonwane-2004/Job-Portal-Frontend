import { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { applyToJob, getUserJobById } from '../api';
import { getCurrentUser, isUser } from '../auth';

export default function ApplyJob() {
  const { jobId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [job, setJob] = useState(location.state?.job || null);
  const user = getCurrentUser();

  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    resumeLink: '',
    coverLetter: '',
    phoneNumber: user?.phoneNumber || '',
    linkedinUrl: user?.linkedinUrl || '',
    portfolioUrl: '',
    expectedSalary: '',
    noticePeriod: '',
  });

  useEffect(() => {
    if (!job && jobId) {
      getUserJobById(jobId)
        .then(res => setJob(res.data))
        .catch(() => setStatus('Could not load job details.'));
    }
  }, [job, jobId]);

  const handleApply = async (e) => {
    e.preventDefault();
    if (!user?.id) { navigate('/signin'); return; }
    if (!isUser(user)) { navigate('/dashboard'); return; }
    setLoading(true);
    setStatus('');
    try {
      const res = await applyToJob(user.id, jobId, {
        ...form,
        source: 'Web',
        userAgent: window.navigator.userAgent,
      });
      const msg = typeof res.data === 'string' ? res.data : 'Application submitted.';
      setStatus(msg);
    } catch {
      setStatus('Failed to apply. Try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!job) return <div className="page"><div className="card">{status || 'Loading job details...'}</div></div>;

  return (
    <div className="page-narrow">
      <div className="card">
        <h2 style={{ fontSize: 22, fontWeight: 600, marginBottom: 12 }}>Apply for {job.title || job.jobTitle}</h2>
        <div className="profile-details">
          <div className="detail-item"><span className="label">Company:</span><span>{job.company || 'N/A'}</span></div>
          <div className="detail-item"><span className="label">Location:</span><span>{job.location || job.jobLocation || 'N/A'}</span></div>
          <div className="detail-item"><span className="label">Salary:</span><span>{job.salary || job.jobSalary || 'Negotiable'}</span></div>
        </div>
        <form onSubmit={handleApply} className="section-gap">
          <div className="form-group">
            <label className="form-label">Resume Link</label>
            <input className="form-input" value={form.resumeLink} onChange={e => setForm(p => ({ ...p, resumeLink: e.target.value }))} placeholder="https://..." required />
          </div>
          <div className="grid grid-2">
            <div className="form-group">
              <label className="form-label">Phone Number</label>
              <input className="form-input" value={form.phoneNumber} onChange={e => setForm(p => ({ ...p, phoneNumber: e.target.value }))} required />
            </div>
            <div className="form-group">
              <label className="form-label">Expected Salary</label>
              <input className="form-input" value={form.expectedSalary} onChange={e => setForm(p => ({ ...p, expectedSalary: e.target.value }))} placeholder="8 LPA" />
            </div>
            <div className="form-group">
              <label className="form-label">Notice Period</label>
              <input className="form-input" value={form.noticePeriod} onChange={e => setForm(p => ({ ...p, noticePeriod: e.target.value }))} placeholder="Immediate / 30 days" />
            </div>
            <div className="form-group">
              <label className="form-label">LinkedIn URL</label>
              <input className="form-input" value={form.linkedinUrl} onChange={e => setForm(p => ({ ...p, linkedinUrl: e.target.value }))} placeholder="https://linkedin.com/in/..." />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Portfolio URL</label>
            <input className="form-input" value={form.portfolioUrl} onChange={e => setForm(p => ({ ...p, portfolioUrl: e.target.value }))} placeholder="https://portfolio.example.com" />
          </div>
          <div className="form-group">
            <label className="form-label">Cover Letter</label>
            <textarea className="form-input" rows={5} value={form.coverLetter} onChange={e => setForm(p => ({ ...p, coverLetter: e.target.value }))} placeholder="Write a short note for the recruiter..." required />
          </div>
          <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
          <button className="btn btn-primary" type="submit" disabled={loading}>
            {loading ? 'Applying...' : 'Confirm Apply'}
          </button>
          <button className="btn btn-outline" type="button" onClick={() => navigate(-1)}>Back</button>
          </div>
        </form>
        {status && <div className="alert alert-info section-gap">{status}</div>}
      </div>
    </div>
  );
}
