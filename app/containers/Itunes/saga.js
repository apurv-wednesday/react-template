import { takeLatest } from 'redux-saga/effects';
import { itunesTypes } from './reducer';

// Individual exports for testing
const { DEFAULT_ACTION } = itunesTypes;

export function* defaultFunction(/* action */) {
  // console.log('Do something here')
}

export default function* itunesSaga() {
  yield takeLatest(DEFAULT_ACTION, defaultFunction);
}
