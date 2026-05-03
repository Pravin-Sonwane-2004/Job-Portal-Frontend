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
// ... import other pages as needed

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
          <Route path="/admin" element={<Admin />} />
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