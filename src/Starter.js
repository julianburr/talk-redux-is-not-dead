import React from 'react';
import { useDispatch } from 'react-redux';

import { ThemeContext } from './context/theme';
import { getStarterSprite, mapPokemonToTheme } from './utils/pokemon';

function Starter ({ name }) {
  const dispatch = useDispatch();
  const spritePath = getStarterSprite(name);
  const { setTheme } = useContext(ThemeContext);
  return (
    <button
      onClick={() => {
        setTheme(mapPokemonToTheme[name]);
        dispatch({
          type: '@@app/SELECT_STARTER',
          payload: name
        });
      }}
    >
      <img src={spritePath} />
    </button>
  );
}

export default Starter;
