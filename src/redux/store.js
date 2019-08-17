import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';

import * as reducers from './reducers';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: [ 'delay', 'theme', 'team', 'session' ]
};

const store = createStore(
  persistReducer(persistConfig, combineReducers(reducers)),
  composeWithDevTools(applyMiddleware(thunk))
);

if (process.env.NODE_ENV !== 'production') {
  if (module.hot) {
    module.hot.accept('./reducers', () => {
      store.replaceReducer(reducers);
    });
  }
}

const persistor = persistStore(store);

export { store, persistor };
