import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './styles/SpeedToggle.css';

import { ReactComponent as JolteonSvg } from './assets/pokedex/135.svg';
import { ReactComponent as SlowpokeSvg } from './assets/pokedex/79.svg';

function SpeedToggle () {
  const dispatch = useDispatch();
  const delay = useSelector((state) => state.delay);
  return (
    <div className={`speed speed--${delay === 500 ? 'fast' : 'slow'}`}>
      <button
        onClick={() => dispatch({ type: '@@delay/SET', payload: 500 })}
        className={delay === 500 ? 'active' : ''}
      >
        <JolteonSvg />
      </button>
      <button
        onClick={() => dispatch({ type: '@@delay/SET', payload: 2000 })}
        className={delay !== 500 ? 'active' : ''}
      >
        <SlowpokeSvg />
      </button>
    </div>
  );
}

export default SpeedToggle;
