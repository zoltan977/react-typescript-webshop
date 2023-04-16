import { UseFormSetError } from 'react-hook-form';

import { UserAccountData } from '../models/user-account.model';

export enum AuthActionTypes {
    GET_USER_ACCOUNT_DATA = 'AUTH/GET_USER_ACCOUNT_DATA',
    ADD_USER_ACCOUNT_DATA = 'AUTH/ADD_USER_ACCOUNT_DATA',
    DELETE_CUSTOMER_NAME = 'AUTH/DELETE_CUSTOMER_NAME',
    DELETE_DELIVERY_ADDRESS = 'AUTH/DELETE_DELIVERY_ADDRESS',
    SET_USER_ACCOUNT_DATA = 'AUTH/SET_USER_ACCOUNT_DATA',
    UN_SET_USER_ACCOUNT_DATA = 'AUTH/UN_SET_USER_ACCOUNT_DATA',
}

export interface GetUserAccountDataActionInterface {
    type: AuthActionTypes.GET_USER_ACCOUNT_DATA;
}

export interface DeleteCustomerNameActionInterface {
    customerNameId: string;
    type: AuthActionTypes.DELETE_CUSTOMER_NAME;
}
export interface SetUserAccountDataActionInterface {
    type: AuthActionTypes.SET_USER_ACCOUNT_DATA;
    userAccountData: UserAccountData;
}
export interface UnSetUserAccountDataActionInterface {
    type: AuthActionTypes.UN_SET_USER_ACCOUNT_DATA;
}
export interface AddUserAccountDataActionInterface {
    type: AuthActionTypes.ADD_USER_ACCOUNT_DATA;
    setError: UseFormSetError<UserAccountData>;
    resetForm: () => void;
    userAccountData: UserAccountData;
}

export interface DeleteDeliveryAddressActionInterface {
    type: AuthActionTypes.DELETE_DELIVERY_ADDRESS;
    deliveryAddressId: string;
}

export type Actions =
    | GetUserAccountDataActionInterface
    | AddUserAccountDataActionInterface
    | DeleteCustomerNameActionInterface
    | SetUserAccountDataActionInterface
    | UnSetUserAccountDataActionInterface
    | DeleteDeliveryAddressActionInterface
