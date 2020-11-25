import React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TitlePage from './TitlePage';

afterEach(cleanup)

describe('title page component', () => {
  it('should renders correctly', () => {
    const { getByTestId } = render (
      <TitlePage title='List Pokemon' total={10} />
    )

    expect(getByTestId('total-my-pokemon')).toHaveTextContent(/(total owned: 10)/i)
    expect(getByTestId('title-page')).toHaveTextContent(/list pokemon/i)
  })
})