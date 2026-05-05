<!-- STYLING_GUIDE.md documents one part of the project so it is easier to explain in interviews. -->
# Styling Guide

## Styling Strategy

The frontend uses a single global stylesheet at `src/index.css`. Page components use the shared class names from that file plus small inline styles for page-specific spacing or typography.

There is no Tailwind dependency in the current frontend package. Keep new styling consistent with the existing CSS variables and utility classes.

## Design Tokens

Core theme values live in `:root` inside `src/index.css`.

Important variables:

- `--bg`
- `--surface`
- `--surface-2`
- `--text`
- `--text-secondary`
- `--border`
- `--primary`
- `--danger`
- `--success`
- `--radius`

Use these variables when adding new global styles so pages stay visually consistent.

## Common Classes

| Class | Purpose |
| --- | --- |
| `page` | Standard page width and padding |
| `page-narrow` | Narrow form/detail layout |
| `card` | Bordered content surface |
| `grid`, `grid-2`, `grid-3` | Responsive grid layout |
| `btn`, `btn-primary`, `btn-outline`, `btn-danger`, `btn-success` | Button styles |
| `form-group`, `form-label`, `form-input`, `form-select` | Form controls |
| `alert`, `alert-error`, `alert-success`, `alert-info` | Status messages |
| `empty-state` | Empty list messaging |
| `profile-details`, `detail-item` | Label/value details |

## Responsive Behavior

`src/index.css` includes a mobile breakpoint at `780px`. At that width:

- Header layout stacks vertically.
- Navigation wraps.
- `grid-2`, `grid-3`, and search bars collapse to one column.

When adding fixed-width UI, make sure it still fits below this breakpoint.

## Styling Rules

- Reuse existing classes before adding new ones.
- Add global classes only when at least two pages can use them.
- Keep page-only layout tweaks inline or local to that page.
- Use existing semantic colors for success, danger, info, surfaces, and borders.
- Keep cards at the existing `--radius` value.
- Avoid adding a second design system unless the whole app is being migrated deliberately.
