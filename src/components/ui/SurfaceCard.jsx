import React from 'react';

const SurfaceCard = ({ as: Component = 'section', className = '', children }) => {
  return (
    <Component
      className={`rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800 ${className}`.trim()}
    >
      {children}
    </Component>
  );
};

export default SurfaceCard;
