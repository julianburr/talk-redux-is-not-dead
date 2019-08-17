import React, { Suspense, Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './styles/Pokemon.css';
import { getSprite, getBall } from './utils/pokemon';
import { useSuspenseDetails } from './suspense/pokemon';
import { titleCase } from './utils/format';

import Types from './Types';
import BaseStats from './BaseStats';

import { ReactComponent as Pokeball } from './assets/pokeball.svg';
import { ReactComponent as Masterball } from './assets/masterball.svg';

function Pokemon ({ match }) {
  const id = parseInt(match.params.id);

  const spritePath = getSprite(id);

  return (
    <main className="pokemon">
      <div className="inner">
        <div className="pokemon--image">
          <img src={spritePath} />
        </div>

        <Suspense fallback={<p>Loading</p>}>
          <PokemonDetails id={id} />
        </Suspense>
      </div>
    </main>
  );
}

function PokemonDetails ({ id }) {
  const details = useSuspenseDetails(id);

  const team = useSelector((state) => state.team);
  const isCaught = team.includes(id);
  const Ball = getBall(id);

  const dispatch = useDispatch();

  return (
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
        <h1>{titleCase(details.name)}</h1>
      </div>

      <Types types={details.types} />
      <BaseStats stats={details.stats} />
    </div>
  );
}

export default Pokemon;
