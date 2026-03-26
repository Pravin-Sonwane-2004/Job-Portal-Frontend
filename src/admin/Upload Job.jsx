import React, { useState } from 'react';
import { adminCreateJob } from '../all services/getJfBackendService';
import {
  IconBriefcase,
  IconMapPin,
  IconCurrencyDollar,
  IconBuilding,
} from '@tabler/icons-react';

const UploadJob = () => {
  const [form, setForm] = useState({
    title: '',
    location: '',
    salary: '',
    company: '',
  });

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (field) => (e) => {
    setForm({ ...form, [field]: e.currentTarget?.value || e });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    try {
      await adminCreateJob({
        title: form.title,
        location: form.location,
        salary: form.salary,
        company: form.company,
      });
      setSuccess(true);
      setForm({
        title: '',
        location: '',
        salary: '',
        company: '',
      });
    } catch (err) {
      const backendMsg = err?.response?.data?.message || err?.response?.data || err?.message;
      setError(backendMsg ? `Failed to upload job: ${backendMsg}` : 'Failed to upload job. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 px-4 py-6 md:px-4 md:py-8">
      <div className="max-w-2xl w-full">
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-slate-100 mb-6">
            Upload Job
          </h2>

          {success && (
            <div className="text-green-600 dark:text-green-400 text-center mb-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
              Job uploaded successfully!
            </div>
          )}
          {error && (
            <div className="text-red-600 dark:text-red-400 text-center mb-4 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Job Title</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <IconBriefcase size={16} className="text-slate-400" />
                  </div>
                  <input
                    type="text"
                    value={form.title}
                    onChange={handleChange('title')}
                    placeholder="Enter job title"
                    required
                    className="w-full pl-10 pr-3 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Location</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <IconMapPin size={16} className="text-slate-400" />
                    </div>
                    <input
                      type="text"
                      value={form.location}
                      onChange={handleChange('location')}
                      placeholder="Enter location"
                      required
                      className="w-full pl-10 pr-3 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Company</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <IconBuilding size={16} className="text-slate-400" />
                    </div>
                    <input
                      type="text"
                      value={form.company}
                      onChange={handleChange('company')}
                      placeholder="Enter company name"
                      required
                      className="w-full pl-10 pr-3 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Salary</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <IconCurrencyDollar size={16} className="text-slate-400" />
                  </div>
                  <input
                    type="text"
                    value={form.salary}
                    onChange={handleChange('salary')}
                    placeholder="Enter salary"
                    required
                    className="w-full pl-10 pr-3 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Upload Job
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UploadJob;
