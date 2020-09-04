import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import * as mapper from 'lib/mapper';
import { isAuthenticatedSelector } from 'store/modules/auth.selectors';

// 사용법: <PrivateRoute path="/project" component={Project} to="/auth/signup"/>
function PrivateRoute({ component: Component, ...rest }) {
  const { isAuthenticated } = useSelector(state => ({
    isAuthenticated: isAuthenticatedSelector(state),
  }));
  const isRedirect = rest.redirect;

  return (
    <Route
      {...rest}
      render={props => {
        if (!isAuthenticated) {
          return (
            <Redirect
              to={{
                pathname: mapper.pageUrl.index,
                state: { from: location },
              }}
            />
          );
        } else if (isRedirect) {
          return <Redirect to={isRedirect} />;
        } else {
          return <Component {...props} />;
        }
      }}
    />
  );
}

export default PrivateRoute;
