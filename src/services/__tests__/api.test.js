import axios from 'axios';
import { fetchUsers } from '../api';

// Mock axios
jest.mock('axios');

describe('API Service', () => {
    const mockUsers = [
        { id: 1, name: 'John Doe', email: 'john@example.com' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
    ];

    beforeEach(() => {
        // Clear all mocks before each test
        jest.clearAllMocks();
    });

    it('successfully fetches users', async () => {
        // Mock successful API response
        axios.get.mockResolvedValueOnce({ data: mockUsers });

        const result = await fetchUsers();

        expect(axios.get).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/users');
        expect(result).toEqual(mockUsers);
    });

    it('handles API error', async () => {
        // Mock API error
        const errorMessage = 'Network Error';
        axios.get.mockRejectedValueOnce(new Error(errorMessage));

        await expect(fetchUsers()).rejects.toThrow('Failed to fetch users');
        expect(axios.get).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/users');
    });

    it('handles empty response', async () => {
        // Mock empty response
        axios.get.mockResolvedValueOnce({ data: [] });

        const result = await fetchUsers();

        expect(axios.get).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/users');
        expect(result).toEqual([]);
    });

    it('handles malformed response', async () => {
        // Mock malformed response
        axios.get.mockResolvedValueOnce({ data: null });

        const result = await fetchUsers();

        expect(axios.get).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/users');
        expect(result).toBeNull();
    });

    it('handles network timeout', async () => {
        // Mock network timeout
        axios.get.mockRejectedValueOnce({ code: 'ECONNABORTED' });

        await expect(fetchUsers()).rejects.toThrow('Failed to fetch users');
        expect(axios.get).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/users');
    });

    it('handles 404 error', async () => {
        // Mock 404 error
        axios.get.mockRejectedValueOnce({ response: { status: 404 } });

        await expect(fetchUsers()).rejects.toThrow('Failed to fetch users');
        expect(axios.get).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/users');
    });

    it('handles 500 error', async () => {
        // Mock 500 error
        axios.get.mockRejectedValueOnce({ response: { status: 500 } });

        await expect(fetchUsers()).rejects.toThrow('Failed to fetch users');
        expect(axios.get).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/users');
    });

    it('handles invalid JSON response', async () => {
        // Mock invalid JSON response
        axios.get.mockResolvedValueOnce({ data: 'invalid json' });

        const result = await fetchUsers();

        expect(axios.get).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/users');
        expect(result).toBe('invalid json');
    });

    it('handles multiple consecutive calls', async () => {
        // Mock multiple successful responses
        axios.get
            .mockResolvedValueOnce({ data: mockUsers })
            .mockResolvedValueOnce({ data: [] });

        const firstResult = await fetchUsers();
        const secondResult = await fetchUsers();

        expect(axios.get).toHaveBeenCalledTimes(2);
        expect(firstResult).toEqual(mockUsers);
        expect(secondResult).toEqual([]);
    });

    it('handles mixed success and error responses', async () => {
        // Mock mixed responses
        axios.get
            .mockResolvedValueOnce({ data: mockUsers })
            .mockRejectedValueOnce(new Error('Network Error'));

        const firstResult = await fetchUsers();
        await expect(fetchUsers()).rejects.toThrow('Failed to fetch users');

        expect(axios.get).toHaveBeenCalledTimes(2);
        expect(firstResult).toEqual(mockUsers);
    });
}); 