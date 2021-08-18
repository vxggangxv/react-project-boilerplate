import { bindActionCreators } from 'redux';
import store from 'store';
import { actions as testActions } from './modules/test';
import { actions as appActions } from './modules/app';
import { actions as baseActions } from './modules/base';
import { actions as authActions } from './modules/auth';
import { actions as userActions } from './modules/user';

export const { dispatch } = store;

export const TestActions: typeof testActions = bindActionCreators(testActions, dispatch);
export const AppActions: typeof appActions = bindActionCreators(appActions, dispatch);
export const AuthActions: typeof authActions = bindActionCreators(authActions, dispatch);
export const BaseActions: typeof baseActions = bindActionCreators(baseActions, dispatch);
export const UserActions: typeof userActions = bindActionCreators(userActions, dispatch);

// export const DispatchActions = {
//   ...TestActions,
//   ...AppActions,
//   ...BaseActions,
//   ...AuthActions,
//   ...UserActions,
// };
