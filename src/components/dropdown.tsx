import React from 'react';

import './dropdown.css';

export interface OwnProps extends React.Props<Dropdown> {
  doSearch: (searchString: string) => void;
  dropdownItems: string[];
  error?: Error;
  isConfirmed: boolean;
  isLoading: boolean;
  label: string;
  searchString: string;
  selectItem: (item: string) => void;
}

export interface OwnState {
  highlightedIndex: number;
}

class Dropdown extends React.Component<OwnProps, OwnState> {
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

  public componentDidUpdate() {
    console.log(`componentDidUpdate new-props:
${JSON.stringify(this.props, null, 2)}`);
  }

  public componentWillMount() {
    console.log(`componentWillMount props:
${JSON.stringify(this.props, null, 2)}`);
  }

  public componentWillUpdate(prevProps: OwnProps) {
    if (prevProps.searchString !== this.props.searchString) {
      this.setState(prevState => ({ ...prevState, highlightedIndex: -1 }));
    }
  }

  public render() {
    const { searchString, isConfirmed, label } = this.props;
    return (
      <div className={'dropdown__container'}>
        <h4>{label}</h4>
        <input
          type="text"
          className={isConfirmed ? 'dropdown__input dropdown__input--confirmed' : 'dropdown__input'}
          onChange={this.handleInput}
          onKeyDown={this.handleInputKeyDown}
          placeholder="Search..."
          value={searchString}
          ref={this.input}
        />
        {this.renderError()}
        {this.renderDropdown()}
      </div>
    );
  }

  private handleInput = (event: React.FormEvent<HTMLInputElement>) => {
    const inputValue = event.currentTarget.value;
    if (this.props.searchString !== inputValue) {
      this.props.doSearch(inputValue);
    }
  };

  private handleInputKeyDown = (event: React.KeyboardEvent) => {
    const { dropdownItems, selectItem } = this.props;
    const { highlightedIndex: oldIndex } = this.state;
    let newIndex = oldIndex;
    if (event.key === 'ArrowUp' && dropdownItems.length > 0) {
      event.preventDefault();
      if (oldIndex === -1) {
        newIndex = dropdownItems.length - 1;
      } else {
        newIndex = Math.max(oldIndex - 1, 0);
      }
    } else if (event.key === 'ArrowDown' && dropdownItems.length > 0) {
      event.preventDefault();
      if (oldIndex === -1) {
        newIndex = 0;
      } else {
        newIndex = Math.min(oldIndex + 1, dropdownItems.length - 1);
      }
    } else if (event.key === 'Enter') {
      event.preventDefault();
      if (oldIndex !== -1) {
        selectItem(dropdownItems[oldIndex]);
      }
    } else if (event.key === 'Escape') {
      event.preventDefault();
      newIndex = -1;
    }
    this.setState(prevState => ({ ...prevState, highlightedIndex: newIndex }));
  };

  private handleItemClick = (item: string) => () => {
    this.props.selectItem(item);
  };

  private handleItemMouseover = (itemIndex: number) => () => {
    this.setState(prevState => ({ ...prevState, highlightedIndex: itemIndex }));
  };

  private renderDropdown = () => {
    const { dropdownItems } = this.props;
    const { highlightedIndex } = this.state;
    if (dropdownItems.length === 0) {
      return null;
    }
    return (
      <div className="dropdown__items">
        {dropdownItems.map((item: string, index: number) => {
          const className =
            highlightedIndex === index
              ? 'dropdown__items__item dropdown__items__item--highlighted'
              : 'dropdown__items__item';
          return (
            <div
              key={item}
              className={className}
              onClick={this.handleItemClick(item)}
              onMouseOver={this.handleItemMouseover(index)}
            >
              {item}
            </div>
          );
        })}
      </div>
    );
  };

  private renderError = () => {
    const { error } = this.props;
    if (!error) {
      return null;
    }
    return (
      <div className="dropdown__error">
        <strong>Error:</strong> "{error.message}"
      </div>
    );
  };
}

export default Dropdown;
