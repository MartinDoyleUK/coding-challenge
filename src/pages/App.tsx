import React from 'react';
import { Provider } from 'react-redux';
import { Store } from 'redux';

import { simulatedApiDelayMs } from '../constants';
import CountriesDropdown from '../containers/countries-dropdown';
import { ApplicationState } from '../store';

import './app.css';

interface OwnProps {
  store: Store<ApplicationState>;
}

class App extends React.Component<OwnProps> {
  public render() {
    return (
      <Provider store={this.props.store}>
        <div className="app">
          <h1>Coding challenge</h1>
          <div className="delay-notice">
            Simulated API delay currently set to {simulatedApiDelayMs}
            ms
          </div>
          <div className="delay-notice-instructions">
            (value can be changed in <code>src/constants.ts</code>)
          </div>
          <CountriesDropdown />
        </div>
      </Provider>
    );
  }
}

export default App;
