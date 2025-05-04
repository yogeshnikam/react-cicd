import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import About from '../About';

// Suppress React Router warning
const originalWarn = console.warn;
beforeAll(() => {
    console.warn = (...args) => {
        if (args[0].includes('React Router Future Flag Warning')) {
            return;
        }
        originalWarn(...args);
    };
});

afterAll(() => {
    console.warn = originalWarn;
});

describe('About Component', () => {
    beforeEach(() => {
        // Clear all mocks
        jest.clearAllMocks();
    });

    it('renders about page content correctly', async () => {
        await act(async () => {
            render(
                <BrowserRouter>
                    <About />
                </BrowserRouter>
            );
        });

        expect(screen.getByText('About Us')).toBeInTheDocument();
        expect(screen.getByText('This is a React application demonstrating:')).toBeInTheDocument();
        expect(screen.getByText('Redux Toolkit for state management')).toBeInTheDocument();
        expect(screen.getByText('Redux Saga for side effects')).toBeInTheDocument();
        expect(screen.getByText('React Router for navigation')).toBeInTheDocument();
        expect(screen.getByText('Code splitting for performance')).toBeInTheDocument();
        expect(screen.getByText('Webpack configuration for different environments')).toBeInTheDocument();
    });

    it('contains a link to the home page', async () => {
        await act(async () => {
            render(
                <BrowserRouter>
                    <About />
                </BrowserRouter>
            );
        });

        const homeLink = screen.getByText('Go to Home');
        expect(homeLink).toBeInTheDocument();
        expect(homeLink.closest('a')).toHaveAttribute('href', '/');
    });

    it('renders with MemoryRouter', async () => {
        await act(async () => {
            render(
                <MemoryRouter>
                    <About />
                </MemoryRouter>
            );
        });

        expect(screen.getByText('About Us')).toBeInTheDocument();
    });

    it('handles navigation to home page', async () => {
        await act(async () => {
            render(
                <MemoryRouter initialEntries={['/about']}>
                    <About />
                </MemoryRouter>
            );
        });

        const homeLink = screen.getByText('Go to Home');
        expect(homeLink).toBeInTheDocument();
        expect(homeLink.closest('a')).toHaveAttribute('href', '/');
    });

    it('maintains content after re-render', async () => {
        const { rerender } = render(
            <BrowserRouter>
                <About />
            </BrowserRouter>
        );

        await act(async () => {
            rerender(
                <BrowserRouter>
                    <About />
                </BrowserRouter>
            );
        });

        expect(screen.getByText('About Us')).toBeInTheDocument();
        expect(screen.getByText('Go to Home')).toBeInTheDocument();
    });

    it('handles component updates', async () => {
        const { container } = render(
            <BrowserRouter>
                <About />
            </BrowserRouter>
        );

        await act(async () => {
            // Simulate a component update
            container.dispatchEvent(new Event('click'));
        });

        expect(screen.getByText('About Us')).toBeInTheDocument();
    });
}); 