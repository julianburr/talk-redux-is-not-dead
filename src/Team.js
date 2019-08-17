import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './styles/List.css';
import { loadPokemon } from './utils/pokemon';
import ListItem from './ListItem';

function Team () {
  const dispatch = useDispatch();
  const pokemon = useSelector((state) => state.pokemon);
  const team = useSelector((state) => state.team);

  useEffect(() => dispatch(loadPokemon()), [ dispatch ]);

  return (
    <main className="list">
      <div className="inner">
        {pokemon.loading !== false ? (
          <p>Loading...</p>
        ) : pokemon.error ? (
          <p>Error: {pokemon.error}</p>
        ) : (
          team.map((id) => (
            <ListItem
              key={id}
              id={id}
              name={pokemon.items.find((i) => i.id == id).name}
            />
          ))
        )}
      </div>
    </main>
  );
}

export default Team;
