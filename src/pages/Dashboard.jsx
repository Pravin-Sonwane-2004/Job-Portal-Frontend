// Dashboard.jsx is a page component. It handles one screen in the job portal.
import { useEffect, useState } from 'react';
import { getCurrentUser } from '../auth';
import { Link } from 'react-router-dom';
import { isAdmin, isRecruiter } from '../auth';
import { getProfileInsights } from '../services/user/profileApi';

// InsightsPanel is a helper component used inside this page.
function InsightsPanel() {
  const [insights, setInsights] = useState(null);
  const [error, setError] = useState('');

  // useEffect runs side effects like loading data after the component renders.
  useEffect(() => {
    let active = true;
    getProfileInsights()
      .then((response) => {
        if (active) setInsights(response.data);
      })
      .catch(() => {
        if (active) setError('Profile insights are unavailable right now.');
      });
    return () => {
      active = false;
    };
  }, []);

  if (error) return <div className="alert alert-info">{error}</div>;
  if (!insights) return <div className="alert alert-info">Loading profile insights...</div>;

  const stats = [
    ['Profile', `${insights.profileCompletion || 0}%`],
    ['Users', insights.totalUsers],
    ['Jobs', insights.totalJobs],
    ['Applications', insights.totalApplications],
    ['Saved', insights.savedJobs],
    ['Resumes', insights.resumes],
  ].filter(([, value]) => value !== 0 && value !== '0%');

  return (
    <div className="card section-gap">
      <div className="flex-between">
        <div>
          <h3 style={{ fontSize: 18 }}>Profile Insights</h3>
          <p style={{ color: 'var(--text-secondary)', marginTop: 4 }}>{insights.nextAction}</p>
        </div>
      </div>
      <div className="insight-grid">
        {stats.map(([label, value]) => (
          <div className="insight-tile" key={label}>
            <strong>{value}</strong>
            <span>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Dashboard is the main React component exported from this file.
export default function Dashboard() {
  const user = getCurrentUser();

  if (isAdmin(user)) {
    return (
      <div className="page">
        <div className="card">
          <h2 style={{ fontSize: 24, fontWeight: 700 }}>Admin Portal</h2>
          <p style={{ color: 'var(--text-secondary)', marginTop: 4 }}>Platform-wide users, jobs, and applications.</p>
        </div>
        <InsightsPanel />
        <div className="grid grid-3 section-gap">
          <Link to="/admin-users" className="card" style={{ textDecoration: 'none', textAlign: 'center' }}><h3>Users</h3><p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Manage accounts</p></Link>
          <Link to="/admin-jobs" className="card" style={{ textDecoration: 'none', textAlign: 'center' }}><h3>Jobs</h3><p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Manage listings</p></Link>
          <Link to="/admin-applications" className="card" style={{ textDecoration: 'none', textAlign: 'center' }}><h3>Applications</h3><p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Review all activity</p></Link>
        </div>
      </div>
    );
  }

  if (isRecruiter(user)) {
    return (
      <div className="page">
        <div className="card">
          <h2 style={{ fontSize: 24, fontWeight: 700 }}>Recruiter Portal</h2>
          <p style={{ color: 'var(--text-secondary)', marginTop: 4 }}>Manage your jobs and applicants.</p>
        </div>
        <InsightsPanel />
        <div className="grid grid-3 section-gap">
          <Link to="/recruiter-jobs" className="card" style={{ textDecoration: 'none', textAlign: 'center' }}><h3>My Jobs</h3><p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Post and update jobs</p></Link>
          <Link to="/recruiter-applications" className="card" style={{ textDecoration: 'none', textAlign: 'center' }}><h3>Applicants</h3><p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Track candidates</p></Link>
          <Link to="/recruiter-talent" className="card" style={{ textDecoration: 'none', textAlign: 'center' }}><h3>Talent</h3><p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Search candidates</p></Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="card" style={{ textAlign: 'center' }}>
        <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>Dashboard</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: 20 }}>
          Welcome, {user?.name || user?.email || 'User'}!
        </p>
      </div>

      <InsightsPanel />

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
