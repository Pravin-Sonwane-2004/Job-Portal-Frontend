import { useEffect, useState } from 'react';

import {
  applyTheme,
  getStoredTheme,
  toggleTheme,
} from '../utils/themeUtils';

export default function useThemeMode() {
  const [theme, setTheme] = useState(getStoredTheme);

  useEffect(() => {
    const syncTheme = () => setTheme(getStoredTheme());

    window.addEventListener('storage', syncTheme);
    window.addEventListener('themechange', syncTheme);

    return () => {
      window.removeEventListener('storage', syncTheme);
      window.removeEventListener('themechange', syncTheme);
    };
  }, []);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  return {
    isDarkMode: theme === 'dark',
    setTheme,
    toggleTheme: () => setTheme(toggleTheme()),
  };
}
