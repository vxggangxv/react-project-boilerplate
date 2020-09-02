import React, { Suspense } from 'react';
import Core from 'containers/base/Core';
import { Route, Switch, Redirect } from 'react-router-dom';
import GlobalStyle from 'styles/base';
import { Error, Home, About, Test, TestList, TestDetail } from 'pages';
import { FullScreenLoading } from 'components/base/loading';

function App() {
  return (
    <>
      <GlobalStyle />
      <Core />

      <Switch>
        <Redirect exact path="/" to="/home" />
        <Route path="/home" component={Home} />
        <Route path="/error" component={Error} />
        <Route path="/about" component={About} />
        <Route path="/test" component={Test} />
        <Route component={() => <Redirect to="/error/404" />} />
      </Switch>
    </>
  );
}

export default App;
