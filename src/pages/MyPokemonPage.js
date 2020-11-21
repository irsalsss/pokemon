import React, { useEffect } from 'react';
import './MyPokemonPage.scss';
import Card from '../components/shared/Card';
import { usePokemon } from '../context/PokemonContext';

const MyPokemonPage = () => {
  const { dictionaryPokemon, myPokemonData, setStateMyPokemonData, removePokemon } = usePokemon()

  useEffect(() => {
    if (myPokemonData.length == 0){
      setStateMyPokemonData()
    }
  }, [])

  return (
    <div className='container-my-pokemon'>
      <h2 className='title-page'>My Pokemon</h2>

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
            <React.Fragment>
              <p className='text-center full-width capitalize'>{pokemon.name}</p>
              <p className='text-center full-width'>{pokemon.username}</p>
            </React.Fragment>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default MyPokemonPage;