// ResumeBuilder.jsx is a page component. It handles one screen in the job portal.
import { useState, useEffect } from 'react';
import { getResumes, uploadResume, deleteResume } from '../services/user/resumesApi';
import { getCurrentUser } from '../auth';
import Loader from '../components/Loader';

// ResumeBuilder is the main React component exported from this file.
export default function ResumeBuilder() {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filePath, setFilePath] = useState('');
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const user = getCurrentUser();

  // useEffect runs side effects like loading data after the component renders.
  useEffect(() => {
    if (!user?.id) { setLoading(false); return; }
    getResumes(user.id)
      .then(res => setResumes(Array.isArray(res.data) ? res.data : []))
      .catch(() => setError('Failed to load resumes.'))
      .finally(() => setLoading(false));
  }, [user?.id]);

  // handleUpload runs when the user performs this action on the page.
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!user?.id) return;
    setUploading(true);
    setError('');
    try {
      await uploadResume(user.id, filePath);
      setFilePath('');
      const res = await getResumes(user.id);
      setResumes(Array.isArray(res.data) ? res.data : []);
    } catch { setError('Failed to upload resume.'); }
    finally { setUploading(false); }
  };

  // handleDelete runs when the user performs this action on the page.
  const handleDelete = async (id) => {
    if (!window.confirm('Delete this resume?')) return;
    try {
      await deleteResume(id);
      setResumes(prev => prev.filter(r => r.id !== id));
    } catch { alert('Failed to delete.'); }
  };

  if (loading) return <div className="page"><Loader /></div>;
  if (!user) return <div className="page"><div className="alert alert-error">Please sign in.</div></div>;

  return (
    <div className="page-narrow">
      <div className="card">
        <h2 style={{ fontSize: 22, fontWeight: 600 }}>Resume Builder</h2>
        <p style={{ fontSize: 14, color: 'var(--text-secondary)', marginTop: 4 }}>Upload and manage your resumes.</p>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      <form onSubmit={handleUpload} className="card section-gap">
        <div className="form-group">
          <label className="form-label">Resume File Path</label>
          <input className="form-input" value={filePath} onChange={e => setFilePath(e.target.value)} placeholder="Enter file path or URL" required />
        </div>
        <button className="btn btn-primary" type="submit" disabled={uploading}>{uploading ? 'Uploading...' : 'Upload Resume'}</button>
      </form>

      {resumes.length > 0 && (
        <div className="card section-gap">
          <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12 }}>Your Resumes</h3>
          {resumes.map(r => (
            <div key={r.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid var(--border)' }}>
              <span style={{ fontSize: 14 }}>{r.filePath || r.fileName || `Resume #${r.id}`}</span>
              <button className="btn btn-danger btn-sm" onClick={() => handleDelete(r.id)}>Delete</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
