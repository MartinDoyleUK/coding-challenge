import React from 'react';

import './countries-dropdown.css';

export interface OwnProps extends React.Props<CountriesDropdown> {
  countrySearch: string;
  isConfirmed: boolean;
  selectCountry: (country: string) => void;
  suggestedCountries: string[];
  updateCountrySearch: (searchString: string) => void;
}

export interface OwnState {
  highlightedIndex: number;
}

class CountriesDropdown extends React.Component<OwnProps, OwnState> {
  public state = {
    highlightedIndex: -1,
  };

  private input = React.createRef<HTMLInputElement>();

  public componentDidMount() {
    const inputNode = this.input.current;
    if (inputNode) {
      inputNode.focus();
    }
  }

  public componentWillUpdate(prevProps: OwnProps) {
    if (prevProps.countrySearch !== this.props.countrySearch) {
      this.setState(prevState => ({ ...prevState, highlightedIndex: -1 }));
    }
  }

  public render() {
    const { countrySearch, isConfirmed } = this.props;
    return (
      <div className={'countries__container'}>
        <h4>Please choose a country</h4>
        <input
          type="text"
          className={
            isConfirmed ? 'countries__input countries__input--confirmed' : 'countries__input'
          }
          onChange={this.handleInput}
          onKeyDown={this.handleInputKeyDown}
          placeholder="Search..."
          value={countrySearch}
          ref={this.input}
        />
        {this.renderDropdown()}
      </div>
    );
  }

  private handleInput = (event: React.FormEvent<HTMLInputElement>) => {
    this.props.updateCountrySearch(event.currentTarget.value);
  };

  private handleInputKeyDown = (event: React.KeyboardEvent) => {
    const { suggestedCountries, selectCountry } = this.props;
    const { highlightedIndex: oldIndex } = this.state;
    let newIndex = oldIndex;
    console.log(`event.key=${event.key}`);
    if (event.key === 'ArrowUp' && suggestedCountries.length > 0) {
      event.preventDefault();
      if (oldIndex === -1) {
        newIndex = suggestedCountries.length - 1;
      } else {
        newIndex = Math.max(oldIndex - 1, 0);
      }
    } else if (event.key === 'ArrowDown' && suggestedCountries.length > 0) {
      event.preventDefault();
      if (oldIndex === -1) {
        newIndex = 0;
      } else {
        newIndex = Math.min(oldIndex + 1, suggestedCountries.length - 1);
      }
    } else if (event.key === 'Enter') {
      event.preventDefault();
      if (oldIndex !== -1) {
        selectCountry(suggestedCountries[oldIndex]);
      }
    } else if (event.key === 'Escape') {
      event.preventDefault();
      newIndex = -1;
    }
    console.log(`oldIndex=${oldIndex}, newIndex=${newIndex}`);
    this.setState(prevState => ({ ...prevState, highlightedIndex: newIndex }));
  };

  private handleItemClick = (country: string) => () => {
    this.props.selectCountry(country);
  };

  private handleItemMouseover = (itemIndex: number) => () => {
    this.setState(prevState => ({ ...prevState, highlightedIndex: itemIndex }));
  };

  private renderDropdown = () => {
    const { suggestedCountries } = this.props;
    const { highlightedIndex } = this.state;
    if (suggestedCountries.length === 0) {
      return null;
    }
    return (
      <div className="countries__dropdown">
        {suggestedCountries.map((country: string, index: number) => {
          console.log(`highlightedIndex=${highlightedIndex}, index=${index}`);
          const className =
            highlightedIndex === index
              ? 'countries__dropdown__item countries__dropdown__item--highlighted'
              : 'countries__dropdown__item';
          return (
            <div
              key={country}
              className={className}
              onClick={this.handleItemClick(country)}
              onMouseOver={this.handleItemMouseover(index)}
            >
              {country}
            </div>
          );
        })}
      </div>
    );
  };
}

export default CountriesDropdown;
