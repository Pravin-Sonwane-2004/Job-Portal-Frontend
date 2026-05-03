import { useEffect, useState } from 'react';
import { recruiterGetApplications, recruiterUpdateApplication } from '../api';
import { getCurrentUser, isRecruiter } from '../auth';
import Loader from '../components/Loader';

const getJob = (app) => app.job || {};
const getUser = (app) => app.user || {};

export default function RecruiterApplications() {
  const user = getCurrentUser();
  const canAccess = isRecruiter(user);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadApplications = () => {
    setLoading(true);
    recruiterGetApplications()
      .then(res => setApplications(Array.isArray(res.data) ? res.data : []))
      .catch(() => setError('Failed to load applications.'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (canAccess) loadApplications();
    else setLoading(false);
  }, [canAccess]);

  if (!canAccess) return <div className="page"><div className="alert alert-error">Access denied. Recruiter only.</div></div>;
  if (loading) return <div className="page"><Loader /></div>;

  const updateStatus = async (app, status) => {
    try {
      await recruiterUpdateApplication(app.id || app.applicationId, { status });
      setApplications(prev => prev.map(item => (item.id || item.applicationId) === (app.id || app.applicationId) ? { ...item, status } : item));
    } catch {
      setError('Failed to update application.');
    }
  };

  return (
    <div className="page">
      <div className="card">
        <h2 style={{ fontSize: 22, fontWeight: 700 }}>Applicants</h2>
        <p style={{ color: 'var(--text-secondary)', marginTop: 4 }}>Applications received for your posted jobs.</p>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      {applications.length === 0 ? (
        <div className="empty-state">No applications yet.</div>
      ) : (
        <div className="card section-gap">
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)', textAlign: 'left' }}>
                <th style={{ padding: 8 }}>Job</th>
                <th style={{ padding: 8 }}>Applicant</th>
                <th style={{ padding: 8 }}>Status</th>
                <th style={{ padding: 8 }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {applications.map(app => (
                <tr key={app.id || app.applicationId} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: 8 }}>{getJob(app).title || app.jobTitle || 'N/A'}</td>
                  <td style={{ padding: 8 }}>
                    <div>{getUser(app).name || 'Candidate'}</div>
                    <div style={{ color: 'var(--text-secondary)' }}>{getUser(app).email || app.userEmail || 'N/A'}</div>
                  </td>
                  <td style={{ padding: 8 }}>{app.status || 'APPLIED'}</td>
                  <td style={{ padding: 8 }}>
                    <select className="form-select" value={app.status || 'APPLIED'} onChange={e => updateStatus(app, e.target.value)}>
                      <option>APPLIED</option>
                      <option>UNDER_REVIEW</option>
                      <option>SHORTLISTED</option>
                      <option>REJECTED</option>
                      <option>HIRED</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
