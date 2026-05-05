import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPublicJobs } from '../services/public/jobsApi';
import { saveJob } from '../services/user/savedJobsApi';
import { getCurrentUser, isUser } from '../auth';
import Loader from '../components/Loader';

export default function FindJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState('postedDate');
  const [jobTitle, setJobTitle] = useState('');
  const [jobLocation, setJobLocation] = useState('');
  const navigate = useNavigate();
  const user = getCurrentUser();
  const canApply = isUser(user);

  useEffect(() => {
    setLoading(true);
    setError('');
    getPublicJobs({ page: page - 1, size: 9, sortBy, sortDir: 'desc', jobTitle: jobTitle || undefined, jobLocation: jobLocation || undefined })
      .then(res => {
        setJobs(Array.isArray(res.data?.content) ? res.data.content : []);
        setTotalPages(res.data?.totalPages || 1);
      })
      .catch(() => setError('Failed to load jobs.'))
      .finally(() => setLoading(false));
  }, [page, sortBy, jobTitle, jobLocation]);

  const handleSave = async (jobId) => {
    if (!canApply) { navigate(user ? '/dashboard' : '/signin'); return; }
    try { await saveJob(user.id, jobId); alert('Job saved!'); } catch { alert('Failed to save job.'); }
  };

  return (
    <div className="page">
      <div className="card" style={{ marginBottom: 20 }}>
        <div className="flex-between">
          <div className="search-bar" style={{ marginBottom: 0 }}>
            <input className="form-input" placeholder="Search by title..." value={jobTitle} onChange={e => { setJobTitle(e.target.value); setPage(1); }} />
            <input className="form-input" placeholder="Search by location..." value={jobLocation} onChange={e => { setJobLocation(e.target.value); setPage(1); }} />
            <select className="form-select" value={sortBy} onChange={e => { setSortBy(e.target.value); setPage(1); }}>
              <option value="postedDate">Date Posted</option>
              <option value="jobSalary">Salary</option>
            </select>
          </div>
        </div>
      </div>

      {error && <div className="alert alert-error">{error}</div>}
      {loading ? <Loader /> : jobs.length === 0 ? (
        <div className="empty-state">No jobs found. Try adjusting your search.</div>
      ) : (
        <>
          <div className="grid grid-3">
            {jobs.map(job => (
              <div key={job.id} className="card job-card">
                <h3>{job.title || job.jobTitle || 'Job'}</h3>
                <p style={{ fontSize: 14, color: 'var(--text-secondary)' }}>{job.company || 'Company'}</p>
                <dl>
                  <div><dt>Location:</dt><dd>{job.location || job.jobLocation || 'N/A'}</dd></div>
                  <div><dt>Salary:</dt><dd>{job.salary || job.jobSalary || 'Negotiable'}</dd></div>
                </dl>
                <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                  {canApply ? (
                    <>
                      <button className="btn btn-primary btn-sm" onClick={() => navigate(`/apply/${job.id}`, { state: { job } })}>Apply</button>
                      <button className="btn btn-outline btn-sm" onClick={() => handleSave(job.id)}>Save</button>
                    </>
                  ) : (
                    <button className="btn btn-outline btn-sm" onClick={() => navigate(user ? '/dashboard' : '/signin')}>{user ? 'Open Portal' : 'Sign in to apply'}</button>
                  )}
                </div>
              </div>
            ))}
          </div>
          {totalPages > 1 && (
            <div className="pagination">
              {Array.from({ length: totalPages }, (_, i) => (
                <button key={i + 1} className={page === i + 1 ? 'active' : ''} onClick={() => setPage(i + 1)}>{i + 1}</button>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
