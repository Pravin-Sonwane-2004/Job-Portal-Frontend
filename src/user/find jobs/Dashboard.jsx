import React from 'react';

const Dashboard = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] bg-masala-950 px-4">
      <div className="bg-masala-900 p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-white text-center">Dashboard</h2>
        <div className="text-gray-300 text-center">
          Welcome to your dashboard!
        </div>
      </div>
    </div>
  );
};

export { Dashboard };
