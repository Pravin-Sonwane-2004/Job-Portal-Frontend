import React from 'react';

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
      <div className="text-4xl font-semibold text-slate-900 dark:text-slate-100 mb-8 text-center">
        Trusted By <span className="text-primary-500">1000+</span> Companies
      </div>

      {/* Scrolling Container */}
      <div className="overflow-hidden">
        <div className="flex animate-scroll space-x-8">
          {companies.concat(companies).map((company, index) => (
            <div key={index} className="flex-shrink-0">
              <img
                src={`/public/Companies/${company}.png`}
                alt={company}
                className="h-16 object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Companies;
