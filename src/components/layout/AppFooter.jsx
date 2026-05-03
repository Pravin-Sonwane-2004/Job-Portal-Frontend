import Container from '@/components/ui/Container';

const footerLinks = [
  { label: 'Find Jobs', href: '/find-jobs' },
  { label: 'Resume Builder', href: '/resume-builder' },
  { label: 'Settings', href: '/settings' },
];

export default function AppFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white py-6 dark:border-slate-800 dark:bg-slate-950">
      <Container className="flex flex-col gap-4 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between dark:text-slate-300">
        <p>SkillSync Portal</p>
        <nav className="flex flex-wrap gap-4" aria-label="Footer navigation">
          {footerLinks.map((link) => (
            <a key={link.label} href={link.href} className="hover:text-brand-600">
              {link.label}
            </a>
          ))}
        </nav>
      </Container>
    </footer>
  );
}
