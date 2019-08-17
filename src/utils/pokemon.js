import { useState, useEffect } from 'react';
import { store } from '../redux/store';

import { ReactComponent as Pokeball } from '../assets/pokeball.svg';
import { ReactComponent as Masterball } from '../assets/masterball.svg';

export const mapPokemonToId = {
  bullbasaur: 1,
  charmander: 4,
  squirtle: 7,
  pikachu: 25
};

export const mapPokemonToTheme = {
  bullbasaur: 'green',
  charmander: 'red',
  squirtle: 'blue',
  pikachu: 'yellow'
};

function delay () {
  return new Promise((resolve) => setTimeout(resolve, store.getState().delay));
}

export async function fetchPokemon () {
  await delay(2000);
  const { items } = require('../data/pokemon.json');
  return items;
}

export async function fetchPokemonDetails (id) {
  await delay(2000);
  const details = require(`../data/${id}.json`);
  return details;
}

export function loadPokemon () {
  return (dispatch, getState) => {
    const { loading, items } = getState().pokemon;

    // Don't do anything if we already have items
    if (items.length || loading === true) {
      return;
    }

    dispatch({
      type: '@@pokemon/LOAD'
    });
    fetchPokemon()
      .then((data) =>
        dispatch({
          type: '@@pokemon/LOADED',
          payload: data
        })
      )
      .catch((e) =>
        dispatch({
          type: '@@pokemon/FAILED',
          payload: e.message
        })
      );
  };
}

export function loadPokemonDetails (id) {
  return (dispatch, getState) => {
    const { loading, details } = getState().pokemon;

    // Don't do anything if we already have items
    if (details && details[id]) {
      return;
    }

    dispatch({
      type: '@@pokemon/DETAILS/LOAD',
      payload: id
    });
    fetchPokemonDetails(id)
      .then((data) =>
        dispatch({
          type: '@@pokemon/DETAILS/LOADED',
          payload: data
        })
      )
      .catch((e) =>
        dispatch({
          type: '@@pokemon/DETAILS/FAILED',
          payload: e.message
        })
      );
  };
}

export function getSprite (id) {
  if (!id) {
    return;
  }
  const spritePath = require(`../assets/pokedex/${id}.svg`);
  return spritePath;
}

export function getStarterSprite (name) {
  if (!name) {
    return;
  }
  const spritePath = require(`../assets/starters/${name}.svg`);
  return spritePath;
}

export function getBall (id) {
  return [ 129, 144, 145, 146, 150, 151 ].includes(id) ? Masterball : Pokeball;
}
