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

        expect(screen.getByText('About Page')).toBeInTheDocument();
        expect(screen.getByText('This is the about page of our React application.')).toBeInTheDocument();
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