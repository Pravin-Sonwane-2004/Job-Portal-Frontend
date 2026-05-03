import { ChartIcon, DocumentIcon, SearchIcon, ShieldIcon } from '@/components/icons/AppIcons';

import SectionIntro from '@/features/home/components/SectionIntro';

const iconMap = {
  search: SearchIcon,
  document: DocumentIcon,
  shield: ShieldIcon,
  chart: ChartIcon,
};

export default function WorkflowSection({ content }) {
  return (
    <section className="space-y-8">
      <SectionIntro
        eyebrow={content.eyebrow}
        title={content.title}
        description={content.description}
      />

      <div className="grid gap-4 lg:grid-cols-3">
        {content.items.map((item) => {
          const Icon = iconMap[item.icon] || ChartIcon;

          return (
            <article
              key={item.title}
              className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-700 dark:bg-brand-500/10 dark:text-brand-200">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="mt-5 text-xl font-semibold tracking-tight text-slate-950 dark:text-white">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
                {item.description}
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
