import React, { Fragment, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './styles/Pokemon.css';
import { fetchPokemonDetails, getSprite, getBall } from './utils/pokemon';
import { titleCase } from './utils/format';

import Types from './Types';
import BaseStats from './BaseStats';

import { ReactComponent as Pokeball } from './assets/pokeball.svg';
import { ReactComponent as Masterball } from './assets/masterball.svg';

function Pokemon ({ match }) {
  const id = parseInt(match.params.id);

  const nameFromList = useSelector((state) => {
    const fromList = state.pokemon.items.find((p) => p.id === id);
    return fromList ? fromList.name : null;
  });
  const team = useSelector((state) => state.team);

  const [ details, setDetails ] = useState(null);

  const name = nameFromList ? nameFromList : details ? details.name : '???';

  const isCaught = team.includes(id);
  const Ball = getBall(id);
  const spritePath = getSprite(id);

  const dispatch = useDispatch();
  useEffect(
    () => {
      fetchPokemonDetails(id).then((data) => setDetails(data));
    },
    [ id, setDetails ]
  );

  return (
    <main className="pokemon">
      <div className="inner">
        <div className="pokemon--image">
          <img src={spritePath} />
        </div>

        <div className="pokemon--details">
          <div className="pokemon--details--title">
            <button
              className={`pokemon--details--catch ${isCaught
                ? 'pokemon--details--caught'
                : ''}`}
              onClick={() =>
                dispatch({
                  type: isCaught ? '@@team/RELEASE' : '@@team/CATCH',
                  payload: id
                })}
            >
              <Ball />
            </button>
            <h1>{titleCase(name)}</h1>
          </div>
          {details ? (
            <Fragment>
              <Types types={details.types} />
              <BaseStats stats={details.stats} />
            </Fragment>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </main>
  );
}

export default Pokemon;
