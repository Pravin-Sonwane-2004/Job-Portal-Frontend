import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { getCurrentUser, clearCurrentUser, isAdmin, isUser, getDisplayName, getRoleLabel, onSessionChange } from '../auth';

const navLinks = (user) => {
  const links = [
    { to: '/find-jobs', label: 'Find Jobs' },
  ];
  if (user) {
    links.push({ to: '/dashboard', label: 'Dashboard' });
    links.push({ to: '/my-applications', label: 'Applications' });
    links.push({ to: '/saved-jobs', label: 'Saved Jobs' });
  }
  if (isAdmin(user)) {
    links.push({ to: '/admin', label: 'Admin' });
    links.push({ to: '/admin-jobs', label: 'Manage Jobs' });
    links.push({ to: '/admin-users', label: 'Users' });
    links.push({ to: '/admin-applications', label: 'Applications' });
  }
  return links;
};

export default function Layout({ children }) {
  const [user, setUser] = useState(getCurrentUser);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => onSessionChange(() => setUser(getCurrentUser())), []);

  const handleLogout = () => {
    clearCurrentUser();
    navigate('/signin');
  };

  const links = navLinks(user);

  return (
    <>
      <header className="header">
        <div className="container header-inner">
          <Link to="/" className="brand">
            <span className="brand-icon">JP</span>
            Job Portal
          </Link>

          <nav className="nav">
            {links.map(l => (
              <NavLink key={l.to} to={l.to}>{l.label}</NavLink>
            ))}
          </nav>

          <div className="header-actions">
            {user ? (
              <div className="user-menu" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
                  {getDisplayName(user)} ({getRoleLabel(user)})
                </span>
                <button className="btn btn-outline btn-sm" onClick={handleLogout}>Sign Out</button>
              </div>
            ) : (
              <Link to="/signin" className="btn btn-primary btn-sm">Sign In</Link>
            )}
            <button className="mobile-toggle" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="mobile-nav">
            {links.map(l => (
              <NavLink key={l.to} to={l.to} onClick={() => setMobileOpen(false)}>{l.label}</NavLink>
            ))}
            {user ? (
              <a href="#" onClick={(e) => { e.preventDefault(); handleLogout(); setMobileOpen(false); }}>Sign Out</a>
            ) : (
              <NavLink to="/signin" onClick={() => setMobileOpen(false)}>Sign In</NavLink>
            )}
          </div>
        )}
      </header>

      <main style={{ flex: 1 }}>{children}</main>

      <footer className="footer">
        <div className="container footer-inner">
          <p>Job Portal</p>
          <div className="footer-links">
            <Link to="/find-jobs">Find Jobs</Link>
            <Link to="/settings">Settings</Link>
          </div>
        </div>
      </footer>
    </>
  );
}
