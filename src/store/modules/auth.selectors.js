import { createSelector } from 'reselect';

const accessTokenSelector = state => state.auth.accessToken;

export const isAuthenticatedSelector = createSelector(accessTokenSelector, item => !!item);
