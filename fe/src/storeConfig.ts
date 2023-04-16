import { configureStore } from '@reduxjs/toolkit';

import createSagaMiddleware from 'redux-saga';
import rootReducer, { rootSaga } from './store';

const sagaMiddleware = createSagaMiddleware();

const storeConfig: any = configureStore({
    reducer: rootReducer,
    middleware: [sagaMiddleware],
});

sagaMiddleware.run(rootSaga);

export default storeConfig;
