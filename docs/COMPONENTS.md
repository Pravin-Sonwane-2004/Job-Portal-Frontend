# Components

## Core Layout Components

### `AppShell`

Location: `src/layouts/AppShell.jsx`

Purpose:

- Wraps every page with the shared header, skip link, main content region, and footer.

### `AppHeader`

Location: `src/components/layout/AppHeader.jsx`

Purpose:

- Renders the brand, role-aware navigation, theme toggle, and account menu.

Notes:

- Uses `useCurrentUser` for state.
- Uses `getPrimaryNavigation()` for link selection.

### `AppFooter`

Location: `src/components/layout/AppFooter.jsx`

Purpose:

- Displays lightweight project context and stable secondary links.

## Reusable UI Primitives

### `Container`

Location: `src/components/ui/Container.jsx`

Purpose:

- Provides consistent horizontal padding and max width.

Usage:

```jsx
import Container from '@/components/ui/Container';

<Container className="py-10">
  <section>...</section>
</Container>
```

### `ThemeToggle`

Location: `src/components/layout/ThemeToggle.jsx`

Purpose:

- Toggles dark/light mode through `useThemeMode`.

Usage:

```jsx
<ThemeToggle />
```

## Homepage Components

### `HeroSection`

Location: `src/features/home/components/HeroSection.jsx`

Purpose:

- Renders the main landing page headline, calls to action, highlights, and summary metrics.

### `WorkflowSection`

Location: `src/features/home/components/WorkflowSection.jsx`

Purpose:

- Explains the architectural direction in a simple three-card grid.

### `CategoryGridSection`

Location: `src/features/home/components/CategoryGridSection.jsx`

Purpose:

- Displays role categories using service-provided content.

### `CompanyStripSection`

Location: `src/features/home/components/CompanyStripSection.jsx`

Purpose:

- Shows partner logos in a restrained grid.

### `SectionIntro`

Location: `src/features/home/components/SectionIntro.jsx`

Purpose:

- Standardizes section eyebrow, title, and description spacing.

## Existing Shared Components Worth Reusing

These already exist in the repo and still make sense for future cleanup work:

- `src/components/ui/SurfaceCard.jsx`
- `src/components/ui/ToggleSwitch.jsx`

When adding new pages, prefer these shared building blocks over one-off wrappers.
