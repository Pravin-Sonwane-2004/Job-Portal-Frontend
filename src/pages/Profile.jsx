import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProfile } from '../services/user/profileApi';
import { getCurrentUser } from '../auth';
import Loader from '../components/Loader';

export default function Profile() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const currentUser = getCurrentUser();

  useEffect(() => {
    if (!currentUser?.id) { setLoading(false); return; }
    getProfile({ userId: currentUser.id })
      .then(res => setUserData(res.data))
      .catch(() => setUserData(null))
      .finally(() => setLoading(false));
  }, [currentUser?.id]);

  if (loading) return <div className="page"><Loader /></div>;
  if (!userData) return (
    <div className="page-narrow">
      <div className="card" style={{ textAlign: 'center' }}>
        <p style={{ color: 'var(--danger)' }}>Failed to load profile.</p>
        <button className="btn btn-primary section-gap" onClick={() => navigate('/edit-profile')}>Create Profile</button>
      </div>
    </div>
  );

  const details = [
    { label: 'Name', value: userData.fullName || userData.name || '' },
    { label: 'Email', value: userData.email || '' },
    { label: 'Location', value: userData.location || 'N/A' },
    { label: 'Phone', value: userData.phoneNumber || 'N/A' },
    { label: 'LinkedIn', value: userData.linkedinUrl || 'N/A' },
    { label: 'Skills', value: Array.isArray(userData.skills) ? userData.skills.join(', ') || 'N/A' : 'N/A' },
  ];

  return (
    <div className="page-narrow">
      <div className="card">
        <div className="profile-header">
          <img className="profile-avatar" src={userData.avatarUrl || '/avatars/default.png'} alt="avatar" />
          <div>
            <h2 style={{ fontSize: 22, fontWeight: 600 }}>{userData.fullName || userData.name || 'User'}</h2>
            {userData.designation && <p style={{ fontSize: 14, color: 'var(--text-secondary)' }}>{userData.designation}</p>}
            <span className="profile-badge">{userData.verified ? '✓ Verified' : 'Not Verified'}</span>
          </div>
          <button className="btn btn-primary btn-sm" onClick={() => navigate('/edit-profile')}>Edit Profile</button>
        </div>
      </div>

      {userData.bio && (
        <div className="card section-gap">
          <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>About</h3>
          <p style={{ fontSize: 14, color: 'var(--text-secondary)' }}>{userData.bio}</p>
        </div>
      )}

      <div className="card section-gap">
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12 }}>Details</h3>
        <div className="profile-details">
          {details.map(d => (
            <div key={d.label} className="detail-item">
              <span className="label">{d.label}:</span>
              <span>{d.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
