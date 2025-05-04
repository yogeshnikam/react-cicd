import { call, put } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import axios from 'axios';
import userSaga, { getUsers } from '../userSaga';
import { takeEvery } from 'redux-saga/effects';
import { throwError } from 'redux-saga-test-plan/providers';

describe('getUsers Saga', () => {
  it('should dispatch FETCH_USERS_SUCCESS when API returns user list', () => {
    const mockUsers = [{ id: 1, name: 'John Doe' }];

    return expectSaga(getUsers)
      .provide([[call(axios.get, 'https://jsonplaceholder.typicode.com/users'), { data: mockUsers }]])
      .put({ type: 'FETCH_USERS_SUCCESS', payload: mockUsers })
      .run();
  });

  it('should dispatch FETCH_USERS_ERROR on API failure', () => {
    const error = new Error('Network error');

    return expectSaga(getUsers)
      .provide([[call(axios.get, 'https://jsonplaceholder.typicode.com/users'), throwError(error)]])
      .put({ type: 'FETCH_USERS_ERROR', error: 'Network error' })
      .run();
  });

  it('should dispatch FETCH_USERS_ERROR when data is not an array', () => {
    const invalidData = { user: 'not an array' };

    return expectSaga(getUsers)
      .provide([[call(axios.get, 'https://jsonplaceholder.typicode.com/users'), { data: invalidData }]])
      .put({ type: 'FETCH_USERS_ERROR', error: 'Expected an array of users' })
      .run();
  });

  it('should dispatch FETCH_USERS_ERROR with "Unknown error" if error.message is falsy', () => {
    const error = {}; // no `message` field
  
    return expectSaga(getUsers)
      .provide([[call(axios.get, 'https://jsonplaceholder.typicode.com/users'), throwError(error)]])
      .put({ type: 'FETCH_USERS_ERROR', error: 'Unknown error' })
      .run();
  });
});

describe('userSaga root watcher', () => {
  const generator = userSaga();

  it('should watch for FETCH_USERS action', () => {
    expect(generator.next().value).toEqual(takeEvery('FETCH_USERS', getUsers));
    expect(generator.next().done).toBe(true);
  });
});
