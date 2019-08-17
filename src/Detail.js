import React from 'react';

function Detail ({ label, value }) {
  return (
    <div className="pokemon--details">
      <p className="pokemon--details--label">{label}</p>
      <p className="pokemon--details--value">{value}</p>
    </div>
  );
}

export default Detail;
