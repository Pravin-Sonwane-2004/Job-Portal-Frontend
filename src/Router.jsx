import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import Container from "@/components/ui/Container";
import ProtectedRoute from "./ProtectedRoute";

const SettingsPage = lazy(() => import("./settings/SettingsPage"));
const UploadJob = lazy(() => import("./admin/Upload Job"));
const AdminPage = lazy(() => import("./admin/pages/AdminPage"));
const AllUser = lazy(() => import("./admin/pages/AllUser"));
const UploadJobs = lazy(() => import("./admin/pages/UploadJobs"));
const SignIn = lazy(() => import("./public/auth/LogIn"));
const SignUp = lazy(() => import("./public/auth/Register"));
const HomePage = lazy(() => import("./pages/home/HomePage"));
const FindJobs = lazy(() => import("./public/pages/FindJobsPage"));
const MyApplication = lazy(() => import("./user/MyApplication"));
const FindTalentPage = lazy(() => import("./admin/pages/FindTalentPage"));
const EditProfile = lazy(() => import("./profile/EditProfile"));
const ProfilePage = lazy(() => import("./public/pages/ProfilePage"));
const ResumeBuild = lazy(() => import("./public/pages/ResumeBuild"));
const Apply = lazy(() => import("./user/apply jobs/Apply"));
const Dashboard = lazy(() =>
  import("./user/find jobs/Dashboard").then((module) => ({ default: module.Dashboard }))
);
const ResumeUploadPage = lazy(() => import("./profile/pages/ResumeUploadPage"));
const CompanyProfilePage = lazy(() => import("./public/pages/CompanyProfilePage"));
const InterviewSchedulePage = lazy(() => import("./user/InterviewSchedulePage"));
const JobAlertsPage = lazy(() => import("./user/JobAlertsPage"));
const MessagesPage = lazy(() => import("./user/MessagesPage"));
const SavedJobsPage = lazy(() => import("./user/SavedJobsPage"));

function RouteFallback() {
  return (
    <Container className="py-20">
      <div className="flex min-h-[30vh] items-center justify-center rounded-[1.75rem] border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center gap-3 text-sm font-medium text-slate-600 dark:text-slate-300">
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-brand-500 border-t-transparent" />
          Loading page
        </div>
      </div>
    </Container>
  );
}

export default function Router() {
  return (
    <Suspense fallback={<RouteFallback />}>
      <Routes>
        {/* Public Routes */}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/register" element={<SignUp />} />
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
        <Route path="/company/:companyId" element={<CompanyProfilePage />} />
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
    </Suspense>
  );
}
