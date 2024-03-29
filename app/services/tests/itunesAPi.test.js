import MockAdapter from 'axios-mock-adapter';
import { getApiClient } from '@utils/apiUtils';
import { getSongs, getSongsByTrackId } from '../itunesApi';

describe('iTunesApi tests', () => {
  const songName = 'coldplay';
  const trackId = 1234;
  it('should make the api call to "search?term="', async () => {
    const mock = new MockAdapter(getApiClient("iTunes").axiosInstance);
    const data = [
      {
        totalCount: 1,
        items: [{ songName }]
      }
    ];
    mock.onGet(`search?term=${songName}&limit=8`).reply(200, data);
    const res = await getSongs(songName);
    expect(res.data).toEqual(data);
  });
  it('should make the api call to "lookup?id="', async () => {
    const mock = new MockAdapter(getApiClient("iTunes").axiosInstance);
    const data = [
      {
        totalCount: 1,
        items: [{ trackId }]
      }
    ];
    mock.onGet(`lookup?id=${trackId}`).reply(200, data);
    const res = await getSongsByTrackId(trackId);
    expect(res.data).toEqual(data);
  });
});