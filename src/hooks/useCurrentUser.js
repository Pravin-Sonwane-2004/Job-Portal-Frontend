import { useEffect, useMemo, useState } from 'react';

import { getSessionIdentity } from '@/services/sessionIdentityService';
import { getCurrentUser, subscribeToSessionChange } from '@/services/sessionService';

export default function useCurrentUser() {
  const [user, setUser] = useState(getCurrentUser);

  useEffect(() => {
    const syncUser = () => setUser(getCurrentUser());
    return subscribeToSessionChange(syncUser);
  }, []);

  return useMemo(() => getSessionIdentity(user), [user]);
}
