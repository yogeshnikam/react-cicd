import { takeEvery, call, put } from 'redux-saga/effects';

export function* getUsers() {
  try {
    let data = yield call(fetch, 'https://jsonplaceholder.typicode.com/users');
    
    if (!data || !data.json) {
      throw new Error('Invalid response');
    }

    data = yield call([data, 'json']);

    if (!Array.isArray(data)) {
      throw new Error('Expected an array of users');
    }

    console.log('Data:', data);
    yield put({ type: 'FETCH_USERS_SUCCESS', payload: data });
  } catch (error) {
    console.error('Error fetching users:', error);
    yield put({ type: 'FETCH_USERS_ERROR', error });
  }
}

export default function* userSaga() {
  yield takeEvery('FETCH_USERS', getUsers);
}
