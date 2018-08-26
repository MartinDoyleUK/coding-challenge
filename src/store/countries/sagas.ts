import { AnyAction } from 'redux';
import { delay } from 'redux-saga';
import { all, call, put, takeLatest } from 'redux-saga/effects';

import { simulatedApiDelayMs } from '../../constants';
import { allCountries } from '../../data';
import { countrySearchFailure, countrySearchSuccess } from './actions';
import { CountriesActionTypes } from './types';

interface Country {
  name: string;
  normalized: string;
}

const suggestCountries = (searchString: string): string[] => {
  if (searchString.trim().length === 0) {
    return [];
  }
  return allCountries
    .filter(({ normalized }: Country): boolean => normalized.startsWith(searchString.toLowerCase()))
    .map(({ name }: Country) => name);
};

function* handleSearchRequest(action: AnyAction) {
  try {
    if (action.payload === '') {
      yield put(countrySearchSuccess([]));
    } else {
      const [suggestedCountries] = yield all([
        call(suggestCountries, action.payload),
        call(delay, simulatedApiDelayMs),
      ]);
      yield put(countrySearchSuccess(suggestedCountries));
    }
  } catch (e) {
    console.error('Error searching for country', e);
    yield put(countrySearchFailure(e));
  }
}

export default function* countriesSaga() {
  yield takeLatest(CountriesActionTypes.COUNTRY_SEARCH_REQUEST, handleSearchRequest);
}
