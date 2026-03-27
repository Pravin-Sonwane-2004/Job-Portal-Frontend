import AppFooter from '@/components/layout/AppFooter';
import AppHeader from '@/components/layout/AppHeader';

export default function AppShell({ children }) {
  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-slate-950 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white dark:focus:bg-white dark:focus:text-slate-950"
      >
        Skip to content
      </a>
      <AppHeader />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <AppFooter />
    </div>
  );
}
