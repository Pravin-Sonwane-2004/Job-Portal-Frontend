import { useMemo } from 'react';

import { getHomePageContent } from '@/services/homeContentService';

export default function useHomePageContent() {
  return useMemo(() => getHomePageContent(), []);
}
