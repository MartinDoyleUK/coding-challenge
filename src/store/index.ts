import { combineReducers } from 'redux';
import { all, fork } from 'redux-saga/effects';

import { countriesReducer } from './countries/reducer';
import countriesSaga from './countries/sagas';
import { CountriesState } from './countries/types';

export interface ApplicationState {
  countries: CountriesState;
}

export const rootReducer = combineReducers<ApplicationState>({
  countries: countriesReducer,
});

export function* rootSaga() {
  yield all([fork(countriesSaga)]);
}
