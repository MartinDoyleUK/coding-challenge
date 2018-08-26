import * as React from 'react';

import CountriesDropdown from './components/countries-dropdown';

import './App.css';

class App extends React.Component {
  public render() {
    return (
      <div className="app">
        <h1>Byhiras coding test</h1>
        <CountriesDropdown />
      </div>
    );
  }
}

export default App;
