import SectionIntro from '@/features/home/components/SectionIntro';

export default function CompanyStripSection({ content }) {
  return (
    <section className="space-y-8">
      <SectionIntro
        eyebrow={content.eyebrow}
        title={content.title}
        description={content.description}
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {content.items.map((company) => (
          <article
            key={company.name}
            className="flex h-28 items-center justify-center rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
          >
            <img
              src={company.logo}
              alt={company.name}
              className="max-h-12 w-auto object-contain opacity-80 grayscale transition hover:opacity-100 hover:grayscale-0"
            />
          </article>
        ))}
      </div>
    </section>
  );
}
