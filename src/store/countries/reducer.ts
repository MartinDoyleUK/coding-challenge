import { Reducer } from 'redux';
import { CountriesActionTypes, CountriesState } from './types';

const initialState: CountriesState = {
  error: undefined,
  isConfirmed: false,
  isLoading: false,
  searchString: '',
  suggestedCountries: [],
};

const reducer: Reducer<CountriesState> = (state = initialState, action) => {
  const { payload, type } = action;
  switch (type) {
    case CountriesActionTypes.COUNTRY_SEARCH_REQUEST: {
      return {
        ...state,
        error: undefined,
        isConfirmed: false,
        isLoading: true,
        searchString: payload,
      };
    }
    case CountriesActionTypes.COUNTRY_SEARCH_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        suggestedCountries: payload,
      };
    }
    case CountriesActionTypes.COUNTRY_SEARCH_FAILURE: {
      return {
        ...state,
        error: payload,
        isLoading: false,
        suggestedCountries: [],
      };
    }
    case CountriesActionTypes.SELECT_COUNTRY: {
      return {
        ...state,
        isConfirmed: true,
        isLoading: false,
        searchString: payload,
        suggestedCountries: [],
      };
    }
    default: {
      return state;
    }
  }
};

export { reducer as countriesReducer };
