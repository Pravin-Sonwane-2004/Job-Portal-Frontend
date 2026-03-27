export function getHomePageContent() {
  return {
    hero: {
      eyebrow: 'Tailwind-first hiring workspace',
      title: 'A cleaner frontend foundation for job search and recruiting operations.',
      description:
        'This refactor moves the active shell to a leaner architecture, trims the homepage to purposeful sections, and keeps stateful logic in hooks and services instead of presentation components.',
      primaryAction: { label: 'Browse Open Roles', to: '/find-jobs' },
      secondaryAction: { label: 'Open Dashboard', to: '/dashboard' },
      highlights: [
        'Minimal Tailwind UI with no Mantine runtime in the active shell',
        'Role-aware navigation with centralized session identity logic',
        'Docs-first structure for long-term maintenance and onboarding',
      ],
      metrics: [
        { label: 'Faster shell', value: '1', helper: 'shared header and footer path' },
        { label: 'Core docs', value: '4', helper: 'living markdown guides under /docs' },
        { label: 'Theme states', value: '2', helper: 'light and dark mode with one source of truth' },
      ],
      illustration: '/homepage images/Boy.png',
    },
    workflow: {
      eyebrow: 'Workflow',
      title: 'Keep the UI thin and move decisions closer to the service layer.',
      description:
        'The new landing experience is intentionally boring in the best way: clear type, disciplined spacing, and components that only render data they receive.',
      items: [
        {
          title: 'Search with intent',
          description:
            'Routes stay focused on composition, while feature content lives in a single service for easier maintenance.',
          icon: 'search',
        },
        {
          title: 'Track applications',
          description:
            'Session and role parsing are centralized so route protection and account navigation follow the same rules.',
          icon: 'document',
        },
        {
          title: 'Operate confidently',
          description:
            'Shared docs explain where logic belongs and how styling works, which lowers the cost of future cleanup.',
          icon: 'shield',
        },
      ],
    },
    categories: {
      eyebrow: 'Categories',
      title: 'Representative hiring tracks rendered from one data source.',
      description:
        'This section is fed by a service-backed content map, which keeps the cards easy to replace with API data later.',
      items: [
        {
          title: 'Digital Marketing',
          openings: 48,
          description: 'Performance, content, and growth roles for teams scaling quickly.',
          icon: '/category/Digital Marketing.png',
        },
        {
          title: 'Sales',
          openings: 64,
          description: 'Pipeline, partnerships, and revenue operations openings.',
          icon: '/category/Sales.png',
        },
        {
          title: 'UI/UX Design',
          openings: 36,
          description: 'Interface, systems, and product design opportunities.',
          icon: '/category/UI-UX Designer.png',
        },
        {
          title: 'Finance',
          openings: 22,
          description: 'Planning, reporting, and analyst roles across business units.',
          icon: '/category/Finance.png',
        },
        {
          title: 'Web Development',
          openings: 57,
          description: 'Frontend, backend, and platform engineering positions.',
          icon: '/category/Web Developer.png',
        },
        {
          title: 'Content Writing',
          openings: 29,
          description: 'Editorial, technical writing, and content strategy work.',
          icon: '/category/Content Writing.png',
        },
      ],
    },
    companies: {
      eyebrow: 'Trusted by teams',
      title: 'Familiar brands, quieter presentation.',
      description:
        'Partner marks are displayed in a restrained grid so the page stays quick to scan and inexpensive to maintain.',
      items: [
        { name: 'Amazon', logo: '/Companies/Amazon.png' },
        { name: 'Google', logo: '/Companies/Google.png' },
        { name: 'Microsoft', logo: '/Companies/Microsoft.png' },
        { name: 'Meta', logo: '/Companies/Meta.png' },
        { name: 'Netflix', logo: '/Companies/Netflix.png' },
        { name: 'Spotify', logo: '/Companies/Spotify.png' },
      ],
    },
  };
}
