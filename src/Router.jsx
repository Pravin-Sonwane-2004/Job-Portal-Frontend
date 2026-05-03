import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import Container from "@/components/ui/Container";

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
        <div className="text-sm font-medium text-slate-600">Loading page</div>
      </div>
    </Container>
  );
}

export default function Router() {
  return (
    <Suspense fallback={<RouteFallback />}>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/find-jobs" element={<FindJobs />} />
        <Route path="/resume-builder" element={<ResumeBuild />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/my-applications" element={<MyApplication />} />
        <Route path="/apply/:jobId" element={<Apply />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/upload-jobs" element={<UploadJobs />} />
        <Route path="/all-users" element={<AllUser />} />
        <Route path="/find-talent" element={<FindTalentPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/saved-jobs" element={<SavedJobsPage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </Suspense>
  );
}
