# Job Portal Frontend Docs

## Overview

This frontend is a Vite + React + Tailwind application for a job portal that supports public browsing, candidate workflows, and admin tools.

The current refactor establishes a lightweight core:

- A Tailwind-only application shell
- A centralized dark/light theme workflow
- A production-style split between layouts, components, hooks, and services
- A docs-first maintenance baseline under `/docs`

The new shell and homepage are the reference implementation for future cleanup. Some legacy feature pages still exist in their original folders and should be migrated gradually instead of rewritten all at once.

## Tech Stack

- React 19
- React Router 7
- Tailwind CSS 3
- Axios for API requests
- Vite 6

## Local Setup

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Build the production bundle:

```bash
npm run build
```

## Backend Assumption

The frontend expects the backend API to be reachable at `http://localhost:8080`. Several service modules still point directly to that base URL.

## Recommended Working Rules

- Keep view components focused on layout and rendering.
- Put stateful behavior in hooks.
- Put API access and transformation rules in services.
- Reuse the application shell and shared UI primitives instead of re-creating page chrome.
- Treat `/docs` as the canonical maintenance guide for new contributors.
