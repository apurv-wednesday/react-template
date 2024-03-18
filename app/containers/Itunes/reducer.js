/*
 *
 * Itunes reducer
 *
 */
import produce from 'immer';
import { createActions } from 'reduxsauce';

export const initialState = {
  somePayLoad: null
};

export const { Types: itunesTypes, Creators: itunesCreators } = createActions({
  defaultAction: ['somePayLoad']
});

export const itunesReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case itunesTypes.DEFAULT_ACTION:
        draft.somePayLoad = action.somePayLoad;
      default:
    }
  });

export default itunesReducer;
