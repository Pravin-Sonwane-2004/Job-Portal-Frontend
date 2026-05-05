// Layout renders the common header, navigation, page outlet, and footer.
import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate, Outlet } from 'react-router-dom';
import { getCurrentUser, clearCurrentUser, isAdmin, isCompanyAdmin, isCompanyUser, isRecruiter, isUser, getDisplayName, getRoleLabel, onSessionChange } from '../auth';

// Build the menu from the logged-in user's role.
// Keeping this outside the component makes Layout easier to read.
const navLinks = (user) => {
  // Everyone can search for jobs, so this link is always visible.
  const links = [{ to: '/find-jobs', label: 'Find Jobs' }];

  // Candidate-specific pages.
  if (user && isUser(user)) {
    links.push({ to: '/dashboard', label: 'Candidate' });
    links.push({ to: '/my-applications', label: 'Applications' });
    links.push({ to: '/saved-jobs', label: 'Saved' });
  }

  // Recruiter-specific pages.
  if (user && isRecruiter(user)) {
    links.push({ to: '/recruiter', label: 'Recruiter' });
    links.push({ to: '/recruiter-jobs', label: 'My Jobs' });
    links.push({ to: '/recruiter-applications', label: 'Applicants' });
    links.push({ to: '/recruiter-talent', label: 'Talent' });
  }

  // Platform admin pages.
  if (user && isAdmin(user)) {
    links.push({ to: '/admin', label: 'Admin' });
    links.push({ to: '/admin-users', label: 'Users' });
    links.push({ to: '/admin-jobs', label: 'Jobs' });
  }

  // Company user pages.
  if (user && isCompanyUser(user)) {
    links.push({ to: '/company', label: 'Company' });
    links.push({ to: '/company-jobs', label: 'Company Jobs' });

    // Only company admins can manage employees.
    if (isCompanyAdmin(user)) links.push({ to: '/company-employees', label: 'Employees' });
  }

  return links;
};

// Layout is the main React component exported from this file.
export default function Layout() {
  // Read the current user once when the app layout first loads.
  const [user, setUser] = useState(() => getCurrentUser()); 
  const navigate = useNavigate();

  // useEffect runs side effects like loading data after the component renders.
  useEffect(() => {
    // Keep the header updated when another part of the app logs in or out.
    const unsubscribe = onSessionChange(() => setUser(getCurrentUser()));

    // Stop listening when this layout is removed from the screen.
    return () => unsubscribe && unsubscribe(); 
  }, []);

  // handleLogout runs when the user performs this action on the page.
  const handleLogout = () => {
    // Clear saved auth data, update this component, then send the user to sign in.
    clearCurrentUser();
    setUser(null);
    navigate('/signin');
  };

  // Recalculate visible links whenever the user changes.
  const links = navLinks(user);

  return (
    <div className="layout-wrapper">
      <header className="header">
        <div className="container header-inner">
          {/* Brand link returns users to the home page. */}
          <Link to="/" className="brand">Job Portal</Link>
          
          <nav className="nav">
            {links.map(l => (
              // NavLink gives us isActive, which helps highlight the current page.
              <NavLink key={l.to} to={l.to} className={({ isActive }) => isActive ? 'active' : ''}>
                {l.label}
              </NavLink>
            ))}
          </nav>

          <div className="header-actions">
            {user ? (
              // When logged in, show identity, role, and logout action.
              <div className="user-info">
                <span>{getDisplayName(user)}</span>
                <span className="profile-badge">{getRoleLabel(user)}</span>
                <button onClick={handleLogout} className="btn-sm">Sign Out</button>
              </div>
            ) : (
              // Guests only need a sign-in link.
              <Link to="/signin" className="btn-primary">Sign In</Link>
            )}
          </div>
        </div>
      </header>

      <main className="main-content">
        {/* React Router renders the matched child page here. */}
        <Outlet /> 
      </main>

      <footer className="footer">
        {/* The year updates automatically, so the footer stays current. */}
        <p>© {new Date().getFullYear()} Job Portal</p>
      </footer>
    </div>
  );
}
