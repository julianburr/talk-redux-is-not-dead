import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import './styles/ListItem.css';
import { getSprite, getBall } from './utils/pokemon';

function ListItem ({ id, name }) {
  const dispatch = useDispatch();

  const spritePath = getSprite(id);

  const team = useSelector((state) => state.team);
  const isCaught = team.includes(id);
  const Ball = getBall(id);

  return (
    <div className="list-item">
      <Link to={`/pokemon/${id}`} className="list-item--inner">
        <img src={spritePath} />
        <div className="list-item--id">#{id}</div>
        <button
          className={`list-item--catch ${isCaught ? `list-item--caught` : ''}`}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            dispatch({
              type: isCaught ? '@@team/RELEASE' : '@@team/CATCH',
              payload: id
            });
          }}
        >
          <Ball />
        </button>
      </Link>
    </div>
  );
}

export default ListItem;
