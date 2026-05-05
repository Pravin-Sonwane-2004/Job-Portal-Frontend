// CompanyJobs.jsx is a page component. It handles one screen in the job portal.
import { useEffect, useState } from 'react';
import { companyCreateJob, companyDeleteJob, companyGetJobs, companyUpdateJob } from '../services/company/portalApi';
import Loader from '../components/Loader';

const emptyJob = {
  title: '',
  location: '',
  salary: '',
  category: '',
  jobType: 'FULL_TIME',
  experienceLevel: 'JUNIOR',
  status: 'OPEN',
  requirements: '',
  description: '',
};

const toPayload = (job) => ({
  ...job,
  requirements: job.requirements ? job.requirements.split(',').map((item) => item.trim()).filter(Boolean) : [],
});

const fromJob = (job) => ({
  ...emptyJob,
  ...job,
  requirements: Array.isArray(job.requirements) ? job.requirements.join(', ') : job.requirements || '',
});

// CompanyJobs is the main React component exported from this file.
export default function CompanyJobs() {
  const [jobs, setJobs] = useState([]);
  const [form, setForm] = useState(emptyJob);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  // loadJobs loads data from the backend and stores it in component state.
  const loadJobs = () => {
    setLoading(true);
    companyGetJobs()
      .then((response) => setJobs(Array.isArray(response.data) ? response.data : []))
      .catch(() => setError('Could not load company jobs.'))
      .finally(() => setLoading(false));
  };

  // useEffect runs side effects like loading data after the component renders.
  useEffect(() => {
    loadJobs();
  }, []);

  const submitJob = async (event) => {
    event.preventDefault();
    setError('');
    setSaving(true);
    try {
      if (editing) await companyUpdateJob(editing.id, toPayload(form));
      else await companyCreateJob(toPayload(form));
      setForm(emptyJob);
      setEditing(null);
      loadJobs();
    } catch (err) {
      const data = err?.response?.data;
      setError(typeof data === 'string' ? data : data?.message || 'Could not create job.');
    } finally {
      setSaving(false);
    }
  };

  const editJob = (job) => {
    setEditing(job);
    setForm(fromJob(job));
  };

  const deleteJob = async (id) => {
    if (!window.confirm('Delete this company job?')) return;
    setError('');
    try {
      await companyDeleteJob(id);
      setJobs((prev) => prev.filter((job) => job.id !== id));
      if (editing?.id === id) {
        setEditing(null);
        setForm(emptyJob);
      }
    } catch (err) {
      const data = err?.response?.data;
      setError(typeof data === 'string' ? data : data?.message || 'Could not delete job.');
    }
  };

  if (loading) return <div className="page"><Loader /></div>;

  return (
    <div className="page">
      <div className="card"><h2 style={{ fontSize: 22 }}>{editing ? 'Edit Company Job' : 'Company Jobs'}</h2></div>
      {error && <div className="alert alert-error">{error}</div>}
      <form className="card section-gap" onSubmit={submitJob}>
        <div className="grid grid-2">
          <div className="form-group"><label className="form-label">Title</label><input className="form-input" value={form.title} onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value }))} required /></div>
          <div className="form-group"><label className="form-label">Location</label><input className="form-input" value={form.location} onChange={(event) => setForm((prev) => ({ ...prev, location: event.target.value }))} required /></div>
          <div className="form-group"><label className="form-label">Salary</label><input className="form-input" value={form.salary} onChange={(event) => setForm((prev) => ({ ...prev, salary: event.target.value }))} required /></div>
          <div className="form-group"><label className="form-label">Category</label><input className="form-input" value={form.category} onChange={(event) => setForm((prev) => ({ ...prev, category: event.target.value }))} /></div>
          <div className="form-group"><label className="form-label">Job Type</label><select className="form-select" value={form.jobType} onChange={(event) => setForm((prev) => ({ ...prev, jobType: event.target.value }))}><option>FULL_TIME</option><option>PART_TIME</option><option>CONTRACT</option><option>INTERNSHIP</option><option>FREELANCE</option></select></div>
          <div className="form-group"><label className="form-label">Experience</label><select className="form-select" value={form.experienceLevel} onChange={(event) => setForm((prev) => ({ ...prev, experienceLevel: event.target.value }))}><option>INTERN</option><option>JUNIOR</option><option>MID</option><option>SENIOR</option><option>EXPERT</option></select></div>
          <div className="form-group"><label className="form-label">Status</label><select className="form-select" value={form.status} onChange={(event) => setForm((prev) => ({ ...prev, status: event.target.value }))}><option>OPEN</option><option>CLOSED</option><option>DRAFT</option></select></div>
        </div>
        <div className="form-group"><label className="form-label">Requirements</label><input className="form-input" value={form.requirements} onChange={(event) => setForm((prev) => ({ ...prev, requirements: event.target.value }))} placeholder="Java, React, SQL" /></div>
        <div className="form-group"><label className="form-label">Description</label><textarea className="form-input" rows={4} value={form.description} onChange={(event) => setForm((prev) => ({ ...prev, description: event.target.value }))} /></div>
        <div className="flex-end">
          {editing && <button type="button" className="btn btn-outline" onClick={() => { setEditing(null); setForm(emptyJob); }}>Cancel</button>}
          <button className="btn btn-primary" disabled={saving}>{saving ? 'Saving...' : editing ? 'Update Company Job' : 'Post Company Job'}</button>
        </div>
      </form>
      <div className="grid grid-3 section-gap">
        {jobs.map((job) => (
          <div className="card job-card" key={job.id}>
            <h3>{job.title}</h3>
            <p style={{ color: 'var(--text-secondary)' }}>{job.company} · {job.status}</p>
            <dl>
              <div><dt>Location:</dt><dd>{job.location}</dd></div>
              <div><dt>Salary:</dt><dd>{job.salary}</dd></div>
            </dl>
            <div style={{ display: 'flex', gap: 8, marginTop: 'auto' }}>
              <button className="btn btn-primary btn-sm" onClick={() => editJob(job)}>Edit</button>
              <button className="btn btn-danger btn-sm" onClick={() => deleteJob(job.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
