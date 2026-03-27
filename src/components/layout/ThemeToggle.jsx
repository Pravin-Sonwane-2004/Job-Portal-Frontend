import { MoonIcon, SunIcon } from '@/components/icons/AppIcons';
import useThemeMode from '@/hooks/useThemeMode';

export default function ThemeToggle({ className = '' }) {
  const { isDarkMode, toggleTheme } = useThemeMode();
  const themeLabel = isDarkMode ? 'Dark mode' : 'Light mode';
  const ThemeIcon = isDarkMode ? MoonIcon : SunIcon;

  const classes = [
    'inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition hover:border-brand-300 hover:text-brand-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-brand-500/40 dark:hover:text-brand-300',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type="button"
      className={classes}
      onClick={toggleTheme}
      aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
      title={themeLabel}
    >
      <ThemeIcon className="h-4 w-4" />
      <span className="hidden sm:inline">{themeLabel}</span>
    </button>
  );
}
