import { useEffect, useState } from 'react';

import {
  getSessionToken,
  subscribeToSessionChange,
} from '../services/sessionService';

export default function useSessionToken() {
  const [token, setToken] = useState(getSessionToken);

  useEffect(() => {
    const syncToken = () => setToken(getSessionToken());
    return subscribeToSessionChange(syncToken);
  }, []);

  return token;
}
