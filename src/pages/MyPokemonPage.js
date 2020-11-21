import React from 'react';
import './MyPokemonPage.scss';
import Card from '../components/shared/Card';
import { usePokemon } from '../context/PokemonContext';

const MyPokemonPage = () => {
  const { dictionaryPokemon, myPokemonData, removePokemon } = usePokemon()
  console.log('myPokemonData', myPokemonData)
  return (
    <div className='container-my-pokemon'>
      <h2 className='title-page'>My Pokemon</h2>

      {myPokemonData && myPokemonData.map((pokemon, idx) => (
        <Card
          key={idx}
          id={String(idx + 1)}
          owned={dictionaryPokemon[pokemon.name] || 0}
          withCloseButton={true}
          onRemove={(e) =>  {
            e.stopPropagation();
            removePokemon({ username: pokemon.username, name: pokemon.name })
          }}
        >
          <React.Fragment>
            <p className='text-center full-width capitalize'>{pokemon.name}</p>
            <p className='text-center full-width'>{pokemon.username}</p>
          </React.Fragment>
        </Card>
      ))}
    </div>
  )
}

export default MyPokemonPage;