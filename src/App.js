import React from 'react';
import { Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Navigation from './Navigation';

import List from './List';
import Team from './Team';
import Pokemon from './Pokemon';
import Starters from './Starters';

function App () {
  const session = useSelector((state) => state.session);

  if (!session.starter) {
    return <Starters />;
  }

  return (
    <div className="app">
      <Navigation />
      <Route path="/" exact component={List} />
      <Route path="/team" component={Team} />
      <Route path="/pokemon/:id" component={Pokemon} />
    </div>
  );
}

export default App;
