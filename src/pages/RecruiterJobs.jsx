import { useEffect, useState } from 'react';
import { recruiterCreateJob, recruiterDeleteJob, recruiterGetJobs, recruiterUpdateJob } from '../api';
import { getCurrentUser, isRecruiter } from '../auth';
import Loader from '../components/Loader';

const emptyJob = {
  title: '',
  company: '',
  location: '',
  salary: '',
  category: '',
  jobType: 'FULL_TIME',
  experienceLevel: 'JUNIOR',
  status: 'OPEN',
  description: '',
  requirements: '',
};

const toPayload = (job) => ({
  title: job.title,
  company: job.company,
  location: job.location,
  salary: job.salary,
  category: job.category,
  jobType: job.jobType,
  experienceLevel: job.experienceLevel,
  status: job.status,
  description: job.description,
  requirements: job.requirements ? job.requirements.split(',').map(item => item.trim()).filter(Boolean) : [],
});

const fromJob = (job) => ({
  ...emptyJob,
  ...job,
  requirements: Array.isArray(job.requirements) ? job.requirements.join(', ') : job.requirements || '',
});

export default function RecruiterJobs() {
  const user = getCurrentUser();
  const canAccess = isRecruiter(user);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [form, setForm] = useState(emptyJob);
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);

  const loadJobs = () => {
    setLoading(true);
    recruiterGetJobs()
      .then(res => setJobs(Array.isArray(res.data) ? res.data : []))
      .catch(() => setError('Failed to load recruiter jobs.'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (canAccess) loadJobs();
    else setLoading(false);
  }, [canAccess]);

  if (!canAccess) return <div className="page"><div className="alert alert-error">Access denied. Recruiter only.</div></div>;
  if (loading) return <div className="page"><Loader /></div>;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      if (editing) await recruiterUpdateJob(editing.id, toPayload(form));
      else await recruiterCreateJob(toPayload(form));
      setForm(emptyJob);
      setEditing(null);
      loadJobs();
    } catch (err) {
      const msg = err?.response?.data?.message || err?.response?.data || 'Failed to save job.';
      setError(typeof msg === 'string' ? msg : 'Failed to save job.');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (job) => {
    setEditing(job);
    setForm(fromJob(job));
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this job?')) return;
    try {
      await recruiterDeleteJob(id);
      setJobs(prev => prev.filter(job => job.id !== id));
    } catch {
      setError('Failed to delete job.');
    }
  };

  return (
    <div className="page">
      <div className="card">
        <h2 style={{ fontSize: 22, fontWeight: 700 }}>{editing ? 'Edit Job' : 'Post a Job'}</h2>
        {error && <div className="alert alert-error">{error}</div>}
        <form onSubmit={handleSubmit} className="section-gap">
          <div className="grid grid-2">
            <div className="form-group"><label className="form-label">Title</label><input className="form-input" value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} required /></div>
            <div className="form-group"><label className="form-label">Company</label><input className="form-input" value={form.company} onChange={e => setForm(p => ({ ...p, company: e.target.value }))} required /></div>
            <div className="form-group"><label className="form-label">Location</label><input className="form-input" value={form.location} onChange={e => setForm(p => ({ ...p, location: e.target.value }))} required /></div>
            <div className="form-group"><label className="form-label">Salary</label><input className="form-input" value={form.salary} onChange={e => setForm(p => ({ ...p, salary: e.target.value }))} required /></div>
            <div className="form-group"><label className="form-label">Category</label><input className="form-input" value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))} /></div>
            <div className="form-group"><label className="form-label">Job Type</label><select className="form-select" value={form.jobType} onChange={e => setForm(p => ({ ...p, jobType: e.target.value }))}><option>FULL_TIME</option><option>PART_TIME</option><option>CONTRACT</option><option>INTERNSHIP</option><option>FREELANCE</option></select></div>
            <div className="form-group"><label className="form-label">Experience</label><select className="form-select" value={form.experienceLevel} onChange={e => setForm(p => ({ ...p, experienceLevel: e.target.value }))}><option>INTERN</option><option>JUNIOR</option><option>MID</option><option>SENIOR</option><option>EXPERT</option></select></div>
            <div className="form-group"><label className="form-label">Status</label><select className="form-select" value={form.status} onChange={e => setForm(p => ({ ...p, status: e.target.value }))}><option>OPEN</option><option>CLOSED</option><option>DRAFT</option></select></div>
          </div>
          <div className="form-group"><label className="form-label">Requirements</label><input className="form-input" value={form.requirements} onChange={e => setForm(p => ({ ...p, requirements: e.target.value }))} placeholder="Java, React, SQL" /></div>
          <div className="form-group"><label className="form-label">Description</label><textarea className="form-input" rows={4} value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} /></div>
          <div className="flex-end">
            {editing && <button type="button" className="btn btn-outline" onClick={() => { setEditing(null); setForm(emptyJob); }}>Cancel</button>}
            <button className="btn btn-primary" disabled={saving}>{saving ? 'Saving...' : editing ? 'Update Job' : 'Post Job'}</button>
          </div>
        </form>
      </div>

      <div className="grid grid-3 section-gap">
        {jobs.map(job => (
          <div key={job.id} className="card job-card">
            <h3>{job.title}</h3>
            <p style={{ color: 'var(--text-secondary)' }}>{job.company || 'Company'} · {job.status || 'OPEN'}</p>
            <dl>
              <div><dt>Location:</dt><dd>{job.location}</dd></div>
              <div><dt>Salary:</dt><dd>{job.salary}</dd></div>
              <div><dt>Applicants:</dt><dd>{job.applicationCount || 'View applications'}</dd></div>
            </dl>
            <div style={{ display: 'flex', gap: 8, marginTop: 'auto' }}>
              <button className="btn btn-primary btn-sm" onClick={() => handleEdit(job)}>Edit</button>
              <button className="btn btn-danger btn-sm" onClick={() => handleDelete(job.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
