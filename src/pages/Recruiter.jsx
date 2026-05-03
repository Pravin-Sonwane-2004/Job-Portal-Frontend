import { Link } from 'react-router-dom';
import { getCurrentUser, isRecruiter } from '../auth';

export default function Recruiter() {
  const user = getCurrentUser();

  if (!isRecruiter(user)) {
    return <div className="page"><div className="alert alert-error">Access denied. Recruiter only.</div></div>;
  }

  return (
    <div className="page">
      <div className="card">
        <h2 style={{ fontSize: 24, fontWeight: 700 }}>Recruiter Portal</h2>
        <p style={{ color: 'var(--text-secondary)', marginTop: 4 }}>Post jobs and review applicants for your openings.</p>
      </div>

      <div className="grid grid-3 section-gap">
        <Link to="/recruiter-jobs" className="card" style={{ textDecoration: 'none', textAlign: 'center' }}>
          <h3>My Jobs</h3>
          <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 4 }}>Create and manage openings</p>
        </Link>
        <Link to="/recruiter-applications" className="card" style={{ textDecoration: 'none', textAlign: 'center' }}>
          <h3>Applicants</h3>
          <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 4 }}>Review and update applications</p>
        </Link>
        <Link to="/profile" className="card" style={{ textDecoration: 'none', textAlign: 'center' }}>
          <h3>Company Profile</h3>
          <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 4 }}>Keep recruiter details current</p>
        </Link>
      </div>
    </div>
  );
}
