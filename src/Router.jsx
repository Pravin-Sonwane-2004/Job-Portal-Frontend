import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import Container from "@/components/ui/Container";
import ProtectedRoute from "./ProtectedRoute";

const SettingsPage = lazy(() => import("./settings/SettingsPage"));
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
const SavedJobsPage = lazy(() => import("./user/SavedJobsPage"));

function RouteFallback() {
  return (
    <Container className="py-20">
      <div className="flex min-h-[30vh] items-center justify-center rounded-lg border border-slate-200 bg-white">
        <div className="text-sm font-medium text-slate-600">
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
      </Routes>
    </Suspense>
  );
}
