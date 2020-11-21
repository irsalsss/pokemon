import React, { useEffect } from 'react';
import { usePokemon } from '../context/PokemonContext';
import { useParams } from "react-router-dom";
import Pokeball from '../../public/assets/img/pokeball.png';
import './DetailPage.scss';

const DetailPage = () => {
  const { id } = useParams()
  const { singlePokemonData, fetchPokemonById } = usePokemon();
  console.log('singlePokemonData', singlePokemonData)

  useEffect(() => {
    if (id){
      fetchPokemonById(id)
    }
  }, [])

  return (
    <div className='container-detail-page'>
      {Object.keys(singlePokemonData).length !== 0 && (
        <React.Fragment>
          <h2 className='title-page'>{singlePokemonData.name}</h2>

          <div className='image-wrapper'>
            <img alt={singlePokemonData.name} width='96px' height='96px' src={singlePokemonData?.sprites?.front_default} />
            <img alt={singlePokemonData.name} width='96px' height='96px' src={singlePokemonData?.sprites?.back_default} />
          </div>

          <div className='pokemon-information'>
            <div className='wrapper-information'>
              <b>Types:</b>

              <div className='list'>
                {singlePokemonData?.types.map((type, idx) => (
                  <p className='ml-2' key={idx}>{type.type.name}{idx !== singlePokemonData.types.length - 1 ? ',' : ''}</p>
                ))}
              </div>
            </div>

            <div className='wrapper-information'>
              <b>Moves:</b>

              <div className='list'>
                {singlePokemonData?.moves.map((move, idx) => (
                  <p className='ml-2' key={idx}>{move.move.name}{idx !== singlePokemonData.moves.length - 1 ? ',' : ''}</p>
                ))}
              </div>
            </div>
          </div>

          <div className='catch-container'>
            <p className='text-catch'>catch the pokemon</p>
            <img className='img-pokeball' alt='catch pokemon button' width='60px' height='60px' src={Pokeball} />
          </div>

        </React.Fragment>
      )}
    </div>
  )
}

export default DetailPage;