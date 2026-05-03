import { Link } from 'react-router-dom';
import { isAdmin } from '../auth';
import { getCurrentUser } from '../auth';

export default function Admin() {
  const user = getCurrentUser();

  if (!isAdmin(user)) {
    return <div className="page"><div className="alert alert-error">Access denied. Admin only.</div></div>;
  }

  return (
    <div className="page">
      <div className="card">
        <h2 style={{ fontSize: 24, fontWeight: 700 }}>Admin Dashboard</h2>
        <p style={{ color: 'var(--text-secondary)', marginTop: 4 }}>Manage users, jobs, and applications.</p>
      </div>

      <div className="grid grid-3 section-gap">
        <Link to="/admin-users" className="card" style={{ textDecoration: 'none', textAlign: 'center' }}>
          <h3>Manage Users</h3>
          <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 4 }}>View, edit, delete users</p>
        </Link>
        <Link to="/admin-jobs" className="card" style={{ textDecoration: 'none', textAlign: 'center' }}>
          <h3>Manage Jobs</h3>
          <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 4 }}>Create, edit, delete jobs</p>
        </Link>
        <Link to="/admin-applications" className="card" style={{ textDecoration: 'none', textAlign: 'center' }}>
          <h3>Applications</h3>
          <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 4 }}>View all job applications</p>
        </Link>
      </div>
    </div>
  );
}
