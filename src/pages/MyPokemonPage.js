import React, { useEffect } from 'react';
import Card from '../components/shared/Card';
import TitlePage from '../components/shared/TitlePage';
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
      <TitlePage title='my pokemon' total={myPokemonData.length} />

      <div className='list-card-wrapper'>
        {myPokemonData && myPokemonData.map((pokemon, idx) => (
          <Card
            key={idx}
            id={String(pokemon.id)}
            unique={pokemon.username}
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