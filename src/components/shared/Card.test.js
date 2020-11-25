import React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Card from './Card';

afterEach(cleanup)

describe('card component', () => {
  it('renders correctly', () => {
    const { getByTestId } = render (
      <Card withTotalOwned={true} owned={10} id={"1"}>
        <p>Test</p>
      </Card>
    )
    expect(getByTestId('pokemon-card-1')).toHaveTextContent('Test')
    expect(getByTestId('pokemon-id-1')).toHaveTextContent(/pokemon id: 1/i)
    expect(getByTestId('total-owned-1')).toHaveTextContent(/owned: 10/i)
  })

  it('should able to show remove button', () => {
    const { getByTestId } = render (
      <Card withCloseButton={true} id={"1"}>
        <p>Test</p>
      </Card>
    )
    expect(getByTestId('remove-card-button-1')).toHaveTextContent(/remove/i)
  })
})