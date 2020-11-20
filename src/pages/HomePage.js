import React, { useEffect } from 'react';
import { listPokemons } from '../client/PokemonApi';
import { PrimaryButton, SecondaryButton } from '../components/shared/Button';
import './HomePage.scss';

const HomePage = () => {

  const fetchListPokemons = async(offset) => {
    const { data } = await listPokemons({ offset })
    console.log(data)
  }

  useEffect(() => {
    fetchListPokemons(0)
  }, [])

  return (
    <div className="container-home-page">
      Ini adalah HomePage
      <SecondaryButton>HomePage</SecondaryButton>
      <PrimaryButton>HomePage</PrimaryButton>
    </div>
  )
}

export default HomePage