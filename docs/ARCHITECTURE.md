# Architecture

## Current Structure

```text
src/
  components/
    icons/        -> inline SVG icons used by the lightweight shell and homepage
    layout/       -> header, footer, navigation, theme toggle, account menu
    ui/           -> low-level reusable primitives such as Container
  constants/      -> shared navigation metadata and simple configuration
  features/
    home/
      components/ -> homepage presentation sections
  hooks/
    useCurrentUser.js
    useHomePageContent.js
    useSessionToken.js
    useThemeMode.js
  layouts/
    AppShell.jsx  -> canonical application shell
    MainLayout.jsx -> compatibility wrapper used by App.jsx
  pages/
    home/
      HomePage.jsx -> refactored main landing page
  services/
    homeContentService.js
    sessionIdentityService.js
    userService.js
    sessionService.js
    http.js
  utils/
    jwtUtils.js
    themeUtils.js
```

## What Lives Where

- `layouts/`: page chrome and structural composition.
- `components/layout/`: shell-specific UI such as header, footer, and account controls.
- `components/ui/`: primitives that should stay presentation-only.
- `features/home/`: feature-scoped, dumb rendering components for the landing page.
- `hooks/`: stateful coordination logic and side effects.
- `services/`: API access, identity parsing, and centralized content/data providers.
- `constants/`: navigation maps and shared non-visual configuration.
- `utils/`: low-level helpers that do not own application flow.

## Data Flow

### UI to API

1. A page or layout component renders a feature or shared component.
2. The component calls a hook when it needs stateful behavior.
3. The hook calls a service.
4. The service talks to `http.js` or returns normalized content.
5. The service response flows back to the hook.
6. The hook exposes simple values to the UI.

### Example: Current User Name

1. `AppHeader` uses `useCurrentUser`.
2. `useCurrentUser` reads the session token with `useSessionToken`.
3. The hook asks `sessionIdentityService` for role and display-name fallback data.
4. The hook calls `userService.fetchCurrentUserName()` for the preferred server value.
5. The header receives a ready-to-render identity object and stays mostly dumb.

### Example: Route Protection

1. `ProtectedRoute` reads the token from `sessionService`.
2. It validates expiry and roles through `sessionIdentityService`.
3. It renders children or redirects without duplicating JWT parsing logic.

## Refactor Boundary

The active shell and the main homepage now follow this architecture. Several older feature pages still live in legacy folders such as `src/public/...`, `src/user/...`, and `src/admin/...`.

That is intentional for now:

- The shell is clean enough to serve as the migration target.
- Legacy screens can move over incrementally.
- We avoid a destabilizing big-bang rewrite.
