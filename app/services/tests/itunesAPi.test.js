import MockAdapter from 'axios-mock-adapter';
import { getApiClient } from '@utils/apiUtils';
import { getSongs } from '../itunesApi';

describe('iTunesApi tests', () => {
  const songName = 'coldplay';
  it('should make the api call to "search?term="', async () => {
    const mock = new MockAdapter(getApiClient("iTunes").axiosInstance);
    const data = [
      {
        totalCount: 1,
        items: [{ songName }]
      }
    ];
    mock.onGet(`search?term=${songName}`).reply(200, data);
    const res = await getSongs(songName);
    expect(res.data).toEqual(data);
  });
});

// describe('getSongs', () => {
//   it('fetches songs from the iTunes API', async () => {
//     const searchTerm = 'coldplay';
//     const response = await getSongs(searchTerm);
//     console.log(response)
//     console.log(response.data)

    
//     expect(response.status).toBe(200);
//     expect(response.data.results.length).toBeGreaterThan(0);
//   });
// });