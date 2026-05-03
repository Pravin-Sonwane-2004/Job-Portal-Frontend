import { Link, useNavigate } from 'react-router-dom';

import { ChevronDownIcon } from '@/components/icons/AppIcons';
import { getAccountNavigation } from '@/constants/navigation';
import { clearCurrentUser } from '@/services/sessionService';

function Avatar({ displayName }) {
  const initials = displayName.trim().charAt(0).toUpperCase() || 'U';

  return (
    <span className="flex h-9 w-9 items-center justify-center rounded bg-slate-900 text-sm font-semibold text-white dark:bg-white dark:text-slate-950">
      {initials}
    </span>
  );
}

export default function UserMenu({ identity, mobile = false, onNavigate }) {
  const navigate = useNavigate();

  if (!identity.isAuthenticated) {
    return (
      <Link
        to="/signin"
        onClick={onNavigate}
        className="inline-flex items-center justify-center rounded bg-slate-900 px-4 py-2 text-sm font-semibold text-white dark:bg-white dark:text-slate-950"
      >
        Sign In
      </Link>
    );
  }

  const accountLinks = getAccountNavigation(identity);

  const handleLogout = () => {
    clearCurrentUser();
    onNavigate?.();
    navigate('/signin');
  };

  if (mobile) {
    return (
      <section className="rounded border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center gap-3">
          <Avatar displayName={identity.displayName} />
          <div>
            <p className="text-sm font-semibold text-slate-950 dark:text-white">
              {identity.displayName}
            </p>
            <p className="text-xs uppercase text-slate-500 dark:text-slate-400">
              {identity.roleLabel}
            </p>
          </div>
        </div>

        <div className="mt-4 grid gap-2">
          {accountLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={onNavigate}
              className="rounded border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <button
          type="button"
          onClick={handleLogout}
          className="mt-4 w-full rounded border border-red-200 bg-red-50 px-3 py-2 text-sm font-semibold text-red-700 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-300"
        >
          Sign Out
        </button>
      </section>
    );
  }

  return (
    <details className="group relative">
      <summary className="flex list-none cursor-pointer items-center gap-3 rounded border border-slate-200 bg-white px-2 py-2 dark:border-slate-700 dark:bg-slate-900 [&::-webkit-details-marker]:hidden">
        <Avatar displayName={identity.displayName} />
        <div className="hidden text-left xl:block">
          <p className="max-w-40 truncate text-sm font-semibold text-slate-950 dark:text-white">
            {identity.displayName}
          </p>
          <p className="text-xs uppercase text-slate-500 dark:text-slate-400">
            {identity.roleLabel}
          </p>
        </div>
        <ChevronDownIcon className="hidden h-4 w-4 text-slate-500 transition group-open:rotate-180 xl:block dark:text-slate-400" />
      </summary>

      <div className="absolute right-0 top-full z-40 mt-3 w-72 rounded border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="rounded bg-slate-50 p-4 dark:bg-slate-800">
          <p className="text-sm font-semibold text-slate-950 dark:text-white">
            {identity.displayName}
          </p>
          <p className="mt-1 text-xs uppercase text-slate-500 dark:text-slate-400">
            {identity.roleLabel}
          </p>
        </div>

        <div className="mt-4 grid gap-2">
          {accountLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
            className="rounded px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <button
          type="button"
          onClick={handleLogout}
          className="mt-4 w-full rounded border border-red-200 bg-red-50 px-3 py-2 text-sm font-semibold text-red-700 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-300"
        >
          Sign Out
        </button>
      </div>
    </details>
  );
}
