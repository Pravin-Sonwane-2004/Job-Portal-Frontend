# Styling Guide

## Tailwind Strategy

The application now uses Tailwind as the primary styling system for the refactored shell and homepage.

Principles:

- Prefer utility classes over custom component CSS.
- Keep spacing and typography consistent through shared primitives.
- Reserve `index.css` for base styles and global document behavior.

## Tailwind Configuration

The Tailwind config extends a small design layer:

- `brand` color scale for accents and actions
- `shadow-soft` for elevated cards and panels
- `rounded-4xl` for oversized corner treatments
- `fontFamily.sans` set to an IBM Plex Sans-first stack

Brand palette:

- `brand-50`: `#eef4ff`
- `brand-100`: `#d9e6ff`
- `brand-200`: `#bcd0ff`
- `brand-300`: `#93b2ff`
- `brand-400`: `#6790ff`
- `brand-500`: `#416cff`
- `brand-600`: `#2c4fe3`
- `brand-700`: `#263fb7`
- `brand-800`: `#25388f`
- `brand-900`: `#233270`

## Global Styles

`src/index.css` owns:

- page background gradients
- base typography and antialiasing
- root height behavior
- smooth scrolling
- selection styling

Keep this file small. If a style is page-specific, it belongs in JSX through Tailwind classes.

## Dark / Light Mode

Theme state is handled by:

- `src/utils/themeUtils.js`
- `src/hooks/useThemeMode.js`
- `src/components/layout/ThemeToggle.jsx`

How it works:

1. The selected theme is stored in `localStorage` under `theme`.
2. `applyTheme()` adds or removes the `dark` class on `document.documentElement`.
3. `main.jsx` applies the stored theme before the React tree mounts.
4. `ThemeToggle` updates the state through `useThemeMode`.

This keeps the theme source centralized and prevents each page from managing its own color mode rules.

## Styling Conventions

- Use `Container` for page width and horizontal padding.
- Use `SectionIntro` for repeated section heading rhythm.
- Keep visual state classes close to the element that needs them.
- Avoid deeply nested wrapper divs when spacing can be handled by grid or flex utilities.
- If a component needs significant logic, move that logic into a hook before adding more styling complexity.
