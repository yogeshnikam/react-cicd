import axios from 'axios';
import { takeEvery, call, put } from 'redux-saga/effects';

export function* getUsers() {
  try {
    const response = yield call(axios.get, 'https://jsonplaceholder.typicode.com/users');

    const data = response.data;

    if (!Array.isArray(data)) {
      throw new Error('Expected an array of users');
    }

    yield put({ type: 'FETCH_USERS_SUCCESS', payload: data });
  } catch (error) {
    yield put({ type: 'FETCH_USERS_ERROR', error: error.message || 'Unknown error' });
  }
}

export default function* userSaga() {
  yield takeEvery('FETCH_USERS', getUsers);
}
