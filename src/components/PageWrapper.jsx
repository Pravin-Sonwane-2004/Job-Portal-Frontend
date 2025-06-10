import React from 'react';

const PageWrapper = ({ children }) => (
  <div className="min-h-[100vh] bg-masala-950 font-['poppins'] px-2 sm:px-4 md:px-8">
    {children}
  </div>
);

export default PageWrapper;
