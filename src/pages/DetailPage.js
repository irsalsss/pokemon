import React, { useEffect } from 'react';
import { usePokemon } from '../context/PokemonContext';
import { useParams } from "react-router-dom";
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
      {!_.isEmpty(singlePokemonData) && (
        <React.Fragment>
          <h2 className='title-page'>{singlePokemonData.name}</h2>

          <div className='image-wrapper'>
            <img alt={singlePokemonData.name} width='96px' height='96px' src={singlePokemonData?.sprites?.front_default} />
            <img alt={singlePokemonData.name} width='96px' height='96px' src={singlePokemonData?.sprites?.back_default} />
          </div>

          <div className='pokemon-information'>

          </div>
        </React.Fragment>
      )}
    </div>
  )
}

export default DetailPage;