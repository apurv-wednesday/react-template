import { selectItunesDomain,selectSongName, selectSongsData,selectSongsError } from '../selectors';
import { initialState } from '../reducer';

describe('Itunes selector tests', () => {
  let mockedState;
  let songName;
  let songsData;
  let songsError;

  beforeEach(() => {
    songName = 'coldplay';
    songsData = { totalCount: 1, items: [{ songName }] };
    songsError = 'There was some error while fetching the repository details';

    mockedState = {
      itunes: {
        songName,
        songsData,
        songsError
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
});
