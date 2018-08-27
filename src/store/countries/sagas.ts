import { AnyAction } from 'redux';
import { delay } from 'redux-saga';
import { all, call, put, takeLatest } from 'redux-saga/effects';

import { simulatedApiDelayMs } from '../../constants';
import { suggestCountries } from '../../data';
import { countrySearchFailure, countrySearchSuccess } from './actions';
import { CountriesActionTypes } from './types';

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
