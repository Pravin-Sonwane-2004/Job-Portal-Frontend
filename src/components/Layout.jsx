import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate, Outlet } from 'react-router-dom';
import { getCurrentUser, clearCurrentUser, isAdmin, getDisplayName, getRoleLabel, onSessionChange } from '../auth';

const navLinks = (user) => {
  const links = [{ to: '/find-jobs', label: 'Find Jobs' }];
  
  // Only add these if user is logged in
  if (user) {
    links.push({ to: '/dashboard', label: 'Dashboard' });
    links.push({ to: '/my-applications', label: 'Applications' });
  }
  
  // Null-safe check for Admin
  if (user && isAdmin(user)) {
    links.push({ to: '/admin', label: 'Admin' });
  }
  return links;
};

export default function Layout() {
  // Fix: Execute the function to get the initial state
  const [user, setUser] = useState(() => getCurrentUser()); 
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Listen for login/logout events
    const unsubscribe = onSessionChange(() => setUser(getCurrentUser()));
    return () => unsubscribe && unsubscribe(); 
  }, []);

  const handleLogout = () => {
    clearCurrentUser();
    setUser(null);
    navigate('/signin');
  };

  const links = navLinks(user);

  return (
    <div className="layout-wrapper">
      <header className="header">
        <div className="container header-inner">
          <Link to="/" className="brand">Job Portal</Link>
          
          <nav className="nav">
            {links.map(l => (
              <NavLink key={l.to} to={l.to} className={({ isActive }) => isActive ? 'active' : ''}>
                {l.label}
              </NavLink>
            ))}
          </nav>

          <div className="header-actions">
            {user ? (
              <div className="user-info">
                <span>{getDisplayName(user)}</span>
                <button onClick={handleLogout} className="btn-sm">Sign Out</button>
              </div>
            ) : (
              <Link to="/signin" className="btn-primary">Sign In</Link>
            )}
          </div>
        </div>
      </header>

      <main className="main-content">
        {/* This is the magic part: it renders the current page */}
        <Outlet /> 
      </main>

      <footer className="footer">
        <p>© {new Date().getFullYear()} Job Portal</p>
      </footer>
    </div>
  );
}