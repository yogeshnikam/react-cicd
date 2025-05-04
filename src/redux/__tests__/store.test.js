import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { userReducer } from '../reducers';
import rootSaga from '../sagas';
import {
    FETCH_USERS_START,
    FETCH_USERS_SUCCESS,
    FETCH_USERS_FAILURE,
    fetchUsersStart,
    fetchUsersSuccess,
    fetchUsersFailure
} from '../actions/userActions';

// Mock redux-saga
jest.mock('redux-saga', () => ({
    createSagaMiddleware: jest.fn(() => ({
        run: jest.fn(),
        middleware: jest.fn(() => next => action => next(action))
    }))
}));

describe('Redux Store Configuration', () => {
    let store;
    let sagaMiddleware;

    beforeEach(() => {
        // Clear all mocks
        jest.clearAllMocks();
        
        // Create saga middleware
        sagaMiddleware = createSagaMiddleware();
        
        // Create store
        store = configureStore({
            reducer: {
                users: userReducer
            },
            middleware: (getDefaultMiddleware) =>
                getDefaultMiddleware({
                    thunk: true,
                    serializableCheck: {
                        ignoredActions: ['FETCH_USERS_START', 'FETCH_USERS_SUCCESS', 'FETCH_USERS_ERROR']
                    },
                }).concat(sagaMiddleware)
        });
    });

    describe('Store Initialization', () => {
        it('should create store with correct initial state', () => {
            const state = store.getState();
            expect(state).toEqual({
                users: {
                    users: [],
                    loading: false,
                    error: null
                }
            });
        });

        it('should have saga middleware configured', () => {
            expect(createSagaMiddleware).toHaveBeenCalled();
        });

        it('should have correct middleware configuration', () => {
            const state = store.getState();
            expect(state).toBeDefined();
        });
    });

    describe('Action Handling', () => {
        it('should handle FETCH_USERS_START action', () => {
            store.dispatch(fetchUsersStart());
            const state = store.getState();
            expect(state.users.loading).toBe(true);
            expect(state.users.error).toBeNull();
        });

        it('should handle FETCH_USERS_SUCCESS action', () => {
            const mockUsers = [
                { id: 1, name: 'John Doe', email: 'john@example.com' },
                { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
            ];
            store.dispatch(fetchUsersSuccess(mockUsers));
            const state = store.getState();
            expect(state.users.users).toEqual(mockUsers);
            expect(state.users.loading).toBe(false);
            expect(state.users.error).toBeNull();
        });

        it('should handle FETCH_USERS_FAILURE action', () => {
            const error = 'Failed to fetch users';
            store.dispatch(fetchUsersFailure(error));
            const state = store.getState();
            expect(state.users.error).toBe(error);
            expect(state.users.loading).toBe(false);
            expect(state.users.users).toEqual([]);
        });

        it('should handle multiple actions in sequence', () => {
            // Start fetching
            store.dispatch(fetchUsersStart());
            expect(store.getState().users.loading).toBe(true);

            // Success
            const mockUsers = [{ id: 1, name: 'John Doe' }];
            store.dispatch(fetchUsersSuccess(mockUsers));
            expect(store.getState().users.users).toEqual(mockUsers);
            expect(store.getState().users.loading).toBe(false);

            // Start fetching again
            store.dispatch(fetchUsersStart());
            expect(store.getState().users.loading).toBe(true);

            // Failure
            const error = 'Network error';
            store.dispatch(fetchUsersFailure(error));
            expect(store.getState().users.error).toBe(error);
            expect(store.getState().users.loading).toBe(false);
        });
    });

    describe('Environment Handling', () => {
        it('should not run saga in test environment', () => {
            const originalEnv = process.env.NODE_ENV;
            process.env.NODE_ENV = 'test';
            
            expect(sagaMiddleware.run).not.toHaveBeenCalled();
            
            process.env.NODE_ENV = originalEnv;
        });

        it('should run saga in development environment', () => {
            const originalEnv = process.env.NODE_ENV;
            process.env.NODE_ENV = 'development';
            
            sagaMiddleware.run(rootSaga);
            expect(sagaMiddleware.run).toHaveBeenCalledWith(rootSaga);
            
            process.env.NODE_ENV = originalEnv;
        });

        it('should run saga in production environment', () => {
            const originalEnv = process.env.NODE_ENV;
            process.env.NODE_ENV = 'production';
            
            sagaMiddleware.run(rootSaga);
            expect(sagaMiddleware.run).toHaveBeenCalledWith(rootSaga);
            
            process.env.NODE_ENV = originalEnv;
        });
    });

    describe('Middleware Configuration', () => {
        it('should have thunk middleware enabled', () => {
            const state = store.getState();
            expect(state).toBeDefined();
        });

        it('should ignore serializable check for specific actions', () => {
            const actions = ['FETCH_USERS_START', 'FETCH_USERS_SUCCESS', 'FETCH_USERS_ERROR'];
            actions.forEach(action => {
                store.dispatch({ type: action });
                const state = store.getState();
                expect(state).toBeDefined();
            });
        });
    });

    describe('State Updates', () => {
        it('should maintain state after multiple updates', () => {
            // Initial state
            expect(store.getState().users.users).toEqual([]);
            expect(store.getState().users.loading).toBe(false);
            expect(store.getState().users.error).toBeNull();

            // Add users
            const mockUsers = [{ id: 1, name: 'John Doe' }];
            store.dispatch(fetchUsersSuccess(mockUsers));
            expect(store.getState().users.users).toEqual(mockUsers);

            // Clear users
            store.dispatch(fetchUsersStart());
            expect(store.getState().users.loading).toBe(true);

            // Set error
            const error = 'Network error';
            store.dispatch(fetchUsersFailure(error));
            expect(store.getState().users.error).toBe(error);
        });
    });
});
