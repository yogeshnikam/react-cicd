import { call, put, takeEvery } from 'redux-saga/effects';
import { getUsers, default as userSaga } from '../userSaga';

global.fetch = jest.fn(); // <--- Add this line

describe('getUsers Saga', () => {
  const apiUrl = 'https://jsonplaceholder.typicode.com/users';

  it('should handle success case', () => {
    const generator = getUsers();

    // Step 1: call fetch
    expect(generator.next().value).toEqual(call(fetch, apiUrl));

    // Step 2: call .json on response
    const response = { json: () => ({}) };
    expect(generator.next(response).value).toEqual(call([response, 'json']));

    // Step 3: return array data
    const users = [{ id: 1, name: 'John Doe' }];
    expect(generator.next(users).value).toEqual(
      put({ type: 'FETCH_USERS_SUCCESS', payload: users })
    );

    // Step 4: done
    expect(generator.next().done).toBe(true);
  });

  it('should handle missing json method in response', () => {
    const generator = getUsers();

    // Step 1: fetch call
    expect(generator.next().value).toEqual(call(fetch, apiUrl));

    // Step 2: simulate missing json
    const invalidResponse = {};
    const thrown = generator.next(invalidResponse);

    // Should throw Error, we catch it by throwing manually
    expect(thrown.value).toEqual(put({
      type: 'FETCH_USERS_ERROR',
      error: new Error('Invalid response'),
    }));
  });

  it('should handle invalid JSON data format (not array)', () => {
    const generator = getUsers();

    // Step 1: fetch
    expect(generator.next().value).toEqual(call(fetch, apiUrl));

    // Step 2: valid json function
    const response = { json: () => {} };
    expect(generator.next(response).value).toEqual(call([response, 'json']));

    // Step 3: simulate non-array data
    const badData = { name: 'not an array' };
    const result = generator.next(badData);

    expect(result.value).toEqual(put({
      type: 'FETCH_USERS_ERROR',
      error: new Error('Expected an array of users'),
    }));
  });

  it('should handle thrown error', () => {
    const generator = getUsers();

    // Step 1: simulate fetch call
    expect(generator.next().value).toEqual(call(fetch, apiUrl));

    // Simulate error during fetch
    const error = new Error('Network error');
    expect(generator.throw(error).value).toEqual(
      put({ type: 'FETCH_USERS_ERROR', error })
    );
  });
});

describe('userSaga', () => {
  it('should watch for FETCH_USERS', () => {
    const generator = userSaga();
    expect(generator.next().value).toEqual(takeEvery('FETCH_USERS', getUsers));
    expect(generator.next().done).toBe(true);
  });
});
