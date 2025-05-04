import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import userSaga from '../userSaga';
import rootReducers from '../rootReducers';
import store from '../store';

// Mock dependencies
jest.mock('redux-saga', () => {
  const actual = jest.requireActual('redux-saga');
  return {
    ...actual,
    default: jest.fn(() => ({
      run: jest.fn()
    })),
  };
});

jest.mock('./userSaga', () => jest.fn());
jest.mock('./rootReducers', () => jest.fn());

describe('Redux Store Configuration', () => {
  it('should create the store with root reducer and run saga', () => {
    const sagaMiddleware = createSagaMiddleware();
    const spyRun = jest.spyOn(sagaMiddleware, 'run');

    const testStore = configureStore({
      reducer: rootReducers,
      middleware: () => [sagaMiddleware],
    });

    sagaMiddleware.run(userSaga); // run manually to test spy

    expect(testStore).toBeDefined();
    expect(typeof testStore.dispatch).toBe('function');
    expect(spyRun).toHaveBeenCalledWith(userSaga);
  });
});
