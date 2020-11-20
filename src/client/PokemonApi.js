import client from '../utils/ApiClient';

export const listPokemons = (params = {}) => {
  return client(`/pokemon?limit=20`, { params })
}

export const detailPokemon = (id, params = {}) => {
  return client(`/pokemon/${id}`, { params })
}