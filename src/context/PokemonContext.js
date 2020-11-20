import React, { useState, useContext, createContext } from "react";
import produce from "immer";
import { listPokemons, detailPokemon } from '../client/PokemonApi';

const PokemonContext = createContext();

const PokemonProvider = (props) => {
  const initialState = {
    initialData: {},
    singlePokemonData: {}
  }

  const [state, setState] = useState(initialState);
  const immerSetState = newState =>
    setState(currentState => produce(currentState, newState));
  const contextValue = [state, immerSetState];

  return <PokemonContext.Provider value={contextValue} {...props} />;
}

const usePokemon = () => {
  const [ { initialData, singlePokemonData }, immerSetState ] = useContext(PokemonContext);

  const fetchListPokemons = async(offset) => {
    const { data } = await listPokemons({ offset })
    if (data){
      immerSetState(draft => {
        draft.initialData = data;
      })
    }
  }

  const fetchPokemonById = async(id) => {
    const { data } = await detailPokemon(id)
    if (data){
      immerSetState(draft => {
        draft.singlePokemonData = data;
      })
    }
  }

  return {
    initialData,
    singlePokemonData,

    fetchListPokemons,
    fetchPokemonById
  }
}

export { PokemonProvider, usePokemon }