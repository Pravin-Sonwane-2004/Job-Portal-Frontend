// AdminApplications.jsx is a page component. It handles one screen in the job portal.
import { useState, useEffect } from 'react';
import { adminGetApplications } from '../services/admin/applicationsApi';
import { isAdmin, getCurrentUser } from '../auth';
import Loader from '../components/Loader';

// AdminApplications is the main React component exported from this file.
export default function AdminApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const currentUser = getCurrentUser();

  // useEffect runs side effects like loading data after the component renders.
  useEffect(() => {
    adminGetApplications()
      .then(res => setApplications(Array.isArray(res.data) ? res.data : []))
      .catch(() => setError('Failed to load applications.'))
      .finally(() => setLoading(false));
  }, []);

  if (!isAdmin(currentUser)) return <div className="page"><div className="alert alert-error">Access denied.</div></div>;
  if (loading) return <div className="page"><Loader /></div>;

  const getJob = (app) => app.job || {};
  const getUser = (app) => app.user || {};

  return (
    <div className="page">
      <div className="card">
        <h2 style={{ fontSize: 22, fontWeight: 600 }}>All Applications</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', marginTop: 4 }}>View all job applications across the platform.</p>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      {applications.length === 0 ? (
        <div className="empty-state">No applications found.</div>
      ) : (
        <div className="card section-gap">
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border)', textAlign: 'left' }}>
                <th style={{ padding: 8 }}>Job Title</th>
                <th style={{ padding: 8 }}>Company</th>
                <th style={{ padding: 8 }}>Applicant</th>
                <th style={{ padding: 8 }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app, i) => (
                <tr key={app.applicationId || i} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: 8 }}>{app.jobTitle || getJob(app).title || 'N/A'}</td>
                  <td style={{ padding: 8 }}>{app.company || getJob(app).company || 'N/A'}</td>
                  <td style={{ padding: 8 }}>{app.applicantName || getUser(app).name || getUser(app).email || 'N/A'}</td>
                  <td style={{ padding: 8 }}>{app.status || 'Applied'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
