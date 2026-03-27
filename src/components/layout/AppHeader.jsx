import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { CloseIcon, MenuIcon } from '@/components/icons/AppIcons';
import AppBrand from '@/components/layout/AppBrand';
import AppNavigation from '@/components/layout/AppNavigation';
import ThemeToggle from '@/components/layout/ThemeToggle';
import UserMenu from '@/components/layout/UserMenu';
import Container from '@/components/ui/Container';
import { getPrimaryNavigation } from '@/constants/navigation';
import useCurrentUser from '@/hooks/useCurrentUser';

export default function AppHeader() {
  const location = useLocation();
  const identity = useCurrentUser();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigationLinks = useMemo(() => getPrimaryNavigation(identity), [identity]);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/85">
      <Container className="flex h-20 items-center gap-4">
        <AppBrand />

        <div className="mx-auto">
          <AppNavigation links={navigationLinks} />
        </div>

        <div className="ml-auto hidden items-center gap-3 lg:flex">
          <ThemeToggle />
          <UserMenu identity={identity} />
        </div>

        <div className="ml-auto flex items-center gap-2 lg:hidden">
          <ThemeToggle className="px-0 sm:px-4" />
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-brand-300 hover:text-brand-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-brand-500/40 dark:hover:text-brand-200"
            onClick={() => setMobileMenuOpen((currentValue) => !currentValue)}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            {mobileMenuOpen ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          </button>
        </div>
      </Container>

      {mobileMenuOpen && (
        <div className="border-t border-slate-200 bg-slate-50/95 py-4 dark:border-slate-800 dark:bg-slate-950/95 lg:hidden">
          <Container className="space-y-5">
            <AppNavigation
              links={navigationLinks}
              mobile
              onNavigate={() => setMobileMenuOpen(false)}
            />
            <UserMenu
              identity={identity}
              mobile
              onNavigate={() => setMobileMenuOpen(false)}
            />
          </Container>
        </div>
      )}
    </header>
  );
}
