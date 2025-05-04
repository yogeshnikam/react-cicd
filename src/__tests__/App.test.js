import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

// ✅ Correct mocks
jest.mock('../components/Counter', () => ({
  Counter: () => <div data-testid="mock-counter">Mock Counter</div>,
}));

jest.mock('../components/UserList', () => {
  return {
    __esModule: true,
    default: () => <div data-testid="mock-userlist">Mock UserList</div>,
  };
});

describe('App Component', () => {
  it('renders application title and child components', () => {
    render(<App />);

    expect(screen.getByText('My React Application')).toBeInTheDocument();
    expect(screen.getByTestId('mock-counter')).toBeInTheDocument();
    expect(screen.getByTestId('mock-userlist')).toBeInTheDocument();
  });
});
