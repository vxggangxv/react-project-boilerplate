import { createSelector } from 'reselect';

// isAuthenticated
const accessTokenSelector = state => state.auth.accessToken;
export const isAuthenticatedSelector = createSelector(accessTokenSelector, item => !!item);
