import React from 'react';
import { Avatar } from '@mantine/core';

const DreamJob = () => {
  return (
    <div className="flex flex-wrap items-center py-2 pl-20">

      {/* Left Section */}
      <div className="flex flex-col w-full md:w-[45%] space-y-6">

        {/* Heading */}
        <h1 className="text-4xl md:text-6xl font-bold text-masala-50 [&>span]:text-bright-sun-400 leading-tight">
          Find your <span>dream</span> <span>job</span> with us
        </h1>

        {/* Subtext */}
        <p className="text-lg text-masala-200">
          Good life begins with a good company. Start exploring thousands of jobs in one place.
        </p>

      </div>

      {/* Right Section */}
      <div className="flex w-full md:w-[55%] items-center justify-center mt-10 md:mt-0 relative">
        <div className="w-[20rem] md:w-[30rem] flex flex-col items-center relative">
          <img src="/homepage images/Boy.png" alt="Boy Photo" className="object-contain" />

          {/* Glassmorphism Badge */}
          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 flex flex-col items-center space-y-2">
            <div className="px-4 py-1 bg-white/10 backdrop-md rounded-lg shadow-md text-masala-100 text-lg">
              10k+ Got Jobs
            </div>
            <Avatar.Group spacing="sm">
              <Avatar src="/Profile/awtar.png" alt="Employee 1" />
              <Avatar src="/Profile/awtar1.png" alt="Employee 2" />
              <Avatar src="/Profile/awtar2.png" alt="Employee 3" />
              <Avatar color="yellow">+15k</Avatar>
            </Avatar.Group>
          </div>
          <div className="absolute -left-0.5 bottom-[18rem] w-60 h-18 bg-white/10 backdrop-transparent rounded-xl shadow-lg p-2 flex items-center space-x-4">
            <div className="flex-shrink-0">
              <div className="w-10 h-8 bg-masala-900 rounded-lg flex items-center justify-center">
                <img src="/homepage images/Google.png" alt="Google Logo" className="w-10 h-10" />
              </div>
            </div>
            <div className="flex-1 text-bright-sun-500">
              <div className="font-semibold">Software Engineer</div>
              <div className="text-sm text-black">India</div>
              <div className="flex gap-2 text-xs text-masala-300 mt-2">
                <span>1 day ago</span>
                <span>• 120 Applicants</span>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};

export default DreamJob;
