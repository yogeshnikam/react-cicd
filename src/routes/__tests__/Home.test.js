import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import Home from '../Home';

// Mock the store
const mockStore = configureStore([]);

describe('Home Component', () => {
    let store;

    beforeEach(() => {
        store = mockStore({
            users: {
                users: [],
                loading: false,
                error: null
            }
        });
    });

    it('renders loading state', () => {
        store = mockStore({
            users: {
                users: [],
                loading: true,
                error: null
            }
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

    it('renders error state', () => {
        store = mockStore({
            users: {
                users: [],
                loading: false,
                error: 'Failed to fetch users'
            }
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

    it('renders list of users', () => {
        const mockUsers = [
            { id: 1, name: 'John Doe', email: 'john@example.com', phone: '123-456-7890' },
            { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '987-654-3210' }
        ];

        store = mockStore({
            users: {
                users: mockUsers,
                loading: false,
                error: null
            }
        });

        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Home />
                </BrowserRouter>
            </Provider>
        );

        expect(screen.getByText('John Doe')).toBeInTheDocument();
        expect(screen.getByText((content, element) => {
            return element.textContent === 'Email: john@example.com';
        })).toBeInTheDocument();
        expect(screen.getByText((content, element) => {
            return element.textContent === 'Phone: 123-456-7890';
        })).toBeInTheDocument();
        expect(screen.getByText('Jane Smith')).toBeInTheDocument();
        expect(screen.getByText((content, element) => {
            return element.textContent === 'Email: jane@example.com';
        })).toBeInTheDocument();
        expect(screen.getByText((content, element) => {
            return element.textContent === 'Phone: 987-654-3210';
        })).toBeInTheDocument();
    });

    it('dispatches fetchUsersStart action on mount', () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Home />
                </BrowserRouter>
            </Provider>
        );

        const actions = store.getActions();
        expect(actions).toContainEqual({ type: 'users/fetchUsersStart' });
    });
}); 