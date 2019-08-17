import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';

import { ThemeProvider } from './context/theme';

import './styles/index.css';
import './styles/fonts.css';

import { store, persistor } from './redux/store';
import App from './App';

const render = (Component) => {
  return ReactDOM.render(
    <Provider store={store}>
      <ThemeProvider>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
            <Component />
          </BrowserRouter>
        </PersistGate>
      </ThemeProvider>
    </Provider>,
    document.getElementById('root')
  );
};

render(App);

if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default;
    render(NextApp);
  });
}
