import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsersStart } from '../redux/reducers';

const Home = () => {
    const dispatch = useDispatch();
    const { users, loading, error } = useSelector((state) => state.users);

    useEffect(() => {
        dispatch(fetchUsersStart());
    }, [dispatch]);

    if (loading) return <div className="loading">Loading users...</div>;
    if (error) return <div className="error">Error: {error}</div>;

    return (
        <div className="home-container">
            <h1>User List</h1>
            <div className="user-list">
                {users.map(user => (
                    <div key={user.id} className="user-card">
                        <h3>{user.name}</h3>
                        <p>Email: {user.email}</p>
                        <p>Phone: {user.phone}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home; 