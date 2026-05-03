import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Loader from './components/Loader';

const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const FindJobs = lazy(() => import('./pages/FindJobs'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const ApplyJob = lazy(() => import('./pages/ApplyJob'));
const MyApplications = lazy(() => import('./pages/MyApplications'));
const SavedJobs = lazy(() => import('./pages/SavedJobs'));
const Profile = lazy(() => import('./pages/Profile'));
const EditProfile = lazy(() => import('./pages/EditProfile'));
const Settings = lazy(() => import('./pages/Settings'));
const ResumeBuilder = lazy(() => import('./pages/ResumeBuilder'));
const Admin = lazy(() => import('./pages/Admin'));
const AdminUsers = lazy(() => import('./pages/AdminUsers'));
const AdminJobs = lazy(() => import('./pages/AdminJobs'));
const AdminApplications = lazy(() => import('./pages/AdminApplications'));

export default function Router() {
  return (
    <Layout>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/find-jobs" element={<FindJobs />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/apply/:jobId" element={<ApplyJob />} />
          <Route path="/my-applications" element={<MyApplications />} />
          <Route path="/saved-jobs" element={<SavedJobs />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/resume-builder" element={<ResumeBuilder />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin-users" element={<AdminUsers />} />
          <Route path="/admin-jobs" element={<AdminJobs />} />
          <Route path="/admin-applications" element={<AdminApplications />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}
