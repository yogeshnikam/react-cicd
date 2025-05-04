import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import Preload from '../Preload';

// Mock dynamic imports
jest.mock('../routes/About', () => ({
    __esModule: true,
    default: () => <div>About Component</div>
}));

jest.mock('../routes/Home', () => ({
    __esModule: true,
    default: () => <div>Home Component</div>
}));

// Mock console.error
const originalConsoleError = console.error;
beforeAll(() => {
    console.error = jest.fn();
});

afterAll(() => {
    console.error = originalConsoleError;
});

describe('Preload Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders preload element', () => {
        render(
            <BrowserRouter>
                <Preload />
            </BrowserRouter>
        );
        expect(screen.getByTestId('preload')).toBeInTheDocument();
    });

    it('preloads About component when on home route', async () => {
        const mockPreload = jest.fn();
        jest.spyOn(React, 'useEffect').mockImplementation((fn) => fn());

        render(
            <MemoryRouter initialEntries={['/']}>
                <Preload />
            </MemoryRouter>
        );

        await act(async () => {
            // Wait for any async operations
            await new Promise(resolve => setTimeout(resolve, 0));
        });

        expect(console.error).not.toHaveBeenCalled();
    });

    it('preloads Home component when on about route', async () => {
        const mockPreload = jest.fn();
        jest.spyOn(React, 'useEffect').mockImplementation((fn) => fn());

        render(
            <MemoryRouter initialEntries={['/about']}>
                <Preload />
            </MemoryRouter>
        );

        await act(async () => {
            // Wait for any async operations
            await new Promise(resolve => setTimeout(resolve, 0));
        });

        expect(console.error).not.toHaveBeenCalled();
    });

    it('handles preload error for About component', async () => {
        const mockError = new Error('Failed to load About component');
        jest.spyOn(console, 'error').mockImplementation(() => {});
        
        // Mock the dynamic import to throw an error
        jest.spyOn(require('../routes/About'), 'default').mockImplementation(() => {
            throw mockError;
        });

        render(
            <MemoryRouter initialEntries={['/']}>
                <Preload />
            </MemoryRouter>
        );

        await act(async () => {
            await new Promise(resolve => setTimeout(resolve, 0));
        });
        
        expect(console.error).toHaveBeenCalledWith(
            'Failed to preload About component:',
            mockError
        );
    });

    it('handles preload error for Home component', async () => {
        const mockError = new Error('Failed to load Home component');
        jest.spyOn(console, 'error').mockImplementation(() => {});
        
        // Mock the dynamic import to throw an error
        jest.spyOn(require('../routes/Home'), 'default').mockImplementation(() => {
            throw mockError;
        });

        render(
            <MemoryRouter initialEntries={['/about']}>
                <Preload />
            </MemoryRouter>
        );

        await act(async () => {
            await new Promise(resolve => setTimeout(resolve, 0));
        });
        
        expect(console.error).toHaveBeenCalledWith(
            'Failed to preload Home component:',
            mockError
        );
    });

    it('does not preload on unknown routes', async () => {
        render(
            <MemoryRouter initialEntries={['/unknown']}>
                <Preload />
            </MemoryRouter>
        );

        await act(async () => {
            await new Promise(resolve => setTimeout(resolve, 0));
        });

        expect(console.error).not.toHaveBeenCalled();
    });

    it('updates preload when route changes', async () => {
        const { rerender } = render(
            <MemoryRouter initialEntries={['/']}>
                <Preload />
            </MemoryRouter>
        );

        await act(async () => {
            await new Promise(resolve => setTimeout(resolve, 0));
        });

        // Change route to about
        rerender(
            <MemoryRouter initialEntries={['/about']}>
                <Preload />
            </MemoryRouter>
        );

        await act(async () => {
            await new Promise(resolve => setTimeout(resolve, 0));
        });

        expect(console.error).not.toHaveBeenCalled();
    });

    it('handles multiple route changes', async () => {
        const { rerender } = render(
            <MemoryRouter initialEntries={['/']}>
                <Preload />
            </MemoryRouter>
        );

        await act(async () => {
            await new Promise(resolve => setTimeout(resolve, 0));
        });

        // Change route to about
        rerender(
            <MemoryRouter initialEntries={['/about']}>
                <Preload />
            </MemoryRouter>
        );

        await act(async () => {
            await new Promise(resolve => setTimeout(resolve, 0));
        });

        // Change route back to home
        rerender(
            <MemoryRouter initialEntries={['/']}>
                <Preload />
            </MemoryRouter>
        );

        await act(async () => {
            await new Promise(resolve => setTimeout(resolve, 0));
        });

        expect(console.error).not.toHaveBeenCalled();
    });

    it('maintains preload element after route changes', async () => {
        const { rerender } = render(
            <MemoryRouter initialEntries={['/']}>
                <Preload />
            </MemoryRouter>
        );

        expect(screen.getByTestId('preload')).toBeInTheDocument();

        await act(async () => {
            await new Promise(resolve => setTimeout(resolve, 0));
        });

        // Change route
        rerender(
            <MemoryRouter initialEntries={['/about']}>
                <Preload />
            </MemoryRouter>
        );

        await act(async () => {
            await new Promise(resolve => setTimeout(resolve, 0));
        });

        expect(screen.getByTestId('preload')).toBeInTheDocument();
    });
}); 