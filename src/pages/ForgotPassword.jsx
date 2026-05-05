import { useState } from 'react';
import { Link } from 'react-router-dom';
import { requestPasswordReset } from '../services/auth/authApi';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [resetLink, setResetLink] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage('');
    setResetLink('');
    setError('');
    setLoading(true);

    try {
      const response = await requestPasswordReset(email);
      setMessage(response.data?.message || 'If this email exists, a reset link has been sent.');
      setResetLink(response.data?.resetLink || '');
    } catch (err) {
      const data = err?.response?.data;
      setError(typeof data === 'string' ? data : data?.message || 'Could not request password reset.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="center-page">
      <div className="auth-card card">
        <h2 style={{ fontSize: 22, fontWeight: 700, textAlign: 'center', marginBottom: 20 }}>Forgot Password</h2>
        {message && <div className="alert alert-success">{message}</div>}
        {resetLink && (
          <div className="alert alert-info">
            <div style={{ marginBottom: 6 }}>Development reset link:</div>
            <a href={resetLink}>Open reset page</a>
          </div>
        )}
        {error && <div className="alert alert-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              className="form-input"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Enter your account email"
              required
            />
          </div>
          <button className="btn btn-primary" type="submit" disabled={loading} style={{ width: '100%' }}>
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: 16, fontSize: 14 }}>
          <Link to="/signin">Back to sign in</Link>
        </p>
      </div>
    </div>
  );
}
