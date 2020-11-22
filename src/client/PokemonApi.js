import client from '../utils/ApiClient';

export const listPokemons = (params = {}) => {
  return client(`https://pokeapi.co/api/v2/pokemon?limit=20`, { params })
}

export const morePokemons = (endpoint) => {
  return client(endpoint, {})
}

export const detailPokemon = (id, params = {}) => {
  return client(`https://pokeapi.co/api/v2/pokemon/${id}`, { params })
}