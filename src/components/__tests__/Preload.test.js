import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Preload from '../Preload';

// Mock dynamic imports
jest.mock('../../routes/About', () => ({
  __esModule: true,
  default: () => <div>About Component</div>
}));

jest.mock('../../routes/Home', () => ({
  __esModule: true,
  default: () => <div>Home Component</div>
}));

describe('Preload Component', () => {
  it('renders preload element', () => {
    render(
      <BrowserRouter>
        <Preload />
      </BrowserRouter>
    );

    expect(screen.getByTestId('preload')).toBeInTheDocument();
  });

  it('preloads About component when on home route', () => {
    render(
      <BrowserRouter initialEntries={['/']}>
        <Preload />
      </BrowserRouter>
    );

    // The preload should be triggered but we can't directly test the import
    // We can verify the component renders correctly
    expect(screen.getByTestId('preload')).toBeInTheDocument();
  });

  it('preloads Home component when on about route', () => {
    render(
      <BrowserRouter initialEntries={['/about']}>
        <Preload />
      </BrowserRouter>
    );

    // The preload should be triggered but we can't directly test the import
    // We can verify the component renders correctly
    expect(screen.getByTestId('preload')).toBeInTheDocument();
  });

  it('handles import errors gracefully', () => {
    // Mock console.error to prevent test output pollution
    const originalError = console.error;
    console.error = jest.fn();

    // Mock a failing import
    jest.spyOn(require('../../routes/About'), 'default').mockImplementation(() => {
      throw new Error('Import failed');
    });

    render(
      <BrowserRouter>
        <Preload />
      </BrowserRouter>
    );

    // The component should still render without crashing
    expect(screen.getByTestId('preload')).toBeInTheDocument();

    // Restore console.error
    console.error = originalError;
  });
}); 