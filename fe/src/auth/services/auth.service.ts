import jwtDecode from 'jwt-decode';
import { apiEndpoints } from '../../shared/constants/apiEndpoints';
import { routes } from '../../shared/constants/routes';
import { USER_TOKEN_KEY } from '../../shared/constants/storageItems';
import { AppError } from '../../shared/errors/appError';
import { ICurrentUser } from '../../shared/models/user.model';
import history from '../../shared/utils/history';
import httpClient from '../../shared/utils/httpClient';
import serviceErrorHandler from '../../shared/utils/serviceErrorHandler';
import { LoginModel } from '../models/login.model';
import { SignupModel } from '../models/signup.model';

interface ITokenResponse {
    token: string;
  }

const path = apiEndpoints.auth;

export const login = async (data: LoginModel): Promise<ITokenResponse | AppError> => {
    return httpClient.post<ITokenResponse>(`${path}/login`, data).then(response => {
        setToken(response.data.token);
        const search = history.location.search;
        const searchParams = new URLSearchParams(search);
        const returnPath = searchParams.get("returnPath");
        history.push(returnPath || routes.home);
        return Promise.resolve(response.data);
    }).catch(serviceErrorHandler);
};

export const signup = async (data: SignupModel): Promise<ITokenResponse | AppError> => {
    return httpClient.post<ITokenResponse>(`${path}/signup`, data).then(response => {
        setToken(response.data.token);
        const search = history.location.search;
        const searchParams = new URLSearchParams(search);
        const returnPath = searchParams.get("returnPath");
        history.push(returnPath || routes.home);
        return Promise.resolve(response.data);
    }).catch(serviceErrorHandler);
};

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
