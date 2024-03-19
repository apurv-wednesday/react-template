import { generateApiClient } from '@utils/apiUtils';
const songsApi = generateApiClient('iTunes');

export const getSongs = (songName) => songsApi.get(`search?term=${songName}`);
