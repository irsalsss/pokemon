import React, { useEffect } from 'react';
import { usePokemon } from '../context/PokemonContext';
import { useParams } from "react-router-dom";

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
    <div>
      ada
    </div>
  )
}

export default DetailPage;