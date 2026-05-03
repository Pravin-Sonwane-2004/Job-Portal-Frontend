import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getCurrentUser, clearCurrentUser } from '../auth';
import { getFullName } from '../api';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Settings() {
  const navigate = useNavigate();
  const user = getCurrentUser();
  const [userName, setUserName] = useState(user?.name || user?.email || 'User');

  useEffect(() => {
    if (user?.id) {
      getFullName(user.id).then(res => { if (res.data) setUserName(res.data); }).catch(() => {});
    }
  }, [user?.id]);

  const handleLogout = () => {
    clearCurrentUser();
    navigate('/signin');
  };

  return (
    <div className="page-narrow">
      <div className="card">
        <h2 style={{ fontSize: 22, fontWeight: 600 }}>Settings</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', marginTop: 4 }}>Signed in as {userName}</p>
      </div>

      <div className="grid grid-2 section-gap">
        <div className="card">
          <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12 }}>Quick Links</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <Link to="/edit-profile" className="btn btn-outline" style={{ textAlign: 'left' }}>Edit Profile</Link>
            <Link to="/saved-jobs" className="btn btn-outline" style={{ textAlign: 'left' }}>Saved Jobs</Link>
            <Link to="/my-applications" className="btn btn-outline" style={{ textAlign: 'left' }}>My Applications</Link>
          </div>
        </div>
        <div className="card">
          <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12 }}>Account</h3>
          <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </div>
  );
}
