import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Loader from './components/Loader';
import Register from './pages/Register';


// Lazy imports
const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
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

export default function Router() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        {/* All routes inside this block will show the Layout (Header/Footer) */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/find-jobs" element={<FindJobs />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/my-applications" element={<MyApplications />} />
          <Route path="/saved-jobs" element={<SavedJobs />} />
          <Route path="/apply/:jobId" element={<ApplyJob />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/resume-builder" element={<ResumeBuilder />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin-users" element={<AdminUsers />} />
          <Route path="/admin-jobs" element={<AdminJobs />} />
          <Route path="/admin-applications" element={<AdminApplications />} />
          <Route path="/recruiter" element={<Recruiter />} />
          <Route path="/recruiter-jobs" element={<RecruiterJobs />} />
          <Route path="/recruiter-applications" element={<RecruiterApplications />} />
         <Route path="/register" element={<Register />} />
        </Route>

        {/* Auth routes usually don't need the main layout */}
        <Route path="/signin" element={<Login />} />
        
        {/* Redirect unknown pages to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}
