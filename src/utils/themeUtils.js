const THEME_STORAGE_KEY = 'theme';

export function getStoredTheme() {
  if (typeof window === 'undefined') {
    return 'light';
  }

  const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);
  if (storedTheme === 'dark' || storedTheme === 'light') {
    return storedTheme;
  }

  return window.matchMedia?.('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

export function isDarkThemeEnabled() {
  return getStoredTheme() === 'dark';
}

export function applyTheme(theme) {
  if (typeof window === 'undefined') {
    return;
  }

  const nextTheme = theme === 'dark' ? 'dark' : 'light';
  localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
  document.documentElement.classList.toggle('dark', nextTheme === 'dark');
  document.documentElement.style.colorScheme = nextTheme;
  window.dispatchEvent(new CustomEvent('themechange', { detail: nextTheme }));
}

export function toggleTheme() {
  const nextTheme = isDarkThemeEnabled() ? 'light' : 'dark';
  applyTheme(nextTheme);
  return nextTheme;
}
