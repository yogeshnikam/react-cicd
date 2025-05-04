import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUsers } from '../redux/actions';

const UserList = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  if (loading) {
    return <p>Loading user list...</p>;
  }

  if (error) {
    return <p>Error loading users: {error}</p>;
  }

  return (
    <div>
      <h1>User List</h1>
      {users && users.length > 0 ? (
        users.map((user) => (
          <div key={user.id}>{user.name}</div>
        ))
      ) : (
        <p>No users found.</p>
      )}
    </div>
  );
};

export default UserList;
