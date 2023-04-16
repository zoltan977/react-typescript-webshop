import { toast } from 'react-toastify';
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';

import { FormError } from '../../shared/errors/formError';
import globalErrorHandler from '../../shared/utils/globalErrorHandler';
import setFormErrors from '../../shared/utils/setFormErrors';
import { UserAccountData } from '../models/user-account.model';
import { add, deleteCustomerName, deleteDeliveryAddress, getByUser } from '../services/user-account.service';
import { authActions } from './actions';
import {
    AddUserAccountDataActionInterface,
    AuthActionTypes,
    DeleteCustomerNameActionInterface,
    DeleteDeliveryAddressActionInterface,
} from './types';

const safe = (handler:any = null, saga:any, ...args:any) => function* (action:any) {
    try {
      yield call(saga, ...args, action)
    } catch (err) {
      yield call(handler, ...args, err)
    }
}

const onError = (err:any) => {
    globalErrorHandler(err)
}

function* watchers() {
    yield takeEvery(AuthActionTypes.GET_USER_ACCOUNT_DATA, safe(onError, onGetUserAccountData));
    yield takeEvery(AuthActionTypes.ADD_USER_ACCOUNT_DATA, safe(onError, onAddUserAccountData));
    yield takeEvery(AuthActionTypes.DELETE_CUSTOMER_NAME, safe(onError, onDeleteCustomerName));
    yield takeEvery(AuthActionTypes.DELETE_DELIVERY_ADDRESS, safe(onError, onDeleteDeliveryAddress));
}

function* onGetUserAccountData() {
    try {
        const userAccountData: UserAccountData = yield call(getByUser);
        yield put(authActions.setUserAccountData(userAccountData));
    } catch (error) {
        globalErrorHandler(error)        
    }
}

function* onAddUserAccountData(action: AddUserAccountDataActionInterface) {
    try {
        const userAccountData: UserAccountData = yield call(add, action.userAccountData);
        yield put(authActions.setUserAccountData(userAccountData));
        toast.success("A hozzáadás sikerült");
        action.resetForm();
    } catch (error) {
        if (error instanceof FormError) {
            setFormErrors(error, action.setError)
        } else {
            throw error;
        }
    }
}

function* onDeleteCustomerName(action: DeleteCustomerNameActionInterface) {
    const userAccountData: UserAccountData = yield call(deleteCustomerName, action.customerNameId);
    yield put(authActions.setUserAccountData(userAccountData));
}

function* onDeleteDeliveryAddress(action: DeleteDeliveryAddressActionInterface) {
    const userAccountData: UserAccountData = yield call(deleteDeliveryAddress, action.deliveryAddressId);
    yield put(authActions.setUserAccountData(userAccountData));
}

export default function* authSaga() {
    yield all([fork(watchers)]);
}