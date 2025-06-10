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
          {job?.jobTitle || 'Job Title'}
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
          <span>{job?.postedDate ? `${job.postedDate} days ago` : 'Recently'}</span>
        </div>
      </div>

      {/* Spacer */}
      <div className="flex-grow" />

      {/* Action Buttons */}
      <div className="flex gap-3 mt-4">
        <button
          className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 shadow"
          onClick={() => onCancel(job)}
          disabled={loading}
        >
          Cancel
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 shadow"
          onClick={() => onUpdate(job, navigate)}
        >
          Update
        </button>
      </div>
    </Paper>
  );
};

export default AppliedJobCard;
