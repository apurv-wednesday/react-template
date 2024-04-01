/**
 * Redux saga effects for handling iTunes API requests.
 * @module iTunesSaga
 */
import { put, call, takeLatest, select } from 'redux-saga/effects';
import { getSongs, getSongsByTrackId } from '@services/itunesApi';
import { itunesTypes, itunesCreators } from './reducer';
import { selectSongsData } from './selectors';

const { REQUEST_GETI_TUNES_SONGS, REQUEST_GET_TRACK_DETAILS } = itunesTypes;
const { successGetiTunesSongs, failureGetiTunesSongs, successGetTrackDetails, failureGetTrackDetails } = itunesCreators;

/**
 * Saga generator function for handling the action to get iTunes songs.
 * @generator
 * @param {Object} action - The action object containing the song name.
 * @param {string} action.songName - The name of the song to search for.
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
 * Saga generator function for handling the action to request track details.
 * @generator
 * @param {Object} action - The action object containing the track ID.
 * @param {number} action.trackId - The ID of the track to retrieve details for.
 */
export function* requestGetTrackDetailsGenerator(action) {
  const tracksData = yield select(selectSongsData());
  const foundTrackItem =
    tracksData && tracksData.results ? tracksData.results.find((obj) => obj.trackId === action.trackId) : null;

  if (foundTrackItem) {
    yield put(successGetTrackDetails(foundTrackItem));
  } else {
    const response = yield call(getSongsByTrackId, action.trackId);
    const { data, ok } = response;
    if (ok) {
      yield put(successGetTrackDetails(data.results[0]));
    } else {
      yield put(failureGetTrackDetails(data));
    }
  }
}
/**
 * Root saga function for iTunes saga.
 * @generator
 */
export default function* iTunesSaga() {
  yield takeLatest(REQUEST_GETI_TUNES_SONGS, getiTunesSongs);
  yield takeLatest(REQUEST_GET_TRACK_DETAILS, requestGetTrackDetailsGenerator);
}
