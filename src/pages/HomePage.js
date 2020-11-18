import React from 'react';
import { PrimaryButton, SecondaryButton } from '../components/shared/Button';
import './HomePage.scss';

const HomePage = () => {
  return (
    <div className="container-home-page">
      Ini adalah HomePage
      <SecondaryButton>HomePage</SecondaryButton>
      <PrimaryButton>HomePage</PrimaryButton>
    </div>
  )
}

export default HomePage