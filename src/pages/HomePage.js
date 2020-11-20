import React, { useEffect } from 'react';
import { listPokemons } from '../client/PokemonApi';
import { PrimaryButton, SecondaryButton } from '../components/shared/Button';
import Card from '../components/shared/Card';
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
      <Card>
        <p>Bulbasaur</p>
      </Card>
    </div>
  )
}

export default HomePage