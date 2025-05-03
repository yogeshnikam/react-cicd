import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Mock ReactDOM.createRoot and its render method
jest.mock('react-dom/client', () => {
  return {
    createRoot: jest.fn(() => ({
      render: jest.fn(),
    })),
  };
});

describe('index.js', () => {
  it('renders App component', () => {
    // This will import and execute your actual index.js file
    require('./index');

    expect(ReactDOM.createRoot).toHaveBeenCalled();
    const container = document.getElementById('root');
    expect(ReactDOM.createRoot).toHaveBeenCalledWith(container);
  });
});
