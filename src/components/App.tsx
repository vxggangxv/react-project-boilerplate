import React, { Suspense } from 'react';
import Core from 'containers/base/Core';
import { Route, Switch, Redirect } from 'react-router-dom';
import GlobalAppStyle from 'styles/base';
import { Error, Home, Auth, About, User, Test } from 'pages';
// import FullScreenLoading from 'components/base/loading/FullScreenLoading';
import AppErrorBoundary from 'components/base/error/AppErrorBoundary';
import LRoute from 'components/base/route/LRoute';
import PrivateRoute from 'components/base/route/PrivateRoute';
import './App.scss';
import { pageUrl } from 'lib/mapper';

function App() {
  return (
    <>
      <GlobalAppStyle />
      <AppErrorBoundary>
        <Switch>
          <Redirect exact path={pageUrl.index} to={pageUrl.home} />
          <Route path={pageUrl.home} component={Home} />
          <LRoute path={pageUrl.auth.index} component={Auth} />
          <Route path="/error" component={Error} />
          <Route path="/user" component={User} />
          <PrivateRoute path="/about" component={About} />
          {/* <Route path="/about" component={About} /> */}
          <Route path="/test" component={Test} />
          <Route component={() => <Redirect to="/error/404" />} />
        </Switch>

        <Core />
      </AppErrorBoundary>
    </>
  );
}

export default App;
