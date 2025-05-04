import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import About from '../About';

describe('About Component', () => {
    const renderAbout = () => {
        return render(
            <BrowserRouter>
                <About />
            </BrowserRouter>
        );
    };

    it('renders the about page content', () => {
        renderAbout();

        // Check main heading
        expect(screen.getByText('About Us')).toBeInTheDocument();

        // Check description
        expect(screen.getByText('This is a React application demonstrating:')).toBeInTheDocument();

        // Check list items
        expect(screen.getByText('Redux Toolkit for state management')).toBeInTheDocument();
        expect(screen.getByText('Redux Saga for side effects')).toBeInTheDocument();
        expect(screen.getByText('React Router for navigation')).toBeInTheDocument();
        expect(screen.getByText('Code splitting for performance')).toBeInTheDocument();
        expect(screen.getByText('Webpack configuration for different environments')).toBeInTheDocument();
    });

    it('renders all list items', () => {
        renderAbout();
        const listItems = screen.getAllByRole('listitem');
        expect(listItems).toHaveLength(5);
    });

    it('renders navigation links', () => {
        renderAbout();
        const homeLink = screen.getByText('Home');
        expect(homeLink).toBeInTheDocument();
        expect(homeLink.closest('a')).toHaveAttribute('href', '/');
    });
}); 