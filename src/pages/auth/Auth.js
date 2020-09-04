import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
// import { Logout } from 'components/base/auth';
import AuthSignIn from './AuthSignIn';
import AuthSignOut from './AuthSignOut';
// import AuthSignUp from 'pages/auth/AuthSignUp';
// import AuthResetPassword from 'pages/auth/AuthResetPassword';
import { NotFound } from 'components/base/error';
import * as mapper from 'lib/mapper';

function Auth({ match }) {
  // console.log(match, 'match');
  return (
    <Switch>
      <Route exact path={`${mapper.pageUrl.signIn}`} component={AuthSignIn} />
      <Route exact path={`${mapper.pageUrl.signOut}`} component={AuthSignOut} />
      {/* <Route path={`${mapper.pageUrl.signUp}`} component={AuthSignUp} />
      <Route path={`${mapper.pageUrl.resetPassword}`} component={AuthResetPassword} />
      <Route path={`${mapper.pageUrl.logout}`} component={Logout} /> */}
      <Route component={NotFound} />
    </Switch>
  );
}

export default withRouter(Auth);
