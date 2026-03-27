import { Link, useNavigate } from 'react-router-dom';

import { ChevronDownIcon } from '@/components/icons/AppIcons';
import { getAccountNavigation } from '@/constants/navigation';
import { clearSessionToken } from '@/services/sessionService';

function Avatar({ displayName }) {
  const initials = displayName.trim().charAt(0).toUpperCase() || 'U';

  return (
    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-950 text-sm font-semibold text-white dark:bg-white dark:text-slate-950">
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
        className="inline-flex items-center justify-center rounded-full bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
      >
        Sign In
      </Link>
    );
  }

  const accountLinks = getAccountNavigation(identity);

  const handleLogout = () => {
    clearSessionToken();
    onNavigate?.();
    navigate('/signin');
  };

  if (mobile) {
    return (
      <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center gap-3">
          <Avatar displayName={identity.displayName} />
          <div>
            <p className="text-sm font-semibold text-slate-950 dark:text-white">
              {identity.displayName}
            </p>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
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
              className="rounded-2xl border border-slate-200 px-4 py-3 text-sm font-medium text-slate-700 transition hover:border-brand-200 hover:bg-brand-50 hover:text-brand-700 dark:border-slate-700 dark:text-slate-200 dark:hover:border-brand-500/30 dark:hover:bg-brand-500/10 dark:hover:text-brand-200"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <button
          type="button"
          onClick={handleLogout}
          className="mt-4 w-full rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700 transition hover:bg-red-100 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-300 dark:hover:bg-red-500/15"
        >
          Sign Out
        </button>
      </section>
    );
  }

  return (
    <details className="group relative">
      <summary className="flex list-none cursor-pointer items-center gap-3 rounded-full border border-slate-200 bg-white px-2 py-2 shadow-sm transition hover:border-brand-300 dark:border-slate-700 dark:bg-slate-900 dark:hover:border-brand-500/40 [&::-webkit-details-marker]:hidden">
        <Avatar displayName={identity.displayName} />
        <div className="hidden text-left xl:block">
          <p className="max-w-40 truncate text-sm font-semibold text-slate-950 dark:text-white">
            {identity.displayName}
          </p>
          <p className="text-xs uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
            {identity.roleLabel}
          </p>
        </div>
        <ChevronDownIcon className="hidden h-4 w-4 text-slate-500 transition group-open:rotate-180 xl:block dark:text-slate-400" />
      </summary>

      <div className="absolute right-0 top-full z-40 mt-3 w-72 rounded-3xl border border-slate-200 bg-white p-4 shadow-soft dark:border-slate-800 dark:bg-slate-900">
        <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/80">
          <p className="text-sm font-semibold text-slate-950 dark:text-white">
            {identity.displayName}
          </p>
          <p className="mt-1 text-xs uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
            {identity.roleLabel}
          </p>
        </div>

        <div className="mt-4 grid gap-2">
          {accountLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="rounded-2xl px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-brand-50 hover:text-brand-700 dark:text-slate-200 dark:hover:bg-brand-500/10 dark:hover:text-brand-200"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <button
          type="button"
          onClick={handleLogout}
          className="mt-4 w-full rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700 transition hover:bg-red-100 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-300 dark:hover:bg-red-500/15"
        >
          Sign Out
        </button>
      </div>
    </details>
  );
}
