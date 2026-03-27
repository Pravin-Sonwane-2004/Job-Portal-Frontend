import Container from '@/components/ui/Container';

const footerColumns = [
  {
    title: 'Platform',
    links: [
      { label: 'Find Jobs', href: '/find-jobs' },
      { label: 'Resume Builder', href: '/resume-builder' },
      { label: 'Settings', href: '/settings' },
    ],
  },
  {
    title: 'Maintenance',
    items: ['Architecture notes in /docs', 'Component usage in /docs', 'Styling guide in /docs'],
  },
];

export default function AppFooter() {
  return (
    <footer className="border-t border-slate-200/80 bg-white/80 py-10 dark:border-slate-800 dark:bg-slate-950/80">
      <Container className="grid gap-10 lg:grid-cols-[1.3fr_0.7fr_0.7fr]">
        <div className="max-w-xl">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-600 dark:text-brand-300">
            SkillSync Portal
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950 dark:text-white">
            A lean frontend shell for job search, hiring workflows, and long-term maintenance.
          </h2>
          <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-400">
            The active layout and homepage now follow a Tailwind-only, docs-first structure so new
            pages can migrate incrementally without pulling presentation logic back into the view.
          </p>
        </div>

        {footerColumns.map((column) => (
          <div key={column.title}>
            <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
              {column.title}
            </h3>
            {'links' in column ? (
              <div className="mt-4 grid gap-3">
                {column.links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="text-sm text-slate-700 transition hover:text-brand-600 dark:text-slate-300 dark:hover:text-brand-300"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            ) : (
              <div className="mt-4 grid gap-3">
                {column.items.map((item) => (
                  <p key={item} className="text-sm text-slate-600 dark:text-slate-400">
                    {item}
                  </p>
                ))}
              </div>
            )}
          </div>
        ))}
      </Container>
    </footer>
  );
}
