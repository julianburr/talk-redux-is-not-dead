import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import './styles/Navigation.css';
import { ThemeContext } from './context/theme';
import SpeedToggle from './SpeedToggle';

function Navigation () {
  const dispatch = useDispatch();

  const { theme, resetTheme } = useContext(ThemeContext);
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
              resetTheme();
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
