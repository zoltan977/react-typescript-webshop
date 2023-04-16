import { combineReducers } from 'redux';
import { all, fork } from 'redux-saga/effects';

import authReducer from '../auth/store/reducer';
import authSaga from '../auth/store/sagas';
import shoppingReducer from '../shopping/store/reducer';
import shoppingSaga from '../shopping/store/sagas';

const rootReducer = combineReducers({
    shopping: shoppingReducer,
    auth: authReducer
});

export function* rootSaga() {
    yield all([
        fork(shoppingSaga),
        fork(authSaga),
    ]);
}

export default rootReducer;
