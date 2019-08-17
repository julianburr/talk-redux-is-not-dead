import React from 'react';

import { titleCase } from './utils/format';
import Detail from './Detail';

function Types ({ types }) {
  return (
    <Detail
      label="Types"
      value={
        <div className="pokemon--details--types">
          {types.map((t) => (
            <div
              key={t.type.name}
              className={`pokemon--details--type type--${t.type.name}`}
            >
              {titleCase(t.type.name)}
            </div>
          ))}
        </div>
      }
    />
  );
}

export default Types;
