import AppTemplate from 'components/base/template/AppTemplate';
import * as mapper from 'lib/mapper';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthActions } from 'store/actionCreators';

function AuthSignOut(props) {
  let history = useHistory();
  // let location = useLocation();

  useEffect(() => {
    AuthActions.sign_out();
    history.push(mapper.pageUrl.auth.signIn);
  }, []);

  return (
    <AppTemplate title={'Auth'} headerHide={true}>
      <br />
      <br />
      <br />
      {/* <button onClick={loginOut}>Log Out</button> */}
      <br />
    </AppTemplate>
  );
}

export default AuthSignOut;
