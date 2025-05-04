import { call, put, takeEvery } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import { throwError } from 'redux-saga-test-plan/providers';
import { fetchUsersStart, fetchUsersSuccess, fetchUsersError } from '../../reducers';
import { fetchUsersSaga, userSaga } from '../userSaga';
import { fetchUsers } from '../../../services/api';

// Mock the API service
jest.mock('../../../services/api', () => ({
    fetchUsers: jest.fn()
}));

describe('User Saga', () => {
    it('should handle successful user fetch', () => {
        const mockUsers = [
            { id: 1, name: 'John Doe', email: 'john@example.com' },
            { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
        ];

        return expectSaga(fetchUsersSaga)
            .provide([
                [call(fetchUsers), mockUsers]
            ])
            .put(fetchUsersSuccess(mockUsers))
            .run();
    });

    it('should handle failed user fetch', () => {
        const error = new Error('Failed to fetch users');

        return expectSaga(fetchUsersSaga)
            .provide([
                [call(fetchUsers), throwError(error)]
            ])
            .put(fetchUsersError(error.message))
            .run();
    });

    it('should watch for fetchUsersStart action', () => {
        const generator = userSaga();
        
        expect(generator.next().value).toEqual(
            takeEvery(fetchUsersStart.type, fetchUsersSaga)
        );
        
        expect(generator.next().done).toBe(true);
    });
}); 