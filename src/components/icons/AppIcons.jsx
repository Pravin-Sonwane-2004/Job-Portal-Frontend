const baseProps = {
  fill: 'none',
  stroke: 'currentColor',
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  strokeWidth: 1.8,
  viewBox: '0 0 24 24',
};

function IconBase({ children, ...props }) {
  return (
    <svg aria-hidden="true" {...baseProps} {...props}>
      {children}
    </svg>
  );
}

export function BrandMark(props) {
  return (
    <IconBase {...props}>
      <path d="M6 7.5A2.5 2.5 0 0 1 8.5 5h7A2.5 2.5 0 0 1 18 7.5v9A2.5 2.5 0 0 1 15.5 19h-7A2.5 2.5 0 0 1 6 16.5z" />
      <path d="M9 9.5h6" />
      <path d="M9.5 5v3" />
      <path d="M14.5 5v3" />
    </IconBase>
  );
}

export function MenuIcon(props) {
  return (
    <IconBase {...props}>
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h16" />
    </IconBase>
  );
}

export function CloseIcon(props) {
  return (
    <IconBase {...props}>
      <path d="M6 6l12 12" />
      <path d="M18 6l-12 12" />
    </IconBase>
  );
}

export function SunIcon(props) {
  return (
    <IconBase {...props}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2.5v2.25" />
      <path d="M12 19.25v2.25" />
      <path d="M4.92 4.92l1.6 1.6" />
      <path d="M17.48 17.48l1.6 1.6" />
      <path d="M2.5 12h2.25" />
      <path d="M19.25 12h2.25" />
      <path d="M4.92 19.08l1.6-1.6" />
      <path d="M17.48 6.52l1.6-1.6" />
    </IconBase>
  );
}

export function MoonIcon(props) {
  return (
    <IconBase {...props}>
      <path d="M15.5 3.5a7.75 7.75 0 1 0 5 13.66A8.75 8.75 0 0 1 15.5 3.5z" />
    </IconBase>
  );
}

export function ChevronDownIcon(props) {
  return (
    <IconBase {...props}>
      <path d="M6.75 9.75L12 15l5.25-5.25" />
    </IconBase>
  );
}

export function ArrowRightIcon(props) {
  return (
    <IconBase {...props}>
      <path d="M5 12h14" />
      <path d="M13 6l6 6-6 6" />
    </IconBase>
  );
}

export function SearchIcon(props) {
  return (
    <IconBase {...props}>
      <circle cx="11" cy="11" r="5.5" />
      <path d="M16 16l4 4" />
    </IconBase>
  );
}

export function DocumentIcon(props) {
  return (
    <IconBase {...props}>
      <path d="M8.5 3.5h5l4 4v11A2.5 2.5 0 0 1 15 21h-6.5A2.5 2.5 0 0 1 6 18.5v-12A3 3 0 0 1 8.5 3.5z" />
      <path d="M13.5 3.75V8h4.25" />
      <path d="M9 12h6" />
      <path d="M9 15h6" />
    </IconBase>
  );
}

export function ChartIcon(props) {
  return (
    <IconBase {...props}>
      <path d="M5 19.5V10" />
      <path d="M12 19.5V5.5" />
      <path d="M19 19.5V13" />
      <path d="M3.5 19.5h17" />
    </IconBase>
  );
}

export function ShieldIcon(props) {
  return (
    <IconBase {...props}>
      <path d="M12 3l7 3v5.5c0 4.5-2.7 7.76-7 9.5-4.3-1.74-7-5-7-9.5V6z" />
      <path d="M9.25 12l1.75 1.75L15 9.75" />
    </IconBase>
  );
}

export function CheckIcon(props) {
  return (
    <IconBase {...props}>
      <path d="M5.5 12.5l4 4L18.5 7.5" />
    </IconBase>
  );
}
