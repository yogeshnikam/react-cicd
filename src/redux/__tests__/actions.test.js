import { getUsers } from '../actions';

describe('getUsers action', () => {
  it('should return an action with type FETCH_USERS', () => {
    const expectedAction = { type: 'FETCH_USERS' };
    expect(getUsers()).toEqual(expectedAction);
  });
});
