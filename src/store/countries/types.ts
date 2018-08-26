export interface CountriesState {
  readonly error?: Error;
  readonly isConfirmed: boolean;
  readonly isLoading: boolean;
  readonly searchString: string;
  readonly suggestedCountries: string[];
}

export const enum CountriesActionTypes {
  COUNTRY_SEARCH_REQUEST = '@@countries/COUNTRY_SEARCH_REQUEST',
  COUNTRY_SEARCH_SUCCESS = '@@countries/COUNTRY_SEARCH_SUCCESS',
  COUNTRY_SEARCH_FAILURE = '@@countries/COUNTRY_SEARCH_FAILURE',
  SELECT_COUNTRY = '@@countries/SELECT_COUNTRY',
}
