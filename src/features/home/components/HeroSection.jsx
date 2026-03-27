import { Link } from 'react-router-dom';

import { ArrowRightIcon, CheckIcon } from '@/components/icons/AppIcons';

export default function HeroSection({ content }) {
  return (
    <section className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-soft dark:border-slate-800 dark:bg-slate-900">
      <div className="grid gap-10 px-6 py-8 sm:px-8 sm:py-10 lg:grid-cols-[1.15fr_0.85fr] lg:px-10">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-600 dark:text-brand-300">
            {content.eyebrow}
          </p>
          <h1 className="mt-5 max-w-3xl text-4xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-5xl">
            {content.title}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-400 sm:text-lg">
            {content.description}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              to={content.primaryAction.to}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-950 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
            >
              {content.primaryAction.label}
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
            <Link
              to={content.secondaryAction.to}
              className="inline-flex items-center justify-center rounded-full border border-slate-200 px-6 py-3.5 text-sm font-semibold text-slate-700 transition hover:border-brand-300 hover:text-brand-600 dark:border-slate-700 dark:text-slate-200 dark:hover:border-brand-500/40 dark:hover:text-brand-300"
            >
              {content.secondaryAction.label}
            </Link>
          </div>

          <div className="mt-8 grid gap-3">
            {content.highlights.map((highlight) => (
              <div key={highlight} className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300">
                <span className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-brand-50 text-brand-700 dark:bg-brand-500/10 dark:text-brand-200">
                  <CheckIcon className="h-3.5 w-3.5" />
                </span>
                <span>{highlight}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-4">
          <div className="rounded-[1.75rem] bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.18),_transparent_55%),linear-gradient(135deg,_rgba(248,250,252,0.94),_rgba(226,232,240,0.7))] p-6 dark:bg-[radial-gradient(circle_at_top_left,_rgba(96,165,250,0.2),_transparent_55%),linear-gradient(135deg,_rgba(15,23,42,0.96),_rgba(15,23,42,0.72))]">
            <img
              src={content.illustration}
              alt="Job search illustration"
              className="mx-auto w-full max-w-sm object-contain"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
            {content.metrics.map((metric) => (
              <article
                key={metric.label}
                className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950/70"
              >
                <p className="text-3xl font-semibold tracking-tight text-slate-950 dark:text-white">
                  {metric.value}
                </p>
                <p className="mt-2 text-sm font-medium text-slate-900 dark:text-slate-100">
                  {metric.label}
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                  {metric.helper}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
