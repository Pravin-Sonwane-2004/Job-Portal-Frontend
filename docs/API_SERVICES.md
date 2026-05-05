<!-- API_SERVICES.md documents one part of the project so it is easier to explain in interviews. -->
# Frontend API Services

The frontend keeps API calls grouped by portal and product area. Every service imports the shared Axios client from `src/services/http.js`, so JWT headers and `401` session cleanup are handled in one place.

## Shared Client

Location: `src/services/http.js`

- Uses `VITE_API_URL` when it is set.
- Falls back to `/api-backend`, which Vite proxies to `http://localhost:8080`.
- Reads the current JWT from `sessionStorage`.
- Adds `Authorization: Bearer <token>` to protected requests.
- Clears the frontend session when a protected API returns `401`.

## Service Ownership

| Folder | Responsibility | Typical Pages |
| --- | --- | --- |
| `services/auth` | Login, signup, forgot password, reset password | `Login`, `Register`, `ForgotPassword`, `ResetPassword` |
| `services/public` | Public job discovery | `FindJobs` |
| `services/user` | Candidate jobs, applications, saved jobs, resumes, profile, collaboration APIs | `Dashboard`, `ApplyJob`, `MyApplications`, `SavedJobs`, `ResumeBuilder`, `Profile` |
| `services/recruiter` | Recruiter-owned jobs, applications, talent search | `RecruiterJobs`, `RecruiterApplications`, `RecruiterTalent` |
| `services/company` | Company signup, company dashboard, employees, company jobs | `CompanySignup`, `CompanyPortal`, `CompanyEmployees`, `CompanyJobs` |
| `services/admin` | Admin users, jobs, applications | `AdminUsers`, `AdminJobs`, `AdminApplications` |
| `services/shared` | Cross-role helpers such as email | Shared feature code |

## Current Route Mapping

### Auth

| Function | Endpoint |
| --- | --- |
| `login` | `POST /public/login` |
| `register` | `POST /public/signup` |
| `requestPasswordReset` | `POST /public/password/forgot` |
| `resetPassword` | `POST /public/password/reset` |

### Candidate

| Function | Endpoint |
| --- | --- |
| `getUserJobs` | `GET /user/jobs` |
| `getUserJobById` | `GET /user/jobs/{id}` |
| `applyToJob` | `POST /apply/applications/apply?jobId={id}` |
| `getMyAppliedJobs` | `GET /apply/applications/my-applied-dto` |
| `deleteApplicationById` | `DELETE /apply/applications/{id}` |
| `getSavedJobs` | `GET /api/saved-jobs/user/{userId}` |
| `saveJob` | `POST /api/saved-jobs/save?userId={userId}&jobId={jobId}` |
| `unsaveJob` | `DELETE /api/saved-jobs/unsave?userId={userId}&jobId={jobId}` |
| `getResumes` | `GET /api/resumes/user/{userId}` |
| `uploadResume` | `POST /api/resumes/upload?userId={userId}&filePath={filePath}` |
| `getProfile` | `GET /role-profile/get-profile` |
| `updateProfile` | `PUT /role-profile/update-profile` |

### Recruiter

| Function | Endpoint |
| --- | --- |
| `recruiterGetJobs` | `GET /recruiter/jobs` |
| `recruiterCreateJob` | `POST /recruiter/jobs` |
| `recruiterUpdateJob` | `PUT /recruiter/jobs/{id}` |
| `recruiterDeleteJob` | `DELETE /recruiter/jobs/{id}` |
| `recruiterGetApplications` | `GET /recruiter/applications` |
| `recruiterUpdateApplication` | `PUT /recruiter/applications/{id}` |
| `recruiterSearchTalent` | `GET /recruiter/talent` |

### Company

| Function | Endpoint |
| --- | --- |
| `registerCompany` | `POST /public/company/signup` |
| `companyDashboard` | `GET /company-portal/dashboard` |
| `companyGetProfile` | `GET /company-portal/company` |
| `companyUpdateProfile` | `PUT /company-portal/company` |
| `companyGetEmployees` | `GET /company-portal/employees` |
| `companyAddEmployee` | `POST /company-portal/employees` |
| `companyRemoveEmployee` | `DELETE /company-portal/employees/{id}` |
| `companyGetJobs` | `GET /company-portal/jobs` |
| `companyCreateJob` | `POST /company-portal/jobs` |
| `companyUpdateJob` | `PUT /company-portal/jobs/{id}` |
| `companyDeleteJob` | `DELETE /company-portal/jobs/{id}` |

### Admin

| Function | Endpoint |
| --- | --- |
| `adminGetUsers` | `GET /admin/users` |
| `adminCreateUser` | `POST /admin/signup` |
| `adminUpdateUser` | `PUT /admin/user/{email}` |
| `adminDeleteUser` | `DELETE /admin/user/{email}` |
| `adminGetJobs` | `GET /admin/jobs` |
| `adminCreateJob` | `POST /admin/jobs` |
| `adminUpdateJob` | `PUT /admin/jobs/{id}` |
| `adminDeleteJob` | `DELETE /admin/jobs/{id}` |
| `adminGetApplications` | `GET /admin/applications` |

## Application Form Flow

`ApplyJob.jsx` loads the selected job, the current profile, and saved resumes before rendering the form. The final payload sent to the backend includes:

- `userId`
- `jobId`
- `resumeLink`
- `coverLetter`
- `phoneNumber`
- `linkedinUrl`
- `portfolioUrl`
- `expectedSalary`
- `noticePeriod`
- `source`
- `userAgent`

The backend still uses the authenticated JWT user as the source of truth for ownership, so the request cannot apply on behalf of another candidate just by changing `userId`.

## Adding A New API

1. Add the function to the service folder that owns the route.
2. Import that function directly in the page that needs it.
3. Add the backend endpoint to the matching controller and `SecurityConfig`.
4. Update this document when the route becomes part of a portal workflow.
