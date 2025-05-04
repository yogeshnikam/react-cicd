import { configureStore } from "@reduxjs/toolkit";
import rootReducers from './rootReducers';
import createSagaMiddleware from 'redux-saga'
import userSaga from "./userSaga";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer: rootReducers,
    middleware: () => [sagaMiddleware]
})

sagaMiddleware.run(userSaga)
export default store