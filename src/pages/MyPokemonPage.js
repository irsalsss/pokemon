import React from 'react';
import { usePokemon } from '../context/PokemonContext';

const MyPokemonPage = () => {
  const { myPokemonData } = usePokemon()
  console.log('myPokemonData', myPokemonData)
  return (
    <div>

    </div>
  )
}

export default MyPokemonPage;