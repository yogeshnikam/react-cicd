import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { BrowserRouter } from 'react-router-dom';
import Home from '../Home';
import { fetchUsersStart } from '../../redux/actions/userActions';

// Create mock store
const mockStore = configureStore([]);

describe('Home Component', () => {
    let store;

    beforeEach(() => {
        store = mockStore({
            user: {
                users: [],
                loading: false,
                error: null,
            },
        });
    });

    it('renders loading state correctly', () => {
        store = mockStore({
            user: {
                users: [],
                loading: true,
                error: null,
            },
        });

        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Home />
                </BrowserRouter>
            </Provider>
        );

        expect(screen.getByText('Loading users...')).toBeInTheDocument();
    });

    it('renders error state correctly', () => {
        store = mockStore({
            user: {
                users: [],
                loading: false,
                error: 'Failed to fetch users',
            },
        });

        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Home />
                </BrowserRouter>
            </Provider>
        );

        expect(screen.getByText('Error: Failed to fetch users')).toBeInTheDocument();
    });

    it('renders users list correctly', () => {
        const mockUsers = [
            { id: 1, name: 'John Doe', email: 'john@example.com', phone: '1234567890' },
            { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '0987654321' },
        ];

        store = mockStore({
            user: {
                users: mockUsers,
                loading: false,
                error: null,
            },
        });

        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Home />
                </BrowserRouter>
            </Provider>
        );

        expect(screen.getByText('John Doe')).toBeInTheDocument();
        expect(screen.getByText('john@example.com')).toBeInTheDocument();
        expect(screen.getByText('Jane Smith')).toBeInTheDocument();
        expect(screen.getByText('jane@example.com')).toBeInTheDocument();
    });

    it('dispatches fetchUsersStart action on mount', async () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Home />
                </BrowserRouter>
            </Provider>
        );

        await waitFor(() => {
            const actions = store.getActions();
            expect(actions).toContainEqual(fetchUsersStart());
        });
    });
}); 