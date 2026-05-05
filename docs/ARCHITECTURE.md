# Frontend Architecture

## Runtime Shape

```text
main.jsx
  -> App.jsx
    -> Router.jsx
      -> Layout.jsx
        -> route page in src/pages
          -> domain API service in src/services
            -> shared Axios client in src/services/http.js
```

## Route And Role Flow

`Router.jsx` defines public and protected routes. Protected routes use the local `RequireRole` component, which reads the current user from `src/auth.js` and checks the role helpers from `src/services/auth.js`.

The role portals are:

| Portal | Roles | Main Routes |
| --- | --- | --- |
| Candidate | `USER` | `/dashboard`, `/find-jobs`, `/apply/:jobId`, `/my-applications`, `/saved-jobs`, `/resume-builder` |
| Recruiter | `RECRUITER` | `/recruiter`, `/recruiter-jobs`, `/recruiter-applications`, `/recruiter-talent` |
| Company | `COMPANY_ADMIN`, `COMPANY_EMPLOYEE` | `/company`, `/company-jobs`, `/company-employees` |
| Admin | `ADMIN` | `/admin`, `/admin-users`, `/admin-jobs`, `/admin-applications` |

## API Flow

1. A page imports the API function from its domain service folder.
2. The service calls `http`, the shared Axios instance.
3. `http` reads the JWT from the current session and adds the `Authorization` header.
4. The backend validates the JWT and role in Spring Security.
5. If the backend returns `401`, `http` clears the current session.

## Service Boundaries

The service folders mirror backend ownership:

- `auth`: public authentication endpoints.
- `public`: public job discovery.
- `user`: candidate-owned workflows.
- `recruiter`: recruiter-owned workflows.
- `company`: company-owned workflows.
- `admin`: platform administration.
- `shared`: cross-role APIs.

This keeps portal pages from accidentally depending on another portal's route group. For example, `AdminJobs.jsx` uses `services/admin/jobsApi.js`, while `CompanyJobs.jsx` uses `services/company/portalApi.js`.

## Apply Job Flow

`ApplyJob.jsx` is the candidate application workflow:

1. Load the job with `getUserJobById`.
2. Load the authenticated user's profile with `getProfile`.
3. Load saved resumes with `getResumes`.
4. Prefill phone, LinkedIn, and resume link when available.
5. Validate required fields in the browser.
6. Submit the final request through `applyToJob`.
7. Offer a direct path to `/my-applications` after success.

The backend uses the authenticated JWT user as the authoritative applicant, even though the frontend also sends `userId` and `jobId` in the body for DTO completeness.

## Compatibility Exports

`src/api.js` and `src/services/api.js` remain as compatibility barrels. New page code should import from the specific service module instead of adding more calls to the compatibility barrel.
