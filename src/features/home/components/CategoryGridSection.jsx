import { Link } from 'react-router-dom';

import { ArrowRightIcon } from '@/components/icons/AppIcons';
import SectionIntro from '@/features/home/components/SectionIntro';

export default function CategoryGridSection({ content }) {
  return (
    <section className="space-y-8">
      <SectionIntro
        eyebrow={content.eyebrow}
        title={content.title}
        description={content.description}
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {content.items.map((item) => (
          <article
            key={item.title}
            className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-50 dark:bg-slate-800/80">
                <img src={item.icon} alt={item.title} className="h-9 w-9 object-contain" />
              </div>
              <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-brand-700 dark:bg-brand-500/10 dark:text-brand-200">
                {item.openings} open
              </span>
            </div>

            <h3 className="mt-5 text-xl font-semibold tracking-tight text-slate-950 dark:text-white">
              {item.title}
            </h3>
            <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
              {item.description}
            </p>
          </article>
        ))}
      </div>

      <Link
        to="/find-jobs"
        className="inline-flex items-center gap-2 text-sm font-semibold text-brand-700 transition hover:text-brand-600 dark:text-brand-300 dark:hover:text-brand-200"
      >
        See all open roles
        <ArrowRightIcon className="h-4 w-4" />
      </Link>
    </section>
  );
}
