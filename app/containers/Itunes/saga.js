import { put, call, takeLatest } from 'redux-saga/effects';
import { getSongs } from '@services/itunesApi';
import { itunesTypes, itunesCreators } from './reducer';

const { REQUEST_GETI_TUNES_SONGS } = itunesTypes;
const { successGetiTunesSongs, failureGetiTunesSongs } = itunesCreators;

/**
 *
 * @param {*} action
 */
export function* getiTunesSongs(action) {
  const response = yield call(getSongs, action.songName);
  const { data, ok } = response;
  if (ok) {
    yield put(successGetiTunesSongs(data));
  } else {
    yield put(failureGetiTunesSongs(data));
  }
}

/**
 *
 */
export default function* iTunesSaga() {
  yield takeLatest(REQUEST_GETI_TUNES_SONGS, getiTunesSongs);
}
