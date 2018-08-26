import { AnyAction } from 'redux';
import { allCountries, Country } from '../data';
import { Actions, StoreState } from '../types';

const suggestCountries = (searchString: string): string[] => {
  if (searchString.trim().length === 0) {
    return [];
  }
  return allCountries
    .filter(({ normalized }: Country): boolean => normalized.startsWith(searchString.toLowerCase()))
    .map(({ name }: Country) => name);
};

export function countries(state: StoreState, { payload, type }: AnyAction): StoreState {
  switch (type) {
    case Actions.UPDATE_COUNTRY_SEARCH:
      const isConfirmed = state.isConfirmed && payload.searchString === state.countrySearch;
      const suggestedCountries = suggestCountries(payload.searchString);
      return {
        ...state,
        countrySearch: payload.searchString,
        isConfirmed,
        suggestedCountries,
      };
    case Actions.SELECT_COUNTRY:
      return {
        ...state,
        countrySearch: payload.country,
        isConfirmed: true,
        suggestedCountries: [],
      };
  }
  return state;
}
