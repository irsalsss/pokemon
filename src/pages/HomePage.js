import React, { useEffect } from 'react';
import Card from '../components/shared/Card';
import { usePokemon } from '../context/PokemonContext';
import { loadMoreValidator, urlToId } from '../utils/Helper';

const HomePage = () => {
  const {
    initialData, dictionaryPokemon, myPokemonData,
    fetchListPokemons, fetchMorePokemons, resetState, setStateMyPokemonData
  } = usePokemon();

  useEffect(() => {
    fetchListPokemons(0)
    resetState()

    if (myPokemonData.length == 0){
      setStateMyPokemonData()
    }
  }, [])

  const _onScroll = (e) => {
    const target = e.target;

    if (initialData.next){
      loadMoreValidator(target, 30, () => fetchMorePokemons(initialData.next))
    }
  }

  return (
    <div className="container-home-page" data-cy="container-home-page" onScroll={e => _onScroll(e)}>
      <h2 className='title-page'>List Pokemon</h2>
      <h2 className='title-page'>(Total Owned: {myPokemonData.length})</h2>

      <div className='list-card-wrapper'>
        {initialData.results && initialData.results.map((pokemon, idx) => (
          <Card key={idx} id={urlToId(pokemon.url)} owned={dictionaryPokemon[pokemon.name] || 0} withTotalOwned={true}>
            <p className='mb-2 mt-2 text-center full-width capitalize'>{pokemon.name}</p>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default HomePage