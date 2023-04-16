import { combineReducers } from 'redux';
import { all, fork } from 'redux-saga/effects';

import shoppingReducer from '../shopping/store/reducer';
import shoppingSaga from '../shopping/store/sagas';

const rootReducer = combineReducers({
    shopping: shoppingReducer,
});

export function* rootSaga() {
    yield all([
        fork(shoppingSaga),
    ]);
}

export default rootReducer;
