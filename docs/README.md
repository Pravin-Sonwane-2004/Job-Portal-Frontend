<!-- README.md documents one part of the project so it is easier to explain in interviews. -->
# Job Portal Frontend Docs

## Overview

This frontend is a React + Vite single-page application for the Job Portal platform. It supports public job discovery plus separate candidate, recruiter, company, and admin portal workflows.

The current frontend is intentionally simple:

- React Router owns route-level access control.
- `src/components/Layout.jsx` owns the shared header, role-aware navigation, main outlet, and footer.
- Route pages live in `src/pages`.
- API calls live in domain folders under `src/services`.
- `src/services/http.js` owns the Axios instance, JWT injection, and unauthorized-session cleanup.

## Documentation Map

| File | Purpose |
| --- | --- |
| `../README.md` | Main setup, feature, and demo guide |
| `API_SERVICES.md` | Frontend service folder ownership and route mapping |
| `ARCHITECTURE.md` | Runtime architecture and data flow |
| `structure.md` | Current folder structure |
| `COMPONENTS.md` | Shared component notes |
| `STYLING_GUIDE.md` | CSS and UI conventions |

## Local Setup

```powershell
npm install
npm run dev
```

The frontend runs at `http://localhost:3000` and proxies `/api-backend` to the backend at `http://localhost:8080`.

For production builds:

```powershell
npm.cmd run build
```

Use `npm.cmd` on Windows PowerShell if the `npm.ps1` execution policy blocks scripts.

## Maintenance Rules

- Keep portal-specific API calls in their portal service folder.
- Keep page files focused on UI, form state, loading state, and navigation.
- Add backend routes to `API_SERVICES.md` when a page starts using them.
- Keep role access in sync between `Router.jsx`, frontend navigation, and backend `SecurityConfig`.
- Prefer small, focused service modules over rebuilding a large all-in-one API file.
