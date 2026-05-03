import { getCurrentUser } from '../auth';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const user = getCurrentUser();

  return (
    <div className="page">
      <div className="card" style={{ textAlign: 'center' }}>
        <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>Dashboard</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: 20 }}>
          Welcome, {user?.name || user?.email || 'User'}!
        </p>
      </div>

      <div className="grid grid-3 section-gap">
        <Link to="/find-jobs" className="card" style={{ textDecoration: 'none', textAlign: 'center' }}>
          <h3>Find Jobs</h3>
          <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 4 }}>Browse and search listings</p>
        </Link>
        <Link to="/my-applications" className="card" style={{ textDecoration: 'none', textAlign: 'center' }}>
          <h3>My Applications</h3>
          <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 4 }}>Track your job applications</p>
        </Link>
        <Link to="/saved-jobs" className="card" style={{ textDecoration: 'none', textAlign: 'center' }}>
          <h3>Saved Jobs</h3>
          <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 4 }}>Jobs you bookmarked</p>
        </Link>
        <Link to="/profile" className="card" style={{ textDecoration: 'none', textAlign: 'center' }}>
          <h3>Profile</h3>
          <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 4 }}>View and edit your profile</p>
        </Link>
        <Link to="/resume-builder" className="card" style={{ textDecoration: 'none', textAlign: 'center' }}>
          <h3>Resume Builder</h3>
          <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 4 }}>Create your resume</p>
        </Link>
        <Link to="/settings" className="card" style={{ textDecoration: 'none', textAlign: 'center' }}>
          <h3>Settings</h3>
          <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 4 }}>Account preferences</p>
        </Link>
      </div>
    </div>
  );
}
