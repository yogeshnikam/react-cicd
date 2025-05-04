import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from '../redux/store';
import App from '../App';

// Mock ReactDOM.createRoot and its render method
jest.mock('react-dom/client', () => ({
  createRoot: jest.fn(),
}));

describe('App Entry Point', () => {
  it('renders the React app without crashing', () => {
    const mockRender = jest.fn();
    const mockRoot = { render: mockRender };
    const mockCreateRoot = ReactDOM.createRoot;
    mockCreateRoot.mockReturnValue(mockRoot);

    // Create a mock root div in document
    const rootElement = document.createElement('div');
    rootElement.id = 'root';
    document.body.appendChild(rootElement);

    // Dynamically import index (which runs the render logic)
    require('../index');

    // Assertions
    expect(mockCreateRoot).toHaveBeenCalledWith(rootElement);
    expect(mockRender).toHaveBeenCalledTimes(1);
  });
});
