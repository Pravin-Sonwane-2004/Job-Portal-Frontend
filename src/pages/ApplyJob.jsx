// ApplyJob.jsx is a page component. It handles one screen in the job portal.
import { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { applyToJob } from '../services/user/applicationsApi';
import { getUserJobById } from '../services/user/jobsApi';
import { getProfile } from '../services/user/profileApi';
import { getResumes } from '../services/user/resumesApi';
import { getCurrentUser, isUser } from '../auth';

// ApplyJob is the main React component exported from this file.
export default function ApplyJob() {
  const { jobId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [job, setJob] = useState(location.state?.job || null);
  const [profile, setProfile] = useState(null);
  const [resumes, setResumes] = useState([]);
  const user = getCurrentUser();

  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingContext, setLoadingContext] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    resumeLink: '',
    coverLetter: '',
    phoneNumber: user?.phoneNumber || '',
    linkedinUrl: user?.linkedinUrl || '',
    portfolioUrl: '',
    expectedSalary: '',
    noticePeriod: '',
  });

  // useEffect runs side effects like loading data after the component renders.
  useEffect(() => {
    let active = true;

    // loadContext loads data from the backend and stores it in component state.
    const loadContext = async () => {
      if (!jobId || !user?.id) {
        setLoadingContext(false);
        return;
      }

      setLoadingContext(true);
      try {
        const [jobRes, profileRes, resumesRes] = await Promise.all([
          job ? Promise.resolve({ data: job }) : getUserJobById(jobId),
          getProfile().catch(() => null),
          getResumes(user.id).catch(() => null),
        ]);

        if (!active) return;

        const profileData = profileRes?.data || null;
        const resumeList = Array.isArray(resumesRes?.data) ? resumesRes.data : [];

        setJob(jobRes.data);
        setProfile(profileData);
        setResumes(resumeList);
        setForm(prev => ({
          ...prev,
          phoneNumber: prev.phoneNumber || profileData?.phoneNumber || '',
          linkedinUrl: prev.linkedinUrl || profileData?.linkedinUrl || '',
          resumeLink: prev.resumeLink || resumeList[0]?.filePath || '',
        }));
      } catch {
        if (active) setStatus('Could not load job details.');
      } finally {
        if (active) setLoadingContext(false);
      }
    };

    loadContext();
    return () => {
      active = false;
    };
  }, [job, jobId, user?.id]);

  const updateField = (field, value) => {
    setSubmitted(false);
    setForm(prev => ({ ...prev, [field]: value }));
  };

  // handleApply runs when the user performs this action on the page.
  const handleApply = async (e) => {
    e.preventDefault();
    if (!user?.id) { navigate('/signin'); return; }
    if (!isUser(user)) { navigate('/dashboard'); return; }
    if (!form.resumeLink.trim()) { setStatus('Add a resume link before applying.'); return; }
    if (!form.phoneNumber.trim()) { setStatus('Add a phone number before applying.'); return; }
    if (!form.coverLetter.trim()) { setStatus('Add a cover letter before applying.'); return; }

    setLoading(true);
    setStatus('');
    try {
      const res = await applyToJob(jobId, {
        userId: user.id,
        jobId: Number(jobId),
        resumeLink: form.resumeLink.trim(),
        coverLetter: form.coverLetter.trim(),
        phoneNumber: form.phoneNumber.trim(),
        linkedinUrl: form.linkedinUrl.trim(),
        portfolioUrl: form.portfolioUrl.trim(),
        expectedSalary: form.expectedSalary.trim(),
        noticePeriod: form.noticePeriod.trim(),
        source: 'Web',
        userAgent: window.navigator.userAgent,
      });
      const msg = typeof res.data === 'string' ? res.data : 'Application submitted.';
      setStatus(msg);
      setSubmitted(msg.toLowerCase().includes('submitted'));
    } catch {
      setStatus('Failed to apply. Please check the form and try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loadingContext || !job) return <div className="page"><div className="card">{status || 'Loading application form...'}</div></div>;

  const selectedSavedResume = resumes.some(resume => resume.filePath && resume.filePath === form.resumeLink)
    ? form.resumeLink
    : '';

  return (
    <div className="page-narrow">
      <div className="card">
        <h2 style={{ fontSize: 22, fontWeight: 600, marginBottom: 12 }}>Apply for {job.title || job.jobTitle}</h2>
        <div className="profile-details">
          <div className="detail-item"><span className="label">Company:</span><span>{job.company || 'N/A'}</span></div>
          <div className="detail-item"><span className="label">Location:</span><span>{job.location || job.jobLocation || 'N/A'}</span></div>
          <div className="detail-item"><span className="label">Salary:</span><span>{job.salary || job.jobSalary || 'Negotiable'}</span></div>
        </div>
        <div className="profile-details section-gap">
          <div className="detail-item"><span className="label">Applicant:</span><span>{profile?.name || user?.name || 'N/A'}</span></div>
          <div className="detail-item"><span className="label">Email:</span><span>{profile?.email || user?.email || 'N/A'}</span></div>
        </div>
        <form onSubmit={handleApply} className="section-gap">
          {resumes.length > 0 && (
            <div className="form-group">
              <label className="form-label">Saved Resume</label>
              <select className="form-select" value={selectedSavedResume} onChange={e => updateField('resumeLink', e.target.value)}>
                {resumes.map(resume => (
                  <option value={resume.filePath || ''} key={resume.id}>{resume.filePath || `Resume #${resume.id}`}</option>
                ))}
                <option value="">Use another resume link</option>
              </select>
            </div>
          )}
          <div className="form-group">
            <label className="form-label">Resume Link</label>
            <input className="form-input" value={form.resumeLink} onChange={e => updateField('resumeLink', e.target.value)} placeholder="https://..." required />
          </div>
          <div className="grid grid-2">
            <div className="form-group">
              <label className="form-label">Phone Number</label>
              <input className="form-input" value={form.phoneNumber} onChange={e => updateField('phoneNumber', e.target.value)} required />
            </div>
            <div className="form-group">
              <label className="form-label">Expected Salary</label>
              <input className="form-input" value={form.expectedSalary} onChange={e => updateField('expectedSalary', e.target.value)} placeholder="8 LPA" />
            </div>
            <div className="form-group">
              <label className="form-label">Notice Period</label>
              <input className="form-input" value={form.noticePeriod} onChange={e => updateField('noticePeriod', e.target.value)} placeholder="Immediate / 30 days" />
            </div>
            <div className="form-group">
              <label className="form-label">LinkedIn URL</label>
              <input className="form-input" value={form.linkedinUrl} onChange={e => updateField('linkedinUrl', e.target.value)} placeholder="https://linkedin.com/in/..." />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Portfolio URL</label>
            <input className="form-input" value={form.portfolioUrl} onChange={e => updateField('portfolioUrl', e.target.value)} placeholder="https://portfolio.example.com" />
          </div>
          <div className="form-group">
            <label className="form-label">Cover Letter</label>
            <textarea className="form-input" rows={5} value={form.coverLetter} onChange={e => updateField('coverLetter', e.target.value)} placeholder="Write a short note for the recruiter..." required />
          </div>
          <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
          <button className="btn btn-primary" type="submit" disabled={loading}>
            {loading ? 'Applying...' : submitted ? 'Application Sent' : 'Confirm Apply'}
          </button>
          {submitted && <button className="btn btn-outline" type="button" onClick={() => navigate('/my-applications')}>View Applications</button>}
          <button className="btn btn-outline" type="button" onClick={() => navigate(-1)}>Back</button>
          </div>
        </form>
        {status && <div className="alert alert-info section-gap">{status}</div>}
      </div>
    </div>
  );
}
