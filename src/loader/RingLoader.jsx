import React, { forwardRef } from 'react';

export const RingLoader = forwardRef(({ style, color = '#fff', size = '48px', ...others }, ref) => (
  <svg
    {...others}
    ref={ref}
    role="status"
    aria-label="Loading..."
    style={{
      width: size,
      height: size,
      stroke: color,
      ...style,
    }}
    viewBox="0 0 45 45"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g fill="none" fillRule="evenodd" transform="translate(1 1)" strokeWidth="2">
      <circle cx="22" cy="22" r="6" strokeOpacity="0">
        <animate attributeName="r" begin="0.75s" dur="1.5s" values="6;22" repeatCount="indefinite" />
        <animate attributeName="stroke-opacity" begin="0.75s" dur="1.5s" values="1;0" repeatCount="indefinite" />
        <animate attributeName="stroke-width" begin="0.75s" dur="1.5s" values="2;0" repeatCount="indefinite" />
      </circle>
      <circle cx="22" cy="22" r="6" strokeOpacity="0">
        <animate attributeName="r" begin="1.5s" dur="1.5s" values="6;22" repeatCount="indefinite" />
        <animate attributeName="stroke-opacity" begin="1.5s" dur="1.5s" values="1;0" repeatCount="indefinite" />
        <animate attributeName="stroke-width" begin="1.5s" dur="1.5s" values="2;0" repeatCount="indefinite" />
      </circle>
      <circle cx="22" cy="22" r="8">
        <animate attributeName="r" begin="0s" dur="0.75s" values="6;1;2;3;4;5;6" repeatCount="indefinite" />
      </circle>
    </g>
  </svg>
));

RingLoader.displayName = 'RingLoader';
