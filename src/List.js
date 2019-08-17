import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './styles/List.css';
import { loadPokemon, useSprite } from './utils/pokemon';
import ListItem from './ListItem';

function List () {
  const dispatch = useDispatch();

  const pokemon = useSelector((state) => state.pokemon);
  const items = pokemon.items;

  useEffect(() => dispatch(loadPokemon()), [ dispatch ]);

  return (
    <main className="list">
      <div className="inner">
        {pokemon.loading ? (
          <p>Loading...</p>
        ) : items.length ? (
          items.map(({ id, name, image }) => (
            <ListItem key={id} id={id} name={name} />
          ))
        ) : (
          <p>No Pokemon Found!</p>
        )}
      </div>
    </main>
  );
}

export default List;
