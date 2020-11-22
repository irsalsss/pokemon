import React, { useEffect } from 'react';
import Card from '../components/shared/Card';
import { usePokemon } from '../context/PokemonContext';

const MyPokemonPage = () => {
  const { dictionaryPokemon, myPokemonData, resetState, setStateMyPokemonData, removePokemon } = usePokemon()

  useEffect(() => {
    resetState()
    if (myPokemonData.length == 0){
      setStateMyPokemonData()
    }
  }, [])

  return (
    <div className='container-my-pokemon'>
      <h2 className='title-page'>My Pokemon</h2>
      <h2 className='title-page'>(Total Owned: {myPokemonData.length})</h2>

      <div className='list-card-wrapper'>
        {myPokemonData && myPokemonData.map((pokemon, idx) => (
          <Card
            key={idx}
            id={String(pokemon.id)}
            owned={dictionaryPokemon[pokemon.name] || 0}
            withCloseButton={true}
            onRemove={(e) =>  {
              e.stopPropagation();
              removePokemon({ username: pokemon.username, name: pokemon.name })
            }}
          >
            <div>
              <p className='mb-2 mt-2 full-width capitalize'>{pokemon.name}</p>
              <p className='mb-2 mt-2 full-width'>Username: {pokemon.username}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default MyPokemonPage;