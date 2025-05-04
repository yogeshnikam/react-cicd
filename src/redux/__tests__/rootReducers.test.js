import { combineReducers } from 'redux';
import rootReducer from '../rootReducers';
import { userReducer } from '../reducers';

jest.mock('../reducers', () => ({
  userReducer: jest.fn((state = { test: true }, action) => state),
}));

describe('rootReducer', () => {
  it('should combine reducers correctly', () => {
    const initialState = undefined;
    const dummyAction = { type: '@@INIT' };

    const state = rootReducer(initialState, dummyAction);

    expect(typeof rootReducer).toBe('function');
    expect(state).toHaveProperty('users');
    expect(userReducer).toHaveBeenCalledWith(undefined, dummyAction);
    expect(state.users).toEqual({ test: true });
  });
});
