import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useShallowSelector, useDidUpdateEffect } from 'lib/utils';
import { DispatchActions } from 'store/actionCreators';
import { AppTemplate } from 'components/base/template';
import { onUnauthorized } from 'api/config/axiosUtils';

function AuthSignOut(props) {
  // let history = useHistory();
  // let location = useLocation();

  let loginOut = () => {
    DispatchActions.auth_sign_out();
  };

  return (
    <AppTemplate title={'Auth'}>
      <br />
      <br />
      <br />
      <button onClick={loginOut}>Log Out</button>
      <br />
    </AppTemplate>
  );
}

export default AuthSignOut;
