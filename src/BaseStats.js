import React from 'react';

import { titleCase } from './utils/format';
import Detail from './Detail';

function BaseStats ({ stats }) {
  return (
    <Detail
      label="Base Stats"
      value={
        <div className="pokemon--details--stats">
          {stats.map((s) => (
            <div key={s.stat.name} className="pokemon--details--stat">
              {titleCase(s.stat.name)}: {s.base_stat}
            </div>
          ))}
        </div>
      }
    />
  );
}

export default BaseStats;
