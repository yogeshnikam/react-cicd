import { configureStore } from '@reduxjs/toolkit';
import { createSagaMiddleware } from 'redux-saga';
import userSaga from '../userSaga';
import rootReducers from '../rootReducers';

jest.mock('redux-saga', () => {
  const runMock = jest.fn();
  const sagaMiddlewareMock = jest.fn(() => {
    const middlewareFn = () => (next) => (action) => next(action);
    middlewareFn.run = runMock;
    return middlewareFn;
  });

  return {
    createSagaMiddleware: sagaMiddlewareMock,
  };
});

jest.mock('../userSaga', () => jest.fn());
jest.mock('../rootReducers', () => jest.fn());

describe('Redux Store Configuration', () => {
  it('should create the store with root reducer and run saga', () => {
    const sagaMiddleware = createSagaMiddleware();
    const store = configureStore({
      reducer: rootReducers,
      middleware: () => [sagaMiddleware],
    });

    sagaMiddleware.run(userSaga);

    expect(store).toBeDefined();
    expect(typeof store.dispatch).toBe('function');
    expect(sagaMiddleware.run).toHaveBeenCalledWith(userSaga);
  });
});
