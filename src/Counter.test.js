import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Counter } from './Counter'; // adjust the path as needed

describe('Counter Component', () => {
  test('renders with initial count of 0', () => {
    const { getByText } = render(<Counter />);
    expect(getByText('Counter: 0')).toBeInTheDocument();
  });

  test('increments the counter when increment button is clicked', () => {
    const { getByText } = render(<Counter />);
    const incrementBtn = getByText('Increment');

    fireEvent.click(incrementBtn);
    expect(getByText('Counter: 1')).toBeInTheDocument();
  });

  test('decrements the counter when decrement button is clicked', () => {
    const { getByText } = render(<Counter />);
    const decrementBtn = getByText('Decrement');

    fireEvent.click(decrementBtn);
    expect(getByText('Counter: -1')).toBeInTheDocument();
  });

  test('handles multiple increment and decrement actions', () => {
    const { getByText } = render(<Counter />);
    const incrementBtn = getByText('Increment');
    const decrementBtn = getByText('Decrement');

    fireEvent.click(incrementBtn); // +1
    fireEvent.click(incrementBtn); // +1 => 2
    fireEvent.click(decrementBtn); // -1 => 1
    expect(getByText('Counter: 1')).toBeInTheDocument();
  });
});
