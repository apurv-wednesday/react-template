/**
 * Selectors for accessing different parts of the iTunes state domain.
 * @module iTunesSelectors
 */
import { createSelector } from 'reselect';
import { initialState } from './reducer';
import get from 'lodash/get';

/**
 * Selector function to get the iTunes state domain from the Redux store.
 * @function
 * @param {Object} state - The Redux store state.
 * @returns {Object} - The iTunes state domain.
 */
export const selectItunesDomain = (state) => state.itunes || initialState;

/**
 * Selector function to get the loading state from the iTunes domain.
 * @function
 * @returns {boolean} - The loading state.
 */
export const selectLoading = () => createSelector(selectItunesDomain, (substate) => get(substate, 'loading'));

/**
 * Selector function to get the song name from the iTunes domain.
 * @function
 * @returns {string} - The song name.
 */
export const selectSongName = () => createSelector(selectItunesDomain, (substate) => get(substate, 'songName'));

/**
 * Selector function to get the songs data from the iTunes domain.
 * @function
 * @returns {Object} - The songs data.
 */
export const selectSongsData = () => createSelector(selectItunesDomain, (substate) => get(substate, 'songsData'));

/**
 * Selector function to get the songs error from the iTunes domain.
 * @function
 * @returns {Object} - The songs error.
 */
export const selectSongsError = () => createSelector(selectItunesDomain, (substate) => get(substate, 'songsError'));

/**
 * Selector function to get the single track loading state from the iTunes domain.
 * @function
 * @returns {boolean} - The single track loading state.
 */
export const selectSingleTrackLoading = () =>
  createSelector(selectItunesDomain, (substate) => get(substate, 'singleTrackLoading'));

/**
 * Selector function to get the track ID from the iTunes domain.
 * @function
 * @returns {number} - The track ID.
 */
export const selectTrackId = () => createSelector(selectItunesDomain, (substate) => get(substate, 'trackId'));

/**
 * Selector function to get the track details from the iTunes domain.
 * @function
 * @returns {Object} - The track details.
 */
export const selectTrackDetails = () => createSelector(selectItunesDomain, (substate) => get(substate, 'trackDetails'));

/**
 * Selector function to get the track details error from the iTunes domain.
 * @function
 * @returns {Object} - The track details error.
 */
export const selectTrackDetailsError = () =>
  createSelector(selectItunesDomain, (substate) => get(substate, 'trackDetailsError'));
