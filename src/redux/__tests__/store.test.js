import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '../reducers';
import rootSaga from '../sagas';

describe('Redux Store Configuration', () => {
  it('creates store with root reducer and saga middleware', () => {
    const sagaMiddleware = createSagaMiddleware();
    const store = createStore(
      rootReducer,
      applyMiddleware(sagaMiddleware)
    );

    expect(store).toBeDefined();
    expect(store.getState).toBeDefined();
    expect(store.dispatch).toBeDefined();
    expect(store.subscribe).toBeDefined();
  });

  it('initializes with correct initial state', () => {
    const sagaMiddleware = createSagaMiddleware();
    const store = createStore(
      rootReducer,
      applyMiddleware(sagaMiddleware)
    );

    const initialState = store.getState();
    expect(initialState).toEqual({
      users: {
        users: [],
        loading: false,
        error: null
      }
    });
  });
});
