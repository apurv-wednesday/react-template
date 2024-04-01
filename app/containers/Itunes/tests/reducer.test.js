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

  it('should return the required state when an action of type REQUEST_GET_TRACK_DETAILS is dispatched', () => {
    const expectedResult = {
      ...state,
      trackId: 123,
      singleTrackLoading: true
    };
    expect(
      itunesReducer(state, {
        type: itunesTypes.REQUEST_GET_TRACK_DETAILS,
        trackId: 123
      })
    ).toEqual(expectedResult);
  });

  it('should ensure that the REQUEST_GET_TRACK_DETAILS is success and SUCCESS_GET_TRACK_DETAILS is dispatched, returns the data and updates tracksData', () => {
    const data = { songName: 'Coldplay', songArtist: 'Coldplay' };
    const expectedResult = {
      ...state,
      trackDetailsError: null,
      trackDetails: data,
      singleTrackLoading: false
    };
    expect(
      itunesReducer(state, {
        type: itunesTypes.SUCCESS_GET_TRACK_DETAILS,
        data: data
      })
    ).toEqual(expectedResult);
  });
  
  it('should ensure that FAILURE_GET_TRACK_DETAILS has been dispatched when the track details data can not be found', () => {
    const error = 'error fetching song';
    const expectedResult = { ...state, trackDetailsError: error };
    expect(
      itunesReducer(state, {
        type: itunesTypes.FAILURE_GET_TRACK_DETAILS,
        error
      })
    ).toEqual(expectedResult);
  });
  it('should handle unknown action types gracefully', () => {
    const modifiedState = { ...state, loading: true };
    expect(
      itunesReducer(modifiedState, {
        type: 'UNKNOWN_ACTION'
      })
    ).toEqual(modifiedState);
  });
});
