import { Actions, AuthActionTypes } from './types';
import { AuthStateInterface } from './authStateInterface';
import { UserAccountData } from '../models/user-account.model';

const initState: AuthStateInterface = {
    userAccountData: new UserAccountData()
};


const authReducer = (state = initState, action: Actions): AuthStateInterface => {
    switch (action.type) {
        case AuthActionTypes.SET_USER_ACCOUNT_DATA:
            return {
                ...state,
                userAccountData: new UserAccountData(action.userAccountData),
            };
        case AuthActionTypes.UN_SET_USER_ACCOUNT_DATA:
            return {
                ...state,
                userAccountData: new UserAccountData(),
            };
        default:
            return state;
    }
};

export default authReducer;
