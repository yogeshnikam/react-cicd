import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import UserList from '../UserList';

const mockStore = configureMockStore();

describe('UserList with mock redux-saga store', () => {
  it('shows loading when loading is true', () => {
    const store = mockStore({
      users: {
        users: [],
        loading: true,
        error: null,
      },
    });

    render(
      <Provider store={store}>
        <UserList />
      </Provider>
    );

    expect(screen.getByText(/loading user list/i)).toBeInTheDocument();
  });

  it('shows error when error exists', () => {
    const store = mockStore({
      users: {
        users: [],
        loading: false,
        error: 'Failed to load users',
      },
    });

    render(
      <Provider store={store}>
        <UserList />
      </Provider>
    );

    expect(screen.getByText(/Error loading users/i)).toBeInTheDocument();
    expect(screen.getByText(/Failed to load users/i)).toBeInTheDocument();
  });

  it('renders user list when users are loaded', () => {
    const store = mockStore({
      users: {
        users: [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }],
        loading: false,
        error: null,
      },
    });

    render(
      <Provider store={store}>
        <UserList />
      </Provider>
    );

    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('Bob')).toBeInTheDocument();
  });

  it('shows "No users found" when list is empty', () => {
    const store = mockStore({
      users: {
        users: [],
        loading: false,
        error: null,
      },
    });

    render(
      <Provider store={store}>
        <UserList />
      </Provider>
    );

    expect(screen.getByText(/No users found/i)).toBeInTheDocument();
  });
});
