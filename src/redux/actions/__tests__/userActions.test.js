import {
    FETCH_USERS_START,
    FETCH_USERS_SUCCESS,
    FETCH_USERS_FAILURE,
    fetchUsersStart,
    fetchUsersSuccess,
    fetchUsersFailure
} from '../userActions';

describe('User Actions', () => {
    describe('Action Types', () => {
        it('should have correct action type for FETCH_USERS_START', () => {
            expect(FETCH_USERS_START).toBe('FETCH_USERS_START');
        });

        it('should have correct action type for FETCH_USERS_SUCCESS', () => {
            expect(FETCH_USERS_SUCCESS).toBe('FETCH_USERS_SUCCESS');
        });

        it('should have correct action type for FETCH_USERS_FAILURE', () => {
            expect(FETCH_USERS_FAILURE).toBe('FETCH_USERS_FAILURE');
        });
    });

    describe('Action Creators', () => {
        it('should create an action to start fetching users', () => {
            const expectedAction = {
                type: FETCH_USERS_START
            };
            expect(fetchUsersStart()).toEqual(expectedAction);
        });

        it('should create an action for successful user fetch', () => {
            const mockUsers = [
                { id: 1, name: 'John Doe', email: 'john@example.com' },
                { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
            ];
            const expectedAction = {
                type: FETCH_USERS_SUCCESS,
                payload: mockUsers
            };
            expect(fetchUsersSuccess(mockUsers)).toEqual(expectedAction);
        });

        it('should create an action for failed user fetch', () => {
            const error = 'Failed to fetch users';
            const expectedAction = {
                type: FETCH_USERS_FAILURE,
                payload: error
            };
            expect(fetchUsersFailure(error)).toEqual(expectedAction);
        });

        it('should handle empty user array in success action', () => {
            const expectedAction = {
                type: FETCH_USERS_SUCCESS,
                payload: []
            };
            expect(fetchUsersSuccess([])).toEqual(expectedAction);
        });

        it('should handle null error in failure action', () => {
            const expectedAction = {
                type: FETCH_USERS_FAILURE,
                payload: null
            };
            expect(fetchUsersFailure(null)).toEqual(expectedAction);
        });

        it('should handle undefined error in failure action', () => {
            const expectedAction = {
                type: FETCH_USERS_FAILURE,
                payload: undefined
            };
            expect(fetchUsersFailure(undefined)).toEqual(expectedAction);
        });

        it('should handle error object in failure action', () => {
            const error = new Error('Network error');
            const expectedAction = {
                type: FETCH_USERS_FAILURE,
                payload: error
            };
            expect(fetchUsersFailure(error)).toEqual(expectedAction);
        });

        it('should handle complex error object in failure action', () => {
            const error = {
                message: 'Network error',
                code: 'ECONNABORTED',
                response: {
                    status: 500,
                    data: { message: 'Internal server error' }
                }
            };
            const expectedAction = {
                type: FETCH_USERS_FAILURE,
                payload: error
            };
            expect(fetchUsersFailure(error)).toEqual(expectedAction);
        });

        it('should handle single user in success action', () => {
            const user = { id: 1, name: 'John Doe', email: 'john@example.com' };
            const expectedAction = {
                type: FETCH_USERS_SUCCESS,
                payload: [user]
            };
            expect(fetchUsersSuccess([user])).toEqual(expectedAction);
        });

        it('should handle malformed user data in success action', () => {
            const malformedUser = { id: 1, name: null, email: undefined };
            const expectedAction = {
                type: FETCH_USERS_SUCCESS,
                payload: [malformedUser]
            };
            expect(fetchUsersSuccess([malformedUser])).toEqual(expectedAction);
        });
    });
}); 