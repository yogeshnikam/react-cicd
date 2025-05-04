import { userReducer, fetchUsersStart, fetchUsersSuccess, fetchUsersError } from '../reducers';

describe('User Reducer', () => {
    const initialState = {
        loading: false,
        error: null,
        users: []
    };

    it('should return initial state', () => {
        expect(userReducer(undefined, {})).toEqual(initialState);
    });

    it('should handle fetchUsersStart', () => {
        const action = fetchUsersStart();
        const expectedState = {
            ...initialState,
            loading: true,
            error: null
        };
        expect(userReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle fetchUsersSuccess', () => {
        const mockUsers = [
            { id: 1, name: 'John Doe', email: 'john@example.com', phone: '123-456-7890' },
            { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '098-765-4321' }
        ];
        const action = fetchUsersSuccess(mockUsers);
        const expectedState = {
            loading: false,
            error: null,
            users: mockUsers
        };
        expect(userReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle fetchUsersError', () => {
        const errorMessage = 'Failed to fetch users';
        const action = fetchUsersError(errorMessage);
        const expectedState = {
            ...initialState,
            loading: false,
            error: errorMessage
        };
        expect(userReducer(initialState, action)).toEqual(expectedState);
    });

    it('should maintain state for unknown actions', () => {
        const action = { type: 'UNKNOWN_ACTION' };
        expect(userReducer(initialState, action)).toEqual(initialState);
    });
});
