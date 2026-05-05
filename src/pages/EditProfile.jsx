// EditProfile.jsx is a page component. It handles one screen in the job portal.
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProfile, updateProfile } from '../services/user/profileApi';
import { getCurrentUser, setCurrentUser } from '../auth';
import Loader from '../components/Loader';

const emptyForm = { name: '', email: '', location: '', bio: '', phone: '', linkedin: '', skills: '', designation: '', jobRole: '', experienceLevel: '', avatarUrl: '' };

// EditProfile is the main React component exported from this file.
export default function EditProfile() {
  const navigate = useNavigate();
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const currentUser = getCurrentUser();

  // useEffect runs side effects like loading data after the component renders.
  useEffect(() => {
    if (!currentUser?.id) { setLoading(false); setError('Please sign in.'); return; }
    getProfile({ userId: currentUser.id })
      .then(res => {
        const d = res.data;
        setForm({
          name: d.fullName || d.name || '',
          email: d.email || '',
          location: d.location || '',
          bio: d.bio || '',
          phone: d.phoneNumber || '',
          linkedin: d.linkedinUrl || '',
          skills: Array.isArray(d.skills) ? d.skills.join(', ') : d.skills || '',
          designation: d.designation || '',
          jobRole: d.jobRole || '',
          experienceLevel: d.experienceLevel || '',
          avatarUrl: d.avatarUrl || '',
        });
      })
      .catch(() => setForm(emptyForm))
      .finally(() => setLoading(false));
  }, [currentUser?.id]);

  // handleChange runs when the user performs this action on the page.
  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  // handleSubmit runs when the user performs this action on the page.
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSuccess(false);
    try {
      await updateProfile({
        name: form.name,
        email: form.email,
        location: form.location,
        bio: form.bio,
        phoneNumber: form.phone,
        linkedinUrl: form.linkedin,
        skills: form.skills ? form.skills.split(',').map(s => s.trim()).filter(Boolean) : [],
        designation: form.designation,
        jobRole: form.jobRole,
        experienceLevel: form.experienceLevel || null,
        avatarUrl: form.avatarUrl,
      }, { userId: currentUser.id });
      setCurrentUser({ ...currentUser, ...form });
      setSuccess(true);
      setTimeout(() => navigate('/profile'), 1000);
    } catch {
      setError('Failed to update profile.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="page"><Loader /></div>;

  const fields = [
    { name: 'name', label: 'Full Name', type: 'text', required: true },
    { name: 'email', label: 'Email', type: 'email', required: true },
    { name: 'location', label: 'Location', type: 'text' },
    { name: 'phone', label: 'Phone', type: 'tel' },
    { name: 'linkedin', label: 'LinkedIn URL', type: 'url' },
    { name: 'designation', label: 'Designation', type: 'text' },
    { name: 'jobRole', label: 'Target Role', type: 'text' },
    { name: 'avatarUrl', label: 'Avatar URL', type: 'url' },
    { name: 'skills', label: 'Skills (comma-separated)', type: 'text' },
  ];

  return (
    <div className="page-narrow">
      <div className="card card-header">
        <h2 style={{ fontSize: 22, fontWeight: 600 }}>Edit Profile</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', marginTop: 4 }}>Update your profile information.</p>
      </div>
      {error && <div className="alert alert-error">{error}</div>}
      {success && <div className="alert alert-success">Profile updated!</div>}
      <form onSubmit={handleSubmit} className="card section-gap">
        <div className="grid grid-2">
          {fields.map(f => (
            <div key={f.name} className="form-group">
              <label className="form-label">{f.label}</label>
              <input className="form-input" type={f.type} name={f.name} value={form[f.name]} onChange={handleChange} required={f.required} />
            </div>
          ))}
          <div className="form-group">
            <label className="form-label">Experience Level</label>
            <select className="form-select" name="experienceLevel" value={form.experienceLevel} onChange={handleChange}>
              <option value="">Select level</option>
              <option>INTERN</option>
              <option>JUNIOR</option>
              <option>MID</option>
              <option>SENIOR</option>
              <option>EXPERT</option>
            </select>
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Bio</label>
          <textarea className="form-input" name="bio" value={form.bio} onChange={handleChange} rows={4} />
        </div>
        <button className="btn btn-primary" type="submit" disabled={saving}>{saving ? 'Saving...' : 'Save Changes'}</button>
      </form>
    </div>
  );
}
