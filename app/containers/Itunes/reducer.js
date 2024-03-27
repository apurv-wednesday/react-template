/*
 *
 * Itunes reducer
 *
 */
import { produce } from 'immer';
import { createActions } from 'reduxsauce';
import get from 'lodash/get';

export const { Types: itunesTypes, Creators: itunesCreators } = createActions({
  requestGetiTunesSongs: ['songName'],
  successGetiTunesSongs: ['songsData'],
  failureGetiTunesSongs: ['songsError'],
  cleariTunesSongs: {}
});

export const initialState = {
  songName: null,
  songsData: {},
  songsError: null,
  loading: null
};

export const itunesReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case itunesTypes.REQUEST_GETI_TUNES_SONGS:
        draft.songName = action.songName;
        draft.loading = true;
        break;
      case itunesTypes.CLEARI_TUNES_SONGS:
        draft.songName = null;
        draft.songsError = null;
        draft.songsData = {};
        draft.loading = null;
        break;
      case itunesTypes.SUCCESS_GETI_TUNES_SONGS:
        draft.songsData = action.songsData;
        draft.songsError = null;
        draft.loading = false;
        break;
      case itunesTypes.FAILURE_GETI_TUNES_SONGS:
        draft.songsError = get(action.error, 'message', 'something_went_wrong');
        draft.songsData = null;
        draft.loading = false;
        break;
    }
  });
export default itunesReducer;
