# Frontend Architecture

## Updated Structure

```text
src/
  App.jsx
  Router.jsx
  layouts/
    MainLayout.jsx
  components/
    ui/
      SurfaceCard.jsx
      ToggleSwitch.jsx
      system/
        index.jsx
        theme.js
  views/
    settings/
      SettingsView.jsx
  settings/
    SettingsPage.jsx
  header and footer/
    Header.jsx
    HeaderNav.jsx
    HeaderUserSection.jsx
    Footer.jsx
  utils/
    jwtUtils.js
    themeUtils.js
```

## Notes

- `layouts/` holds application shells and page-level wrappers.
- `components/ui/` contains reusable presentational primitives.
- `views/` contains route-facing screens built from shared components.
- `settings/SettingsPage.jsx` is now a thin route adapter that re-exports the real view.
- `components/ui/system/` is a temporary Tailwind compatibility layer used to remove the old UI dependency while feature pages are migrated to cleaner local components.

