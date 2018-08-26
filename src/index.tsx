import React from 'react';
import ReactDOM from 'react-dom';

import App from './pages/app';
import registerServiceWorker from './registerServiceWorker';

import configureStore from './configureStore';
import './index.css';
import './normalize.css';

const initialState = window.initialReduxState;
const store = configureStore(initialState);

ReactDOM.render(<App store={store} />, document.getElementById('root') as HTMLElement);
registerServiceWorker();
