import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useShallowSelector, useDidUpdateEffect } from 'lib/utils';
import { DispatchActions } from 'store/actionCreators';

function AuthSignIn(props) {
  const { accessToken } = useShallowSelector(state => ({
    accessToken: state.auth.accessToken,
  }));
  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: '/' } };

  let login = () => {
    DispatchActions.auth_accesstoken();
  };

  useDidUpdateEffect(() => {
    // if (accessToken) return history.push('/test');
    if (accessToken) return history.replace(from);
  }, [accessToken]);

  return (
    <div>
      <br />
      <p>You must log in to view the page at {from.pathname}</p>
      <button onClick={login}>Log in</button>
      <br />
    </div>
  );
}

export default AuthSignIn;
