import React from 'react';

const TalentCard = ({ talent }) => {
  const skills = Array.isArray(talent.topSkills) ? talent.topSkills : [];
  const aboutText = talent.about || 'No summary provided yet.';

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100">
      <header className="border-b border-slate-200 pb-4 dark:border-slate-700">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 text-sm font-semibold text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-300">
            {talent.name?.charAt(0)?.toUpperCase() || 'T'}
          </div>
          <div>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              {talent.name || 'Unnamed Candidate'}
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {talent.role || 'Role not specified'}
            </p>
            {talent.company && (
              <p className="text-xs text-slate-500 dark:text-slate-400">{talent.company}</p>
            )}
          </div>
        </div>
      </header>

      <p className="mt-4 text-sm leading-6 text-slate-600 dark:text-slate-300">
        {aboutText}
      </p>

      {skills.length > 0 && (
        <div className="mt-5 flex flex-wrap gap-2">
          {skills.slice(0, 6).map((skill) => (
            <span
              key={skill}
              className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 dark:bg-slate-700 dark:text-slate-100"
            >
              {skill}
            </span>
          ))}
        </div>
      )}
    </article>
  );
};

export default TalentCard;
