import React, { useState, useContext, createContext } from "react";
import produce from "immer";
import { morePokemons, listPokemons, detailPokemon } from '../client/PokemonApi';
import { successfullLogic } from "../utils/Helper";

const PokemonContext = createContext();

const PokemonProvider = (props) => {
  const initialState = {
    initialData: {},
    singlePokemonData: {},
    dictionaryPokemon: {},
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
  const [ { dictionaryPokemon, initialData, singlePokemonData, myPokemonData, showModal, isPokemonCaught, username }, immerSetState ] = useContext(PokemonContext);

  const fetchListPokemons = async(offset) => {
    const { data } = await listPokemons({ offset })
    if (data){
      immerSetState(draft => {
        draft.initialData = data;
      })
    }
  }

  const fetchMorePokemons = async(endpoint) => {
    const { data } = await morePokemons(endpoint)
    if (data){
      immerSetState(draft => {
        draft.initialData.next = data.next;
        draft.initialData.previous = data.previous;
        draft.initialData.results = [...initialData.results, ...data.results];
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
    const newDict = JSON.parse(JSON.stringify(dictionaryPokemon));
    const newMyPokemonData = [...myPokemonData, pokemon];

    newDict[pokemon.name] = (newDict[pokemon.name] || 0) + 1

    immerSetState(draft => {
      draft.myPokemonData = newMyPokemonData;
      draft.username = '';
      draft.dictionaryPokemon = newDict;
    })

    localStorage.dictionaryPokemon = JSON.stringify(newDict);
    localStorage.myPokemonData = JSON.stringify(newMyPokemonData);

    closeModal();
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

  const removePokemon = (pokemon) => {
    const newDict = JSON.parse(JSON.stringify(dictionaryPokemon));
    const newMyPokemonData = myPokemonData.filter(poke => poke.username !== pokemon.username);

    newDict[pokemon.name] = (newDict[pokemon.name] || 0) - 1;

    immerSetState(draft => {
      draft.myPokemonData = newMyPokemonData;
      draft.dictionaryPokemon = newDict;
    })

    localStorage.dictionaryPokemon = JSON.stringify(newDict)
    localStorage.myPokemonData = JSON.stringify(newMyPokemonData);
  }

  const setStateMyPokemonData = () => {
    if (localStorage.myPokemonData){
      immerSetState(draft => {
        draft.myPokemonData = JSON.parse(localStorage.myPokemonData || []);
        draft.dictionaryPokemon = JSON.parse(localStorage.dictionaryPokemon || {});
      })
    }
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
    dictionaryPokemon,

    addMyPokemon,
    catchPokemon,
    fetchListPokemons,
    fetchMorePokemons,
    fetchPokemonById,
    resetState,
    closeModal,
    onChangePokemon,
    removePokemon,
    setStateMyPokemonData,
  }
}

export { PokemonProvider, usePokemon }