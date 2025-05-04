import { call, put } from 'redux-saga/effects';
import { getUsers, default as userSaga } from '../userSaga';
import { takeEvery } from 'redux-saga/effects';

// Mock data
const mockUsers = [{ id: 1, name: 'John Doe' }];

describe('getUsers Saga', () => {
  it('should dispatch FETCH_USERS_SUCCESS on successful fetch', () => {
    const generator = getUsers();

    // Step 1: call fetch
    expect(generator.next().value).toEqual(call(fetch, 'https://jsonplaceholder.typicode.com/users'));

    // Step 2: call data.json
    const mockResponse = { json: () => mockUsers };
    expect(generator.next(mockResponse).value).toEqual(call([mockResponse, 'json']));

    // Step 3: put FETCH_USERS_SUCCESS
    expect(generator.next(mockUsers).value).toEqual(
      put({ type: 'FETCH_USERS_SUCCESS', payload: mockUsers })
    );

    // Step 4: done
    expect(generator.next().done).toBe(true);
  });

  it('should dispatch FETCH_USERS_ERROR if fetch returns invalid response', () => {
    const generator = getUsers();

    // Step 1: call fetch
    expect(generator.next().value).toEqual(call(fetch, 'https://jsonplaceholder.typicode.com/users'));

    // Step 2: bad fetch response (missing json function)
    const error = new Error('Invalid response');
    expect(generator.throw(error).value).toEqual(
      put({ type: 'FETCH_USERS_ERROR', error })
    );
  });

  it('should dispatch FETCH_USERS_ERROR if data is not an array', () => {
    const generator = getUsers();

    // Step 1
    expect(generator.next().value).toEqual(call(fetch, 'https://jsonplaceholder.typicode.com/users'));

    // Step 2: mock valid .json
    const mockResponse = { json: () => ({ not: 'an array' }) };
    expect(generator.next(mockResponse).value).toEqual(call([mockResponse, 'json']));

    // Step 3: throw on invalid data format
    const error = new Error('Expected an array of users');
    expect(generator.throw(error).value).toEqual(
      put({ type: 'FETCH_USERS_ERROR', error })
    );
  });
});

describe('userSaga', () => {
  const generator = userSaga();

  it('should listen for FETCH_USERS and call getUsers', () => {
    expect(generator.next().value).toEqual(takeEvery('FETCH_USERS', getUsers));
    expect(generator.next().done).toBe(true);
  });
});
