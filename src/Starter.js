import React, { useContext } from 'react';
import { useDispatch } from 'react-redux';

import { getStarterSprite } from './utils/pokemon';

function Starter ({ name }) {
  const dispatch = useDispatch();
  const spritePath = getStarterSprite(name);
  return (
    <button
      onClick={() =>
        dispatch({
          type: '@@app/SELECT_STARTER',
          payload: name
        })}
    >
      <img src={spritePath} />
    </button>
  );
}

export default Starter;
