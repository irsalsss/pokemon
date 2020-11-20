import React, { useState, useContext, createContext } from "react";
import produce from "immer";
import { listPokemons } from '../client/PokemonApi';

const PokemonContext = createContext();

const PokemonProvider = (props) => {
  const initialState = {
    initialData: {}
  }

  const [state, setState] = useState(initialState);
  const immerSetState = newState =>
    setState(currentState => produce(currentState, newState));
  const contextValue = [state, immerSetState];

  return <PokemonContext.Provider value={contextValue} {...props} />;
}

const usePokemon = () => {
  const [ { initialData }, immerSetState ] = useContext(PokemonContext);

  const fetchListPokemons = async(offset) => {
    const { data } = await listPokemons({ offset })
    if (data){
      immerSetState(draft => {
        draft.initialData = data;
      })
    }
  }

  return {
    initialData,
    fetchListPokemons,
  }
}

export { PokemonProvider, usePokemon }