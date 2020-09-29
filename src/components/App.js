import React, { Suspense } from 'react';
import Core from 'containers/base/Core';
import { Route, Switch, Redirect } from 'react-router-dom';
import GlobalAppStyle from 'styles/base';
import { Error, Home, Auth, About, User, Test } from 'pages';
import { FullScreenLoading } from 'components/base/loading';
import { AppErrorBoundary } from 'components/base/error';
import { LRoute, PrivateRoute } from 'components/base/route';

function App() {
  return (
    <>
      <GlobalAppStyle />
      <AppErrorBoundary>
        <Core />

        <Switch>
          <Redirect exact path="/" to="/home" />
          <Route path="/home" component={Home} />
          <LRoute path="/auth" component={Auth} />
          <Route path="/error" component={Error} />
          <Route path="/user" component={User} />
          <PrivateRoute path="/about" component={About} />
          {/* <Route path="/about" component={About} /> */}
          <Route path="/test" component={Test} />
          <Route component={() => <Redirect to="/error/404" />} />
        </Switch>
      </AppErrorBoundary>
    </>
  );
}

export default App;
