import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import App from '../App';

// Mock lazy-loaded components
jest.mock('../routes/Home', () => () => <div>Home Component</div>);
jest.mock('../routes/About', () => () => <div>About Component</div>);
jest.mock('../routes/NotFound', () => () => <div>Not Found Component</div>);
jest.mock('../components/Preload', () => () => <div data-testid="preload" />);

// Mock the store
const mockStore = configureStore([]);

describe('App Component', () => {
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

    it('renders navigation links', () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </Provider>
        );

        expect(screen.getByText('Home')).toBeInTheDocument();
        expect(screen.getByText('About')).toBeInTheDocument();
    });

    it('renders Preload component', () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </Provider>
        );

        expect(screen.getByTestId('preload')).toBeInTheDocument();
    });

    it('matches snapshot', () => {
        const { container } = render(
            <Provider store={store}>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </Provider>
        );

        expect(container).toMatchSnapshot();
    });
});
