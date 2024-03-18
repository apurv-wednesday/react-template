import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the itunes state domain
 */

const selectItunesDomain = (state) => state.itunes || initialState;

export const selectItunes = () => createSelector(selectItunesDomain, (substate) => substate);

export const selectSomePayLoad = () => createSelector(selectItunesDomain, (substate) => substate.somePayLoad);
