import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { CloseIcon, MenuIcon } from '@/components/icons/AppIcons';
import AppBrand from '@/components/layout/AppBrand';
import AppNavigation from '@/components/layout/AppNavigation';
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
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
      <Container className="flex h-16 items-center gap-4">
        <AppBrand />

        <div className="mx-auto">
          <AppNavigation links={navigationLinks} />
        </div>

        <div className="ml-auto hidden items-center gap-3 lg:flex">
          <UserMenu identity={identity} />
        </div>

        <div className="ml-auto flex items-center gap-2 lg:hidden">
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded border border-slate-300 bg-white text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
            onClick={() => setMobileMenuOpen((currentValue) => !currentValue)}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            {mobileMenuOpen ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          </button>
        </div>
      </Container>

      {mobileMenuOpen && (
        <div className="border-t border-slate-200 bg-white py-4 dark:border-slate-800 dark:bg-slate-950 lg:hidden">
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
