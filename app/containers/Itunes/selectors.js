import { createSelector } from 'reselect';
import { initialState } from './reducer';
import get from 'lodash/get';

/**
 * Direct selector to the itunes state domain
 */

export const selectItunesDomain = (state) => state.itunes || initialState;

export const selectLoading = () => createSelector(selectItunesDomain, (substate) => get(substate, 'loading'));
export const selectSongName = () => createSelector(selectItunesDomain, (substate) => get(substate, 'songName'));
export const selectSongsData = () => createSelector(selectItunesDomain, (substate) => get(substate, 'songsData'));
export const selectSongsError = () => createSelector(selectItunesDomain, (substate) => get(substate, 'songsError'));
