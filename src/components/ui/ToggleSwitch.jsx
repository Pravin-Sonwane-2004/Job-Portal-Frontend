import React from 'react';

const ToggleSwitch = ({ checked, onChange, ariaLabel }) => {
  return (
    <button
      type="button"
      className={`flex h-7 w-12 items-center rounded-full px-1 transition-colors ${
        checked
          ? 'justify-end bg-indigo-600'
          : 'justify-start bg-slate-300 dark:bg-slate-600'
      }`}
      onClick={onChange}
      aria-label={ariaLabel}
      role="switch"
      aria-checked={checked}
    >
      <span className="h-5 w-5 rounded-full bg-white shadow-sm" />
    </button>
  );
};

export default ToggleSwitch;
