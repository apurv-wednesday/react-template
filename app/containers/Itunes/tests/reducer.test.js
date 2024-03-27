import { itunesReducer, itunesTypes, initialState } from '../reducer';

describe('Itunes reducer tests', () => {
  let state;
  beforeEach(() => {
    state = initialState;
  });

  it('should return the initial state by default', () => {
    expect(itunesReducer(undefined, {})).toEqual(state);
  });

  it('should return the initial state when an action of type requestGetiTunesSongs is dispatched', () => {
    const songName = 'coldplay';
    const expectedResult = { ...state, songName, loading: true };
    expect(
      itunesReducer(state, {
        type: itunesTypes.REQUEST_GETI_TUNES_SONGS,
        songName
      })
    ).toEqual(expectedResult);
  });

  it('should ensure that the song data is present and loading = false when successGetiTunesSongs is dispatched', () => {
    const songsData = { songName: 'Coldplay' };
    const expectedResult = { ...state, songsData: songsData, loading: false };
    console.log("expected result: ",itunesReducer(state, {
      type: itunesTypes.SUCCESS_GETI_TUNES_SONGS,
      songsData
    }))
    expect(
      itunesReducer(state, {
        type: itunesTypes.SUCCESS_GETI_TUNES_SONGS,
        songsData
      })
    ).toEqual(expectedResult);
  });

  it('should ensure that the songsError has some data and loading = false when failureGetiTunesSongs is dispatched', () => {
    const error = 'something_went_wrong';
    const expectedResult = { ...state, songsError: error, songsData: null, loading: false };
    expect(
      itunesReducer(state, {
        type: itunesTypes.FAILURE_GETI_TUNES_SONGS,
        error
      })
    ).toEqual(expectedResult);
  });
  it('should return the initial state when cleariTunesSongs is dispatched', () => {
    expect(
      itunesReducer(state, {
        type: itunesReducer.CLEARI_TUNES_SONGS
      })
    ).toEqual(initialState);
  });
});
