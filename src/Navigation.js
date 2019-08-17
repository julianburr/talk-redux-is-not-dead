import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import './styles/Navigation.css';
import SpeedToggle from './SpeedToggle';

function Navigation () {
  const dispatch = useDispatch();

  const theme = useSelector((state) => state.theme);
  const team = useSelector((state) => state.team);

  return (
    <header className={`header header-${theme}`}>
      <div className="inner">
        <div className="inner--left">
          <NavLink exact to="/">
            Pokedex
          </NavLink>
          <NavLink to="/team">
            Your Team <span className="header--badge">{team.length}</span>
          </NavLink>
        </div>
        <div className="inner--right">
          <SpeedToggle />
          <a
            href="#"
            onClick={() => {
              dispatch({ type: '@@app/RESET' });
            }}
          >
            Reset
          </a>
        </div>
      </div>
    </header>
  );
}

export default Navigation;
