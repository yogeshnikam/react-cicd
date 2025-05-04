import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { userReducer } from './reducers';
import rootSaga from './sagas';

// Create saga middleware
const sagaMiddleware = createSagaMiddleware();

// Create store with middleware
const store = configureStore({
    reducer: {
        users: userReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            thunk: true, // Enable thunk for better compatibility
            serializableCheck: {
                ignoredActions: ['FETCH_USERS_START', 'FETCH_USERS_SUCCESS', 'FETCH_USERS_ERROR']
            },
        }).concat(sagaMiddleware)
});

// Run saga only in non-test environment
if (process.env.NODE_ENV !== 'test') {
    sagaMiddleware.run(rootSaga);
}

export default store;