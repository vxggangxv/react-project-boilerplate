import { bindActionCreators } from 'redux';
import * as actions from 'store/actions';
import store from 'store';

console.log(store, 'store');
export const { dispatch } = store;
export const Actions = bindActionCreators(actions, dispatch);
