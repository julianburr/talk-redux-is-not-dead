import React from 'react';

import './styles/Starters.css';
import Starter from './Starter';

function Starters () {
  return (
    <main className="starter-selection">
      <div className="inner">
        <h1>Select your starter</h1>
        <p>
          Click on any of the Pokemon below to select it as your starter. I
          mean, we both know you gonna go for the yellow mouse, but let's
          pretend there's a choice.
        </p>
        <div className="starters">
          <Starter name="bullbasaur" />
          <Starter name="charmander" />
          <Starter name="squirtle" />
          <Starter name="pikachu" />
        </div>
      </div>
    </main>
  );
}

export default Starters;
