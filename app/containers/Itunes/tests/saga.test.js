/**
 * Test itunes sagas
 */

import { takeLatest } from 'redux-saga/effects';
import itunesSaga, { defaultFunction } from '../saga';
import { itunesTypes } from '../reducer';

describe('Itunes saga tests', () => {
  const generator = itunesSaga();

  it('should start task to watch for DEFAULT_ACTION action', () => {
    expect(generator.next().value).toEqual(takeLatest(itunesTypes.DEFAULT_ACTION, defaultFunction));
  });
});
