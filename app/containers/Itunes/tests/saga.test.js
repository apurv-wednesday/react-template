/**
 * Test itunes sagas
 */

import { takeLatest, call, put } from 'redux-saga/effects';
import itunesSaga, { getiTunesSongs, requestGetTrackDetailsGenerator } from '../saga';
import { apiResponseGenerator } from '@utils/testUtils';
import { itunesTypes } from '../reducer';
import { getSongs, getSongsByTrackId } from '@app/services/itunesApi';

describe('Itunes saga tests', () => {
  const generator = itunesSaga();
  let songName = 'coldplay';
  let getSongsAPIGenerator = getiTunesSongs({ songName });
  let requestGetTrackDetails = null;
  let trackId = 285673849;

  it('should start task to watch for REQUEST_GETI_TUNES_SONGS action', () => {
    expect(generator.next().value).toEqual(takeLatest(itunesTypes.REQUEST_GETI_TUNES_SONGS, getiTunesSongs));
  });
  it('should ensure that the action failureGetiTunesSongs is dispatched when the api call fails', () => {
    const res = getSongsAPIGenerator.next().value;
    expect(res).toEqual(call(getSongs, songName));
    const errorResponse = {
      errorMessage: 'There was an error while fetching songs data.'
    };
    expect(getSongsAPIGenerator.next(apiResponseGenerator(false, errorResponse)).value).toEqual(
      put({
        type: itunesTypes.FAILURE_GETI_TUNES_SONGS,
        songsError: errorResponse
      })
    );
  });
  it('should ensure that the action SUCCESS_GETI_TUNES_SONGS is dispatched when the api call succeeds', () => {
    getSongsAPIGenerator = getiTunesSongs({ songName });
    const res = getSongsAPIGenerator.next().value;
    expect(res).toEqual(call(getSongs, songName));
    const songsDataResponse = {
      resultCount: 1,
      results: [
        { trackName: 'cold play', artistName: 'cold play', previewUrl: '', artworkUrl100: '', collectionName: '' }
      ]
    };
    expect(getSongsAPIGenerator.next(apiResponseGenerator(true, songsDataResponse)).value).toEqual(
      put({
        type: itunesTypes.SUCCESS_GETI_TUNES_SONGS,
        songsData: songsDataResponse
      })
    );
  });

  it('should ensure that the action SUCCESS_GET_TRACK_DETAILS is dispatched when the api call succeeds', () => {
    const dataObj = { 285673849: { name: 'coldplay', trackId: 285673849 } };
    requestGetTrackDetails = requestGetTrackDetailsGenerator({ trackId });
    requestGetTrackDetails.next();

    const successResponse = { data: { results: [dataObj[trackId]] }, ok: true };
    expect(requestGetTrackDetails.next().value).toEqual(call(getSongsByTrackId, trackId)); 
    expect(requestGetTrackDetails.next(successResponse).value).toEqual(
      put({
        type: itunesTypes.SUCCESS_GET_TRACK_DETAILS,
        data: dataObj[trackId]
      })
    );
    expect(requestGetTrackDetails.next().done).toEqual(true);
  });

  it('should ensure that the action FAILURE_GET_TRACK_DETAILS is dispatched when the api call fails', () => {
    const dataObj = {};
    const errorResponse = { data: dataObj, ok: false };

    const iterator = requestGetTrackDetailsGenerator({ trackId });
    iterator.next();
    expect(iterator.next().value).toEqual(call(getSongsByTrackId, trackId));
    expect(iterator.next(errorResponse).value).toEqual(
      put({
        type: itunesTypes.FAILURE_GET_TRACK_DETAILS,
        error: dataObj
      })
    );
    expect(iterator.next().done).toEqual(true);
});
});
