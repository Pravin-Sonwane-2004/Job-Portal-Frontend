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
    <Paper
      shadow="md"
      radius="lg"
      p="lg"
      withBorder
      className="bg-masala-950 border-masala-800 font-poppins flex flex-col gap-4 transition-shadow duration-300 h-full"
      style={{ minHeight: 260 }}
    >
      {/* Header: Title & Company */}
      <div>
        <Text size="xl" weight={600} className="text-masala-50 flex items-center gap-2">
          <IconBriefcase size={20} className="text-bright-sun-400" />
          {job?.title || 'Job Title'}
        </Text>
        <Text size="sm" className="text-masala-300 flex items-center gap-2 mt-1">
          <IconBuilding size={16} className="text-masala-400" />
          {job?.company || 'Unknown Company'}
        </Text>
      </div>

      {/* Job Details */}
      <div className="text-sm text-masala-200 space-y-1 mt-2">
        <div className="flex items-center gap-2">
          <IconMapPin size={16} className="text-bright-sun-400" />
          <span className="text-masala-50 font-medium">Location:</span>
          <span>{job?.location || 'N/A'}</span>
        </div>
        <div className="flex items-center gap-2">
          <IconCurrencyDollar size={16} className="text-bright-sun-400" />
          <span className="text-masala-50 font-medium">Salary:</span>
          <span>{job?.salary || 'Negotiable'}</span>
        </div>
        <div className="flex items-center gap-2">
          <IconCalendar size={16} className="text-bright-sun-400" />
          <span className="text-masala-50 font-medium">Posted:</span>
          <span>{job?.postedDaysAgo ? `${job.postedDaysAgo} days ago` : 'Recently'}</span>
        </div>
      </div>

      {/* Spacer */}
      <div className="flex-grow" />

      {/* Action Button */}
      <button
        className="mt-4 bg-bright-sun-400 text-masala-950 font-semibold py-2 px-5 rounded-lg hover:bg-bright-sun-500 transition-colors duration-200 shadow"
        onClick={handleApplyClick}
        disabled={loading}
      >
        Apply Now
      </button>
      {applyStatus && (
        <div className="mt-2 text-xs text-center text-yellow-400">{applyStatus}</div>
      )}
    </Paper>
  );
};

export default JobCard;
