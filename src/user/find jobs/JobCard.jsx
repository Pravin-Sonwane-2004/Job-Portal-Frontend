import React from 'react';
import {
  IconBriefcase,
  IconBuilding,
  IconCalendar,
  IconCurrencyDollar,
  IconMapPin,
} from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

const JobCard = ({ job }) => {
  const navigate = useNavigate();

  if (!job) {
    return null;
  }

  return (
    <article className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:border-slate-700 dark:bg-slate-800">
      <div>
        <h3 className="flex items-center gap-2 text-xl font-semibold text-slate-900 dark:text-slate-100">
          <IconBriefcase size={20} className="text-indigo-600 dark:text-indigo-400" />
          {job.title || job.jobTitle || 'Job Title'}
        </h3>
        <p className="mt-1 flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
          <IconBuilding size={16} className="text-slate-500" />
          {job.company || 'Unknown Company'}
        </p>
      </div>

      <dl className="mt-4 space-y-2 text-sm text-slate-700 dark:text-slate-300">
        <div className="flex items-center gap-2">
          <IconMapPin size={16} className="text-indigo-600 dark:text-indigo-400" />
          <dt className="font-medium text-slate-900 dark:text-slate-100">Location:</dt>
          <dd>{job.location || job.jobLocation || 'N/A'}</dd>
        </div>
        <div className="flex items-center gap-2">
          <IconCurrencyDollar size={16} className="text-indigo-600 dark:text-indigo-400" />
          <dt className="font-medium text-slate-900 dark:text-slate-100">Salary:</dt>
          <dd>{job.salary || job.jobSalary || 'Negotiable'}</dd>
        </div>
        <div className="flex items-center gap-2">
          <IconCalendar size={16} className="text-indigo-600 dark:text-indigo-400" />
          <dt className="font-medium text-slate-900 dark:text-slate-100">Posted:</dt>
          <dd>{job.postedDaysAgo ? `${job.postedDaysAgo} days ago` : 'Recently'}</dd>
        </div>
      </dl>

      <div className="flex-1" />

      <button
        type="button"
        className="mt-6 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-indigo-500"
        onClick={() => navigate(`/apply/${job.id}`, { state: { job } })}
      >
        Apply Now
      </button>
    </article>
  );
};

export default JobCard;
