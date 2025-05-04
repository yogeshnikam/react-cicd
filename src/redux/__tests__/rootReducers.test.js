import { combineReducers } from '@reduxjs/toolkit';
import rootReducer from '../rootReducers';
import { userReducer } from '../reducers';
import {
    FETCH_USERS_START,
    FETCH_USERS_SUCCESS,
    FETCH_USERS_FAILURE,
    fetchUsersStart,
    fetchUsersSuccess,
    fetchUsersFailure
} from '../actions/userActions';

jest.mock('../reducers', () => ({
  userReducer: jest.fn((state = { test: true }, action) => state),
}));

describe('Root Reducers', () => {
    it('should combine reducers correctly', () => {
        const expectedReducer = combineReducers({
            users: userReducer
        });
        expect(rootReducer).toEqual(expectedReducer);
    });

    it('should handle initial state', () => {
        const initialState = rootReducer(undefined, {});
        expect(initialState).toEqual({
            users: {
                users: [],
                loading: false,
                error: null
            }
        });
    });

    it('should handle FETCH_USERS_START action', () => {
        const initialState = {
            users: {
                users: [],
                loading: false,
                error: null
            }
        };
        const state = rootReducer(initialState, fetchUsersStart());
        expect(state).toEqual({
            users: {
                users: [],
                loading: true,
                error: null
            }
        });
    });

    it('should handle FETCH_USERS_SUCCESS action', () => {
        const initialState = {
            users: {
                users: [],
                loading: true,
                error: null
            }
        };
        const mockUsers = [
            { id: 1, name: 'John Doe', email: 'john@example.com' },
            { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
        ];
        const state = rootReducer(initialState, fetchUsersSuccess(mockUsers));
        expect(state).toEqual({
            users: {
                users: mockUsers,
                loading: false,
                error: null
            }
        });
    });

    it('should handle FETCH_USERS_FAILURE action', () => {
        const initialState = {
            users: {
                users: [],
                loading: true,
                error: null
            }
        };
        const error = 'Failed to fetch users';
        const state = rootReducer(initialState, fetchUsersFailure(error));
        expect(state).toEqual({
            users: {
                users: [],
                loading: false,
                error: error
            }
        });
    });

    it('should handle unknown action type', () => {
        const initialState = {
            users: {
                users: [],
                loading: false,
                error: null
            }
        };
        const state = rootReducer(initialState, { type: 'UNKNOWN_ACTION' });
        expect(state).toEqual(initialState);
    });

    it('should handle multiple actions in sequence', () => {
        let state = rootReducer(undefined, {});
        expect(state.users.loading).toBe(false);

        // Start fetching
        state = rootReducer(state, fetchUsersStart());
        expect(state.users.loading).toBe(true);

        // Success
        const mockUsers = [{ id: 1, name: 'John Doe' }];
        state = rootReducer(state, fetchUsersSuccess(mockUsers));
        expect(state.users.users).toEqual(mockUsers);
        expect(state.users.loading).toBe(false);

        // Start fetching again
        state = rootReducer(state, fetchUsersStart());
        expect(state.users.loading).toBe(true);

        // Failure
        const error = 'Network error';
        state = rootReducer(state, fetchUsersFailure(error));
        expect(state.users.error).toBe(error);
        expect(state.users.loading).toBe(false);
    });

    it('should handle empty payload in success action', () => {
        const initialState = {
            users: {
                users: [],
                loading: true,
                error: null
            }
        };
        const state = rootReducer(initialState, fetchUsersSuccess([]));
        expect(state).toEqual({
            users: {
                users: [],
                loading: false,
                error: null
            }
        });
    });

    it('should handle null error in failure action', () => {
        const initialState = {
            users: {
                users: [],
                loading: true,
                error: null
            }
        };
        const state = rootReducer(initialState, fetchUsersFailure(null));
        expect(state).toEqual({
            users: {
                users: [],
                loading: false,
                error: null
            }
        });
    });

    it('should handle undefined error in failure action', () => {
        const initialState = {
            users: {
                users: [],
                loading: true,
                error: null
            }
        };
        const state = rootReducer(initialState, fetchUsersFailure(undefined));
        expect(state).toEqual({
            users: {
                users: [],
                loading: false,
                error: undefined
            }
        });
    });

    it('should handle complex error object in failure action', () => {
        const initialState = {
            users: {
                users: [],
                loading: true,
                error: null
            }
        };
        const error = {
            message: 'Network error',
            code: 'ECONNABORTED',
            response: {
                status: 500,
                data: { message: 'Internal server error' }
            }
        };
        const state = rootReducer(initialState, fetchUsersFailure(error));
        expect(state).toEqual({
            users: {
                users: [],
                loading: false,
                error: error
            }
        });
    });
});
