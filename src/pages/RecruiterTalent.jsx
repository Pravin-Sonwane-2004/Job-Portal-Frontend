// RecruiterTalent.jsx is a page component. It handles one screen in the job portal.
import { useCallback, useEffect, useState } from 'react';
import { recruiterSearchTalent } from '../services/recruiter/talentApi';
import { getCurrentUser, isRecruiter } from '../auth';
import Loader from '../components/Loader';

// RecruiterTalent is the main React component exported from this file.
export default function RecruiterTalent() {
  const user = getCurrentUser();
  const canAccess = isRecruiter(user);
  const [talent, setTalent] = useState([]);
  const [filters, setFilters] = useState({ q: '', skill: '', location: '', experienceLevel: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadTalent = useCallback(() => {
    setLoading(true);
    setError('');
    recruiterSearchTalent({
      q: filters.q || undefined,
      skill: filters.skill || undefined,
      location: filters.location || undefined,
      experienceLevel: filters.experienceLevel || undefined,
    })
      .then(res => setTalent(Array.isArray(res.data) ? res.data : []))
      .catch(() => setError('Failed to load talent.'))
      .finally(() => setLoading(false));
  }, [filters.experienceLevel, filters.location, filters.q, filters.skill]);

  // useEffect runs side effects like loading data after the component renders.
  useEffect(() => {
    if (canAccess) loadTalent();
    else setLoading(false);
  }, [canAccess, loadTalent]);

  if (!canAccess) return <div className="page"><div className="alert alert-error">Access denied. Recruiter only.</div></div>;

  // handleSubmit runs when the user performs this action on the page.
  const handleSubmit = (e) => {
    e.preventDefault();
    loadTalent();
  };

  return (
    <div className="page">
      <div className="card">
        <h2 style={{ fontSize: 22, fontWeight: 700 }}>Talent Search</h2>
        <p style={{ color: 'var(--text-secondary)', marginTop: 4 }}>Find candidate profiles by role, skill, location, or experience.</p>
        <form onSubmit={handleSubmit} className="section-gap">
          <div className="grid grid-2">
            <div className="form-group"><label className="form-label">Search</label><input className="form-input" value={filters.q} onChange={e => setFilters(p => ({ ...p, q: e.target.value }))} placeholder="Name, email, role" /></div>
            <div className="form-group"><label className="form-label">Skill</label><input className="form-input" value={filters.skill} onChange={e => setFilters(p => ({ ...p, skill: e.target.value }))} placeholder="React, Java, SQL" /></div>
            <div className="form-group"><label className="form-label">Location</label><input className="form-input" value={filters.location} onChange={e => setFilters(p => ({ ...p, location: e.target.value }))} placeholder="Pune, Remote" /></div>
            <div className="form-group"><label className="form-label">Experience</label><select className="form-select" value={filters.experienceLevel} onChange={e => setFilters(p => ({ ...p, experienceLevel: e.target.value }))}><option value="">Any</option><option>INTERN</option><option>JUNIOR</option><option>MID</option><option>SENIOR</option><option>EXPERT</option></select></div>
          </div>
          <button className="btn btn-primary">Search Talent</button>
        </form>
      </div>

      {error && <div className="alert alert-error">{error}</div>}
      {loading ? <Loader /> : talent.length === 0 ? (
        <div className="empty-state">No matching candidates found.</div>
      ) : (
        <div className="grid grid-3 section-gap">
          {talent.map(candidate => (
            <div key={candidate.id} className="card user-card">
              <h3>{candidate.name || candidate.email}</h3>
              <p className="meta">{candidate.designation || candidate.jobRole || 'Candidate'}</p>
              <p className="meta">{candidate.location || 'Location not added'}</p>
              <p className="meta">{candidate.email}</p>
              {candidate.phoneNumber && <p className="meta">{candidate.phoneNumber}</p>}
              {candidate.linkedinUrl && <a href={candidate.linkedinUrl} target="_blank" rel="noreferrer">LinkedIn</a>}
              {Array.isArray(candidate.skills) && candidate.skills.length > 0 && (
                <div className="talent-card">
                  <div className="skills">
                    {candidate.skills.map(skill => <span className="skill-tag" key={skill}>{skill}</span>)}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
