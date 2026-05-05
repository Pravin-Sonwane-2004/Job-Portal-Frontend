<!-- structure.md documents one part of the project so it is easier to explain in interviews. -->
# Job Portal Frontend - Project Structure

## Current Directory Structure

```text
src/
|-- App.jsx
|-- Router.jsx
|-- api.js
|-- auth.js
|-- main.jsx
|-- index.css
|-- components/
|   |-- Layout.jsx
|   |-- Loader.jsx
|-- pages/
|   |-- Admin.jsx
|   |-- AdminApplications.jsx
|   |-- AdminJobs.jsx
|   |-- AdminUsers.jsx
|   |-- ApplyJob.jsx
|   |-- CompanyEmployees.jsx
|   |-- CompanyJobs.jsx
|   |-- CompanyPortal.jsx
|   |-- CompanySignup.jsx
|   |-- Dashboard.jsx
|   |-- EditProfile.jsx
|   |-- FindJobs.jsx
|   |-- ForgotPassword.jsx
|   |-- Home.jsx
|   |-- Login.jsx
|   |-- MyApplications.jsx
|   |-- Profile.jsx
|   |-- Recruiter.jsx
|   |-- RecruiterApplications.jsx
|   |-- RecruiterJobs.jsx
|   |-- RecruiterTalent.jsx
|   |-- Register.jsx
|   |-- ResetPassword.jsx
|   |-- ResumeBuilder.jsx
|   |-- SavedJobs.jsx
|   |-- Settings.jsx
|-- services/
|   |-- http.js
|   |-- auth.js
|   |-- api.js
|   |-- admin/
|   |-- auth/
|   |-- company/
|   |-- public/
|   |-- recruiter/
|   |-- shared/
|   |-- user/
```

## Important Files

| File | Purpose |
| --- | --- |
| `Router.jsx` | Route table and role protection |
| `components/Layout.jsx` | Header, role-aware navigation, page outlet, footer |
| `services/http.js` | Shared Axios instance, JWT header injection, `401` cleanup |
| `services/auth.js` | Session storage and role helper functions |
| `services/api.js` | Compatibility export for all service modules |
| `api.js` | Compatibility export for `services/api.js` |
| `auth.js` | Compatibility export for `services/auth.js` |

## Service Folder Structure

```text
services/
|-- admin/
|   |-- applicationsApi.js
|   |-- jobsApi.js
|   |-- usersApi.js
|-- auth/
|   |-- authApi.js
|-- company/
|   |-- companyApi.js
|   |-- portalApi.js
|-- public/
|   |-- jobsApi.js
|-- recruiter/
|   |-- applicationsApi.js
|   |-- jobsApi.js
|   |-- talentApi.js
|-- shared/
|   |-- emailApi.js
|-- user/
|   |-- applicationsApi.js
|   |-- collaborationApi.js
|   |-- jobsApi.js
|   |-- profileApi.js
|   |-- resumesApi.js
|   |-- savedJobsApi.js
```

## When Adding New Code

- New route screens go in `src/pages`.
- Shared layout pieces go in `src/components`.
- New API functions go in the service folder that owns that backend route.
- Cross-role API helpers go in `src/services/shared`.
- Keep compatibility barrels working, but prefer direct imports from domain service modules in new page code.
