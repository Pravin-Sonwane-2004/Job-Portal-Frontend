import React, {
  Children,
  createContext,
  forwardRef,
  isValidElement,
  useContext,
  useMemo,
  useState,
} from 'react';

import {
  buildSpacingStyle,
  mergeStyles,
  resolveColorToken,
  resolveFontSize,
  resolveRadius,
  tailwindTheme,
} from './theme';

const cx = (...values) => values.filter(Boolean).join(' ');

const baseSurfaceClass =
  'rounded-2xl border border-slate-200 bg-white text-slate-900 shadow-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100';

const buttonPalette = {
  blue: {
    filled: 'bg-blue-600 text-white hover:bg-blue-500',
    outline:
      'border border-blue-200 bg-transparent text-blue-700 hover:bg-blue-50 dark:border-blue-500/30 dark:text-blue-300 dark:hover:bg-blue-500/10',
    light:
      'bg-blue-50 text-blue-700 hover:bg-blue-100 dark:bg-blue-500/10 dark:text-blue-300 dark:hover:bg-blue-500/20',
    subtle:
      'bg-transparent text-blue-700 hover:bg-blue-50 dark:text-blue-300 dark:hover:bg-blue-500/10',
  },
  red: {
    filled: 'bg-red-600 text-white hover:bg-red-500',
    outline:
      'border border-red-200 bg-transparent text-red-700 hover:bg-red-50 dark:border-red-500/30 dark:text-red-300 dark:hover:bg-red-500/10',
    light:
      'bg-red-50 text-red-700 hover:bg-red-100 dark:bg-red-500/10 dark:text-red-300 dark:hover:bg-red-500/20',
    subtle:
      'bg-transparent text-red-700 hover:bg-red-50 dark:text-red-300 dark:hover:bg-red-500/10',
  },
  accent: {
    filled: 'bg-amber-500 text-slate-950 hover:bg-amber-400',
    outline:
      'border border-amber-200 bg-transparent text-amber-700 hover:bg-amber-50 dark:border-amber-500/30 dark:text-amber-300 dark:hover:bg-amber-500/10',
    light:
      'bg-amber-50 text-amber-700 hover:bg-amber-100 dark:bg-amber-500/10 dark:text-amber-300 dark:hover:bg-amber-500/20',
    subtle:
      'bg-transparent text-amber-700 hover:bg-amber-50 dark:text-amber-300 dark:hover:bg-amber-500/10',
  },
  neutral: {
    filled: 'bg-slate-800 text-white hover:bg-slate-700 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200',
    outline:
      'border border-slate-300 bg-transparent text-slate-700 hover:bg-slate-50 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-700',
    light:
      'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-100 dark:hover:bg-slate-600',
    subtle:
      'bg-transparent text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-700',
  },
};

const inputClass =
  'w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition-colors focus:border-indigo-500 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100';

const TabsContext = createContext(null);

export function useUiTheme() {
  return tailwindTheme;
}

export const Box = forwardRef(function Box(
  { children, className, style, ...props },
  ref
) {
  return (
    <div
      ref={ref}
      className={className}
      style={mergeStyles(buildSpacingStyle(props), style)}
    >
      {children}
    </div>
  );
});

export const Container = forwardRef(function Container(
  { children, className, style, size = '1200px', fluid, ...props },
  ref
) {
  const maxWidth = fluid ? '100%' : typeof size === 'number' ? `${size}px` : size;

  return (
    <div
      ref={ref}
      className={cx('mx-auto w-full px-4 sm:px-6 lg:px-8', className)}
      style={mergeStyles(buildSpacingStyle(props), { maxWidth }, style)}
    >
      {children}
    </div>
  );
});

export const Paper = forwardRef(function Paper(
  { children, className, style, shadow = 'sm', radius = 'md', ...props },
  ref
) {
  const shadowClass = {
    xs: 'shadow-sm',
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl',
  }[shadow] || 'shadow-sm';

  return (
    <div
      ref={ref}
      className={cx(baseSurfaceClass, shadowClass, className)}
      style={mergeStyles(
        buildSpacingStyle(props),
        { borderRadius: resolveRadius(radius) },
        style
      )}
    >
      {children}
    </div>
  );
});

function CardComponent({ children, className, style, withBorder = true, ...props }, ref) {
  return (
    <Paper
      ref={ref}
      className={cx(!withBorder && 'border-transparent', className)}
      style={style}
      {...props}
    >
      {children}
    </Paper>
  );
}

export const Card = forwardRef(CardComponent);
Card.Section = function CardSection({ children, className, style }) {
  return (
    <div className={className} style={style}>
      {children}
    </div>
  );
};

export function Group({
  children,
  className,
  style,
  position,
  align = 'center',
  spacing = 'md',
  wrap,
  ...props
}) {
  const justifyClass =
    position === 'apart'
      ? 'justify-between'
      : position === 'center'
        ? 'justify-center'
        : 'justify-start';

  const alignClass =
    align === 'flex-start'
      ? 'items-start'
      : align === 'flex-end'
        ? 'items-end'
        : 'items-center';

  return (
    <div
      className={cx(
        'flex',
        justifyClass,
        alignClass,
        wrap !== 'nowrap' && 'flex-wrap',
        className
      )}
      style={mergeStyles(
        buildSpacingStyle(props),
        { gap: typeof spacing === 'number' ? `${spacing}px` : undefined },
        style
      )}
    >
      {children}
    </div>
  );
}

export function Stack({
  children,
  className,
  style,
  spacing = 'md',
  align,
  ...props
}) {
  const alignClass =
    align === 'center'
      ? 'items-center'
      : align === 'flex-end'
        ? 'items-end'
        : 'items-stretch';

  return (
    <div
      className={cx('flex flex-col', alignClass, className)}
      style={mergeStyles(
        buildSpacingStyle(props),
        { gap: typeof spacing === 'number' ? `${spacing}px` : undefined },
        style
      )}
    >
      {children}
    </div>
  );
}

export function Title({
  children,
  order = 2,
  size,
  color,
  fw,
  align,
  className,
  style,
  ...props
}) {
  const Element = `h${Math.min(Math.max(order, 1), 6)}`;

  return (
    <Element
      className={className}
      style={mergeStyles(
        buildSpacingStyle(props),
        {
          fontSize: resolveFontSize(size),
          color: resolveColorToken(color),
          fontWeight: fw,
          textAlign: align,
        },
        style
      )}
    >
      {children}
    </Element>
  );
}

export function Text({
  children,
  className,
  style,
  size,
  color,
  fw,
  align,
  component,
  ...props
}) {
  const Element = component || 'p';

  return (
    <Element
      className={className}
      style={mergeStyles(
        buildSpacingStyle(props),
        {
          fontSize: resolveFontSize(size),
          color: resolveColorToken(color),
          fontWeight: fw || props.weight,
          textAlign: align,
        },
        style
      )}
    >
      {children}
    </Element>
  );
}

export function Divider({ orientation = 'horizontal', className, style, ...props }) {
  const isVertical = orientation === 'vertical';

  return (
    <div
      className={cx(
        isVertical ? 'h-full w-px' : 'h-px w-full',
        'bg-slate-200 dark:bg-slate-700',
        className
      )}
      style={mergeStyles(buildSpacingStyle(props), style)}
    />
  );
}

export function Badge({
  children,
  color = 'blue',
  variant = 'light',
  className,
  style,
}) {
  const palette = buttonPalette[color] || buttonPalette.neutral;

  return (
    <span
      className={cx(
        'inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold',
        palette[variant] || palette.light,
        className
      )}
      style={style}
    >
      {children}
    </span>
  );
}

export function Button({
  children,
  className,
  style,
  color = 'blue',
  variant = 'filled',
  leftIcon,
  fullWidth,
  radius = 'md',
  size = 'md',
  fw,
  disabled,
  compact,
  type = 'button',
  ...props
}) {
  const palette = buttonPalette[color] || buttonPalette.neutral;
  const sizeClass = {
    xs: 'px-2.5 py-1.5 text-xs',
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2.5 text-sm',
    lg: 'px-5 py-3 text-base',
  }[size] || 'px-4 py-2.5 text-sm';

  return (
    <button
      type={type}
      className={cx(
        'inline-flex items-center justify-center gap-2 font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50',
        palette[variant] || palette.filled,
        compact ? 'px-3 py-1.5 text-xs' : sizeClass,
        fullWidth && 'w-full',
        className
      )}
      style={mergeStyles(
        buildSpacingStyle(props),
        { borderRadius: resolveRadius(radius), fontWeight: fw },
        style
      )}
      disabled={disabled}
      {...props}
    >
      {leftIcon}
      {children}
    </button>
  );
}

export function ActionIcon({
  children,
  className,
  style,
  color = 'neutral',
  variant = 'light',
  size = 'md',
  radius = 'full',
  ...props
}) {
  const palette = buttonPalette[color] || buttonPalette.neutral;
  const pixelSize =
    typeof size === 'number'
      ? `${size}px`
      : size === 'lg'
        ? '44px'
        : size === 'sm'
          ? '32px'
          : '38px';

  return (
    <button
      type="button"
      className={cx(
        'inline-flex items-center justify-center transition-colors',
        palette[variant] || palette.light,
        className
      )}
      style={mergeStyles(
        buildSpacingStyle(props),
        {
          width: pixelSize,
          height: pixelSize,
          borderRadius: resolveRadius(radius),
        },
        style
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export function Avatar({
  src,
  alt,
  size = 40,
  radius = 'full',
  className,
  style,
  children,
  ...props
}) {
  const pixelSize = typeof size === 'number' ? `${size}px` : size;

  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        className={cx('object-cover', className)}
        style={mergeStyles(
          buildSpacingStyle(props),
          { width: pixelSize, height: pixelSize, borderRadius: resolveRadius(radius) },
          style
        )}
      />
    );
  }

  return (
    <div
      className={cx(
        'inline-flex items-center justify-center bg-slate-200 font-semibold text-slate-700 dark:bg-slate-700 dark:text-slate-100',
        className
      )}
      style={mergeStyles(
        buildSpacingStyle(props),
        { width: pixelSize, height: pixelSize, borderRadius: resolveRadius(radius) },
        style
      )}
    >
      {children}
    </div>
  );
}

export function Image({ src, alt, className, style, ...props }) {
  return <img src={src} alt={alt} className={className} style={mergeStyles(buildSpacingStyle(props), style)} />;
}

function FieldWrapper({ label, children }) {
  return (
    <label className="flex w-full flex-col gap-1.5 text-sm font-medium text-slate-700 dark:text-slate-200">
      {label && <span>{label}</span>}
      {children}
    </label>
  );
}

export function TextInput({ label, className, ...props }) {
  return (
    <FieldWrapper label={label}>
      <input className={cx(inputClass, className)} {...props} />
    </FieldWrapper>
  );
}

export function Textarea({ label, minRows = 3, className, ...props }) {
  return (
    <FieldWrapper label={label}>
      <textarea className={cx(inputClass, 'resize-y', className)} rows={minRows} {...props} />
    </FieldWrapper>
  );
}

export function FileInput({ label, className, ...props }) {
  return (
    <FieldWrapper label={label}>
      <input type="file" className={cx(inputClass, 'file:mr-3 file:rounded-lg file:border-0 file:bg-indigo-600 file:px-3 file:py-2 file:text-sm file:font-medium file:text-white', className)} {...props} />
    </FieldWrapper>
  );
}

function normalizeOptions(data = []) {
  return data.map((item) =>
    typeof item === 'string' ? { value: item, label: item } : item
  );
}

export function Select({
  label,
  data = [],
  value,
  onChange,
  placeholder,
  leftSection,
  className,
  id,
}) {
  const options = normalizeOptions(data);

  return (
    <FieldWrapper label={label}>
      <div className="relative">
        {leftSection && (
          <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-slate-400">
            {leftSection}
          </div>
        )}
        <select
          id={id}
          value={value ?? ''}
          onChange={(event) => onChange?.(event.target.value)}
          className={cx(inputClass, leftSection && 'pl-10', className)}
        >
          <option value="">{placeholder || 'Select an option'}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </FieldWrapper>
  );
}

export function MultiSelect({ label, data = [], onChange, placeholder, className }) {
  const options = normalizeOptions(data);

  return (
    <FieldWrapper label={label}>
      <select
        multiple
        onChange={(event) =>
          onChange?.(
            Array.from(event.target.selectedOptions, (option) => option.value)
          )
        }
        className={cx(inputClass, 'min-h-32', className)}
      >
        {placeholder && <option disabled>{placeholder}</option>}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </FieldWrapper>
  );
}

export function RangeSlider({ min = 0, max = 100, value = [min, max], onChange }) {
  const [start, end] = value;

  return (
    <div className="space-y-2">
      <input
        type="range"
        min={min}
        max={max}
        value={start}
        onChange={(event) =>
          onChange?.([Number(event.target.value), Math.max(Number(event.target.value), end)])
        }
        className="w-full accent-indigo-600"
      />
      <input
        type="range"
        min={min}
        max={max}
        value={end}
        onChange={(event) =>
          onChange?.([Math.min(start, Number(event.target.value)), Number(event.target.value)])
        }
        className="w-full accent-indigo-600"
      />
    </div>
  );
}

export function Alert({ icon, title, children, color = 'blue', className }) {
  const palette = buttonPalette[color] || buttonPalette.blue;

  return (
    <div className={cx('rounded-2xl border p-4', palette.light, className)}>
      <div className="flex gap-3">
        {icon && <div className="mt-0.5">{icon}</div>}
        <div>
          {title && <p className="font-semibold">{title}</p>}
          <div className="mt-1 text-sm">{children}</div>
        </div>
      </div>
    </div>
  );
}

export function Pagination({ total = 1, value = 1, onChange, disabled }) {
  const pages = Array.from({ length: total }, (_, index) => index + 1);

  return (
    <nav className="flex flex-wrap items-center gap-2" aria-label="Pagination">
      {pages.map((pageNumber) => (
        <button
          key={pageNumber}
          type="button"
          disabled={disabled}
          onClick={() => onChange?.(pageNumber)}
          className={cx(
            'h-10 min-w-10 rounded-full px-3 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50',
            pageNumber === value
              ? 'bg-indigo-600 text-white'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-100 dark:hover:bg-slate-600'
          )}
        >
          {pageNumber}
        </button>
      ))}
    </nav>
  );
}

export function Tooltip({ label, children }) {
  if (!isValidElement(children)) {
    return children;
  }

  return <span title={label}>{children}</span>;
}

export function ScrollArea({ children, h, className, style }) {
  const height = typeof h === 'number' ? `${h}px` : h;

  return (
    <div className={cx('overflow-auto', className)} style={mergeStyles({ maxHeight: height }, style)}>
      {children}
    </div>
  );
}

export function SegmentedControl({ data = [], value, onChange }) {
  const options = normalizeOptions(data);

  return (
    <div className="inline-flex rounded-2xl border border-slate-200 bg-slate-100 p-1 dark:border-slate-700 dark:bg-slate-900">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onChange?.(option.value)}
          className={cx(
            'rounded-xl px-4 py-2 text-sm font-medium transition-colors',
            option.value === value
              ? 'bg-white text-slate-900 shadow-sm dark:bg-slate-800 dark:text-slate-100'
              : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100'
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

export function Modal({ opened, onClose, title, children, size = 720 }) {
  if (!opened) {
    return null;
  }

  const width = typeof size === 'number' ? `${size}px` : size;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4">
      <div className={cx(baseSurfaceClass, 'w-full max-h-[90vh] overflow-auto p-6')} style={{ maxWidth: width }}>
        <div className="mb-4 flex items-center justify-between gap-4">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button
            type="button"
            className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-100 dark:hover:bg-slate-600"
            onClick={onClose}
          >
            Close
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

function PopoverRoot({ children }) {
  return <div className="relative">{children}</div>;
}

function PopoverTarget({ children }) {
  return <>{children}</>;
}

function PopoverDropdown({ children, className, style }) {
  return (
    <div className={className} style={style}>
      {children}
    </div>
  );
}

export const Popover = Object.assign(PopoverRoot, {
  Target: PopoverTarget,
  Dropdown: PopoverDropdown,
});

export function Indicator({ children, disabled, processing }) {
  return (
    <span className="relative inline-flex">
      {children}
      {!disabled && processing && (
        <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-rose-500" />
      )}
    </span>
  );
}

function TabsRoot({
  children,
  defaultValue,
  value,
  onChange,
  orientation = 'horizontal',
  className,
}) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const activeValue = value ?? internalValue;

  const contextValue = useMemo(
    () => ({
      activeValue,
      setActiveValue: onChange || setInternalValue,
      orientation,
    }),
    [activeValue, onChange, orientation]
  );

  return (
    <TabsContext.Provider value={contextValue}>
      <div className={cx(orientation === 'vertical' ? 'grid grid-cols-[220px_1fr] gap-6' : 'space-y-4', className)}>
        {children}
      </div>
    </TabsContext.Provider>
  );
}

function TabsList({ children, className }) {
  const tabs = useContext(TabsContext);

  return (
    <div
      className={cx(
        'flex gap-2',
        tabs?.orientation === 'vertical' ? 'flex-col' : 'flex-wrap',
        className
      )}
    >
      {children}
    </div>
  );
}

function TabsTab({ value, icon, children }) {
  const tabs = useContext(TabsContext);
  const active = tabs?.activeValue === value;

  return (
    <button
      type="button"
      onClick={() => tabs?.setActiveValue(value)}
      className={cx(
        'flex items-center gap-2 rounded-2xl px-4 py-3 text-left text-sm font-medium transition-colors',
        active
          ? 'bg-indigo-600 text-white'
          : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-100 dark:hover:bg-slate-600'
      )}
    >
      {icon}
      {Children.only(children)}
    </button>
  );
}

function TabsPanel({ value, children, ...props }) {
  const tabs = useContext(TabsContext);

  if (tabs?.activeValue !== value) {
    return null;
  }

  return (
    <div style={buildSpacingStyle(props)}>
      {children}
    </div>
  );
}

export const Tabs = Object.assign(TabsRoot, {
  List: TabsList,
  Tab: TabsTab,
  Panel: TabsPanel,
});
