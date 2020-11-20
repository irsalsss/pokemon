import React, { useEffect } from 'react';
import Card from '../components/shared/Card';
import { usePokemon } from '../context/PokemonContext';
import './HomePage.scss';

const HomePage = () => {
  const { initialData, fetchListPokemons } = usePokemon();
  console.log('initialData', initialData)
  useEffect(() => {
    fetchListPokemons(0)
  }, [])

  return (
    <div className="container-home-page">
      <Card>
        <p className='text-center full-width'>Bulbasaur</p>
      </Card>
    </div>
  )
}

export default HomePage