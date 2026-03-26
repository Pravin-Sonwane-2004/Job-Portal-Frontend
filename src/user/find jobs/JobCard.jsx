import React, { useState } from 'react';
import { Paper, Text } from '@mantine/core';
import {
  IconBriefcase,
  IconBuilding,
  IconCalendar,
  IconMapPin,
  IconCurrencyDollar,
} from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { getUserIdFromJwt } from '../../utils/jwtUtils';

const JobCard = ({ job }) => {
  if (!job) return null;

  const [applyStatus, setApplyStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // getUserIdFromJwt is now imported from utils

  const handleApply = async () => {
    const userId = getUserIdFromJwt();
    if (!userId) {
      setApplyStatus('Could not determine your user ID. Please log out and sign in again.');
      return;
    }
    setLoading(true);
    setApplyStatus('');
    try {
      const res = await fetch(`http://localhost:8080/apply/applications/apply?userId=${userId}&jobId=${job.id}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('jwt')}`,
        },
      });
      const msg = await res.text();
      setApplyStatus(msg);
    } catch {
      setApplyStatus('Failed to apply. Try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleApplyClick = () => {
    navigate(`/apply/${job.id}`, { state: { job } });
  };

  return (
    <div
      className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 font-poppins flex flex-col gap-4 transition-shadow duration-300 h-full shadow-sm hover:shadow-md"
      style={{ minHeight: 260 }}
    >
      {/* Header: Title & Company */}
      <div>
        <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <IconBriefcase size={20} className="text-primary-500" />
          {job?.title || 'Job Title'}
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
          <span>{job?.postedDaysAgo ? `${job.postedDaysAgo} days ago` : 'Recently'}</span>
        </div>
      </div>

      {/* Spacer */}
      <div className="flex-grow" />

      {/* Action Button */}
      <button
        className="mt-4 bg-primary-500 text-white font-semibold py-2 px-5 rounded-lg hover:bg-primary-600 transition-colors duration-200 shadow-sm"
        onClick={handleApplyClick}
        disabled={loading}
      >
        Apply Now
      </button>
      {applyStatus && (
        <div className="mt-2 text-xs text-center text-primary-500">{applyStatus}</div>
      )}
    </div>
  );
};

export default JobCard;
