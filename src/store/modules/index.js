import { combineReducers } from 'redux';
import test from './test';
import base from './base';
import auth from './auth';
import user from './user';

export default combineReducers({
  test,
  base,
  auth,
  user,
});
