import { NavLink } from 'react-router-dom';

export default function AppNavigation({ links, mobile = false, onNavigate }) {
  const navClasses = mobile
    ? 'grid gap-2'
    : 'hidden items-center gap-1 lg:flex';

  return (
    <nav aria-label="Primary navigation" className={navClasses}>
      {links.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          onClick={onNavigate}
          className={({ isActive }) =>
            [
              'rounded px-3 py-2 text-sm font-medium',
              mobile ? 'border border-transparent' : '',
              isActive
                ? 'bg-brand-50 text-brand-700 dark:bg-slate-800 dark:text-white'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white',
            ]
              .filter(Boolean)
              .join(' ')
          }
        >
          {link.label}
        </NavLink>
      ))}
    </nav>
  );
}
