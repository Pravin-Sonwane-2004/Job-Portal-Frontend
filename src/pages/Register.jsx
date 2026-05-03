import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../api';
import { getCurrentUser } from '../auth';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '', role: 'USER' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (getCurrentUser()) navigate('/signin', { replace: true });
  }, [navigate]);

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (form.password !== form.confirmPassword) { setError('Passwords do not match.'); return; }
    setLoading(true);
    try {
      await register({ name: form.name.trim(), email: form.email.trim(), password: form.password, role: form.role });
      setSuccess('Account created! Redirecting...');
      setTimeout(() => navigate('/signin'), 1500);
    } catch (err) {
      const msg = err?.response?.data || 'Error creating account.';
      setError(typeof msg === 'string' ? msg : 'Error creating account.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="center-page">
      <div className="auth-card card">
        <h2 style={{ fontSize: 22, fontWeight: 700, textAlign: 'center', marginBottom: 20 }}>Create Account</h2>
        {error && <div className="alert alert-error">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input className="form-input" name="name" value={form.name} onChange={handleChange} placeholder="John Doe" required />
          </div>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input className="form-input" type="email" name="email" value={form.email} onChange={handleChange} placeholder="john@example.com" required />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input className="form-input" type="password" name="password" value={form.password} onChange={handleChange} placeholder="Choose a password" required />
          </div>
          <div className="form-group">
            <label className="form-label">Confirm Password</label>
            <input className="form-input" type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} placeholder="Re-enter password" required />
          </div>
          <div className="form-group">
            <label className="form-label">Account Type</label>
            <select className="form-select" name="role" value={form.role} onChange={handleChange}>
              <option value="USER">Job Seeker</option>
              <option value="RECRUITER">Recruiter</option>
              <option value="ADMIN">Administrator</option>
            </select>
          </div>
          <button className="btn btn-primary" type="submit" disabled={loading} style={{ width: '100%' }}>
            {loading ? 'Creating...' : 'Create Account'}
          </button>
        </form>
        <p style={{ textAlign: 'center', marginTop: 16, fontSize: 14, color: 'var(--text-secondary)' }}>
          Already have an account? <a href="#" onClick={e => { e.preventDefault(); navigate('/signin'); }}>Sign In</a>
        </p>
      </div>
    </div>
  );
}
