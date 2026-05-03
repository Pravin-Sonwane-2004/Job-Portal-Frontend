import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { companyDashboard, companyGetProfile, companyUpdateProfile } from '../api';
import { getCurrentUser, isCompanyAdmin } from '../auth';
import Loader from '../components/Loader';

export default function CompanyPortal() {
  const user = getCurrentUser();
  const [dashboard, setDashboard] = useState(null);
  const [company, setCompany] = useState(null);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    Promise.all([companyDashboard(), companyGetProfile()])
      .then(([dashboardRes, companyRes]) => {
        setDashboard(dashboardRes.data);
        setCompany(companyRes.data);
      })
      .catch(() => setError('Could not load company portal.'));
  }, []);

  const updateField = (event) => setCompany((prev) => ({ ...prev, [event.target.name]: event.target.value }));

  const saveCompany = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError('');
    try {
      const response = await companyUpdateProfile(company);
      setCompany(response.data);
    } catch {
      setError('Could not update company profile.');
    } finally {
      setSaving(false);
    }
  };

  if (!dashboard || !company) return <div className="page"><Loader /></div>;

  return (
    <div className="page">
      <div className="card">
        <h2 style={{ fontSize: 24, fontWeight: 700 }}>{company.name}</h2>
        <p style={{ color: 'var(--text-secondary)', marginTop: 4 }}>{dashboard.nextAction}</p>
      </div>
      {error && <div className="alert alert-error">{error}</div>}
      <div className="insight-grid section-gap">
        <div className="insight-tile"><strong>{dashboard.employees}</strong><span>Employees</span></div>
        <div className="insight-tile"><strong>{dashboard.jobs}</strong><span>Jobs</span></div>
        <div className="insight-tile"><strong>{dashboard.applications}</strong><span>Applications</span></div>
      </div>
      <div className="grid grid-2 section-gap">
        <Link to="/company-jobs" className="card" style={{ textDecoration: 'none' }}><h3>Company Jobs</h3><p style={{ color: 'var(--text-secondary)' }}>Post and review company openings.</p></Link>
        {isCompanyAdmin(user) && <Link to="/company-employees" className="card" style={{ textDecoration: 'none' }}><h3>Employees</h3><p style={{ color: 'var(--text-secondary)' }}>Add team members under this company.</p></Link>}
      </div>
      {isCompanyAdmin(user) && (
        <form className="card section-gap" onSubmit={saveCompany}>
          <h3>Company Profile</h3>
          <div className="grid grid-2 section-gap">
            <div className="form-group"><label className="form-label">Industry</label><input className="form-input" name="industry" value={company.industry || ''} onChange={updateField} /></div>
            <div className="form-group"><label className="form-label">Location</label><input className="form-input" name="location" value={company.location || ''} onChange={updateField} /></div>
            <div className="form-group"><label className="form-label">Website</label><input className="form-input" name="website" value={company.website || ''} onChange={updateField} /></div>
            <div className="form-group"><label className="form-label">Logo URL</label><input className="form-input" name="logoUrl" value={company.logoUrl || ''} onChange={updateField} /></div>
          </div>
          <div className="form-group"><label className="form-label">Description</label><textarea className="form-input" name="description" value={company.description || ''} onChange={updateField} rows={4} /></div>
          <button className="btn btn-primary" disabled={saving}>{saving ? 'Saving...' : 'Save Company'}</button>
        </form>
      )}
    </div>
  );
}
