import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SettingsPage from './settings/SettingsPage';

import HomePage from './public/landing page/HomePage';
import FindJobs from './public/pages/FindJobsPage';
import UploadJobs from './admin/pages/UploadJobs';
import SignIn from './public/signup signin/SignIn';
import SignUp from './public/signup signin/SignUp';
import UploadJob from './admin/Upload Job';
import AdminPage from './admin/pages/AdminPage';
import MyApplication from './user/MyApplication';
import AllUser from './admin/pages/AllUser';
// import AllApplications from './admin/AllApplications';
import { Dashboard } from './user/find jobs/Dashboard';
import ProfilePage from './public/pages/ProfilePage';
import EditProfile from './profile/EditProfile';
import ResumeBuild from './public/pages/ResumeBuild';
import Apply from './user/apply jobs/Apply';
import FindTalentPage from './admin/pages/FindTalentPage';

import ProtectedRoute from './ProtectedRoute';
import SavedJobsPage from './user/SavedJobsPage';
import JobAlertsPage from './user/JobAlertsPage';
import ResumeUploadPage from './profile/pages/ResumeUploadPage';
import MessagesPage from './user/MessagesPage';
import CompanyProfilePage from './public/pages/CompanyProfilePage';
import InterviewSchedulePage from './user/InterviewSchedulePage';

export default function Router() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="*" element={<HomePage />} />
      <Route path="/find-jobs" element={<FindJobs />} />
      <Route path="/resume-builder" element={<ResumeBuild />} />

      {/* Protected for USER */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute requiredRole="USER">
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute requiredRoles={["USER", "ADMIN"]}>
            <ProfilePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/edit-profile"
        element={
          <ProtectedRoute requiredRoles={["USER", "ADMIN"]}>
            <EditProfile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/my-applications"
        element={
          <ProtectedRoute requiredRole="USER">
            <MyApplication />
          </ProtectedRoute>
        }
      />
      <Route
        path="/apply/:jobId"
        element={
          <ProtectedRoute requiredRole="USER">
            <Apply />
          </ProtectedRoute>
        }
      />

      {/* Protected for ADMIN */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute requiredRole="ADMIN">
            <AdminPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/upload-jobs"
        element={
          <ProtectedRoute requiredRole="ADMIN">
            <UploadJobs />
          </ProtectedRoute>
        }
      />
      <Route
        path="/all-users"
        element={
          <ProtectedRoute requiredRole="ADMIN">
            <AllUser />
          </ProtectedRoute>
        }
      />
      <Route
        path="/find-talent"
        element={
          <ProtectedRoute requiredRole="ADMIN">
            <FindTalentPage />
          </ProtectedRoute>
        }
      />

      {/* Admin: All Applications */}
      <Route
        path="/all-applications"
        element={
          <ProtectedRoute requiredRole="ADMIN">
            {/* <AllApplications /> */}
          </ProtectedRoute>
        }
      />

      {/* If "UploadJob" is Admin-only */}
      <Route
        path="/upload-job"
        element={
          <ProtectedRoute requiredRole="ADMIN">
            <UploadJob />
          </ProtectedRoute>
        }
      />
    {/* Settings Page (protected for logged-in users) */}
      <Route
        path="/settings"
        element={
          <ProtectedRoute requiredRoles={["USER", "ADMIN"]}>
            <SettingsPage />
          </ProtectedRoute>
        }
      />
    {/* Saved Jobs */}
      <Route
        path="/saved-jobs"
        element={
          <ProtectedRoute requiredRole="USER">
            <SavedJobsPage />
          </ProtectedRoute>
        }
      />
      {/* Job Alerts */}
      <Route
        path="/job-alerts"
        element={
          <ProtectedRoute requiredRole="USER">
            <JobAlertsPage />
          </ProtectedRoute>
        }
      />
      {/* Resume Upload */}
      <Route
        path="/resume-upload"
        element={
          <ProtectedRoute requiredRole="USER">
            <ResumeUploadPage />
          </ProtectedRoute>
        }
      />
      {/* Messages */}
      <Route
        path="/messages"
        element={
          <ProtectedRoute requiredRoles={["USER", "ADMIN"]}>
            <MessagesPage />
          </ProtectedRoute>
        }
      />
      {/* Company Profile (public) */}
      <Route
        path="/company/:companyId"
        element={<CompanyProfilePage />}
      />
      {/* Interview Scheduling */}
      <Route
        path="/interviews"
        element={
          <ProtectedRoute requiredRole="USER">
            <InterviewSchedulePage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
