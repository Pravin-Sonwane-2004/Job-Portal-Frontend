# Components

## Shared Components

### `Layout`

Location: `src/components/Layout.jsx`

Purpose:

- Renders the global header.
- Builds role-aware navigation links.
- Shows the signed-in user's display name and role label.
- Handles sign out.
- Renders the current route through `Outlet`.
- Renders the footer.

### `Loader`

Location: `src/components/Loader.jsx`

Purpose:

- Provides a shared loading state for lazy routes and data-loading pages.

## Page Components

Route-level screens live in `src/pages`. They own page-specific form state, loading state, and navigation decisions.

Important page groups:

- Candidate: `FindJobs`, `ApplyJob`, `MyApplications`, `SavedJobs`, `ResumeBuilder`, `Profile`, `EditProfile`.
- Recruiter: `Recruiter`, `RecruiterJobs`, `RecruiterApplications`, `RecruiterTalent`.
- Company: `CompanySignup`, `CompanyPortal`, `CompanyEmployees`, `CompanyJobs`.
- Admin: `Admin`, `AdminUsers`, `AdminJobs`, `AdminApplications`.
- Auth: `Login`, `Register`, `ForgotPassword`, `ResetPassword`.

## Component Rules

- Put reusable chrome in `src/components`.
- Put route screens in `src/pages`.
- Keep API calls in `src/services`.
- Keep cross-page formatting in `src/index.css`.
- Avoid adding one-off helper components until at least two pages need them.
