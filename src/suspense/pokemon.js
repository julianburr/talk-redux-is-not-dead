import { fetchPokemon, fetchPokemonDetails } from '../utils/pokemon';

let list = null;
let details = {};

export function useSuspenseList () {
  if (list instanceof Promise) {
    throw list;
  }

  if (list) {
    return list;
  }

  const promise = fetchPokemon().then((data) => {
    list = data;
    return list;
  });

  list = promise;
  throw promise;
}

export function useSuspenseDetails (id) {
  const pokemon = details[id];

  if (pokemon instanceof Promise) {
    throw pokemon;
  }

  if (pokemon) {
    return pokemon;
  }

  const promise = fetchPokemonDetails(id).then((data) => {
    details[id] = data;
  });

  details[id] = promise;
  throw promise;
}
