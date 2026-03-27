export const tailwindTheme = {
  white: '#ffffff',
  black: '#020617',
  colors: {
    blue: [
      '#eff6ff',
      '#dbeafe',
      '#bfdbfe',
      '#93c5fd',
      '#60a5fa',
      '#3b82f6',
      '#2563eb',
      '#1d4ed8',
      '#1e3a8a',
      '#172554',
    ],
    neutral: [
      '#f8fafc',
      '#f1f5f9',
      '#e2e8f0',
      '#cbd5e1',
      '#94a3b8',
      '#64748b',
      '#475569',
      '#334155',
      '#1e293b',
      '#0f172a',
    ],
    dark: [
      '#f8fafc',
      '#e2e8f0',
      '#cbd5e1',
      '#94a3b8',
      '#64748b',
      '#475569',
      '#334155',
      '#1e293b',
      '#0f172a',
      '#020617',
    ],
    red: [
      '#fef2f2',
      '#fee2e2',
      '#fecaca',
      '#fca5a5',
      '#f87171',
      '#ef4444',
      '#dc2626',
      '#b91c1c',
      '#991b1b',
      '#7f1d1d',
    ],
    green: [
      '#f0fdf4',
      '#dcfce7',
      '#bbf7d0',
      '#86efac',
      '#4ade80',
      '#22c55e',
      '#16a34a',
      '#15803d',
      '#166534',
      '#14532d',
    ],
    amber: [
      '#fffbeb',
      '#fef3c7',
      '#fde68a',
      '#fcd34d',
      '#fbbf24',
      '#f59e0b',
      '#d97706',
      '#b45309',
      '#92400e',
      '#78350f',
    ],
  },
};

const spacingScale = {
  0: '0px',
  xs: '0.5rem',
  sm: '0.75rem',
  md: '1rem',
  lg: '1.25rem',
  xl: '1.5rem',
};

export function resolveSpacing(value) {
  if (value === undefined || value === null) {
    return undefined;
  }

  if (typeof value === 'number') {
    return `${value * 0.25}rem`;
  }

  return spacingScale[value] || value;
}

export function resolveRadius(value) {
  if (value === undefined || value === null) {
    return undefined;
  }

  if (typeof value === 'number') {
    return `${value}px`;
  }

  const radiusMap = {
    xs: '0.375rem',
    sm: '0.5rem',
    md: '0.75rem',
    lg: '1rem',
    xl: '1.5rem',
    full: '9999px',
  };

  return radiusMap[value] || value;
}

export function resolveFontSize(size) {
  const fontSizeMap = {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
  };

  return fontSizeMap[size] || size;
}

export function resolveColorToken(token) {
  if (!token) {
    return undefined;
  }

  if (token === 'dimmed') {
    return tailwindTheme.colors.neutral[5];
  }

  if (token === 'accent') {
    return tailwindTheme.colors.amber[5];
  }

  if (!token.includes('.')) {
    if (tailwindTheme.colors[token]) {
      return tailwindTheme.colors[token][5];
    }

    return token;
  }

  const [family, shade] = token.split('.');
  const palette = tailwindTheme.colors[family];
  if (!palette) {
    return token;
  }

  return palette[Number(shade)] || palette[5];
}

export function buildSpacingStyle(props = {}) {
  const style = {};
  const mappings = {
    m: 'margin',
    mt: 'marginTop',
    mb: 'marginBottom',
    ml: 'marginLeft',
    mr: 'marginRight',
    mx: ['marginLeft', 'marginRight'],
    my: ['marginTop', 'marginBottom'],
    p: 'padding',
    pt: 'paddingTop',
    pb: 'paddingBottom',
    pl: 'paddingLeft',
    pr: 'paddingRight',
    px: ['paddingLeft', 'paddingRight'],
    py: ['paddingTop', 'paddingBottom'],
  };

  Object.entries(mappings).forEach(([propKey, cssProperty]) => {
    const propValue = props[propKey];
    const resolvedValue = resolveSpacing(propValue);

    if (!resolvedValue) {
      return;
    }

    if (Array.isArray(cssProperty)) {
      cssProperty.forEach((propertyName) => {
        style[propertyName] = resolvedValue;
      });
      return;
    }

    style[cssProperty] = resolvedValue;
  });

  return style;
}

export function mergeStyles(...styles) {
  return Object.assign({}, ...styles.filter(Boolean));
}
