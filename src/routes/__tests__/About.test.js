import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import About from '../About';

describe('About Component', () => {
    it('renders about page content correctly', () => {
        render(
            <BrowserRouter>
                <About />
            </BrowserRouter>
        );

        expect(screen.getByText('About Us')).toBeInTheDocument();
        expect(screen.getByText('This is a React application demonstrating:')).toBeInTheDocument();
        expect(screen.getByText('Redux Toolkit for state management')).toBeInTheDocument();
        expect(screen.getByText('Redux Saga for side effects')).toBeInTheDocument();
        expect(screen.getByText('React Router for navigation')).toBeInTheDocument();
        expect(screen.getByText('Code splitting for performance')).toBeInTheDocument();
        expect(screen.getByText('Webpack configuration for different environments')).toBeInTheDocument();
    });

    it('contains a link to the home page', () => {
        render(
            <BrowserRouter>
                <About />
            </BrowserRouter>
        );

        const homeLink = screen.getByText('Go to Home');
        expect(homeLink).toBeInTheDocument();
        expect(homeLink.closest('a')).toHaveAttribute('href', '/');
    });
}); 