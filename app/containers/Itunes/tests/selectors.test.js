import {
  selectItunesDomain,
  selectSongName,
  selectSongsData,
  selectSongsError,
  selectTrackDetails,
  selectSingleTrackLoading,
  selectTrackDetailsError,
  selectTrackId,
} from '../selectors';
import { initialState } from '../reducer';

describe('Itunes selector tests', () => {
  let mockedState;
  let songName;
  let songsData;
  let songsError;
  let trackId;
  let singleTrackLoading;
  let trackDetailsError;
  let trackDetails;

  beforeEach(() => {
    songName = 'coldplay';
    songsData = { totalCount: 1, items: [{ songName }] };
    songsError = 'There was some error while fetching the repository details';
    trackId = '3434533';
    singleTrackLoading = false;
    trackDetailsError = 'error while fetching the track details';
    trackDetails = [{ trackId }];

    mockedState = {
      itunes: {
        songName,
        songsData,
        songsError,
        trackId,
        singleTrackLoading,
        trackDetailsError,
        trackDetails
      }
    };
  });
  it('should select the songName', () => {
    const songSelector = selectSongName();
    expect(songSelector(mockedState)).toEqual(songName);
  });

  it('should select songsData', () => {
    const songsDataSelector = selectSongsData();
    expect(songsDataSelector(mockedState)).toEqual(songsData);
  });

  it('should select the songsError', () => {
    const songsErrorSelector = selectSongsError();
    expect(songsErrorSelector(mockedState)).toEqual(songsError);
  });

  it('should select the global state', () => {
    const selector = selectItunesDomain(initialState);
    expect(selector).toEqual(initialState);
  });
  it('should select the trackDetails', () => {
    const trackDetailsSelector = selectTrackDetails();
    expect(trackDetailsSelector(mockedState)).toEqual(trackDetails);
  });

  it('should select the trackDetailsError', () => {
    const trackErrorSelector = selectTrackDetailsError();
    expect(trackErrorSelector(mockedState)).toEqual(trackDetailsError);
  });

  it('should select the selectSingleTrackLoading', () => {
    const trackDetailsLoadingSelector = selectSingleTrackLoading();
    expect(trackDetailsLoadingSelector(mockedState)).toEqual(singleTrackLoading);
  });

  it('should select the trackError', () => {
    const trackErrorSelector = selectTrackId();
    expect(trackErrorSelector(mockedState)).toEqual(trackId);
  });
  it('should select the trackId', () => {
    const trackIdSelector = selectTrackId();
    expect(trackIdSelector(mockedState)).toEqual(trackId);
  });
});
