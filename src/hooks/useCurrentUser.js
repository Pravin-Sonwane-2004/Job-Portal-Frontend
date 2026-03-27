import { useEffect, useMemo, useState } from 'react';

import useSessionToken from '@/hooks/useSessionToken';
import { getSessionIdentity } from '@/services/sessionIdentityService';
import { fetchCurrentUserName } from '@/services/userService';

export default function useCurrentUser() {
  const token = useSessionToken();
  const [resolvedName, setResolvedName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const identity = getSessionIdentity(token);

    if (!token) {
      setResolvedName('');
      setIsLoading(false);
      return undefined;
    }

    let isMounted = true;
    setResolvedName(identity.displayName);
    setIsLoading(true);

    fetchCurrentUserName()
      .then((response) => {
        if (isMounted) {
          setResolvedName(response.data || identity.displayName);
        }
      })
      .catch(() => {
        if (isMounted) {
          setResolvedName(identity.displayName);
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [token]);

  return useMemo(
    () => ({
      ...getSessionIdentity(token, resolvedName),
      isLoading,
    }),
    [token, resolvedName, isLoading]
  );
}
