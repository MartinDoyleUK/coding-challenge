export interface StoreState {
  countrySearch: string;
  isConfirmed: boolean;
  suggestedCountries: string[];
}

export const enum Actions {
  UPDATE_COUNTRY_SEARCH = 'UPDATE_COUNTRY_SEARCH',
  SELECT_COUNTRY = 'SELECT_COUNTRY',
}

export interface ActionPayload {
  [extraProps: string]: any;
}

export interface Action {
  payload: ActionPayload;
  type: Actions;
}
