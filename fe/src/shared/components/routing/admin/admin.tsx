import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { getCurrentUser } from '../../../../auth/services/auth.service';

import { routes } from '../../../constants/routes';
import { ICurrentUser } from '../../../models/user.model';

const Admin = () => {
  const location = useLocation();
  const currentUser: ICurrentUser | null = getCurrentUser();
  
  if (!currentUser?.user.admin) {
    return <Navigate to={{pathname: routes.login, search: `?returnPath=${location.pathname}`}} />
  }

  return <Outlet/>;
}

export default Admin;
