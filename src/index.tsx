import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, Store } from 'redux';

import App from './App';
import { countries } from './reducers';
import registerServiceWorker from './registerServiceWorker';
import { StoreState } from './types';

import './index.css';
import './normalize.css';

const defaultState: StoreState = {
  countrySearch: '',
  isConfirmed: false,
  suggestedCountries: [],
};
const win = window as { [key: string]: any };
const store: Store = createStore(
  countries,
  defaultState,
  win.__REDUX_DEVTOOLS_EXTENSION__ && win.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
