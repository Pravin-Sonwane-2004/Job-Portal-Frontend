import React from 'react';

import PageWrapper from '../../components/PageWrapper';
import Companies from './Companies';
import DreamJob from './DreamJob';
import JobCategory from './JobCategory';

const HomePage = () => {
  return (
    <PageWrapper>
      <div className="space-y-12 py-6">
        <DreamJob />
        <Companies />
        <JobCategory />
      </div>
    </PageWrapper>
  );
};

export default HomePage;
