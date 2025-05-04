import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import createSagaMiddleware from 'redux-saga';
import App from '../App';

// Create the mock store without saga middleware for testing
const mockStore = configureStore([]);

describe('App Component', () => {
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

    const renderApp = () => {
        return render(
            <Provider store={store}>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </Provider>
        );
    };

    it('renders navigation links', () => {
        renderApp();
        
        const homeLink = screen.getByText('Home');
        const aboutLink = screen.getByText('About');
        
        expect(homeLink).toBeInTheDocument();
        expect(aboutLink).toBeInTheDocument();
        expect(homeLink.closest('a')).toHaveAttribute('href', '/');
        expect(aboutLink.closest('a')).toHaveAttribute('href', '/about');
    });

    it('navigates to Home page when clicking Home link', () => {
        renderApp();
        
        const homeLink = screen.getByText('Home');
        fireEvent.click(homeLink);
        
        expect(window.location.pathname).toBe('/');
    });

    it('navigates to About page when clicking About link', () => {
        renderApp();
        
        const aboutLink = screen.getByText('About');
        fireEvent.click(aboutLink);
        
        expect(window.location.pathname).toBe('/about');
    });

    it('renders Home component by default', () => {
        renderApp();
        
        expect(screen.getByText('User List')).toBeInTheDocument();
    });

    it('renders About component when navigating to /about', () => {
        window.history.pushState({}, '', '/about');
        renderApp();
        
        expect(screen.getByText('About Us')).toBeInTheDocument();
    });

    it('renders NotFound component for unknown routes', () => {
        window.history.pushState({}, '', '/unknown-route');
        renderApp();
        
        expect(screen.getByText('404 - Page Not Found')).toBeInTheDocument();
    });

    it('maintains navigation state after page refresh', () => {
        window.history.pushState({}, '', '/about');
        renderApp();
        
        expect(screen.getByText('About Us')).toBeInTheDocument();
        
        // Simulate page refresh
        window.history.pushState({}, '', '/about');
        renderApp();
        
        expect(screen.getByText('About Us')).toBeInTheDocument();
    });

    // Clean up after each test
    afterEach(() => {
        store.clearActions();
    });
});
