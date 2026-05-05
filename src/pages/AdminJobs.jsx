// AdminJobs.jsx is a page component. It handles one screen in the job portal.
import { useState, useEffect } from 'react';
import { adminCreateJob, adminUpdateJob, adminDeleteJob, adminGetJobs } from '../services/admin/jobsApi';
import { isAdmin, getCurrentUser } from '../auth';
import Loader from '../components/Loader';

// AdminJobs is the main React component exported from this file.
export default function AdminJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showCreate, setShowCreate] = useState(false);
  const [editJob, setEditJob] = useState(null);
  const [form, setForm] = useState({ title: '', location: '', salary: '', company: '' });
  const currentUser = getCurrentUser();

  // useEffect runs side effects like loading data after the component renders.
  useEffect(() => {
    adminGetJobs().then(res => { setJobs(Array.isArray(res.data) ? res.data : []); setLoading(false); }).catch(() => { setError('Failed to load jobs.'); setLoading(false); });
  }, []);

  if (!isAdmin(currentUser)) return <div className="page"><div className="alert alert-error">Access denied.</div></div>;
  if (loading) return <div className="page"><Loader /></div>;

  // handleCreate runs when the user performs this action on the page.
  const handleCreate = async () => {
    try {
      await adminCreateJob(form);
      setShowCreate(false);
      setForm({ title: '', location: '', salary: '', company: '' });
      adminGetJobs().then(res => setJobs(Array.isArray(res.data) ? res.data : []));
    } catch { alert('Failed to create job.'); }
  };

  // handleUpdate runs when the user performs this action on the page.
  const handleUpdate = async () => {
    try {
      await adminUpdateJob(editJob.id, editJob);
      setEditJob(null);
      adminGetJobs().then(res => setJobs(Array.isArray(res.data) ? res.data : []));
    } catch { alert('Failed to update job.'); }
  };

  // handleDelete runs when the user performs this action on the page.
  const handleDelete = async (id) => {
    if (!window.confirm('Delete this job?')) return;
    try {
      await adminDeleteJob(id);
      setJobs(prev => prev.filter(j => j.id !== id));
    } catch { alert('Failed to delete.'); }
  };

  return (
    <div className="page">
      <div className="card">
        <div className="flex-between">
          <h2 style={{ fontSize: 22, fontWeight: 600 }}>Manage Jobs</h2>
          <button className="btn btn-success btn-sm" onClick={() => { setForm({ title: '', location: '', salary: '', company: '' }); setShowCreate(true); }}>+ Create Job</button>
        </div>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      {jobs.length === 0 ? (
        <div className="empty-state">No jobs found.</div>
      ) : (
        <div className="grid grid-3 section-gap">
          {jobs.map(job => (
            <div key={job.id} className="card job-card">
              <h3>{job.title || job.jobTitle}</h3>
              <p style={{ fontSize: 14, color: 'var(--text-secondary)' }}>{job.company || 'N/A'}</p>
              <dl>
                <div><dt>Location:</dt><dd>{job.location || job.jobLocation || 'N/A'}</dd></div>
                <div><dt>Salary:</dt><dd>{job.salary || job.jobSalary || 'N/A'}</dd></div>
              </dl>
              <div style={{ display: 'flex', gap: 8, marginTop: 'auto' }}>
                <button className="btn btn-primary btn-sm" onClick={() => setEditJob(job)}>Edit</button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(job.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {(showCreate || editJob) && (
        <div className="modal-overlay" onClick={() => { setShowCreate(false); setEditJob(null); }}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h3>{editJob ? 'Edit Job' : 'Create Job'}</h3>
            <div className="form-group"><label className="form-label">Title</label><input className="form-input" value={editJob ? editJob.title : form.title} onChange={e => editJob ? setEditJob(p => ({ ...p, title: e.target.value })) : setForm(p => ({ ...p, title: e.target.value }))} /></div>
            <div className="form-group"><label className="form-label">Location</label><input className="form-input" value={editJob ? (editJob.location || '') : form.location} onChange={e => editJob ? setEditJob(p => ({ ...p, location: e.target.value })) : setForm(p => ({ ...p, location: e.target.value }))} /></div>
            <div className="form-group"><label className="form-label">Salary</label><input className="form-input" value={editJob ? (editJob.salary || '') : form.salary} onChange={e => editJob ? setEditJob(p => ({ ...p, salary: e.target.value })) : setForm(p => ({ ...p, salary: e.target.value }))} /></div>
            <div className="form-group"><label className="form-label">Company</label><input className="form-input" value={editJob ? (editJob.company || '') : form.company} onChange={e => editJob ? setEditJob(p => ({ ...p, company: e.target.value })) : setForm(p => ({ ...p, company: e.target.value }))} /></div>
            <div className="modal-actions">
              <button className="btn btn-outline" onClick={() => { setShowCreate(false); setEditJob(null); }}>Cancel</button>
              <button className="btn btn-primary" onClick={editJob ? handleUpdate : handleCreate}>{editJob ? 'Update' : 'Create'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
