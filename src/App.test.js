import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App'; // adjust the path if needed

describe('App component', () => {
  test('renders the heading', () => {
    render(<App />);
    const headingElement = screen.getByText(/My React Application/i);
    expect(headingElement).toBeInTheDocument();
  });
});