import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Modal from './Modal';

afterEach(cleanup)

describe('modal component', () => {
  it('renders correctly and should be able to click the overlay', () => {
    const mockCallback = jest.fn();

    const { getByTestId } = render (
      <Modal closeModal={mockCallback}>
        <p>Test</p>
      </Modal>
    )

      fireEvent.click(getByTestId('modal-overlay'))
      expect(mockCallback).toHaveBeenCalledTimes(1);
  })
})