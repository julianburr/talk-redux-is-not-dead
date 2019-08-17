import React, { Fragment, Suspense } from 'react';
import { useSelector } from 'react-redux';

import './styles/List.css';
import { useSuspenseList } from './suspense/pokemon';
import ListItem from './ListItem';

function Team () {
  return (
    <main className="list">
      <div className="inner">
        <Suspense fallback={<p>Loading...</p>}>
          <TeamInner />
        </Suspense>
      </div>
    </main>
  );
}

function TeamInner () {
  const team = useSelector((state) => state.team);
  const items = useSuspenseList();
  return (
    <Fragment>
      {team.map((id) => (
        <ListItem key={id} id={id} name={items.find((i) => i.id == id).name} />
      ))}
    </Fragment>
  );
}

export default Team;
