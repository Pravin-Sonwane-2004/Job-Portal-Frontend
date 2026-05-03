import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div>
      <div className="hero">
        <h1>Find Your Dream Job</h1>
        <p>Browse thousands of job listings, apply with one click, and track your applications — all in one place.</p>
        <div className="hero-actions">
          <Link to="/find-jobs" className="btn btn-primary">Browse Jobs</Link>
          <Link to="/register" className="btn btn-outline">Create Account</Link>
        </div>
      </div>

      <div className="container">
        <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 12 }}>Popular Categories</h2>
        <div className="category-grid">
          {['Web Development', 'Digital Marketing', 'UI/UX Design', 'Finance', 'Sales', 'Content Writing'].map(cat => (
            <div key={cat} className="category-card">
              <h3>{cat}</h3>
              <p>Open positions</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
