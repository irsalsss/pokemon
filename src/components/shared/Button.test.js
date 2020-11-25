import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Button from './Button';

afterEach(cleanup)

describe('button component', () => {
  it('renders correctly', () => {
    const { getByTestId } = render(<Button>Test</Button> )
    expect(getByTestId('button')).toHaveTextContent('Test')
  })

  it('should have attribute disabled', () => {
    const { getByTestId } = render(<Button disabled={true}>Test</Button> )
    expect(getByTestId('button')).toHaveAttribute('disabled')
  })

  it('should clicked once', () => {
    const mockCallback = jest.fn();

    const { getByTestId } = render(<Button onClick={mockCallback}>Test</Button> )
    fireEvent.click(getByTestId('button'))
    expect(mockCallback).toHaveBeenCalledTimes(1)
  })
})