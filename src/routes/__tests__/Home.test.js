import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Home from '../Home';
import { fetchUsersStart } from '../../redux/reducers';

const mockStore = configureStore([thunk]);

describe('Home Component', () => {
    let store;

    beforeEach(() => {
        store = mockStore({
            users: {
                loading: false,
                error: null,
                users: []
            }
        });
    });

    it('renders loading state', () => {
        store = mockStore({
            users: {
                loading: true,
                error: null,
                users: []
            }
        });

        render(
            <Provider store={store}>
                <Home />
            </Provider>
        );

        expect(screen.getByText('Loading users...')).toBeInTheDocument();
    });

    it('renders error state', () => {
        store = mockStore({
            users: {
                loading: false,
                error: 'Failed to fetch users',
                users: []
            }
        });

        render(
            <Provider store={store}>
                <Home />
            </Provider>
        );

        expect(screen.getByText('Error: Failed to fetch users')).toBeInTheDocument();
    });

    it('renders user list', () => {
        const mockUsers = [
            { id: 1, name: 'John Doe', email: 'john@example.com', phone: '123-456-7890' },
            { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '098-765-4321' }
        ];

        store = mockStore({
            users: {
                loading: false,
                error: null,
                users: mockUsers
            }
        });

        render(
            <Provider store={store}>
                <Home />
            </Provider>
        );

        expect(screen.getByText('John Doe')).toBeInTheDocument();
        expect(screen.getByText('john@example.com')).toBeInTheDocument();
        expect(screen.getByText('123-456-7890')).toBeInTheDocument();
        expect(screen.getByText('Jane Smith')).toBeInTheDocument();
        expect(screen.getByText('jane@example.com')).toBeInTheDocument();
        expect(screen.getByText('098-765-4321')).toBeInTheDocument();
    });

    it('dispatches fetchUsersStart on mount', () => {
        render(
            <Provider store={store}>
                <Home />
            </Provider>
        );

        const actions = store.getActions();
        expect(actions[0]).toEqual(fetchUsersStart());
    });
}); 