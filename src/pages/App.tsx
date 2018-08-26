import React from 'react';
import { Provider } from 'react-redux';
import { Store } from 'redux';

import CountriesDropdown from '../containers/countries-dropdown';
import { ApplicationState } from '../store';

interface OwnProps {
  store: Store<ApplicationState>;
}

class App extends React.Component<OwnProps> {
  public render() {
    return (
      <Provider store={this.props.store}>
        <div style={{ padding: '20px' }}>
          <h1>Byhiras coding test</h1>
          <CountriesDropdown />
        </div>
      </Provider>
    );
  }
}

export default App;
