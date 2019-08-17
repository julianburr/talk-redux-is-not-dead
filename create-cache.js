const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');

async function createCache () {
  const pokemon = await fetch('https://pokeapi.co/api/v2/generation/1/')
    .then((res) => res.json())
    .then((res) =>
      res.pokemon_species
        .map((i) => {
          const match = i.url.match(/\/pokemon-species\/([0-9]+)/);
          const id = parseInt(match[1]);
          return {
            ...i,
            id
          };
        })
        .sort((a, b) => (a.id > b.id ? 1 : -1))
    );

  fs.writeFileSync(
    path.resolve(__dirname, './src/data/pokemon.json'),
    JSON.stringify({ items: pokemon }, null, 2),
    'utf-8'
  );
  console.log(` ✔︎ Cached list`);

  for (let i = 1; i <= 151; i++) {
    const data = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${i}/`
    ).then((res) => res.json());
    fs.writeFileSync(
      path.resolve(__dirname, `./src/data/${i}.json`),
      JSON.stringify(data, null, 2),
      'utf-8'
    );
    console.log(` ✔︎ Cached #${i}`);
  }
}

createCache();
