import React, { useState, useContext, createContext } from "react";
import produce from "immer";
import { listPokemons, detailPokemon } from '../client/PokemonApi';
import { successfullLogic } from "../utils/Helper";

const PokemonContext = createContext();

const PokemonProvider = (props) => {
  const initialState = {
    initialData: {},
    singlePokemonData: {},
    showModal: false,
    isPokemonCaught: false,
    myPokemonData: [],
    username: '',
  }

  const [state, setState] = useState(initialState);
  const immerSetState = newState =>
    setState(currentState => produce(currentState, newState));
  const contextValue = [state, immerSetState];

  return <PokemonContext.Provider value={contextValue} {...props} />;
}

const usePokemon = () => {
  const [ { initialData, singlePokemonData, myPokemonData, showModal, isPokemonCaught, username }, immerSetState ] = useContext(PokemonContext);

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

  const onChangePokemon = (id, value) => {
    immerSetState(draft => {
      draft[id] = value
    })
  }

  const addMyPokemon = (pokemon) => {
    closeModal();
    immerSetState(draft => {
      draft.myPokemonData.push(pokemon)
    })
  }

  const catchPokemon = () => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })

    immerSetState(draft => {
      draft.showModal = true;
      draft.isPokemonCaught = successfullLogic()
    })
  }

  const closeModal = () => {
    immerSetState(draft => {
      draft.showModal = false;
    })
  }

  const resetState = () => {
    immerSetState(draft => {
      draft.singlePokemonData = {}
    })
  }

  return {
    initialData,
    singlePokemonData,
    showModal,
    isPokemonCaught,
    username,
    myPokemonData,

    addMyPokemon,
    catchPokemon,
    fetchListPokemons,
    fetchPokemonById,
    resetState,
    closeModal,
    onChangePokemon
  }
}

export { PokemonProvider, usePokemon }