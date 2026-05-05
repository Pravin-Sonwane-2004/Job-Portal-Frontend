# Frontend Architecture Summary

This file is a short companion to `ARCHITECTURE.md`.

## Core Ideas

- The app is a React SPA served by Vite.
- Routing is centralized in `src/Router.jsx`.
- Session state is stored in `sessionStorage` through `src/services/auth.js`.
- API access is grouped by portal under `src/services`.
- `src/services/http.js` is the only place that owns Axios setup.
- The Vite dev server proxies `/api-backend` to the Spring backend.

## Portal Boundaries

| Portal | Frontend Service Folder | Backend Route Group |
| --- | --- | --- |
| Public | `services/public` | `/public` |
| Auth | `services/auth` | `/public`, `/public/password` |
| Candidate | `services/user` | `/user`, `/apply/applications`, `/api/saved-jobs`, `/api/resumes`, `/role-profile` |
| Recruiter | `services/recruiter` | `/recruiter` |
| Company | `services/company` | `/public/company`, `/company-portal`, `/api/companies` |
| Admin | `services/admin` | `/admin` |

## Access Rules

Keep these three places aligned whenever a route changes:

1. `src/Router.jsx`
2. `src/components/Layout.jsx`
3. Backend `SecurityConfig.java`

The frontend hides links and protects routes for user experience. The backend remains the source of truth for authorization.
