import { UseFormSetError } from 'react-hook-form';

import { UserAccountData } from '../models/user-account.model';
import {
    AddUserAccountDataActionInterface,
    AuthActionTypes,
    DeleteCustomerNameActionInterface,
    DeleteDeliveryAddressActionInterface,
    GetUserAccountDataActionInterface,
    SetUserAccountDataActionInterface,
    UnSetUserAccountDataActionInterface,
} from './types';

const setUserAccountData = (userAccountData: UserAccountData): SetUserAccountDataActionInterface => ({
    userAccountData,
    type: AuthActionTypes.SET_USER_ACCOUNT_DATA
});

const unSetUserAccountData = (): UnSetUserAccountDataActionInterface => ({
    type: AuthActionTypes.UN_SET_USER_ACCOUNT_DATA
});

const addUserAccountData = (userAccountData: UserAccountData, setError: UseFormSetError<UserAccountData>, resetForm: () => void): AddUserAccountDataActionInterface => ({
    userAccountData,
    setError,
    resetForm,
    type: AuthActionTypes.ADD_USER_ACCOUNT_DATA
});

const deleteCustomerName = (customerNameId: string): DeleteCustomerNameActionInterface => ({
    customerNameId,
    type: AuthActionTypes.DELETE_CUSTOMER_NAME
});

const getUserAccountData = (): GetUserAccountDataActionInterface => ({
    type: AuthActionTypes.GET_USER_ACCOUNT_DATA
});

const deleteDeliveryAddress = (deliveryAddressId: string): DeleteDeliveryAddressActionInterface => ({
    deliveryAddressId,
    type: AuthActionTypes.DELETE_DELIVERY_ADDRESS
});


export const authActions = {
    setUserAccountData,
    unSetUserAccountData,
    getUserAccountData,
    addUserAccountData,
    deleteCustomerName,
    deleteDeliveryAddress
};
