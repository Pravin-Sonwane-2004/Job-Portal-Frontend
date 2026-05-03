# Job Portal Frontend

React + Vite frontend for the Job Portal platform. It connects to the Spring Boot backend and provides separate experiences for candidates, recruiters, and admins.

## Interview Pitch

This frontend is a single-page application built with React, Vite, React Router, and Axios. It uses lazy-loaded pages, protected routes, role-aware navigation, and a central API client. The frontend stores the logged-in user in session storage, sends JWT tokens with API requests, and redirects users based on their role.

In interviews, explain it as:

> "I built the frontend as a React SPA with role-based routing. Candidates can browse jobs, save jobs, apply, manage resumes, and update their profile. Recruiters can manage jobs, review applications, update statuses, and search candidate talent. Admins can manage users, jobs, and applications. I used Axios interceptors for JWT headers and session cleanup, Vite proxying for local backend integration, and lazy routes for better loading behavior."

## Tech Stack

| Area | Technology |
| --- | --- |
| UI Library | React 19 |
| Build Tool | Vite 6 |
| Routing | React Router DOM 7 |
| API Client | Axios |
| Styling | CSS in `src/index.css` plus component/page styles |
| Language | JavaScript / JSX |
| Dev Quality | ESLint |
| Backend | Spring Boot REST API |

## Main Features

- Public home, login, register, and job search pages.
- Forgot-password and reset-password pages connected to backend reset tokens.
- Candidate dashboard, applications, saved jobs, profile, settings, and resume builder.
- Recruiter dashboard, job management, application tracking, and talent search.
- Company signup, company portal, company employee management, and company job posting.
- Admin dashboard for users, jobs, and applications.
- Role-aware dashboard insights for candidates, recruiters, and admins.
- Protected routes through `RequireRole`.
- Lazy-loaded route components with a shared loader.
- Central API layer in `src/api.js`.
- JWT token injection through an Axios request interceptor.
- Automatic session clearing on unauthorized API responses.
- Vite backend proxy for local development.

## Project Structure

```text
src
|-- App.jsx              App shell
|-- Router.jsx           Route table and role protection
|-- api.js               Compatibility export for services/api.js
|-- auth.js              Compatibility export for services/auth.js
|-- main.jsx             React entry point
|-- index.css            Global styling
|-- components/          Shared UI such as layout and loader
|-- pages/               Route-level screens
|-- services/            API client, auth/session helpers, and frontend services
public
|-- Companies/           Company logos
|-- Icons/               Brand icons
|-- Profile/             Profile images
|-- category/            Category images
|-- social/              Social icons
docs
|-- ARCHITECTURE.md      Frontend architecture notes
|-- COMPONENTS.md        Component notes
|-- STYLING_GUIDE.md     Styling conventions
```

## Role-Based Routes

| Route | Access |
| --- | --- |
| `/` | Public |
| `/find-jobs` | Public |
| `/signin` | Public |
| `/register` | Public |
| `/company-signup` | Public |
| `/forgot-password` | Public |
| `/reset-password` | Public |
| `/dashboard` | USER, RECRUITER, ADMIN |
| `/my-applications` | USER |
| `/saved-jobs` | USER |
| `/apply/:jobId` | USER |
| `/resume-builder` | USER |
| `/profile` | USER, RECRUITER, ADMIN |
| `/edit-profile` | USER, RECRUITER, ADMIN |
| `/settings` | USER, RECRUITER, ADMIN |
| `/recruiter` | RECRUITER |
| `/recruiter-jobs` | RECRUITER |
| `/recruiter-applications` | RECRUITER |
| `/recruiter-talent` | RECRUITER |
| `/company` | COMPANY_ADMIN, COMPANY_EMPLOYEE |
| `/company-jobs` | COMPANY_ADMIN, COMPANY_EMPLOYEE |
| `/company-employees` | COMPANY_ADMIN |
| `/admin` | ADMIN |
| `/admin-users` | ADMIN |
| `/admin-jobs` | ADMIN |
| `/admin-applications` | ADMIN |

## Frontend Architecture Flow

1. The user logs in through the login page.
2. `src/api.js` calls `POST /public/login`.
3. `src/auth.js` stores the returned user and JWT in `sessionStorage`.
4. `Router.jsx` checks the user's role before rendering protected routes.
5. Axios automatically adds `Authorization: Bearer <token>` to protected requests.
6. If the backend returns `401`, the frontend clears the session.

The password reset flow works separately from login:

1. The user opens `/forgot-password`.
2. The frontend calls `POST /public/password/forgot`.
3. The backend creates an expiring reset token and emails a reset link.
4. The user opens `/reset-password?token=...`.
5. The frontend calls `POST /public/password/reset` with the token and new password.

## Backend Connection

The app uses:

```js
const API = import.meta.env.VITE_API_URL || '/api-backend';
```

For local development, Vite proxies `/api-backend` to:

```text
http://localhost:8080
```

That means local frontend calls such as:

```text
/api-backend/public/login
```

are forwarded to:

```text
http://localhost:8080/public/login
```

For deployment, set:

```env
VITE_API_URL=https://your-backend-url.com
```

## Local Setup

1. Install dependencies:

```powershell
npm install
```

2. Start the Spring Boot backend on port `8080`.

3. Start the frontend:

```powershell
npm run dev
```

The frontend runs at:

```text
http://localhost:3000
```

## Useful Commands

```powershell
npm run dev
npm run build
npm run preview
npm run lint
```

On Windows PowerShell, if `npm` is blocked by script policy, use:

```powershell
npm.cmd run build
```

## Implemented Backend API Areas

The frontend already has API helpers for:

- Authentication and registration.
- Public paginated jobs.
- Candidate job browsing.
- Candidate applications.
- Saved jobs.
- Resume records.
- Profile fetch and update.
- Admin user, job, and application management.
- Recruiter job management.
- Recruiter application management.
- Recruiter talent search.
- Company signup, dashboard, employee, and job-management APIs.
- Companies, reviews, alerts, messages, and interviews APIs.
- Email sending.

## How To Explain The Frontend In Interviews

Focus on these points:

- "I used a central Axios client, so token handling and error handling are not duplicated."
- "I protected routes at the router level using a reusable `RequireRole` component."
- "I kept auth helpers in one file, which makes role checks and default redirects easy to maintain."
- "I used Vite's proxy to avoid CORS problems during local development."
- "I lazy-loaded pages so the first load does not eagerly import every dashboard."
- "The frontend is role-aware: each role gets a different workflow, not only different buttons."
- "I separated frontend services into `src/services`, which keeps API/session logic away from page UI code."

## Common Demo Flow

1. Register or log in as a candidate.
2. Search public jobs.
3. Open a job and apply.
4. Save a job.
5. Show candidate dashboard and application history.
6. Log in as recruiter.
7. Create a job and review applications.
8. Log in as admin.
9. Manage users, jobs, and applications.

## Future Enhancements

- Add form schema validation.
- Add toast notifications for all important actions.
- Add loading and empty states consistently across admin and recruiter pages.
- Add frontend unit tests for auth helpers and route protection.
- Add end-to-end tests for login, apply, recruiter review, and admin management.
