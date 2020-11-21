import React, { useEffect } from 'react';
import Card from '../components/shared/Card';
import { usePokemon } from '../context/PokemonContext';
import { urlToId } from '../utils/Helper';
import './HomePage.scss';

const HomePage = () => {
  const { initialData, dictionaryPokemon, myPokemonData, fetchListPokemons, resetState, setStateMyPokemonData } = usePokemon();
  console.log('initialData', initialData)
  useEffect(() => {
    fetchListPokemons(0)
    resetState()

    if (myPokemonData.length == 0){
      setStateMyPokemonData()
    }
  }, [])

  return (
    <div className="container-home-page">
      <h2 className='title-page'>List Pokemon</h2>

      <div className='list-card-wrapper'>
        {initialData.results && initialData.results.map((pokemon, idx) => (
          <Card key={idx} id={urlToId(pokemon.url)} owned={dictionaryPokemon[pokemon.name] || 0}>
            <p className='text-center full-width capitalize'>{pokemon.name}</p>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default HomePage