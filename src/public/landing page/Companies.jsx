import React from 'react';
import Marquee from 'react-fast-marquee';

const Companies = () => {
  const companies = [

    "amazon",
    "Figma",
    "Google",
    "Microsoft",
    "Meta",
    "Oracle",
    "Netflix",
    "Spotify",
    "Pinterest",
    "Slack",
    "Walmart"

  ];

  return (
    <div className="mt-18">
      {/* Heading */}
      <div className="text-4xl font-semibold text-masala-100 mb-8 text-center">
        Trusted By <span className="text-bright-sun-400">1000+</span> Companies
      </div>

      {/* Marquee */}
      <Marquee pauseOnHover speed={50}>
        {companies.map((company, index) => (
          <div key={index} className="mx-8">
            <img
              src={`/public/Companies/${company}.png`} // Corrected path to reference the public folder
              alt={company}
              className="h-16 object-contain"
            />
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default Companies;
