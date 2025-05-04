import { takeEvery, call, put } from 'redux-saga/effects';
import { fetchUsersStart, fetchUsersSuccess, fetchUsersError } from '../reducers';
import { fetchUsers } from '../../services/api';

export function* fetchUsersSaga() {
    try {
        const users = yield call(fetchUsers);
        yield put(fetchUsersSuccess(users));
    } catch (error) {
        yield put(fetchUsersError(error.message));
    }
}

export function* userSaga() {
    yield takeEvery(fetchUsersStart.type, fetchUsersSaga);
} 