// Login.jsx is a page component. It handles one screen in the job portal.
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/auth/authApi';
import { getCurrentUser, setCurrentUser, getDefaultPortal } from '../auth';

// Login is the main React component exported from this file.
export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // useEffect runs side effects like loading data after the component renders.
  useEffect(() => {
    if (getCurrentUser()) navigate('/', { replace: true });
  }, [navigate]);

  // handleSubmit runs when the user performs this action on the page.
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await login({ email, password });
      const data = res.data;
      const user = data?.user ? { ...data.user, token: data.token } : data;
      if (user?.id && user?.token) {
        setCurrentUser(user);
        navigate(getDefaultPortal(user));
      } else {
        setError('Login failed.');
      }
    } catch (err) {
      const msg = err?.response?.data || 'Login failed.';
      setError(typeof msg === 'string' ? msg : 'Login failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="center-page">
      <div className="auth-card card">
        <h2 style={{ fontSize: 22, fontWeight: 700, textAlign: 'center', marginBottom: 20 }}>Log In</h2>
        {error && <div className="alert alert-error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input className="form-input" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter your email" required />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input className="form-input" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter your password" required />
          </div>
          <button className="btn btn-primary" type="submit" disabled={loading} style={{ width: '100%' }}>
            {loading ? 'Logging in...' : 'Log In'}
          </button>
        </form>
        <p style={{ textAlign: 'center', marginTop: 12, fontSize: 14 }}>
          <a href="#" onClick={e => { e.preventDefault(); navigate('/forgot-password'); }}>Forgot password?</a>
        </p>
        <p style={{ textAlign: 'center', marginTop: 16, fontSize: 14, color: 'var(--text-secondary)' }}>
          Don't have an account? <a href="#" onClick={e => { e.preventDefault(); navigate('/register'); }}>Sign Up</a>
        </p>
        <p style={{ textAlign: 'center', marginTop: 8, fontSize: 14, color: 'var(--text-secondary)' }}>
          Hiring as a company? <a href="#" onClick={e => { e.preventDefault(); navigate('/company-signup'); }}>Create company account</a>
        </p>
      </div>
    </div>
  );
}
