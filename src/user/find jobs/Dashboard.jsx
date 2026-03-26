import React from 'react';

const Dashboard = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] bg-slate-50 dark:bg-slate-900 px-4">
      <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-sm w-full max-w-md border border-slate-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold mb-6 text-slate-900 dark:text-slate-100 text-center">Dashboard</h2>
        <div className="text-slate-600 dark:text-slate-400 text-center">
          Welcome to your dashboard!
        </div>
      </div>
    </div>
  );
};

export { Dashboard };
