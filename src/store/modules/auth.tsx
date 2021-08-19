import { createAction, createSelector, createSlice } from '@reduxjs/toolkit';
import { setAuthInHeader } from 'api/config/axiosUtils';
import storage, { keys } from 'lib/storage';
import { all } from 'redux-saga/effects';
import { RootState } from 'store';
import { fetchInitialState } from 'store/utils';

interface InitialState {
  accessToken: string | null;
  signUp: object;
  signIn: object;
  signOut: object;
}

const initialState: InitialState = {
  // NOTE: 최초 랜딩시 storage값 유무 확인
  accessToken: storage.get(keys.token) || null,
  signUp: {
    ...fetchInitialState,
  },
  signIn: {
    ...fetchInitialState,
  },
  signOut: {
    ...fetchInitialState,
  },
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    set_token: (state, { payload }) => {
      // console.log(payload, 'payload SET_TOKEN');
      state.accessToken = payload;
      setAuthInHeader(payload);
    },
    sign_up: () => {},
    sign_in: (state, { payload }) => {
      // DEBUG: 백엔드 연결 후 테스트 필요
      console.log(payload, 'payload signIn');
      const { token, user } = payload;
      if (!token) return;
      state.accessToken = token;
      setAuthInHeader(token);
      storage.set(keys.token, token);
      storage.set(keys.user, user);
    },
    sign_out: (state, { payload }) => {
      // DEBUG: 백엔드 연결 후 테스트 필요
      state.accessToken = null;
      setAuthInHeader(null);
      // storage.clear();
      storage.remove(keys.token);
      storage.remove(keys.user);
      storage.remove(`persist:${keys.persist}`);
      sessionStorage.removeItem(`persist:${keys.persist}`);
    },
  },
});

export const name = slice.name;
export const actions = slice.actions;

// createSelector
export const accessTokenSelector = (state: RootState) => state.auth.accessToken;
export const isAuthenticatedSelector = createSelector(accessTokenSelector, item => !!item);
export const logInSelector = (state: RootState) => ({
  accessToken: state.auth.accessToken,
  user: state.user.user,
});
export const isLogInSelector = createSelector(logInSelector, item => {
  return !!item.accessToken && !!item.user;
});

// function* handleSignUp (action) {}

// function* handleSignIn (action) {}

// function* handleSignOut (action) {}

export function* authSaga() {
  yield all([
    // takeLatest(
    //   actions.fetch_movie_request,
    //   createSaga(actions, 'fetch_movies', api.fetchMoviesNowPlaying),
    // ),
    // takeEvery(actions.SIGNUP_SAGA.index, handleSignUp)
    // takeEvery(actions.SIGNIN_SAGA.index, handleSignIn),
    // takeEvery(actions.SIGNOUT_SAGA.index, handleSignOut),
  ]);
}

export default slice.reducer;
