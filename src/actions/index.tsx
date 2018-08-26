import { Action, Actions } from '../types';

export function updateCountrySearch(searchString: string): Action {
  return {
    payload: {
      searchString,
    },
    type: Actions.UPDATE_COUNTRY_SEARCH,
  };
}

export function selectCountry(country: string): Action {
  return {
    payload: {
      country,
    },
    type: Actions.SELECT_COUNTRY,
  };
}
