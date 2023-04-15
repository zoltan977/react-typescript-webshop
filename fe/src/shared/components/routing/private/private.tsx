import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { getToken } from '../../../../auth/services/auth.service';

import { routes } from '../../../constants/routes';

const Private = () => {
    const location = useLocation();
    const token = getToken();
    
    if (!token) {
      return <Navigate to={{pathname: routes.login, search: `?returnPath=${location.pathname}`}} />
    }

    return <Outlet/>;
}

export default Private;
