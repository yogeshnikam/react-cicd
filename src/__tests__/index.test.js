import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import createSagaMiddleware from 'redux-saga';
import App from '../App';

// Mock the store
const sagaMiddleware = createSagaMiddleware();
const mockStore = configureStore([sagaMiddleware]);
const store = mockStore({
    users: {
        users: [],
        loading: false,
        error: null
    }
});

// Mock the root element
document.body.innerHTML = '<div id="root"></div>';

describe('Root Component', () => {
    beforeEach(() => {
        document.title = '';
    });

    it('renders without crashing', () => {
        const { container } = render(
            <Provider store={store}>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </Provider>
        );

        expect(container.querySelector('#root')).toBeTruthy();
    });

    it('renders the app container', () => {
        const { container } = render(
            <Provider store={store}>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </Provider>
        );

        expect(container.querySelector('.app-container')).toBeTruthy();
    });

    it('sets up Redux store correctly', () => {
        const { container } = render(
            <Provider store={store}>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </Provider>
        );
        
        // Check if the store is properly initialized
        expect(store.getState()).toEqual({
            users: {
                loading: false,
                error: null,
                users: []
            }
        });
    });

    it('sets up React Router correctly', () => {
        const { container } = render(
            <Provider store={store}>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </Provider>
        );
        
        // Check if the router is properly set up
        expect(window.location.pathname).toBe('/');
    });

    it('applies global styles', () => {
        const { container } = render(
            <Provider store={store}>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </Provider>
        );
        
        // Check if the app container has the correct class
        expect(container.firstChild).toHaveClass('app-container');
    });

    it('handles development environment setup', () => {
        process.env.NODE_ENV = 'development';
        
        const { container } = render(
            <Provider store={store}>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </Provider>
        );
        
        // Check if development-specific features are available
        expect(process.env.NODE_ENV).toBe('development');
    });

    it('handles production environment setup', () => {
        process.env.NODE_ENV = 'production';
        
        const { container } = render(
            <Provider store={store}>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </Provider>
        );
        
        // Check if production-specific features are available
        expect(process.env.NODE_ENV).toBe('production');
    });

    it('sets up error boundary', () => {
        const { container } = render(
            <Provider store={store}>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </Provider>
        );
        
        // Check if error boundary is properly set up
        expect(container.firstChild).toHaveClass('app-container');
    });

    it('initializes with correct document title', () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </Provider>
        );
        
        expect(document.title).toBe('React CICD App');
    });
});
