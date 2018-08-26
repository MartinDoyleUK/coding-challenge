import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import Dropdown from '../components/dropdown';
import { ApplicationState } from '../store';
import { requestCountrySearch, selectCountry } from '../store/countries/actions';

interface PropsFromState {
  dropdownItems: string[];
  error?: Error;
  isConfirmed: boolean;
  isLoading: boolean;
  searchString: string;
}

interface PropsFromDispatch {
  doSearch: typeof requestCountrySearch;
  selectItem: typeof selectCountry;
}

type ContainerProps = PropsFromState & PropsFromDispatch;

const mapStateToProps = ({ countries }: ApplicationState) => ({
  dropdownItems: countries.suggestedCountries,
  error: countries.error,
  isConfirmed: countries.isConfirmed,
  isLoading: countries.isLoading,
  searchString: countries.searchString,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  doSearch: (newSearch: string) => dispatch(requestCountrySearch(newSearch)),
  selectItem: (item: string) => dispatch(selectCountry(item)),
});

class CountriesDropdown extends React.Component<ContainerProps> {
  public render() {
    return <Dropdown label="Please choose a country" {...this.props} />;
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CountriesDropdown);
