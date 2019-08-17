import React, { Suspense } from 'react';

import './styles/List.css';
import { useSuspenseList } from './suspense/pokemon';
import ListItem from './ListItem';

function List () {
  return (
    <main className="list">
      <div className="inner">
        <Suspense fallback={<p>Loading...</p>}>
          <ListInner />
        </Suspense>
      </div>
    </main>
  );
}

function ListInner () {
  const items = useSuspenseList();
  return items.length ? (
    items.map(({ id, name, image }) => (
      <ListItem key={id} id={id} name={name} />
    ))
  ) : (
    <p>No Pokemon Found!</p>
  );
}

export default List;
