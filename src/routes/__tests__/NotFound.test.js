import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import NotFound from '../NotFound';

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

describe('NotFound Component', () => {
    beforeEach(() => {
        // Clear all mocks
        jest.clearAllMocks();
    });

    it('renders 404 message correctly', () => {
        render(
            <BrowserRouter>
                <NotFound />
            </BrowserRouter>
        );

        expect(screen.getByText('404 - Page Not Found')).toBeInTheDocument();
        expect(screen.getByText('The page you are looking for does not exist.')).toBeInTheDocument();
    });

    it('contains a link to the home page', () => {
        render(
            <BrowserRouter>
                <NotFound />
            </BrowserRouter>
        );

        const homeLink = screen.getByText('Go back to Home');
        expect(homeLink).toBeInTheDocument();
        expect(homeLink.closest('a')).toHaveAttribute('href', '/');
    });

    it('renders with MemoryRouter', () => {
        render(
            <MemoryRouter>
                <NotFound />
            </MemoryRouter>
        );

        expect(screen.getByText('404 - Page Not Found')).toBeInTheDocument();
    });

    it('handles navigation to home page', () => {
        render(
            <MemoryRouter initialEntries={['/non-existent']}>
                <NotFound />
            </MemoryRouter>
        );

        const homeLink = screen.getByText('Go back to Home');
        expect(homeLink).toBeInTheDocument();
        expect(homeLink.closest('a')).toHaveAttribute('href', '/');
    });

    it('maintains content after re-render', () => {
        const { rerender } = render(
            <BrowserRouter>
                <NotFound />
            </BrowserRouter>
        );

        rerender(
            <BrowserRouter>
                <NotFound />
            </BrowserRouter>
        );

        expect(screen.getByText('404 - Page Not Found')).toBeInTheDocument();
        expect(screen.getByText('Go back to Home')).toBeInTheDocument();
    });

    it('has correct container class', () => {
        const { container } = render(
            <BrowserRouter>
                <NotFound />
            </BrowserRouter>
        );

        expect(container.querySelector('.not-found-container')).toBeInTheDocument();
    });

    it('has correct link class', () => {
        render(
            <BrowserRouter>
                <NotFound />
            </BrowserRouter>
        );

        const homeLink = screen.getByText('Go back to Home');
        expect(homeLink.closest('a')).toHaveClass('home-link');
    });
}); 