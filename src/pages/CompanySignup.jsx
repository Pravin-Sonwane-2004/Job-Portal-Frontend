// CompanySignup.jsx is a page component. It handles one screen in the job portal.
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerCompany } from '../services/company/companyApi';

const initialForm = {
  companyName: '',
  industry: '',
  location: '',
  website: '',
  description: '',
  ownerName: '',
  ownerEmail: '',
  password: '',
};

// CompanySignup is the main React component exported from this file.
export default function CompanySignup() {
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // handleChange runs when the user performs this action on the page.
  const handleChange = (event) => setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));

  // handleSubmit runs when the user performs this action on the page.
  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);
    try {
      await registerCompany(form);
      navigate('/signin');
    } catch (err) {
      const data = err?.response?.data;
      setError(typeof data === 'string' ? data : data?.message || 'Could not create company account.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-narrow">
      <div className="card">
        <h2 style={{ fontSize: 24, fontWeight: 700 }}>Create Company Account</h2>
        <p style={{ color: 'var(--text-secondary)', marginTop: 4 }}>Register the company and its first admin login.</p>
      </div>
      {error && <div className="alert alert-error">{error}</div>}
      <form className="card section-gap" onSubmit={handleSubmit}>
        <div className="grid grid-2">
          <div className="form-group"><label className="form-label">Company Name</label><input className="form-input" name="companyName" value={form.companyName} onChange={handleChange} required /></div>
          <div className="form-group"><label className="form-label">Industry</label><input className="form-input" name="industry" value={form.industry} onChange={handleChange} /></div>
          <div className="form-group"><label className="form-label">Location</label><input className="form-input" name="location" value={form.location} onChange={handleChange} /></div>
          <div className="form-group"><label className="form-label">Website</label><input className="form-input" name="website" value={form.website} onChange={handleChange} /></div>
          <div className="form-group"><label className="form-label">Admin Name</label><input className="form-input" name="ownerName" value={form.ownerName} onChange={handleChange} required /></div>
          <div className="form-group"><label className="form-label">Admin Email</label><input className="form-input" type="email" name="ownerEmail" value={form.ownerEmail} onChange={handleChange} required /></div>
          <div className="form-group"><label className="form-label">Password</label><input className="form-input" type="password" name="password" value={form.password} onChange={handleChange} minLength={8} required /></div>
        </div>
        <div className="form-group"><label className="form-label">Description</label><textarea className="form-input" name="description" value={form.description} onChange={handleChange} rows={4} /></div>
        <button className="btn btn-primary" disabled={loading}>{loading ? 'Creating...' : 'Create Company'}</button>
      </form>
    </div>
  );
}
