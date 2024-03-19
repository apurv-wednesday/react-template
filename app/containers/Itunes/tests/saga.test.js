/**
 * Test itunes sagas
 */

import { takeLatest, call, put } from 'redux-saga/effects';
import itunesSaga, { getiTunesSongs } from '../saga';
import { apiResponseGenerator } from '@utils/testUtils';
import { itunesTypes } from '../reducer';
import { getSongs } from '@app/services/itunesApi';

describe('Itunes saga tests', () => {
  const generator = itunesSaga();
  let songName = 'coldplay';
  let getSongsAPIGenerator = getiTunesSongs({ songName });

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
        error: errorResponse
      })
    );
  });
  it('should ensure that the action SUCCESS_GETI_TUNES_SONGS is dispatched when the api call succeeds', () => {
    getSongsAPIGenerator = getiTunesSongs({ songName });
    const res = getSongsAPIGenerator.next().value;
    expect(res).toEqual(call(getSongs, songName));
    const songsDataResponse = {
      totalCount: 1,
      items: [{ songName: songName }]
    };
    expect(getSongsAPIGenerator.next(apiResponseGenerator(true, songsDataResponse)).value).toEqual(
      put({
        type: itunesTypes.SUCCESS_GETI_TUNES_SONGS,
        data: songsDataResponse
      })
    );
  });
});
