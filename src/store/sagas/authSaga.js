import { all, takeEvery } from 'redux-saga/effects';
import { createPromiseSaga } from 'lib/asyncUtils';
import * as actions from 'store/actions';

const handleSignUp = createPromiseSaga({
  type: actions.SIGNUP_SAGA,
  tag: 'handleSignUp',
});

const handleSignIn = createPromiseSaga({
  type: actions.SIGNIN_SAGA,
  tag: 'handleSignIn',
});

const handleSignOut = createPromiseSaga({
  type: actions.SIGNOUT_SAGA,
  tag: 'handleSignOut',
});

export default function* baseSaga() {
  yield all([actions.SIGNUP_SAGA.index, handleSignUp]);
  yield all([actions.SIGNIN_SAGA.index, handleSignIn]);
  yield all([actions.SIGNOUT_SAGA.index, handleSignOut]);
}
