import React, { useEffect } from 'react';

import Footer from '../header and footer/Footer';
import Header from '../header and footer/Header';
import { applyTheme, getStoredTheme } from '../utils/themeUtils';

const MainLayout = ({ children }) => {
  useEffect(() => {
    applyTheme(getStoredTheme());
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors dark:bg-slate-900 dark:text-slate-100">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-slate-900"
      >
        Skip to content
      </a>
      <Header />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
