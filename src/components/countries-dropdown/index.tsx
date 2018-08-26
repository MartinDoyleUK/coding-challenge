import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { selectCountry, updateCountrySearch } from '../../actions';
import { Action, StoreState } from '../../types';

import CountriesDropdown from './countries-dropdown';

const mapStateToProps = ({ countrySearch, isConfirmed, suggestedCountries }: StoreState) => ({
  countrySearch,
  isConfirmed,
  suggestedCountries,
});

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  selectCountry: (country: string) => dispatch(selectCountry(country)),
  updateCountrySearch: (newSearch: string) => dispatch(updateCountrySearch(newSearch)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CountriesDropdown);
