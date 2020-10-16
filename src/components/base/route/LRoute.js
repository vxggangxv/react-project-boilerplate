import React from 'react';
import { Route, Redirect, useLocation } from 'react-router-dom';
import { FullScreenLoading } from 'components/base/loading';
import * as mapper from 'lib/mapper';
import { useShallowSelector } from 'lib/utils';

// <LRoute path="/auth" component={Auth} token/>
// Login이 되있을경우 다시 오면 홈으로 or token이 있을때 보이면 안되는 페이지
function LRoute({ component: Component, ...rest }) {
  const { landing, isAuthenticated } = useShallowSelector(state => ({
    landing: state.base.landing,
    isAuthenticated: state.auth.isAuthenticated,
  }));
  const { pathname } = useLocation();
  const isExceptPageList = [`${mapper.pageUrl.signOut}`];
  const isExceptPage = isExceptPageList.indexOf(pathname) !== -1;

  return (
    <Route
      {...rest}
      render={props => {
        if (landing) {
          return <FullScreenLoading visible={true} />;
        } else if (isAuthenticated) {
          return !isExceptPage ? <Redirect to={mapper.pageUrl.index} /> : <Component {...props} />;
        } else {
          return <Component {...props} />;
        }
      }}
    />
  );
}

export default LRoute;
