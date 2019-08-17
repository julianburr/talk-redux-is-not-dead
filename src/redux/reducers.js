import { mapPokemonToId, mapPokemonToTheme } from '../utils/pokemon';

export const delay = (state = 500, action) => {
  switch (action.type) {
    case '@@delay/SET':
      return action.payload;
    default:
      return state;
  }
};

export const session = (state = {}, action) => {
  switch (action.type) {
    case '@@app/SELECT_STARTER':
      return { ...state, starter: action.payload };
    case '@@app/RESET':
      return {};
    default:
      return state;
  }
};

export const theme = (state = null, action) => {
  switch (action.type) {
    case '@@app/SELECT_STARTER':
      return mapPokemonToTheme[action.payload];
    case '@@app/RESET':
      return null;
    default:
      return state;
  }
};

export const team = (state = [], action) => {
  switch (action.type) {
    case '@@app/SELECT_STARTER':
      return [ ...state, mapPokemonToId[action.payload] ];
    case '@@app/RESET':
      return [];
    case '@@team/RELEASE':
      return state.filter((item) => item !== action.payload);
    case '@@team/CATCH':
      return [ ...state, action.payload ];
    default:
      return state;
  }
};
