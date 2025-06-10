import React, { useEffect, useState } from 'react';
import { getMyAppliedJobs } from '../all services/getJfBackendService';
import { getUserIdFromJwt } from '../utils/jwtUtils';
import AppliedJobCard from './MyApplications/AppliedJobCard';

const MyApplication = () => {
  console.log("MyApplication component mounted");
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingJobId, setLoadingJobId] = useState(null);

  // getUserIdFromJwt is now imported from utils

  useEffect(() => {
    console.log("MyApplication useEffect running");
    const jwt = sessionStorage.getItem('jwt');
    if (!jwt) {
      console.error("No JWT found in sessionStorage");
      setLoading(false);
      return;
    }
    getMyAppliedJobs()
      .then((res) => {
        setAppliedJobs(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch applied jobs:", err);
        setLoading(false);
      });
  }, []);

  // Cancel application handler
  const handleCancel = async (job) => {
    if (!window.confirm(`Are you sure you want to cancel your application for '${job.jobTitle}'?`)) return;
    setLoadingJobId(job.applicationId);
    try {
      const { deleteApplicationById } = await import('../all services/getJfBackendService');
      await deleteApplicationById(job.applicationId);
      setAppliedJobs((prev) => prev.filter((j) => j.applicationId !== job.applicationId));
    } catch (err) {
      alert('Failed to cancel application.');
    } finally {
      setLoadingJobId(null);
    }
  };

  // Update application handler
  const handleUpdate = async (job, navigate) => {
    // Example: prompt for a new status (replace with a modal for production)
    const newStatus = window.prompt('Enter new status for this application:', '');
    if (newStatus === null) return;
    setLoadingJobId(job.applicationId);
    try {
      const { updateApplicationById } = await import('../all services/getJfBackendService');
      await updateApplicationById(job.applicationId, { status: newStatus });
      alert('Application updated successfully.');
      // Optionally, refresh the list or update the UI
    } catch (err) {
      alert('Failed to update application.');
    } finally {
      setLoadingJobId(null);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="px-2 py-4 sm:p-8">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">My Applied Jobs</h2>
      {appliedJobs.length === 0 ? (
        <div>No jobs applied yet.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {appliedJobs.map((job) => (
            <AppliedJobCard
              key={job.applicationId}
              job={job}
              onCancel={handleCancel}
              onUpdate={handleUpdate}
              loading={loadingJobId === job.applicationId}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyApplication;
