import React from 'react';
import { Paper, Text } from '@mantine/core';
import {
  IconBriefcase,
  IconBuilding,
  IconCalendar,
  IconMapPin,
  IconCurrencyDollar,
} from '@tabler/icons-react';

import { useNavigate } from 'react-router-dom';

const AppliedJobCard = ({ job, onCancel, onUpdate, loading }) => {
  const navigate = useNavigate();
  if (!job) return null;

  return (
    <div
      className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 font-poppins flex flex-col gap-4 transition-shadow duration-300 h-full shadow-sm hover:shadow-md"
      style={{ minHeight: 260 }}
    >
      {/* Header: Title & Company */}
      <div>
        <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <IconBriefcase size={20} className="text-primary-500" />
          {job?.jobTitle || 'Job Title'}
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-400 flex items-center gap-2 mt-1">
          <IconBuilding size={16} className="text-slate-500 dark:text-slate-500" />
          {job?.company || 'Unknown Company'}
        </p>
      </div>

      {/* Job Details */}
      <div className="text-sm text-slate-700 dark:text-slate-300 space-y-1 mt-2">
        <div className="flex items-center gap-2">
          <IconMapPin size={16} className="text-primary-500" />
          <span className="text-slate-900 dark:text-slate-100 font-medium">Location:</span>
          <span>{job?.location || 'N/A'}</span>
        </div>
        <div className="flex items-center gap-2">
          <IconCurrencyDollar size={16} className="text-primary-500" />
          <span className="text-slate-900 dark:text-slate-100 font-medium">Salary:</span>
          <span>{job?.salary || 'Negotiable'}</span>
        </div>
        <div className="flex items-center gap-2">
          <IconCalendar size={16} className="text-primary-500" />
          <span className="text-slate-900 dark:text-slate-100 font-medium">Posted:</span>
          <span>{job?.postedDate ? `${job.postedDate} days ago` : 'Recently'}</span>
        </div>
      </div>

      {/* Spacer */}
      <div className="flex-grow" />

      {/* Action Buttons */}
      <div className="flex gap-3 mt-4">
        <button
          className="bg-error hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 shadow-sm"
          onClick={() => onCancel(job)}
          disabled={loading}
        >
          Cancel
        </button>
        <button
          className="bg-primary-500 hover:bg-primary-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 shadow-sm"
          onClick={() => onUpdate(job, navigate)}
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default AppliedJobCard;
