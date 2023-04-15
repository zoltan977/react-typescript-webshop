import jwtDecode from 'jwt-decode';

import { routes } from '../../shared/constants/routes';
import { USER_TOKEN_KEY } from '../../shared/constants/storageItems';
import { ICurrentUser } from '../../shared/models/user.model';
import history from '../../shared/utils/history';

export const logout = () => {
    deleteToken();
    history.push(routes.home);
}

export const getToken = () => localStorage.getItem(USER_TOKEN_KEY);

export const getCurrentUser = () => {
    const token = getToken();
    const currentUser: ICurrentUser | null = !!token ? jwtDecode(token) : null;

    return currentUser;
}

const setToken = (token: string): void => {
    localStorage.setItem(USER_TOKEN_KEY, token)
}
const deleteToken = (): void => {
    localStorage.removeItem(USER_TOKEN_KEY)
}
