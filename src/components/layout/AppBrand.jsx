import { Link } from 'react-router-dom';

import { BrandMark } from '@/components/icons/AppIcons';

export default function AppBrand() {
  return (
    <Link to="/" className="flex min-w-0 items-center gap-3 text-slate-950 dark:text-white">
      <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-600 text-white shadow-soft">
        <BrandMark className="h-5 w-5" />
      </span>
      <span className="min-w-0">
        <span className="block truncate text-base font-semibold tracking-tight sm:text-lg">
          SkillSync Portal
        </span>
        <span className="block truncate text-xs font-medium uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
          Lightweight hiring workflow
        </span>
      </span>
    </Link>
  );
}
