// Router defines every page URL and protects pages based on the logged-in user role.
import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Loader from './components/Loader';
import Register from './pages/Register';
import { getCurrentUser, isAdmin, isCompanyAdmin, isCompanyEmployee, isRecruiter, isUser } from './auth';


// Lazy imports
const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'));
const ResetPassword = lazy(() => import('./pages/ResetPassword'));
const FindJobs = lazy(() => import('./pages/FindJobs'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const MyApplications = lazy(() => import('./pages/MyApplications'));
const SavedJobs = lazy(() => import('./pages/SavedJobs'));
const Admin = lazy(() => import('./pages/Admin'));
const ApplyJob = lazy(() => import('./pages/ApplyJob'));
const Profile = lazy(() => import('./pages/Profile'));
const EditProfile = lazy(() => import('./pages/EditProfile'));
const ResumeBuilder = lazy(() => import('./pages/ResumeBuilder'));
const Settings = lazy(() => import('./pages/Settings'));
const AdminUsers = lazy(() => import('./pages/AdminUsers'));
const AdminJobs = lazy(() => import('./pages/AdminJobs'));
const AdminApplications = lazy(() => import('./pages/AdminApplications'));
const Recruiter = lazy(() => import('./pages/Recruiter'));
const RecruiterJobs = lazy(() => import('./pages/RecruiterJobs'));
const RecruiterApplications = lazy(() => import('./pages/RecruiterApplications'));
const RecruiterTalent = lazy(() => import('./pages/RecruiterTalent'));
const CompanySignup = lazy(() => import('./pages/CompanySignup'));
const CompanyPortal = lazy(() => import('./pages/CompanyPortal'));
const CompanyEmployees = lazy(() => import('./pages/CompanyEmployees'));
const CompanyJobs = lazy(() => import('./pages/CompanyJobs'));

// RequireRole is a helper component used before rendering a protected route.
function RequireRole({ children, roles }) {
  const user = getCurrentUser();
  const checks = {
    ADMIN: isAdmin(user),
    RECRUITER: isRecruiter(user),
    USER: isUser(user),
    COMPANY_ADMIN: isCompanyAdmin(user),
    COMPANY_EMPLOYEE: isCompanyEmployee(user),
  };
  if (!user) return <Navigate to="/signin" replace />;
  if (!roles.some(role => checks[role])) return <Navigate to="/dashboard" replace />;
  return children;
}

// Router is the main React component exported from this file.
export default function Router() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        {/* All routes inside this block will show the Layout (Header/Footer) */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/find-jobs" element={<FindJobs />} />
          <Route path="/dashboard" element={<RequireRole roles={['USER', 'ADMIN', 'RECRUITER']}><Dashboard /></RequireRole>} />
          <Route path="/my-applications" element={<RequireRole roles={['USER']}><MyApplications /></RequireRole>} />
          <Route path="/saved-jobs" element={<RequireRole roles={['USER']}><SavedJobs /></RequireRole>} />
          <Route path="/apply/:jobId" element={<RequireRole roles={['USER']}><ApplyJob /></RequireRole>} />
          <Route path="/profile" element={<RequireRole roles={['USER', 'ADMIN', 'RECRUITER']}><Profile /></RequireRole>} />
          <Route path="/edit-profile" element={<RequireRole roles={['USER', 'ADMIN', 'RECRUITER']}><EditProfile /></RequireRole>} />
          <Route path="/resume-builder" element={<RequireRole roles={['USER']}><ResumeBuilder /></RequireRole>} />
          <Route path="/settings" element={<RequireRole roles={['USER', 'ADMIN', 'RECRUITER']}><Settings /></RequireRole>} />
          <Route path="/admin" element={<RequireRole roles={['ADMIN']}><Admin /></RequireRole>} />
          <Route path="/admin-users" element={<RequireRole roles={['ADMIN']}><AdminUsers /></RequireRole>} />
          <Route path="/admin-jobs" element={<RequireRole roles={['ADMIN']}><AdminJobs /></RequireRole>} />
          <Route path="/admin-applications" element={<RequireRole roles={['ADMIN']}><AdminApplications /></RequireRole>} />
          <Route path="/recruiter" element={<RequireRole roles={['RECRUITER']}><Recruiter /></RequireRole>} />
          <Route path="/recruiter-jobs" element={<RequireRole roles={['RECRUITER']}><RecruiterJobs /></RequireRole>} />
          <Route path="/recruiter-applications" element={<RequireRole roles={['RECRUITER']}><RecruiterApplications /></RequireRole>} />
          <Route path="/recruiter-talent" element={<RequireRole roles={['RECRUITER']}><RecruiterTalent /></RequireRole>} />
          <Route path="/company" element={<RequireRole roles={['COMPANY_ADMIN', 'COMPANY_EMPLOYEE']}><CompanyPortal /></RequireRole>} />
          <Route path="/company-employees" element={<RequireRole roles={['COMPANY_ADMIN']}><CompanyEmployees /></RequireRole>} />
          <Route path="/company-jobs" element={<RequireRole roles={['COMPANY_ADMIN', 'COMPANY_EMPLOYEE']}><CompanyJobs /></RequireRole>} />
         <Route path="/register" element={<Register />} />
         <Route path="/company-signup" element={<CompanySignup />} />
        </Route>

        {/* Auth routes usually don't need the main layout */}
        <Route path="/signin" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        
        {/* Redirect unknown pages to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}
