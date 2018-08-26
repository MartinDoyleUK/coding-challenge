import { action } from 'typesafe-actions';
import { CountriesActionTypes } from './types';

export const requestCountrySearch = (searchString: string) =>
  action(CountriesActionTypes.COUNTRY_SEARCH_REQUEST, searchString);

export const countrySearchSuccess = (countries: string[]) =>
  action(CountriesActionTypes.COUNTRY_SEARCH_SUCCESS, countries);

export const countrySearchFailure = (error: Error) =>
  action(CountriesActionTypes.COUNTRY_SEARCH_FAILURE, error);

export const selectCountry = (country: string) =>
  action(CountriesActionTypes.SELECT_COUNTRY, country);
