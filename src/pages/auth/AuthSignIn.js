import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useShallowSelector, useDidUpdateEffect } from 'lib/utils';
import { DispatchActions } from 'store/actionCreators';
import { AppTemplate } from 'components/base/template';
import { onUnauthorized } from 'api/config/axiosUtils';
import { isAuthenticatedSelector } from 'store/modules/auth.selectors';

function AuthSignIn(props) {
  const { isAuthenticated } = useShallowSelector(state => ({
    isAuthenticated: isAuthenticatedSelector(state),
  }));
  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: '/' } };

  let login = () => {
    console.log('?');
    DispatchActions.auth_sign_in({ token: 'token', user: 'user' });
    // DispatchActions.auth_token({ token: 'token', user: 'user' });
  };

  // console.log(location.state, 'location.state');
  // console.log(from, 'from');

  useDidUpdateEffect(() => {
    if (isAuthenticated) return history.replace(from);
  }, [isAuthenticated]);

  return (
    <AppTemplate title={'Auth'}>
      <br />
      <br />
      <p>You must log in to view the page at {from.pathname}</p>
      <br />
      <button onClick={login}>Log in</button>
      <br />
    </AppTemplate>
  );
}

export default AuthSignIn;
