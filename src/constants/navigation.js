const publicLinks = [
  { label: 'Find Jobs', to: '/find-jobs' },
  { label: 'Resume Builder', to: '/resume-builder' },
];

const userLinks = [
  { label: 'Dashboard', to: '/dashboard' },
  { label: 'Applications', to: '/my-applications' },
  { label: 'Saved Jobs', to: '/saved-jobs' },
];

const adminLinks = [
  { label: 'Admin', to: '/admin' },
  { label: 'Upload Jobs', to: '/upload-jobs' },
  { label: 'All Users', to: '/all-users' },
  { label: 'Find Talent', to: '/find-talent' },
];

const baseAccountLinks = [{ label: 'Settings', to: '/settings' }];

const roleAccountLinks = {
  user: [
    { label: 'Profile', to: '/profile' },
    { label: 'Messages', to: '/messages' },
  ],
  admin: [
    { label: 'Profile', to: '/profile' },
    { label: 'Admin Panel', to: '/admin' },
  ],
};

function uniqueLinks(links) {
  const seenLinks = new Set();

  return links.filter((link) => {
    if (seenLinks.has(link.to)) {
      return false;
    }

    seenLinks.add(link.to);
    return true;
  });
}

export function getPrimaryNavigation({ isAdmin, isUser }) {
  return uniqueLinks([
    ...publicLinks,
    ...(isUser ? userLinks : []),
    ...(isAdmin ? adminLinks : []),
  ]);
}

export function getAccountNavigation({ isAdmin, isUser }) {
  return uniqueLinks([
    ...(isUser ? roleAccountLinks.user : []),
    ...(isAdmin ? roleAccountLinks.admin : []),
    ...baseAccountLinks,
  ]);
}
