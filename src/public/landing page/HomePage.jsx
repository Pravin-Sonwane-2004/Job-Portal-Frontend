import React from 'react';
import DreamJob from './DreamJob';
import Companies from './Companies';
import JobCategory from './JobCategory';

const HomePage = () => {
  return (
    <div className="min-h-[90vh] bg-masala-950 font-poppins py-8">
      <DreamJob />
      <Companies />
      <JobCategory />
    </div>
  );
};

export default HomePage;