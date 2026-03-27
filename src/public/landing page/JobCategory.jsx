import React from 'react';

const categories = [
  { title: 'Digital Marketing', openings: 50, icon: '/category/Digital Marketing.png' },
  { title: 'Sales', openings: 90, icon: '/category/Sales.png' },
  { title: 'UI/UX Designer', openings: 50, icon: '/category/UI-UX Designer.png' },
  { title: 'Finance', openings: 40, icon: '/category/Finance.png' },
  { title: 'Web Developer', openings: 50, icon: '/category/Web Developer.png' },
  { title: 'Content Writing', openings: 50, icon: '/category/Content Writing.png' },
  { title: 'Data Analyst', openings: 60, icon: '/category/Content Writing.png' },
];

const JobCategory = () => {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-700 dark:bg-slate-800">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
            Explore job categories
          </h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            Browse by function with a simple responsive grid.
          </p>
        </div>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((category) => (
          <article
            key={category.title}
            className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-900/70"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm dark:bg-slate-800">
              <img src={category.icon} alt={category.title} className="h-8 w-8 object-contain" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-slate-900 dark:text-slate-100">
              {category.title}
            </h3>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              {category.openings}+ openings
            </p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default JobCategory;
