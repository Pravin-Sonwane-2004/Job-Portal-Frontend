import React from 'react';

const SurfaceCard = ({ as: Component = 'section', className = '', children }) => {
  return (
    <Component
      className={`rounded border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800 ${className}`.trim()}
    >
      {children}
    </Component>
  );
};

export default SurfaceCard;
