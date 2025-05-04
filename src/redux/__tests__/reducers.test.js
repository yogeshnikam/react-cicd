import { userReducer } from '../reducers';

describe('userReducer', () => {
  const initialState = {
    loading: false,
    error: null,
    users: [],
  };

  it('should return the initial state when action is unknown', () => {
    const newState = userReducer(undefined, { type: 'UNKNOWN_ACTION' });
    expect(newState).toEqual(initialState);
  });

  it('should handle FETCH_USERS', () => {
    const action = { type: 'FETCH_USERS' };
    const expectedState = {
      ...initialState,
      loading: true,
    };

    expect(userReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle FETCH_USERS_SUCCESS', () => {
    const users = [{ id: 1, name: 'John' }];
    const action = { type: 'FETCH_USERS_SUCCESS', payload: users };
    const expectedState = {
      ...initialState,
      loading: false,
      users,
    };

    expect(userReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle FETCH_USERS_ERROR', () => {
    const error = 'Failed to fetch users';
    const action = { type: 'FETCH_USERS_ERROR', error };
    const expectedState = {
      ...initialState,
      loading: false,
      error,
    };

    expect(userReducer(initialState, action)).toEqual(expectedState);
  });
});
