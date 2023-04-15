import jwtDecode from 'jwt-decode';
import { useEffect, useState } from 'react';
import { getToken } from '../../auth/services/auth.service';
import { USER_TOKEN_KEY } from '../constants/storageItems';
import { ICurrentUser } from '../models/user.model';

export const useCurrentUser = (): ICurrentUser | null => {
  const [currentUser, setCurrentUser] = useState<ICurrentUser | null>(null);

  useEffect(() => {
      storageEventHandler({value: getToken(), key: USER_TOKEN_KEY})
      window.addEventListener('localUpdated', storageEventHandler, false);
      return () => window.removeEventListener('localUpdated', storageEventHandler, false);
  }, []);

  function storageEventHandler(event: any) {
    if (event.key !== USER_TOKEN_KEY) {
      return;
    }

    if (event.value) {
      setCurrentUser(jwtDecode(event.value))
    } else {
      setCurrentUser(null)
    }
  }

  return currentUser;
}
