import { bindActionCreators } from 'redux';
import store from 'store';
import { actions as baseActions } from './modules/base';

export const { dispatch } = store;

export const BaseActions = bindActionCreators(baseActions, dispatch);

export const DispatchActions = {
  ...BaseActions,
};
